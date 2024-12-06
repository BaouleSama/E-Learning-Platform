import { Router } from "express"
import Courses from "../../models/coursemodel"
import authMiddleware from "../../middleware/authMiddleware"

const router = Router()

router.get("/courses/instructor/:id/", authMiddleware, async (req: any, res: any) => {
    try {
        let { role } = req.user
        let { id } = req.params

        // Only give access to Addmin
        if (role != "Admin")
            return res.status(404).json({ Message: "Access Denined" })

        // Find course by instructorId 
        const courses = await Courses.findAll(
            {
                where: { instructorId: id },
                attributes: ["instructorId", "title", "description", "id"]
            }
        )

        // .foundAll() return an array. if it does not find, it return an empty array
        if (courses.length === 0)
            return res.status(404).json({ Message: "Instructor can't be found" })

        // return the course by instructor Id 
        return res.status(202).json({ Message: "Here is the courses", courses: courses })

    } catch (error) {
        console.error("Error finding courses", error);
        return res.status(500).json({ Message: " Internal server error" })

    }
})

export default router