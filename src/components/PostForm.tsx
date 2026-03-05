import { useState } from "react"
import usePost from "../hooks/usePost";
import type { PostFormInterface, ErrorInterface } from "../intefaces/PostInterfaces"

export const PostForm = ({ updateList }: { updateList: () => void }) => {
    
    const [errors, setErrors] = useState<ErrorInterface>({});
    const [formData, setFormData] = useState<PostFormInterface>({ title: "", text: "" });
    const [displayTextInp, setDisplayTextInp] = useState<boolean>(false);

    const { postData, loading, error, data } = usePost<PostFormInterface>("https://dt210g-lab3-api.onrender.com/blog");

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

    const submitForm = async (event: any) => {
        event.preventDefault();

        const validationErrors = validateText();

        if(Object.keys(validationErrors).length > 0) {
            return setErrors(validationErrors);
        }

        setErrors({});
        await postData(formData);
        updateList();
        
        setFormData({ title: "", text: "" });
        setDisplayTextInp(false);
    };

    return (
        <div >
            <form onSubmit={submitForm} style={{ width: "80%", maxWidth: "1200px", display: "block", margin: "20px auto" }}>
                <div id="titleContainer" style={{ display: "flex", alignItems: "center" }}>
                    <label htmlFor="title"></label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={(event) => setFormData({...formData, title: event.target.value})} placeholder="Titel" />
                    <button onClick={validateTitle} style={{display: !displayTextInp ? "block" : "none"}} className="btn">Nästa</button>
                </div>
                {errors.title && <span className="error">{errors.title}</span>}

                <div id="textContainer" style={{display: displayTextInp ? "flex" : "none", alignItems: "center"}}>
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
