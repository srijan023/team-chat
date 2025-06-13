import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { SignInFlow } from "../types";

interface SignUpProps {
    setState: (state: SignInFlow) => void
}

export default function SignUpCard({ setState }: SignUpProps) {
    return (<Card className="border relative border-gray-800 bg-primary-background  text-white h-full w-full p-8">
        <CardHeader className="px-0 pt-0">
            <CardTitle className="text-center text-2xl">
                Sign Up An Account
            </CardTitle>
        </CardHeader>
        <CardDescription className="text-primary-text text-center">Create account to communicate with your team</CardDescription>
        <CardContent className="px-0 pb-0">
            <form className="space-y-3">
                <Input
                    className="border border-gray-600"
                    disabled={false}
                    value=""
                    placeholder="Full Name"
                    type="text"
                    required
                    onChange={() => { }} />

                <Input
                    className="border border-gray-600"
                    disabled={false}
                    value=""
                    placeholder="Email"
                    type="email"
                    required
                    onChange={() => { }} />

                <Input
                    className="border border-gray-600"
                    disabled={false}
                    value=""
                    placeholder="Password"
                    type="password"
                    required
                    onChange={() => { }} />

                <Input
                    className="border border-gray-600"
                    disabled={false}
                    value=""
                    placeholder="Confirm Password"
                    type="password"
                    required
                    onChange={() => { }} />

                <Button className="bg-accent-first text-white hover:bg-accent-first/80 cursor-pointer w-full" size={"lg"} disabled={false} type="submit">Continue</Button>

                <Separator className="border border-gray-700" />
                <div className="flex flex-col gap-y-2.5">
                    <Button disabled={false} onClick={() => { }} variant={"outline"} size="lg" className="bg-primary-background hover:border-accent-first hover:border hover:bg-primary-background hover:text-secondary-text text-secondary-text cursor-pointer border-gray-500">
                        <FaGoogle className="size-5" />
                        Continue with Google
                    </Button>

                    <Button disabled={false} onClick={() => { }} variant={"outline"} size="lg" className="bg-primary-background hover:border-accent-first hover:border hover:bg-primary-background hover:text-secondary-text text-secondary-text cursor-pointer border-gray-500">
                        <FaGithub className="size-5" />
                        Continue with Github
                    </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center cursor-pointer" onClick={() => { setState("signIn") }}>
                    Already have an account? <span className="text-accent-first hover:underline">Sign In</span>
                </p>
            </form>
        </CardContent>
    </Card>
    )
}
