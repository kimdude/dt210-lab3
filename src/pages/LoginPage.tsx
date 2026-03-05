import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {

  //States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //Hooks
  const { login, user } = useAuth();
  const navigate = useNavigate();

  //Checking if user exists
  useEffect(() => {
    if(user) {
      navigate("/profile");
    }
  }, [user]);

  //Submitting credentials
  const submit = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await login({username, password});
      navigate("/profile");

    } catch(error) {
      setError("Inloggning misslyckades. Kontrollera användarnamn och lösenord.");
    }
  }

  return (
    <div style={{ display: "block", margin: "100px auto", width: "60%"}}>
      <section>

          {/* Login form */}
          <form onSubmit={submit}>

            {/* Text input */}
            <label htmlFor="username"></label>
            <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Användarnamn" style={{ width: "100%"}} /><br />

            {/* Password input */}
            <label htmlFor="password"></label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Lösenord" style={{ width: "100%"}} /><br />

            {/* Submit btn */}
            <input type="submit" value="Logga in" className="btn" />
            {error && <span className="error">{error}</span>}
          </form>
      </section>
    </div>
  )
}
