
const jwt = require("jsonwebtoken")

function authMiddleware(req: any, res: any, next: any) {

    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: "Authorization token not found" })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY as String)
        req.user = decoded
        next()
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Token expired" });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        return res.status(401).json({ success: false, message: "Authentication failed" });
    }

}
export default authMiddleware

