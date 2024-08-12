import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="inline-flex flex-col">
        <Link href="/auth/signup" >Sign Up</Link>
        <Link href="/api/auth/signin" >Login</Link>
      </div>
    </main>
  );
}
