import useGet from "../hooks/useGet"
import type { Post } from "../intefaces/PostInterfaces";
import { PostItem } from "../components/PostItem";

export const HomePage = () => {

  const { data, error, loading } = useGet<Post[]>("https://dt210g-lab3-api.onrender.com/blog?limit=3");
  console.log(data)

  return (
    <>
      <section>
        <h2>Senaste inlägg</h2>

        <div>
          {loading && <p className="loading">Laddar...</p>}
          {error && <p>{ error }</p>}
          
          {data.map((post) => (
            <PostItem post={ post } key={ post._id } />
          ))}
        </div>
      </section>
    </>
  )
}
