import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { SignInFlow, SignInType } from "../types";
import CustomInputField from "@/components/custom/inputField";
import { useForm } from "@tanstack/react-form"
import { FormEvent } from "react";
import { PrimaryButton, SecondaryButton } from "@/components/custom/primaryButton";
import { signUpSchema } from "../validationSchema";

interface SignInCardProps {
    setStateAction: (state: SignInFlow) => void
}

export default function SignInCard({ setStateAction }: SignInCardProps) {

    const signInForm = useForm(
        {
            defaultValues: {
                email: "",
                password: ""
            } as SignInType,
            validators: {
                onSubmit: signUpSchema
            },
            onSubmit: (formData) => {
                console.log(formData.value)
            }
        }
    )

    const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signInForm.handleSubmit();
    }

    return (
        <Card className="bg-primary-background text-white border-gray-800 h-full w-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-center text-2xl">
                    Sign Up An Account
                </CardTitle>
            </CardHeader>
            <CardDescription className="text-primary-text text-center">Create account to communicate with your team</CardDescription>
            <CardContent className="space-y-5 px-0 pb-0">
                <form className="space-y-2.5" onSubmit={handleSignIn}>
                    <signInForm.Field name="email">
                        {
                            (field) => (
                                <CustomInputField
                                    label={"Email"}
                                    name="email"
                                    disabled={false}
                                    value={field.state.value}
                                    placeholder="johndoe@email.com"
                                    type="email"
                                    onChange={(e) => { field.setValue(e.target.value) }} />
                            )
                        }
                    </signInForm.Field>

                    <signInForm.Field name="password">
                        {(field) => (
                            <CustomInputField
                                label={"Password"}
                                name="password"
                                disabled={false}
                                value={field.state.value}
                                type="password"
                                onChange={(e) => { field.setValue(e.target.value) }} />
                        )}
                    </signInForm.Field>

                    <PrimaryButton disabled={false} size="lg" type="submit">Continue</PrimaryButton>

                    <Separator className="border border-gray-700" />
                    <div className="flex flex-col gap-y-2.5">
                        <SecondaryButton disabled={false} onClick={() => { }} size="lg">
                            <FaGoogle className="size-5" />
                            Continue with Google
                        </SecondaryButton>

                        <SecondaryButton disabled={false} onClick={() => { }} size="lg">
                            <FaGithub className="size-5" />
                            Continue with Github
                        </SecondaryButton>
                    </div>

                    <p className="text-xs text-muted-foreground text-center cursor-pointer" onClick={() => { setStateAction("signUp") }}>
                        Don&apos;t have an account? <span className="text-accent-first hover:underline">Sign Up</span>
                    </p>
                </form>
            </CardContent>
        </Card>
    )
}
