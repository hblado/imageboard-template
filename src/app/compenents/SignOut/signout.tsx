'use client'
import style from './signout.module.css'
import { signOut } from "next-auth/react"

const SignOutButton = () => {
    return(
        <button className={style.signoutButton} onClick={() => {
            signOut({
                redirect: true,
                callbackUrl: `${window.location.origin}/`
            })
        }}>
            Exit
        </button>
    )   
}

export default SignOutButton;