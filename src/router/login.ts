import { Router } from "express"
import bcrypt from 'bcrypt';
import User from '../models/usermodel';

const router = Router()

// need jwt for token 
const jwt = require("jsonwebtoken")

// import secret key from env file
const secretKey = process.env.SECRET_KEY

router.post("/api/login/user", async (req: any, res: any) => {
    try {
        // get the username and passowrd input by user
        let { username, password } = req.body

        // make sure username and password are input
        if (!username || !password) {
            return res.status(404).json({ message: "username and password are required" })
        }

        // Using sequelize, look for username 
        const user = await User.findOne({
            where: { username: username },
            attributes: ["id", "username", "password", "role"]
        })

        // if we can't find user, throw error
        if (!user)
            return res.status(404).json({ message: "username or password incorrect" })

        // compare password with the one hash
        const matchPassword = await bcrypt.compare(password, user.password)

        // throw error if it does not match
        if (!matchPassword)
            return res.status(404).json({ message: "username or password incorrect" })

        // create a token for user after sign in 
        const accessToken = jwt.sign({ userId: user.id, role: user.role }, secretKey)

        // return user and token 
        return res.status(201).json({ message: "Welcome Back", user: user, token: accessToken })

    } catch (error) {
        console.error('Error finding user:', error);

        return res.status(500).json({ message: "Internal server error" });
    }

})

export default router;