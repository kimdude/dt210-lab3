import useGet from "../hooks/useGet"
import type Post from "../intefaces/PostInterface";
import { PostItem } from "../components/PostItem";

export const HomePage = () => {

  const {data, error, loading, fetchData } = useGet<Post[]>("https://dt210g-lab3-api.onrender.com/blog");

  return (
    <>
      <section>
        <h1>Ditt flöde</h1>
        <div>
          {data.map((post) => (
            <PostItem post={ post } key={ post._id } />
          ))}
        </div>
      </section>
    </>
  )
}
