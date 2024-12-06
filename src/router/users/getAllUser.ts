import { Router } from "express"
import User from "../../models/usermodel"
import authMiddleware from "../../middleware/authMiddleware"

const router = Router()

router.get("/users", authMiddleware, async (req: any, res: any) => {
    try {
        let { userId, role } = req.user

        if (role != "Admin")
            return res.status(403).json({ message: " Access denied: Admin role required" })

        const users = await User.findAll()
        res.status(201).json({ users: users })
    }

    catch (error: any) {
        console.error('Error finding user:', error);

        return res.status(500).json({ message: "Internal server error" });

    }

})

export default router