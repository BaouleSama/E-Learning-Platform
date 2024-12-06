import express from "express";
import { testConnection, syncDatabase } from "./config/database";
import dotenv from "dotenv";

import register from "./router/auth/register"
import getAllUsers from "./router/users/getAllUser"
import login from "./router/auth/login"
import getUserById from "./router/users/getUserById"
import createCourses from "./router/courses/createCourses"
import updatecourses from "./router/courses/updatecourses"
import getAllCourses from "./router/courses/getAllCourses"
import getCourseByInstructorId from "./router/courses/getCourseByInstructorId"
// import the User Model
import User from "./models/usermodel";
// import the Courses Model
import Courses from "./models/coursemodel";
dotenv.config();

// gett he port for the server 
const port = process.env.PORT
const app = express()
app.use(express.json());

app.use("/api", register)
app.use("/api", login)
app.use("/api", getAllUsers)
app.use("/api", getUserById)
app.use("/api/", createCourses)
app.use("/api", updatecourses)
app.use("/api/", getAllCourses)
app.use("/api/", getCourseByInstructorId)



User.hasMany(Courses, { foreignKey: "instructorId", as: "Courses" })
Courses.belongsTo(User, { foreignKey: "instructorId", as: "Instructor" })

//  connection to database 
async function startServer() {

    await testConnection();
    await syncDatabase();

    app.listen(port, () => {
        console.log(`Server up and running http://localhost:${port}`);
    });
}

startServer()
