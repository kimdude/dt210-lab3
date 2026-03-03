
import type { Post } from '../intefaces/PostInterfaces'

export const PostItem = ({post}: {post: Post}) => {
  return (
    <div>
        <p>{ post.result.username }</p>
        <h3>{ post.title }</h3>
        <p>{ post.text }</p>
        <small>{ post.createdAt }</small>
    </div>
  )
}
