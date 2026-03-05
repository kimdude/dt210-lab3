import "./PostItem.css"

import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import usePut from "../hooks/usePut";
import useDelete from "../hooks/useDelete";

import type { Post } from "../intefaces/PostInterfaces";
import type { PostFormInterface } from "../intefaces/PostInterfaces";
import type { ErrorInterface } from "../intefaces/PostInterfaces";

export const PostItem = ({post, displayOptions}: {post: Post, displayOptions: boolean}) => {
  const navigate = useNavigate();

  //States
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<PostFormInterface>({title: post.title, text: post.text});
  const [errors, setErrors] = useState<ErrorInterface>({});

  const { putData, error, loading } = usePut<PostFormInterface>("https://dt210g-lab3-api.onrender.com/blog/" + post._id);
  const { deleteData } = useDelete("https://dt210g-lab3-api.onrender.com/blog/" + post._id);

  const formattedDate: string = post.createdAt.substring(0, post.createdAt.length -14);
  const options = displayOptions;
  
  //Redirecting to post page
  const toPost = () => {
    navigate("/post/" + post._id);
  }

  //Validating update form
  const validateInp = () => {
    const validationErrors: ErrorInterface = {};

    if(!formData.title) {
        validationErrors.title = "Ange en titel.";
    }

    if(formData.title.length > 30) {
        validationErrors.title = "Titeln måste vara under 30 tecken.";
    }

    if(formData.text.length < 10) {
        validationErrors.text = "Innehållstexten måste vara över 10 tecken.";
    }

    return validationErrors;
  }

  //Update post
  const updatePost = async(e: any) => {
    e.preventDefault();

    const validationErrors = validateInp();

    if(Object.keys(validationErrors).length > 0) {
      return setErrors(validationErrors);
    }
    
    putData(formData);
    setErrors({});
    setDisplayForm(false)
  }

  //Deleting post
  const deletePost = async() => {
    deleteData();
  }

  return (
    <div className="PostItemArticleContainer">
      <article>
        <div className="PostItemArticleContent">
          {
            //Post content
            !displayForm &&
            <div onClick={ toPost}>
              <h3>{ post.title }</h3>
              <p>{ post.text.substring(0,30) }</p>
              <small>Publicerad { formattedDate }</small>
            </div>
          }

          {
            //Form to update
            displayForm &&
            <form>
              <label htmlFor="title"></label>
              <input type="text" name="title" id="title" placeholder="Titel" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              {errors.title && <span className="error">{errors.title}</span>}

              <label htmlFor="text"></label>
              <textarea name="text" id="text" placeholder="Innehåll" value={formData.text} onChange={(e) => setFormData({...formData, text: e.target.value})}/>
              {errors.text && <span className="error">{errors.text}</span>}

              <input type="submit" onClick={updatePost} className="btn" />
              {errors.serverErr && <span className="error">{errors.serverErr}</span>}
              {loading && <p className="loading">Lägger till...</p>}
            </form>
          }
        </div>
        {
          //Buttons with edit-options
          options && !displayForm &&
          <div>
            <p className="PostItemEditBtn" onClick={() => setDisplayForm(true)}>Redigera</p>
            <p className="PostItemEditBtn" onClick={deletePost}>Ta bort</p>
          </div>
        }
      </article>
    </div>
  )
}
