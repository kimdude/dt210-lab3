import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, user } = useAuth();
  const navigate = useNavigate();

  //Checking if user exists
  useEffect(() => {
    if(user) {
      navigate("/profile");
    }

  }, [user]);

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
    <div>
      <section>
          <form onSubmit={submit}>
            <label htmlFor="username">Användarnamn: </label>
            <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />

            <label htmlFor="password">Användarnamn: </label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <input type="submit" value="Logga in" />
            {error && <span className="error">{error}</span>}
          </form>
      </section>
    </div>
  )
}
