import { useState } from "react"
import type { PostFormInterface, ErrorInterface } from "../intefaces/PostInterfaces"

export const PostForm = () => {

    const [errors, setErrors] = useState<ErrorInterface>({});
    const [formData, setFormData] = useState<PostFormInterface>({ title: "", text: "" });
    const [displayTextInp, setDisplayTextInp] = useState<boolean>(false);

    const validateTitle = (event: any) => {
        event.preventDefault();

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

        setErrors({});
        setDisplayTextInp(true);
    }

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

    const submitForm = ((event: any) => {
        event.preventDefault();

        const validationErrors = validateText();

        if(Object.keys(validationErrors).length > 0) {
            return setErrors(validationErrors);
        }

        setErrors({});
    });

    return (
        <div>
            <form onSubmit={submitForm}>
                <h2>Skapa nytt inlägg</h2>
                <div id="titleContainer">
                    <label htmlFor="title"></label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={(event) => setFormData({...formData, title: event.target.value})} placeholder="Titel" />
                    {errors.title && <span className="error">{errors.title}</span>}
                    <button onClick={validateTitle} style={{display: !displayTextInp ? "block" : "none"}}>Nästa</button>
                </div>

                <div id="textContainer" style={{display: displayTextInp ? "block" : "none"}}>
                    <label htmlFor="text"></label>
                    <textarea name="text" id="text" value={formData.text} onChange={(event) => setFormData({...formData, text: event.target.value})} placeholder="Innehåll"></textarea>
                    {errors.text && <span className="error">{errors.text}</span>}
                    <input type="submit" value="Dela" />
                </div>
                {errors.serverErr && <span className="error">{errors.serverErr}</span>}
            </form>
        </div>
    );
}
