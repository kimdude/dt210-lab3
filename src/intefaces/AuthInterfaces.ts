export interface UserInterface {
    _id: string,
    username: string
}

export interface LoginCredentialsInterface {
    username: string,
    password: string
}

export interface AuthResponseInterface {
    user: UserInterface,
    token: string
}

export interface AuthContextInterface {
    user: UserInterface | null,
    login: (credentials: LoginCredentialsInterface) => Promise<void>;
    logout: () => void;
}