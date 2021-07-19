export interface IUser {
    id: string,
    email: string,
    name: string,
    isAuth?: boolean,
    totalGames: number,
    pointsScored: number,
};

export interface INewUser extends IUser {
    password: string,
    confirmPassword: string,
};
