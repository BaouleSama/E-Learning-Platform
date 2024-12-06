// import Sequelize
const { Sequelize } = require('sequelize');



// initialize dotenv
require("dotenv").config()

// get all variabel from .env 
const db_name = process.env.DATABASE_NAME
const db_username = process.env.DATABASE_USERNAME
const db_password = process.env.DATABASE_PASSWORD
const db_host = process.env.HOST


// connect to database 
const sequelize = new Sequelize(db_name, db_username, db_password, {
    host: db_host,
    dialect: "mysql"

})



// Test the connection
export const testConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log("Connection has been established successfully\n");

    } catch (error) {
        console.error("Unable to connect to the database", error);
        process.exit(1)
    }

}

// Sync models with the database
export const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true })
        console.log("\nDatabase synchronized successfully");

    } catch (error) {
        console.error("Error synchronizing the database", error);
    }

}
export default sequelize

