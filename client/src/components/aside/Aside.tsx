// styles
import './aside.scss'

// types
import { ReactElement } from 'react'

//hooks
import { Link } from 'react-router-dom'

// icons
import icn1 from '../../assets/icons/aside_icn1.webp'
import icn2 from '../../assets/icons/aside_icn2.webp'
import icn3 from '../../assets/icons/aside_icn3.webp'
import icn4 from '../../assets/icons/aside_icn4.webp'

export default function Aside(): ReactElement {
  const links: { url: string; icn: string }[] = [
    { url: '#', icn: icn1 },
    { url: '#', icn: icn2 },
    { url: '#', icn: icn3 },
    { url: '#', icn: icn4 },
  ]
  return (
    <aside>
      <ul>
        {links.map(
          (link: { url: string; icn: string }, index: number): ReactElement => {
            return (
              <li key={index}>
                <Link to={link.url}>
                  <figure>
                    <img src={link.icn} alt={'lien'} />
                  </figure>
                </Link>
              </li>
            )
          },
        )}
      </ul>
      <p>Copyright, SportSee 2020</p>
    </aside>
  )
}
