import * as React from "react";
import {useSession} from "next-auth/react";
import Link from 'next/link'
import {useRouter} from "next/router";
import Header from "./Header";
import NavBar from "./NavBar";

export default function Wrapper(props)

{
    const session = useSession();
    // console.log('session',session.data?.user?.username)
    const router = useRouter();

    if ((session !== null && session?.status === "authenticated") ||
        (router.pathname === "/" || router.pathname === '/register'))
    {
        return (
            <>
            <Header/>
                {props.children}
                <NavBar/>
            </>
        )
    }
    else {
        return (
            <>
                <h1>You are not authenticated</h1>

                <Link href='/'>Back to Login</Link>
            </>
        )
    }

}