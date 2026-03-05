import type { Post } from '../intefaces/PostInterfaces'
import { useNavigate } from 'react-router-dom';

export const PostItem = ({post}: {post: Post}) => {
  const navigate = useNavigate();
  const formattedDate: string = post.createdAt.substring(0, post.createdAt.length -14);
  
  const toPost = () => {
    navigate("/post/" + post._id)
  }

  return (
    <div style={{ backgroundColor: "rgb(230, 209, 233)", boxShadow: "0px 2px 10px rgba(150, 150, 150, 0.4)"}} onClick={ toPost}>
      <article style={{ width: "80%", maxWidth: "1200px", display: "block", margin: "20px auto", padding: "2vw" }}>
        <h3>{ post.title }</h3>
        <p>{ post.text.substring(0,30) }</p>
        <small>Publicerad { formattedDate }</small>
      </article>
    </div>
  )
}
