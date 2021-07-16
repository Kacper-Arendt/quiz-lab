import { AppStatus } from "./Enums";

export interface IApp {
    status: AppStatus,
    message?: string,
    isMenuOpen?: boolean,
}