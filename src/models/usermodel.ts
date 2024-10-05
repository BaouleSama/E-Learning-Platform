
import sequelize from '../config/database';
import { IUsers, Role } from '../interfaces/Userinterfaces';


// import DataTypes and Model from sequelize
const { DataTypes, Model } = require("sequelize")

// Define the User model extending the Model class
class User extends Model<IUsers> {
    declare id: number;
    declare username: string
    declare password: string
    declare role: Role.User | Role.Admin | Role.Instructor | Role.Guest
}

// Initialize the User model
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    role: {
        type: DataTypes.ENUM(...Object.values(Role)),
        defaultValue: Role.User
    },

}, {
    sequelize, //  We need to pass the connection instance
    modelName: 'User',
    timestamps: true

})

export default User;