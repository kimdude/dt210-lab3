import "./PostForm.css"

import { useState } from "react"
import usePost from "../hooks/usePost";
import type { PostFormInterface, ErrorInterface } from "../intefaces/PostInterfaces"

export const PostForm = ({ updateList }: { updateList: () => void }) => {
    
    //States
    const [errors, setErrors] = useState<ErrorInterface>({});
    const [formData, setFormData] = useState<PostFormInterface>({ title: "", text: "" });
    const [displayTextInp, setDisplayTextInp] = useState<boolean>(false);

    const { postData, loading, error, data } = usePost<PostFormInterface>("https://dt210g-lab3-api.onrender.com/blog");

    //Validating title
    const validateTitle = (event: any) => {
        event.preventDefault();

        //Storing possible errors
        const validationErrors: ErrorInterface = {};
        const title = formData.title;

        if(!title) {
            validationErrors.title = "Ange en titel.";
        }

        if(title.length > 30) {
            validationErrors.title = "Titeln måste vara under 30 tecken.";
        }

        if(Object.keys(validationErrors).length > 0) {
            return setErrors(validationErrors);
        }

        setErrors({}); //Resetting errors
        setDisplayTextInp(true);
    }

    //Validating text
    const validateText = () => {

        const validationErrors: ErrorInterface = {};
        const text = formData.text;

        if(!text) {
            validationErrors.text = "Lägg till innehållstext.";
        }

        if(text.length < 10) {
            validationErrors.text = "Innehållstexten måste vara över 10 tecken.";
        }

        return validationErrors; 
    }

    //Submitting form
    const submitForm = async (event: any) => {
        event.preventDefault();

        //Validating
        const validationErrors = validateText();

        if(Object.keys(validationErrors).length > 0) {
            return setErrors(validationErrors);
        }

        //Resetting errors
        setErrors({});

        //Posting and updating list
        await postData(formData); 
        updateList();
        
        //Resetting form
        setFormData({ title: "", text: "" });
        setDisplayTextInp(false);
    };

    return (
        <div >
            <form onSubmit={submitForm}>

                {/* Title input */}
                <div id="titleContainer">
                    <label htmlFor="title"></label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={(event) => setFormData({...formData, title: event.target.value})} placeholder="Titel" />
                    <button onClick={validateTitle} style={{display: !displayTextInp ? "block" : "none"}} className="btn">Nästa</button>
                </div>
                {errors.title && <span className="error">{errors.title}</span>}

                {/* Text input */}
                <div id="textContainer" style={{display: displayTextInp ? "flex" : "none"}}>
                    <label htmlFor="text"></label>
                    <textarea name="text" id="text" value={formData.text} onChange={(event) => setFormData({...formData, text: event.target.value})} placeholder="Innehåll"></textarea>
                    <input type="submit" value="Dela" className="btn" />
                </div>
                {errors.text && <span className="error">{errors.text}</span>}
                {errors.serverErr && <span className="error">{errors.serverErr}</span>}
            </form>
        </div>
    );
}
