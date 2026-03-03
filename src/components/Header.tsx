import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export const Header = () => {

  const { user, logout } = useAuth();

  return (
    <header>
        <h1>Bloggen</h1>
        <nav>
            <ul>
                <li><NavLink to="/">Hem</NavLink></li>
                <li><NavLink to="/profile">Din profil</NavLink></li>
                <li>
                  {
                    !user ? <NavLink to="/login">Logga in</NavLink> : <button onClick={logout}>Logga ut</button>
                  }
                </li>
            </ul>
        </nav>
    </header>
  )
}
