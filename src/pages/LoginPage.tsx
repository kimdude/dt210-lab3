import { useState } from "react";

export const LoginPage = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
  }

  return (
    <div>
      <section>
          <form onSubmit={login}>
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
