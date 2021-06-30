export interface IUser {
    id: string,
    email: string,
    name: string,
}

export interface INewUser extends IUser {
    password: string
}