import useGet from "../hooks/useGet"
import { useState } from "react";

import type { Post } from "../intefaces/PostInterfaces";
import { PostItem } from "../components/PostItem";

export const HomePage = () => {

  //State
  const [pageLimit, setPageLimit] = useState<number>(3);
  const [message, setMessage] = useState<string | null>(null);

  //Hook
  const { data, error, loading, fetchData } = useGet<Post[]>("https://dt210g-lab3-api.onrender.com/blog?limit=" + pageLimit);

  //Function to load 5 more posts each time
  const loadMore = () => {
    const newLimit = pageLimit + 3;
    setPageLimit(newLimit);
  }

  const confirmMessage = (notification: string) => {
      
      setMessage(notification);
      setTimeout(() => {
          setMessage(null);
      }, 10000);
  }

  return (
    <>
      {/* Section with latest articles */}
      <section>
        {message && <p className="confirmationMessage">{ message }</p>}
        <h2>Senaste inläggen</h2>

        <div>
          {loading && <p className="loading">Laddar...</p>}
          {error && <p className="loading">{ error }</p>}
          
          {/* Post articles */}
          {data.map((post) => (
            <PostItem post={ post } key={ post._id } displayOptions={false} updateList={fetchData} showConfirmation={confirmMessage} />
          ))}

          {/* Load more button */}
          <button className="btn" onClick={loadMore} style={{ display: "block", margin: "20px auto"}}>Ladda fler</button>
        </div>
      </section>
    </>
  )
}
