"use client"

import { useState } from "react"
import { SignInFlow } from "../types"
import SignInCard from "./sign-in-card";
import SignUpCard from "./sign-up-card";

export default function AuthScreen() {

    const [state, setState] = useState<SignInFlow>("signIn");

    return (
        <div className="z-10 relative h-full flex items-center justify-center">
            <div className="relative md:h-auto md:w-[420px]">
                {state === 'signIn' ? <SignInCard setStateAction={setState} /> : <SignUpCard setState={setState} />}
            </div>
        </div>
    )
}
