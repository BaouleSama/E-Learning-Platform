import express from "express";
import sequelize from "./config/database";
import dotenv from "dotenv";

import createUSer from "./router/createUser"
import getAllUsers from "./router/getAllUser"
import login from "./router/login"
import getUserById from "./router/getUserById"
import createCourses from "./router/createCourses"

// import the User Model
import User from "./models/usermodel";
// import the Courses Model
import Courses from "./models/coursemodel";


User.hasMany(Courses, { foreignKey: "instructorId", as: "Courses" })
Courses.belongsTo(User, { foreignKey: "instructorId", as: "Instructor" })

dotenv.config();

// gett he port for the server 
const port = process.env.PORT
const app = express()
app.use(express.json());

app.use("/", createUSer)
app.use("/", login)
app.use("/", getAllUsers)
app.use("/", getUserById)
app.use("/api/", createCourses)


//  connection to database 
sequelize.sync({ alter: true })
    .then(() => {
        console.log("\nDatabase synced successfully \n");
        // create the table. force if it's aleardy created 
        app.listen(port, () => {
            console.log(`Server up and running http://localhost:${port}`);
        });
    }) 
    .catch((err) => {
        console.error('Unable to sync database:', err);
        console.error(err.stack);
    });