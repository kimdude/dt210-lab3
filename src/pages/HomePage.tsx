import useGet from "../hooks/useGet"
import type { Post } from "../intefaces/PostInterfaces";
import { PostItem } from "../components/PostItem";

export const HomePage = () => {

  const { data, error, loading, fetchData } = useGet<Post[]>("https://dt210g-lab3-api.onrender.com/blog?limit=5");

  return (
    <>
      <section>
        <h2>Ditt flöde</h2>
        <div>
          {data.map((post) => (
            <PostItem post={ post } key={ post._id } />
          ))}
        </div>
      
      </section>
    </>
  )
}
