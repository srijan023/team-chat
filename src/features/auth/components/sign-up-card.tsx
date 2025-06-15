import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { SignInFlow, SignUpType } from "../types";
import CustomInputField from "@/components/custom/inputField";
import DateInput from "@/components/custom/dateInput";
import { PrimaryButton, SecondaryButton } from "@/components/custom/primaryButton";
import { useForm } from "@tanstack/react-form";
import { signUpSchema } from "../validationSchema";

interface SignUpProps {
    setState: (state: SignInFlow) => void
}

export default function SignUpCard({ setState }: SignUpProps) {

    const signUpForm = useForm({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            dateOfBirth: undefined,
            fullName: ""
        } as SignUpType,
        validators: {
            onSubmit: signUpSchema
        },
        onSubmit: (formData) => {
            console.log(formData.value)
        },

    })

    return (<Card className="border relative border-gray-800 bg-primary-background  text-primary-text h-full w-full p-8">
        <CardHeader className="px-0 pt-0">
            <CardTitle className="text-center text-2xl">
                Sign Up An Account
            </CardTitle>
        </CardHeader>
        <CardDescription className="text-primary-text text-center">Create account to communicate with your team</CardDescription>
        <CardContent className="px-0 pb-0">
            <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); signUpForm.handleSubmit() }}>
                <signUpForm.Field name="fullName">
                    {(field) => (
                        <CustomInputField
                            label={"Full Name"}
                            disabled={false}
                            name={"fullname"}
                            value={field.state.value}
                            placeholder="John Doe"
                            type="text"
                            errors={field.state.meta.errors.map(error => error?.message).join(", ") || undefined}
                            onChange={e => field.setValue(e.target.value)} />

                    )}
                </signUpForm.Field>

                <signUpForm.Field name="dateOfBirth">
                    {(field) => (
                        <DateInput errors={field.state.meta.errors.map(error => error?.message).join(', ')} date={field.state.value} setDateAction={(value: Date | undefined) => field.setValue(value)} label={"Date of Birth"} />
                    )}
                </signUpForm.Field>

                <signUpForm.Field name="email">
                    {(field) => (
                        <CustomInputField
                            label={"Email"}
                            name={"email"}
                            disabled={false}
                            value={field.state.value}
                            placeholder="johnDoe@email.com"
                            type="email"
                            errors={field.state.meta.errors.map(error => error?.message).join(', ')}
                            onChange={e => field.setValue(e.target.value)} />
                    )}
                </signUpForm.Field>

                <signUpForm.Field name="password">
                    {(field) => (
                        <CustomInputField
                            label={"Password"}
                            disabled={false}
                            name={"password"}
                            value={field.state.value}
                            type="password"
                            errors={field.state.meta.errors.map(error => error?.message).join(', ')}
                            onChange={e => field.setValue(e.target.value)} />
                    )}
                </signUpForm.Field>

                <signUpForm.Field name="confirmPassword">
                    {(field) => (
                        <CustomInputField
                            label={"Confirm Password"}
                            disabled={false}
                            name={"confirmPassword"}
                            value={field.state.value}
                            type="password"
                            errors={field.state.meta.errors.map(error => error?.message).join(', ')}
                            onChange={e => field.setValue(e.target.value)} />
                    )}
                </signUpForm.Field>

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

                <p className="text-xs text-muted-foreground text-center cursor-pointer" onClick={() => { setState("signIn") }}>
                    Already have an account? <span className="text-accent-first hover:underline">Sign In</span>
                </p>
            </form>
        </CardContent>
    </Card>
    )
}
