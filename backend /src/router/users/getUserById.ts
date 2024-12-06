import { Router } from "express"
import User from "../../models/usermodel"

const router = Router()

router.get("/users/:id", async (req: any, res: any) => {
    let { id } = req.params
    const user = await User.findByPk(id)

    if (!user)
        return res.status(404).json({ message: "user not found" })

    return res.status(201).json({ user: user })
})

export default router