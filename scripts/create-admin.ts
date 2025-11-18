import postgres from "postgres";
import bcrypt from "bcryptjs";

const DATABASE_URL = process.env.DATABASE_URL!;
const sql = postgres(DATABASE_URL);

async function createAdmin() {
  try {
    const adminEmail = "admin@aptsaicuf.com"; // Change this to your preferred admin email
    const adminPassword = process.env.ADMIN_PASSWORD || "aicufadmin";
    
    console.log("Creating admin user...\n");
    
    // Check if admin already exists
    const existing = await sql`
      SELECT * FROM registrations WHERE email_id = ${adminEmail}
    `;
    
    if (existing.length > 0) {
      console.log("⚠️  Admin user already exists:", adminEmail);
      console.log("Updating password and role...\n");
      
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      
      await sql`
        UPDATE registrations 
        SET password = ${hashedPassword}, role = 'admin'
        WHERE email_id = ${adminEmail}
      `;
      
      console.log("✅ Admin user updated successfully!");
    } else {
      console.log("Creating new admin user...\n");
      
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      
      await sql`
        INSERT INTO registrations (
          registration_id,
          application_type,
          name,
          gender,
          registration_no,
          course,
          age,
          mobile_no,
          whatsapp_no,
          email_id,
          religion,
          address,
          password,
          role,
          created_at
        ) VALUES (
          ${'ADMIN-' + Date.now()},
          'admin',
          'System Administrator',
          'Other',
          'ADMIN-001',
          'N/A',
          '0',
          '0000000000',
          '0000000000',
          ${adminEmail},
          'N/A',
          'System',
          ${hashedPassword},
          'admin',
          NOW()
        )
      `;
      
      console.log("✅ Admin user created successfully!");
    }
    
    console.log("\nAdmin Login Credentials:");
    console.log("========================");
    console.log("Email:", adminEmail);
    console.log("Password:", adminPassword);
    console.log("Login URL: /admin/login");
    
    await sql.end();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

createAdmin();
