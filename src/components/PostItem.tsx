import React from 'react'
import type Post from '../intefaces/PostInterface'

export const PostItem = ({post}: {post: Post}) => {
  return (
    <div>
        <p>{ post.result.username }</p>
        <h2>{ post.title }</h2>
        <p>{ post.text }</p>
        <small>{ post.createdAt }</small>
    </div>
  )
}
