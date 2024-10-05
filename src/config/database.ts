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

// export sequelize 
export default sequelize;
