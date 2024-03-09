// styles
import './landing.scss'

// types
import {ChangeEvent, FormEvent, ReactElement, Dispatch, SetStateAction} from 'react'

// hooks
import { useState } from 'react'

// hooks
import { useEffect, useContext } from 'react'

// context
import { UserContext } from '../../context/UserContext'

export default function Landing(): ReactElement {
    const getCurrentHour = (): string => {
        const date: Date = new Date()
        return `${date.getHours()}:${date.getMinutes()}`
    }

    const { getUser } = useContext(UserContext)


    useEffect((): void => {
        getUser(userID)
            .then(() =>
                console.log(
                    `user data's successfully fetched at : ${getCurrentHour()}`,
                ),
            )
            .catch((err) =>
                console.error(
                    `user data's failed to be  fetched at : ${getCurrentHour()} - ${err}`,
                ),
            )
    }, [])


    const [userID, setUserID]: [string, Dispatch<SetStateAction<string>>] = useState('');

    const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setUserID(event.target.value);
    };


    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
        console.log('User ID:', userID);
    };

    return (
        <main className={'landing'}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor={'userID'}>userID</label>
                    <input
                        id={'userID'}
                        type={'text'}
                        value={userID}
                        onChange={handleFirstNameChange}
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </main>
    )
}
