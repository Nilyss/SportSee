// styles
import './header.scss'

// types
import { ReactElement } from 'react'

// hooks
import { Link } from 'react-router-dom'

// logo
import logo from '../../assets/logos/SportSee.webp'

export default function Header(): ReactElement {
  return (
    <header>
      <Link to={'/login'}>
        <figure>
          <img src={logo} alt={'logo'} />
        </figure>
        </Link>
      <nav>
        <Link to={'#'}>Accueil</Link>
        <Link to={'#'}>Profil</Link>
        <Link to={'#'}>Réglage</Link>
        <Link to={'#'}>Communauté</Link>
      </nav>
    </header>
  )
}
