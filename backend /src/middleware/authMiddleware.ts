
const jwt = require("jsonwebtoken")

function authMiddleware(req: any, res: any, next: any) {

    // check if authorization header is present 
    const authHeader = req.headers["authorization"]

    // split the header and get the token 
    const token = authHeader && authHeader.split(" ")[1]

    // verify that the token is present or not null
    if (!token) {
        return res.status(401).json({ message: "Authorization token not found" })
    }

    try {

        // verify if the token is valid by decoding using the secret key
        // if the token is valid, the payload is extratcted (data about user)
        const decoded = jwt.verify(token, process.env.SECRET_KEY as String)

        // the payload is then attached to the user
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

