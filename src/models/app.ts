import { AppStatus } from "./Models";

export interface IApp {
    status: AppStatus,
    message?: string,
    isMenuOpen?: boolean,
}