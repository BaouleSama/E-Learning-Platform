import sequelize from "../config/database";
import User from "./usermodel";
import { ICourses } from "../interfaces/CourseInterface";

const { DataTypes, Model } = require("sequelize")


class Courses extends Model<ICourses> {
    declare id: number;
    declare title: string
    declare instructorId: number
    declare description: string
    declare createAt: Date;
    declare updateAt: Date
}

Courses.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },

    instructorId: {
        type: DataTypes.INTEGER,
        reference: {
            model: User,
            key: 'id'
        },
        allowNull: false
    }

}, {
    sequelize,
    modelName: "Courses",
    timestamps: true
})


export default Courses;