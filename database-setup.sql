-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create login_history table
CREATE TABLE IF NOT EXISTS login_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  username VARCHAR(50),
  login_time TIMESTAMP DEFAULT NOW(),
  ip_address VARCHAR(50),
  country VARCHAR(100),
  device_type VARCHAR(50),
  device_model VARCHAR(100),
  browser_name VARCHAR(50),
  os_name VARCHAR(50),
  user_agent TEXT
);

-- Insert initial users (passwords will be hashed in the application)
-- For now, using plain text for simplicity - should be hashed in production
INSERT INTO users (username, password_hash) VALUES 
('yelena', '2006-07-10'),
('zie', '2005-07-05'),
('admin', 'ichwan400')
ON CONFLICT (username) DO NOTHING;

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE login_history ENABLE ROW LEVEL SECURITY;

-- Allow public read access to users
CREATE POLICY "Allow public read users" ON users FOR SELECT TO anon USING (true);

-- Allow public insert to users (for registration if needed)
CREATE POLICY "Allow public insert users" ON users FOR INSERT TO anon WITH CHECK (true);

-- Allow public read access to login_history
CREATE POLICY "Allow public read login_history" ON login_history FOR SELECT TO anon USING (true);

-- Allow public insert to login_history
CREATE POLICY "Allow public insert login_history" ON login_history FOR INSERT TO anon WITH CHECK (true);
