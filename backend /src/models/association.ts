import User from "./usermodel";
import Courses from "./coursemodel";


let user = User.hasMany(Courses, { foreignKey: "instructorId", as: "Courses" })
let course = Courses.belongsTo(User, { foreignKey: "instructorId", as: "Instructor" })