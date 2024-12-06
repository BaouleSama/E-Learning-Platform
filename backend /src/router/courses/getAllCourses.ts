import { Router } from "express"
import Courses from "../../models/coursemodel"
import authMiddleware from "../../middleware/authMiddleware"


const router = Router()

router.get("/courses/", authMiddleware, async (req: any, res: any) => {

    try {
        let { role } = req.user

        if (role != "Admin")
            return res.status(404).json({ message: "Access Denied" })

        const course = await Courses.findAll()
        return res.status(201).json({ message: "Here all courses", courses: course })


    } catch (error) {
        console.error('Error finding user:', error);

        return res.status(500).json({ message: "Internal server error" });

    }

})

export default router
