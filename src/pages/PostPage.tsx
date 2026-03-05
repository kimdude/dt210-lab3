import { useParams } from "react-router-dom"
import useGet from "../hooks/useGet";
import type { Post } from "../intefaces/PostInterfaces";

export const PostPage = () => {
    const { _id } = useParams<{_id: string}>();

    const { data, loading, error } = useGet<Post[]>("https://dt210g-lab3-api.onrender.com/blog/" + _id);

    return (
        <div>
            <section>
                {loading && <p className="loading">Laddar...</p>}
                {error && <p>{ error }</p>}
                
                {data.map((post) => (
                    <div key={post._id}>
                        <h1>{post.title}</h1>
                        <p>{post.text}</p>
                        <p>Senast uppdaterad {post.updatedAt.substring(0, post.createdAt.length -14)}</p>
                    </div>
                ))}
            </section>
        </div>
    )
}
