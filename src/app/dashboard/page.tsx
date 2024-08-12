import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

const page = async () => {
    const session = await getServerSession(authOptions)
    console.log('CARALHO: ' + session)
    return (
        <div>{`Bem vindo, ${session?.user.name}`}</div>
    )
}

export default page