import { Router } from "express"
import User from "../models/usermodel"
import authMiddleware from "../middleware/authMiddleware"


const express = require("express")

const router = Router()

router.get("/users", authMiddleware, async (req: any, res: any) => {
    let { userId, role } = req.user

    if (role != "Admin")
        return res.status(403).json({ message: " Access denied: Admin role required" })

    const users = await User.findAll()
    res.status(201).json({ users: users })
})

export default router