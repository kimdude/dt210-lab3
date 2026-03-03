export interface PostFormInterface {
    title: string,
    text: string
}

export interface Post {
    _id: string,
    title: string,
    text: string,
    user_id: string,
    username: string,
    createdAt: string,
    result: {
        _id: string,
        username: string
    }
}

export interface ErrorInterface {
    title?: string,
    text?: string,
    serverErr?: string
}