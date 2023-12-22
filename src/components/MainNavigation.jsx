import { NavLink } from 'react-router-dom'
import { Icon } from '@iconify/react'

function MainNavigation() {
  const links = [
    { path: '/', iconName: 'bx:home-alt-2' },
    { path: '/movies', iconName: 'mdi:movie-open-outline' },
    { path: '/shows', iconName: 'bx:tv' },
  ]

  return (
    <nav className="border-t-2 border-slate-50/20 lg:order-first lg:border-r-2 lg:border-t-0">
      <ul className="flex h-20 items-center justify-center gap-8 lg:my-8 lg:w-24 lg:flex-col lg:items-center lg:justify-start lg:h-screen-safe">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `${
                  isActive ? 'text-sky-400' : 'text-slate-100'
                } inline-block p-4 text-4xl`
              }
            >
              <Icon icon={link.iconName} />
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default MainNavigation
