import { Router } from 'express';
// Assuming you have these models defined
import bcrypt from 'bcrypt';
import User from '../models/usermodel';
import { Role } from '../interfaces/UserInterfaces';

const router = Router();


// create a user with sequelize 
async function createUser(username: string, password: string, role: Role = Role.User) {

    // hash the password 
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user with Model function create 
    const newUser = await User.create({
        username,
        password: hashedPassword,
        role
    });
    return newUser;
}

router.post("/api/create/user", async (req: any, res: any) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json({ message: "Username already exists" });
        }

        const newUser = await createUser(username, password, role);

        res.status(201).json({ message: "User created successfully", user: newUser });
    }

    catch (error) {
        console.error('Error creating user:', error);

        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;