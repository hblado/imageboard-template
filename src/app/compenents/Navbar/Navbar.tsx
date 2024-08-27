import Link from 'next/link'
import style from './Navbar.module.css'
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import SignOutButton from '@/app/compenents/SignOut/signout'
import { HomeOutlined } from '@ant-design/icons'

export default async function Navbar() {
    const session = await getServerSession(authOptions)
    return (
        <nav className={style.navbarContainer}>
            <Link className={style.homeIcon} href="/"><HomeOutlined className={style.antHome} />
            </Link>
            {
                !session?.user &&
                <div className={style.navbar}> 
                    <div></div> 
                    <Link className={style.navbarButton} href="/auth/signup" >Sign Up</Link>
                    <Link className={style.navbarButton} href="/api/auth/signin" >Login</Link>
                </div>
                ||
                <div className={style.navbar}>
                    <div></div>
                    <SignOutButton/>
                </div>
            }
        </nav>
    )
}