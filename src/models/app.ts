export interface IApp {
    status: Status,
    message?: string,
}

export enum Status {
    Idle = 'IDLE',
    Loading = 'LOADING',
}