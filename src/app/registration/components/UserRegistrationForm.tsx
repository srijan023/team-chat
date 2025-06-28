"use client"
import { trpc } from "@/app/_trpc/client";
import CustomInputField from "@/components/custom/inputField";
import { PrimaryButton } from "@/components/custom/primaryButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
export default function UserRegistrationForm() {

    const { user } = useUser();

    const router = useRouter();

    const [methodOfEntry, setMethodOfEntry] = useState<'CREATE' | 'JOIN'>('JOIN');

    const registerUserMuatation = trpc.userRouter.registerUser.useMutation({
        onSuccess: (data) => {
            if (data.code == 201) {
                toast.success("User registered successfully");
                router.push('/');
            }
        },
        onError: (error) => {
            if (error.message) {
                toast.error(error.message);
            } else {
                toast.error("Something went wrong")
            }

        }
    });

    const userDetailsForm = useForm({
        defaultValues: {
            firstName: user?.firstName || "John",
            lastName: user?.lastName || "Doe",
            email: user?.primaryEmailAddress?.emailAddress || "johndoe@gmail.com",
            joinCode: "",
            workspaceName: "",
        },
        validators: {
            onSubmit: z.object({
                firstName: z.string().nonempty(),
                lastName: z.string().nonempty(),
                email: z.string().email().nonempty(),
                joinCode: z.string(),
                workspaceName: z.string(),
            })
        },
        onSubmit: async (formData) => {
            // Handle join workspace logic
            registerUserMuatation.mutateAsync({
                firstName: formData.value.firstName,
                lastName: formData.value.lastName,
                methodOfJoin: methodOfEntry,
                email: formData.value.email,
                joinCode: formData.value.joinCode || "",
                workspaceName: formData.value.workspaceName || ""
            });
        }
    })

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        userDetailsForm.handleSubmit();
    }

    return <Card className="bg-primary-background/80 text-white border-gray-800 h-full w-full p-8">
        <CardHeader className="px-0 pt-0">
            <CardTitle className="text-center text-2xl">
                Complete your account
            </CardTitle>
        </CardHeader>
        <CardDescription className="text-primary-text text-center">Just few more questions and we will hop into the application</CardDescription>
        <CardContent className="space-y-5 px-0 pb-0">
            <form className='space-y-4' onSubmit={handleSubmit}>
                <div className='flex gap-2'>
                    <userDetailsForm.Field name="firstName">
                        {
                            (field) => (
                                <CustomInputField
                                    label={"First Name"}
                                    name="firstName"
                                    disabled={true}
                                    value={field.state.value}
                                    placeholder="John"
                                    type='text'
                                    // errors={field.state.meta.errors.map(err => err?.message).join(', ')}
                                    onChange={(e) => { field.setValue(e.target.value) }} />
                            )
                        }
                    </userDetailsForm.Field>

                    <userDetailsForm.Field name='lastName'>
                        {
                            (field) => (
                                <CustomInputField
                                    label={"Last Name"}
                                    name="lastName"
                                    disabled={true}
                                    value={field.state.value}
                                    placeholder="Doe"
                                    type='text'
                                    // errors={field.state.meta.errors.map(err => err?.message).join(', ')}
                                    onChange={(e) => { field.setValue(e.target.value) }} />
                            )
                        }
                    </userDetailsForm.Field>

                </div>

                <userDetailsForm.Field name='email'>

                    {
                        (field) => (
                            <CustomInputField
                                label={"Email"}
                                name="email"
                                disabled={true}
                                value={field.state.value}
                                placeholder="Doe"
                                type='email'
                                // errors={field.state.meta.errors.map(err => err?.message).join(', ')}
                                onChange={(e) => { field.setValue(e.target.value) }} />
                        )
                    }
                </userDetailsForm.Field>

                <div className='w-full flex gap-2'>
                    <Button onClick={(e) => { e.preventDefault(); setMethodOfEntry('JOIN') }} className={`flex-1 cursor-pointer border ${methodOfEntry == 'JOIN' ? 'border-accent-first bg-accent-first/10' : ''} `} variant={'outline'}> Join a workspace </Button>
                    <Button onClick={(e) => { e.preventDefault(); setMethodOfEntry('CREATE') }} className={`flex-1 cursor-pointer border ${methodOfEntry == 'CREATE' ? 'border-accent-first bg-accent-first/10' : ''} `} variant={'outline'}> Create a workspace </Button>
                </div>

                {
                    methodOfEntry === 'JOIN' ?
                        <userDetailsForm.Field name='joinCode'>
                            {
                                (field) => (
                                    <CustomInputField
                                        label={"Workspace Join Code"}
                                        name="workspace"
                                        disabled={false}
                                        value={field.state.value}
                                        placeholder=""
                                        type='text'
                                        onChange={(e) => { field.setValue(e.target.value) }} />
                                )
                            }
                        </userDetailsForm.Field>
                        :
                        <div>
                            <userDetailsForm.Field name='workspaceName'>
                                {
                                    (field) => (
                                        <CustomInputField
                                            label={"Workspace Name"}
                                            name="workspaceName"
                                            disabled={false}
                                            value={field.state.value}
                                            placeholder="My Workspace"
                                            type='text'
                                            onChange={(e) => { field.setValue(e.target.value) }} />
                                    )
                                }
                            </userDetailsForm.Field>
                        </div>
                }
                <PrimaryButton disabled={false} size="default" type='submit'>
                    Continue
                </PrimaryButton>

            </form>
        </CardContent>
    </Card>
}

