import { NavLink } from "react-router-dom"

export const Header = () => {
  return (
    <header>
        <h1>Bloggen</h1>
        <nav>
            <ul>
                <li><NavLink to="/">Hem</NavLink></li>
                <li><NavLink to="/login">Logga in</NavLink></li>
                <li><NavLink to="/profile">Din profil</NavLink></li>
            </ul>
        </nav>
    </header>
  )
}
