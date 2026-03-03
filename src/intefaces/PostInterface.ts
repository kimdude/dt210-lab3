export default interface Post {
    _id: string,
    title: string,
    text: string,
    user_id: string,
    username: string,
    createdAt: string,
    result: {
        username: string
    }
}