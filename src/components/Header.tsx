import { NavLink } from "react-router-dom"

export const Header = () => {
  return (
    <header>
        <nav>
            <ul>
                <li><NavLink to="/">Hem</NavLink></li>
            </ul>
        </nav>
    </header>
  )
}
