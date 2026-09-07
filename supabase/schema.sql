-- ============================================
-- BENERIN - Database Schema
-- Platform Jasa Service Lokal Batam
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- AREAS
-- ============================================
CREATE TABLE areas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO areas (name, slug, sort_order) VALUES
  ('Batam Center', 'batam-center', 1),
  ('Nagoya', 'nagoya', 2),
  ('Lubuk Baja', 'lubuk-baja', 3),
  ('Bengkong', 'bengkong', 4),
  ('Batam Kota', 'batam-kota', 5),
  ('Sekupang', 'sekupang', 6),
  ('Batu Aji', 'batu-aji', 7),
  ('Sagulung', 'sagulung', 8),
  ('Nongsa', 'nongsa', 9),
  ('Tiban', 'tiban', 10),
  ('Batu Ampar', 'batu-ampar', 11),
  ('Sei Beduk', 'sei-beduk', 12);

-- ============================================
-- SERVICES (katalog layanan)
-- ============================================
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  customer_price INT NOT NULL,
  vendor_fee INT NOT NULL,
  unit TEXT DEFAULT 'unit',
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Service AC
INSERT INTO services (category, name, slug, description, customer_price, vendor_fee, unit, sort_order) VALUES
  ('ac', 'Cuci AC 1/2 - 1 PK', 'cuci-ac-1pk', 'Cuci AC standar untuk unit 1/2 sampai 1 PK', 90000, 60000, 'unit', 1),
  ('ac', 'Cuci AC 1.5 - 2 PK', 'cuci-ac-2pk', 'Cuci AC standar untuk unit 1.5 sampai 2 PK', 120000, 80000, 'unit', 2),
  ('ac', 'Isi Freon R22', 'isi-freon-r22', 'Pengisian freon tipe R22', 250000, 180000, 'unit', 3),
  ('ac', 'Isi Freon R32/R410A', 'isi-freon-r32', 'Pengisian freon tipe R32 atau R410A', 350000, 250000, 'unit', 4),
  ('ac', 'Cek & Diagnosa AC', 'cek-diagnosa-ac', 'Pengecekan dan diagnosa masalah AC', 50000, 30000, 'unit', 5),
  ('ac', 'Ganti Kapasitor', 'ganti-kapasitor', 'Penggantian kapasitor AC', 200000, 140000, 'unit', 6),
  ('ac', 'Bongkar Pasang AC', 'bongkar-pasang-ac', 'Bongkar dan pasang ulang AC (pindah lokasi)', 350000, 250000, 'unit', 7),
  ('ac', 'Pasang AC Baru', 'pasang-ac-baru', 'Instalasi AC baru (tanpa unit AC)', 450000, 320000, 'unit', 8),
  ('ac', 'Service AC Deep Clean', 'deep-clean-ac', 'Cuci AC mendalam termasuk evaporator dan kondensor', 250000, 170000, 'unit', 9);

-- ============================================
-- CUSTOMERS
-- ============================================
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  email TEXT,
  address TEXT,
  area TEXT,
  total_orders INT DEFAULT 0,
  last_order_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- VENDORS
-- ============================================
CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  address TEXT,
  areas TEXT[] DEFAULT '{}',
  categories TEXT[] DEFAULT '{}',
  score INT DEFAULT 50,
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  bank_name TEXT,
  bank_account TEXT,
  bank_holder TEXT,
  total_jobs INT DEFAULT 0,
  completed_jobs INT DEFAULT 0,
  avg_rating DECIMAL(2,1) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ORDERS
-- ============================================
CREATE SEQUENCE IF NOT EXISTS order_seq START 1;

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL DEFAULT 'BTM-' || LPAD(nextval('order_seq')::TEXT, 5, '0'),
  
  -- Relations
  customer_id UUID REFERENCES customers(id),
  vendor_id UUID REFERENCES vendors(id),
  service_id UUID REFERENCES services(id),
  
  -- Customer info (denormalized for quick access)
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  
  -- Order detail
  service_category TEXT NOT NULL,
  service_name TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  area TEXT NOT NULL,
  quantity INT DEFAULT 1,
  
  -- Pricing
  customer_price INT NOT NULL,
  vendor_fee INT NOT NULL,
  margin INT GENERATED ALWAYS AS (customer_price - vendor_fee) STORED,
  
  -- Schedule
  preferred_date DATE,
  preferred_time TEXT,
  scheduled_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  
  -- Status
  status TEXT DEFAULT 'new'
    CHECK (status IN ('new','confirmed','assigned','in_progress','completed','paid','closed','cancelled')),
  
  -- Payment
  payment_status TEXT DEFAULT 'unpaid'
    CHECK (payment_status IN ('unpaid','customer_paid','vendor_paid')),
  payment_method TEXT,
  payment_proof TEXT,
  vendor_paid_at TIMESTAMPTZ,
  
  -- Source tracking
  source TEXT DEFAULT 'website',
  
  -- Photos
  problem_photos TEXT[] DEFAULT '{}',
  before_photos TEXT[] DEFAULT '{}',
  after_photos TEXT[] DEFAULT '{}',
  
  -- Review
  customer_rating INT CHECK (customer_rating BETWEEN 1 AND 5),
  customer_review TEXT,
  
  -- Admin
  admin_notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Update customer stats on order changes
CREATE OR REPLACE FUNCTION update_customer_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE customers SET
    total_orders = (SELECT COUNT(*) FROM orders WHERE customer_id = NEW.customer_id),
    last_order_at = now()
  WHERE id = NEW.customer_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_customer_stats
  AFTER INSERT ON orders
  FOR EACH ROW
  WHEN (NEW.customer_id IS NOT NULL)
  EXECUTE FUNCTION update_customer_stats();

-- ============================================
-- ORDER LOGS (audit trail)
-- ============================================
CREATE TABLE order_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  actor TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- COMPLAINTS / WARRANTY
-- ============================================
CREATE TABLE complaints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id),
  customer_id UUID REFERENCES customers(id),
  type TEXT NOT NULL CHECK (type IN ('warranty','complaint','refund')),
  description TEXT NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open','investigating','resolved','closed')),
  resolution TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;

-- Public read access for services and areas
CREATE POLICY "Services are viewable by everyone" ON services FOR SELECT USING (true);
CREATE POLICY "Areas are viewable by everyone" ON areas FOR SELECT USING (true);

-- Anon can insert orders (booking form)
CREATE POLICY "Anyone can create orders" ON orders FOR INSERT WITH CHECK (true);

-- Anon can insert customers (booking form)
CREATE POLICY "Anyone can create customers" ON customers FOR INSERT WITH CHECK (true);

-- Authenticated (admin) full access
CREATE POLICY "Admin full access orders" ON orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access customers" ON customers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access vendors" ON vendors FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access order_logs" ON order_logs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access complaints" ON complaints FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_area ON orders(area);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_vendor ON orders(vendor_id);
CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_vendors_active ON vendors(is_active) WHERE is_active = true;
CREATE INDEX idx_services_category ON services(category);

-- ============================================
-- VIEWS (for admin dashboard)
-- ============================================
CREATE OR REPLACE VIEW order_summary AS
SELECT
  o.id,
  o.order_number,
  o.customer_name,
  o.customer_phone,
  o.service_name,
  o.area,
  o.quantity,
  o.customer_price,
  o.vendor_fee,
  o.margin,
  o.status,
  o.payment_status,
  o.preferred_date,
  o.preferred_time,
  o.created_at,
  v.name AS vendor_name,
  v.phone AS vendor_phone
FROM orders o
LEFT JOIN vendors v ON o.vendor_id = v.id
ORDER BY o.created_at DESC;
