import { NavLink } from 'react-router-dom'
import { Icon } from '@iconify/react'

function MainNavigation() {
  const links = [
    { path: '/', iconName: 'material-symbols:home-rounded' },
    { path: '/movies', iconName: 'material-symbols:movie' },
    { path: '/shows', iconName: 'material-symbols:tv-outline-rounded' },
  ]

  return (
    <nav className="border-t-2 border-slate-50/20 lg:order-first lg:border-r-2 lg:border-t-0">
      <ul className="flex h-20 items-center justify-center gap-8 lg:my-8 lg:w-24 lg:flex-col lg:items-center lg:justify-start lg:h-screen-safe">
        {links.map((link) => (
          <NavLink
            to={link.path}
            key={link.path}
            className={({ isActive }) => (isActive ? 'underline' : undefined)}
          >
            <li className="p-4">
              <Icon icon={link.iconName} className="text-4xl text-sky-400" />
            </li>
          </NavLink>
        ))}
      </ul>
    </nav>
  )
}

export default MainNavigation
