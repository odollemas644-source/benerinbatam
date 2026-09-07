import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { service_slug, name, phone, area, address, description, quantity, preferred_date, preferred_time } = body;

    if (!name || !phone || !area || !address) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Upsert customer
    const { data: customer } = await supabase
      .from("customers")
      .upsert({ name, phone: phone.replace(/\D/g, ""), area, address }, { onConflict: "phone" })
      .select("id")
      .single();

    // Create order - harga 0 karena belum ditentukan, admin set nanti
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_id: customer?.id ?? null,
        customer_name: name,
        customer_phone: phone.replace(/\D/g, ""),
        service_category: service_slug || "konsultasi",
        service_name: description?.split("]")[0]?.replace("[", "") || "Konsultasi",
        description: description || null,
        address,
        area,
        quantity: quantity || 1,
        customer_price: 0,
        vendor_fee: 0,
        preferred_date: preferred_date || null,
        preferred_time: preferred_time || null,
        source: "website",
      })
      .select("order_number")
      .single();

    if (orderError) {
      console.error("Order creation error:", orderError);
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }

    return NextResponse.json({ order_number: order.order_number, message: "Order created" });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
