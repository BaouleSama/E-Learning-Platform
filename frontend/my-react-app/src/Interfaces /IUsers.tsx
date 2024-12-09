
export enum Role {
    Admin = "Admin",
    User = "User",
    Guest = "Guest",
    Instructor = "Instructor"
}

export interface IUsers {
    username: string
    password: string
    role: Role.Guest
}