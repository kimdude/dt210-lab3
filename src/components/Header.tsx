import "./Header.css"

import { NavLink, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export const Header = () => {

  const { user, logout } = useAuth();

  return (
    <header>
      {/* Main nav */}
      <h1><Link to="/">Bloggen</Link></h1>

      {/* Main nav */}
      <nav>
        {
          user ?
          //Admin nav
          
          <ul>
              <li><NavLink to="/">Hem</NavLink></li>
              <li><NavLink to="/profile">Din profil</NavLink></li>
              <li><button onClick={logout} className="btn">Logga ut</button></li>
          </ul>
          :  

          //Guest nav
          <ul>              
              <li><NavLink to="/login">Logga in</NavLink></li>
          </ul>
        }
      </nav>
    </header>
  )
}
