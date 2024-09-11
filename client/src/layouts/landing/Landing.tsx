// styles
import './landing.scss'

// assets
import brandingLogo from '../../assets/logos/SportSee.webp'

// types
import {
  FormEvent,
  ReactElement,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from 'react'
import { NavigateFunction } from 'react-router-dom'

// hooks
import { useRef, useState } from 'react'

// hooks
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// context
import { UserContext } from '../../context/UserContext'

export default function Landing(): ReactElement {
  const { getUser } = useContext(UserContext)
  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)
  const navigate: NavigateFunction = useNavigate()
  const [errorMessage, setErrorMessage]: [
    string,
    Dispatch<SetStateAction<string>>,
  ] = useState<string>('')

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault()
    setErrorMessage('')

    if (inputRef.current === null) return
    const userID: string = inputRef.current.value
    inputRef.current.value = ''

    getUser(userID)
      .then(() =>
        navigate(`/home/${userID}`, {
          replace: true,
        }),
      )
      .catch((err) => {
        console.error(`user data's failed to be  fetched :  ${err}`)
        setErrorMessage('User not found')
      })
  }

  return (
    <main className={'landing'}>
      <form onSubmit={handleSubmit}>
        <div className={'formHeader'}>
          <figure>
            <img src={brandingLogo} alt={'brandingLogo'} />
          </figure>
          <h1>Sign-in</h1>
        </div>
        <div>
          <label htmlFor={'userID'}>User ID</label>
          <input id={'userID'} type={'text'} ref={inputRef} />
          {errorMessage && <p className={'error'}>{errorMessage}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}
