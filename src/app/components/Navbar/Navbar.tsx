import Link from 'next/link'
import style from './Navbar.module.css'
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import SignOutButton from '@/app/components/SignOut/signout'
import { HomeOutlined } from '@ant-design/icons'

export default async function Navbar() {
    const session = await getServerSession(authOptions)
    return (
        <nav className={style.navbarContainer}>
            <div className={style.boards}>
                <Link href="/" className={style.boardLink}>
                    /mod/
                </Link>
                <Link href="/" className={style.boardLink}>
                    /b/
                </Link>
                <Link href="/" className={style.boardLink}>
                    /cc/
                </Link>
            </div>
            {
                /* !session?.user &&
                <div className={style.navbar}> 
                    <div></div> 
                    <Link className={style.navbarButton} href="/auth/signup" >Sign Up</Link>
                    <Link className={style.navbarButton} href="/api/auth/signin" >Login</Link>
                </div>
                || */
                session?.user &&
                <div className={style.navbar}>
                    <div></div>
                    <SignOutButton/>
                </div>
            }
        </nav>
    )
}