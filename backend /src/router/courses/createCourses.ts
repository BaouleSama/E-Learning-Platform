import { Router } from "express"
import Courses from "../../models/coursemodel"
import User from "../../models/usermodel"
import authMiddleware from "../../middleware/authMiddleware"

const router = Router()

router.post("/create/courses", authMiddleware, async (req: any, res: any) => {

    try {
        // get payload form token 
        let { userId, role } = req.user

        // get user input 
        let { title, description } = req.body

        // Denied access when it;s not an instructor
        if (role != "Instructor")
            return res.status(403).json({ message: "Access denied: Instructor role required" })

        // store userId if access granted 
        let id = userId

        // Make sure title and description are filed out 
        if (!title || !description)
            return res.status(403).json({ message: "All field are required" })

        // create new courses using sequelize 
        const newCourse = await Courses.create({
            title,
            // give instructorID the value of id since access is granted 
            instructorId: id,
            description
        })

        res.status(201).json({ message: " Course created successfully", courses: newCourse })

    }
    catch (error) {
        console.error("Error creating courses");
        res.status(500).json({ message: "internal server Error" })

    }

})

export default router