import { NavLink } from 'react-router-dom'

function MainNavigation() {
  const links = [
    { path: '/', label: 'Home' },
    { path: '/movies', label: 'Movies' },
    { path: '/shows', label: 'Shows' },
  ]

  return (
    <nav>
      <ul className="flex gap-4">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) => (isActive ? 'underline' : undefined)}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default MainNavigation
