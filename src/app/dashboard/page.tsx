import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import SignOutButton from '@/app/compenents/SignOut/signout'
    
const page = async () => {
    const session = await getServerSession(authOptions)
    return (
        <div>
            <div>{`Bem vindo, ${session?.user.name}`}</div>
        </div> 
    )
}

export default page