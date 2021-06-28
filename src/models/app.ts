export interface IApp {
    status: Status,
    message?: string,
}

export enum Status {
    Idle = 'IDLE',
    Fetching = 'FETCHING',
}