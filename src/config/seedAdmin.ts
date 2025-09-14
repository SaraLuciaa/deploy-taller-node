import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";

export async function seedAdmin() {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "secret";
    const adminName = process.env.ADMIN_NAME || "Admin";

    const existing = await UserModel.findOne({ email: adminEmail });
    if (!existing) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await UserModel.create({
            name: adminName,
            email: adminEmail,
            password: hashedPassword,
            roles: ["admin"]
        });
        console.log("Admin user created");
    } else {
        console.log("Admin user already exists");
    }
}
