import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import style from "./dashboard.module.css";
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession(authOptions);
  if(!session){
    redirect('/api/auth/signin')
  }
  return (
    <div>
      <div className={style.dashboardSection}>
        <h2>Session stored in server:</h2>
        {JSON.stringify(session)}
      </div>
    </div>
  );
};

export default page;
