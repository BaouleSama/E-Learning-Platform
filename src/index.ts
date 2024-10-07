import express from "express";
import sequelize from "./config/database";
import dotenv from "dotenv";

import createUSer from "./router/createUser"

// import the User Model
import User from "./models/usermodel";

dotenv.config();

// gett he port for the server 
const port = process.env.PORT
const app = express()
app.use(express.json());

app.use("/", createUSer)


//  connection to database 
sequelize.sync()
    .then(() => {
        console.log("\nDatabase synced successfully \n");
        // create the table. force if it's aleardy created 
        return User.sync({ force: true });
    })
    .then(() => {
        console.log("\nUser table created successfully \n");
        // start the server 
        app.listen(port, () => {
            console.log(`Server up and running http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('Unable to sync database:', err);
        console.error(err.stack);
    });