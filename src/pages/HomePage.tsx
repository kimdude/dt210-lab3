import useGet from "../hooks/useGet"
import { useState } from "react";

import type { Post } from "../intefaces/PostInterfaces";
import { PostItem } from "../components/PostItem";

export const HomePage = () => {

  //State
  const [pageLimit, setPageLimit] = useState<number>(3);

  //Hook
  const { data, error, loading, fetchData } = useGet<Post[]>("https://dt210g-lab3-api.onrender.com/blog?limit=" + pageLimit);

  //Function to load 5 more posts each time
  const loadMore = () => {
    const newLimit = pageLimit + 3;
    setPageLimit(newLimit);
  }

  return (
    <>
      {/* Section with latest articles */}
      <section>
        <h2>Senaste inläggen</h2>

        <div>
          {loading && <p className="loading">Laddar...</p>}
          {error && <p>{ error }</p>}
          
          {/* Post articles */}
          {data.map((post) => (
            <PostItem post={ post } key={ post._id } displayOptions={false} updateList={fetchData} />
          ))}

          {/* Load more button */}
          <button className="btn" onClick={loadMore} style={{ display: "block", margin: "20px auto"}}>Ladda fler</button>
        </div>
      </section>
    </>
  )
}
