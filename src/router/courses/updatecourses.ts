import { Router } from "express"
import Courses from "../../models/coursemodel"
import authMiddleware from "../../middleware/authMiddleware"

const router = Router()

router.put("/courses/update/:id", authMiddleware, async (req: any, res: any) => {

    try {
        let { userId, role } = req.user
        let { id } = req.params
        let { title, description } = req.body

        // check if user is an instructor 
        if (role != "Instructor")
            return res.status(404).json({ message: "Access denied!" })

        // Querry in the database to find the corresponding course with the id
        //  Await is the promise that tell JS to wait for the querry to be complaeted and store the data in course 
        const course = await Courses.findByPk(id)

        // Verif that course actully has the data. if not it will return a null  
        if (course === null)
            return res.status(404).json({ Message: "Courses can't be found" })

        // Compare istructorId with userId. if it is not the same id, user can't update the course 
        if (course.instructorId != userId)
            return res.status(403).json({ message: "Access denied: You can only update your own courses" })

        // Make sure the updated imput is valid 
        if (!title && !description) {
            return res.status(400).json({ message: "At least one field (title or description) must be provided" })
        }

        // Update the the course 
        const courseUpdated = await Courses.update(
            { title: title, description: description },
            { where: { id } }
        )

        // Find the update course
        const update = await Courses.findByPk(id)

        // return the course 
        return res.status(201).json({ message: " course updated successfully", course: update })
    } catch (error) {
        console.error("Error updating course", error);
        return res.staus(500).json({ message: "Internal Server Error" })
    }
})

export default router