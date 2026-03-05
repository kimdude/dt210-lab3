import { PostForm } from '../components/PostForm'
import type { Post } from '../intefaces/PostInterfaces';
import { PostItem } from '../components/PostItem';
import useGet from '../hooks/useGet';
import { useState } from 'react';

export const ProfilePage = () => {

  const [pageLimit, setPageLimit] = useState<number>(5);

  const { data, error, loading, fetchData } = useGet<Post[]>("https://dt210g-lab3-api.onrender.com/blog?limit=" + pageLimit);

  const loadMore = () => {
    const newLimit = pageLimit + 5;
    setPageLimit(newLimit);
  }

  return (
    <div style={{ paddingBottom: "180px" }}>
      <section>
        <h2>Alla dina inlägg</h2>
        <div>
          {loading && <p className="loading" >Laddar...</p>}
          {error && <p>{ error }</p>}
          
          {data.map((post) => (
            <PostItem post={ post } key={ post._id } displayOptions={true} updateList={fetchData} />
          ))}

          <button className="btn" onClick={loadMore} style={{ display: "block", margin: "20px auto"}}>Ladda fler</button>
        </div>
      </section>
      <section style={{ position: "fixed", bottom: "0", right: "0", left: "0", backgroundColor: "rgb(255, 234, 117)", padding: "20px 0px", boxShadow: "4px 0px 10px rgba(19, 19, 19, 0.2)"}}>
        <h2>Skapa nytt inlägg</h2>
        <PostForm updateList={fetchData} />
      </section>
    </div>
  )
}
