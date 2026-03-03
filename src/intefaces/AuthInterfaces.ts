export interface UserInterface {
    _id: string,
    username: string
}

export interface LoginCredentialsInterface {
    username: string,
    password: string
}

export interface AuthResponseInterface {
    user_id: string,
    username: string
    token: string
}

export interface AuthContextInterface {
    user: UserInterface | null,
    login: (credentials: LoginCredentialsInterface) => Promise<void>;
    logout: () => void;
}