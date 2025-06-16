"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { SignInFlow, SignUpType } from "../types";
import CustomInputField from "@/components/custom/inputField";
import DateInput from "@/components/custom/dateInput";
import { PrimaryButton, SecondaryButton } from "@/components/custom/primaryButton";
import { useForm } from "@tanstack/react-form";
import { signUpSchema } from "../validationSchema";
import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useRouter } from "next/navigation";

interface SignUpProps {
    setStateAction: (state: SignInFlow) => void
}

export default function SignUpCard({ setStateAction }: SignUpProps) {

    const { isLoaded, signUp, setActive } = useSignUp();
    const [pendingVerification, setPendingVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");

    const router = useRouter();

    const signUpForm = useForm({
        defaultValues: {
            emailAddress: "",
            password: "",
            confirmPassword: "",
            dateOfBirth: undefined,
            firstName: "",
            lastName: ""
        } as SignUpType,
        validators: {
            onSubmit: signUpSchema
        },
        onSubmit: async (formData) => {
            if (!isLoaded) {
                return;
            }

            try {
                await signUp.create(formData.value);

                await signUp.prepareEmailAddressVerification({
                    strategy: "email_code",
                });

                setPendingVerification(true)
            } catch (err: unknown) {
                console.log(JSON.stringify(err, null, 2))
            }
        },

    })

    const onFormSubmit = async (e: React.FormEvent) => {
        e.stopPropagation();
        e.preventDefault();
        await signUpForm.handleSubmit(e)
    }

    if (!isLoaded) {
        return <div>
            Pending animated logo
        </div>
    }

    const onWindowClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target.getAttribute('data-slot') === 'alert-dialog-overlay') {
            e.preventDefault();
            setPendingVerification(false);
        }
    }

    const onSubmitOtp = async (e: React.MouseEvent) => {
        e.preventDefault()
        try {
            const response = await signUp.attemptEmailAddressVerification({ code: verificationCode })
            if (response.status === "complete") {
                await setActive({ session: signUp.createdSessionId })
                router.push("/")
            } else {
                console.log(JSON.stringify(response, null, 2))
            }
        } catch (err: unknown) {
            console.log(JSON.stringify(err, null, 2))
        }
    }

    return (
        //Input fields for submitting the verification code
        <div onClick={onWindowClick}>
            <AlertDialog open={pendingVerification} onOpenChange={setPendingVerification}>
                <AlertDialogContent className="shad-alert-dialog bg-primary-background text-primary-text border border-gray-800">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-start justify-between">
                            Enter the email verification code
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            The verficiation code has been sent to you email
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div>
                        <InputOTP
                            maxLength={6}
                            value={verificationCode}
                            onChange={(value) => setVerificationCode(value)}
                        >
                            <InputOTPGroup className="shad-otp">
                                <InputOTPSlot className="shad-otp-slot" index={0} />
                                <InputOTPSlot className="shad-otp-slot" index={1} />
                                <InputOTPSlot className="shad-otp-slot" index={2} />
                                <InputOTPSlot className="shad-otp-slot" index={3} />
                                <InputOTPSlot className="shad-otp-slot" index={4} />
                                <InputOTPSlot className="shad-otp-slot" index={5} />
                            </InputOTPGroup>
                        </InputOTP>

                    </div>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={onSubmitOtp}
                            className="shad-primary-btn bg-accent-first hover:bg-accent-first/50 cursor-pointer w-full"
                        >
                            Submit verification code
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Card className="border relative border-gray-800 bg-primary-background  text-primary-text h-full w-full p-8">
                <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-center text-2xl">
                        Sign Up An Account
                    </CardTitle>
                    {/*Captcha Widget*/}
                    <div id="clerk-captcha">
                    </div>
                </CardHeader>
                <CardDescription className="text-primary-text text-center">Create account to communicate with your team</CardDescription>
                <CardContent className="px-0 pb-0">
                    <form className="space-y-3" onSubmit={onFormSubmit}>
                        <div className='flex gap-3'>

                            <signUpForm.Field name="firstName">
                                {(field) => (
                                    <CustomInputField
                                        label={"Full Name"}
                                        disabled={false}
                                        name={"firstName"}
                                        value={field.state.value}
                                        placeholder="John"
                                        type="text"
                                        errors={field.state.meta.errors.map(error => error?.message).join(", ") || undefined}
                                        onChange={e => field.setValue(e.target.value)} />

                                )}
                            </signUpForm.Field>

                            <signUpForm.Field name="lastName">
                                {(field) => (
                                    <CustomInputField
                                        label={"Last Name"}
                                        disabled={false}
                                        name={"lastName"}
                                        value={field.state.value}
                                        placeholder="Doe"
                                        type="text"
                                        errors={field.state.meta.errors.map(error => error?.message).join(", ") || undefined}
                                        onChange={e => field.setValue(e.target.value)} />

                                )}
                            </signUpForm.Field>
                        </div>

                        <signUpForm.Field name="dateOfBirth">
                            {(field) => (
                                <DateInput errors={field.state.meta.errors.map(error => error?.message).join(', ')} date={field.state.value} setDateAction={(value: Date | undefined) => field.setValue(value)} label={"Date of Birth"} />
                            )}
                        </signUpForm.Field>

                        <signUpForm.Field name="emailAddress">
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

                        <p className="text-xs text-muted-foreground text-center cursor-pointer" onClick={() => { setStateAction("signIn") }}>
                            Already have an account? <span className="text-accent-first hover:underline">Sign In</span>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
