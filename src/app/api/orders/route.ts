import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { AC_SERVICES } from "@/lib/constants";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      service_slug,
      name,
      phone,
      area,
      address,
      description,
      quantity,
      preferred_date,
      preferred_time,
    } = body;

    // Validate required fields
    if (!service_slug || !name || !phone || !area || !address) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find service details
    const service = AC_SERVICES.find((s) => s.slug === service_slug);
    if (!service) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Upsert customer (by phone number)
    const { data: customer } = await supabase
      .from("customers")
      .upsert(
        { name, phone: phone.replace(/\D/g, ""), area, address },
        { onConflict: "phone" }
      )
      .select("id")
      .single();

    // Find matching service in DB
    const { data: dbService } = await supabase
      .from("services")
      .select("id, customer_price, vendor_fee")
      .eq("slug", service_slug)
      .single();

    const customerPrice = (dbService?.customer_price ?? service.price) * (quantity || 1);
    const vendorFee = dbService
      ? dbService.vendor_fee * (quantity || 1)
      : Math.round(customerPrice * 0.65); // fallback: 65% goes to vendor

    // Create order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_id: customer?.id ?? null,
        service_id: dbService?.id ?? null,
        customer_name: name,
        customer_phone: phone.replace(/\D/g, ""),
        service_category: "ac",
        service_name: service.name,
        description: description || null,
        address,
        area,
        quantity: quantity || 1,
        customer_price: customerPrice,
        vendor_fee: vendorFee,
        preferred_date: preferred_date || null,
        preferred_time: preferred_time || null,
        source: "website",
      })
      .select("order_number")
      .single();

    if (orderError) {
      console.error("Order creation error:", orderError);
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 }
      );
    }

    // TODO: Send WhatsApp notification to admin
    // await sendWhatsAppNotification({
    //   to: process.env.ADMIN_PHONE,
    //   message: `🔔 ORDER BARU!\n\n${order.order_number}\n${service.name} x${quantity}\n${name} — ${phone}\n${area}\n${preferred_date} ${preferred_time}\nEstimasi: Rp${customerPrice.toLocaleString()}\n\nCek dashboard: [URL]`
    // });

    return NextResponse.json({
      order_number: order.order_number,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
