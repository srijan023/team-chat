'use client'

import React, { useEffect, useState } from 'react'
import { useAuth, useSignIn } from '@clerk/nextjs'
import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import CustomInputField from '@/components/custom/inputField'
import { PrimaryButton } from '@/components/custom/primaryButton'

const ForgotPasswordPage: NextPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [successfulCreation, setSuccessfulCreation] = useState(false)
    const [secondFactor, setSecondFactor] = useState(false)
    const [error, setError] = useState('')

    const router = useRouter()
    const { isSignedIn } = useAuth()
    const { isLoaded, signIn, setActive } = useSignIn()

    useEffect(() => {
        if (isSignedIn) {
            router.push('/')
        }
    }, [isSignedIn, router])

    if (!isLoaded) {
        return null
    }

    // Send the password reset code to the user's email
    async function create(e: React.FormEvent) {
        e.preventDefault()
        await signIn
            ?.create({
                strategy: 'reset_password_email_code',
                identifier: email,
            })
            // eslint-disable-next-line
            .then((_) => {
                setSuccessfulCreation(true)
                setError('')
            })
            .catch((err) => {
                console.error('error', err.errors[0].longMessage)
                setError(err.errors[0].longMessage)
            })
    }

    // Reset the user's password.
    // Upon successful reset, the user will be
    // signed in and redirected to the home page
    async function reset(e: React.FormEvent) {
        e.preventDefault()
        await signIn
            ?.attemptFirstFactor({
                strategy: 'reset_password_email_code',
                code,
                password,
            })
            .then((result) => {
                // Check if 2FA is required
                if (result.status === 'needs_second_factor') {
                    setSecondFactor(true)
                    setError('')
                } else if (result.status === 'complete') {
                    // Set the active session to
                    // the newly created session (user is now signed in)
                    setActive({ session: result.createdSessionId })
                    setError('')
                } else {
                    console.log(result)
                }
            })
            .catch((err) => {
                console.error('error', err.errors[0].longMessage)
                setError(err.errors[0].longMessage)
            })
    }

    return (
        <div className="h-full flex justify-center items-center">
            <div className='bg-primary-background z-10 space-y-5 max-w-[450px] w-full border border-gray-800 rounded-xl p-8 shadow shadow-accent-first'>
                <h1 className='text-center text-xl'>Reset Password?</h1>
                <form className='w-full' onSubmit={!successfulCreation ? create : reset}>
                    {!successfulCreation && (
                        <div className="mx-auto w-full space-y-4">
                            <CustomInputField
                                disabled={false}
                                placeholder='Your registered email'
                                name="email"
                                value={email}
                                type="email"
                                onChange={e => setEmail(e.target.value)}
                            />

                            <PrimaryButton
                                disabled={false}
                                size={'lg'}
                                type={'submit'}
                                onClick={() => { }}
                            >Send Password Reset Code</PrimaryButton>
                            {error && <p>{error}</p>}
                        </div>
                    )}

                    {successfulCreation && (
                        <div className="mx-auto w-full space-y-4">
                            <CustomInputField
                                label={"New Password"}
                                disabled={false}
                                name="newPassword"
                                value={password}
                                type="password"
                                onChange={e => setPassword(e.target.value)}
                            />

                            <CustomInputField
                                label={"Verification Code"}
                                disabled={false}
                                name="verificationCode"
                                value={code}
                                type="text"
                                onChange={e => setCode(e.target.value)}
                            />

                            <PrimaryButton
                                disabled={false}
                                type="submit"
                                size="lg"
                            >Reset Password</PrimaryButton>
                            {error && <p>{error}</p>}
                        </div>
                    )}

                    {secondFactor && <p>2FA is required, but this UI does not handle that</p>}
                </form>
            </div>
        </div>
    )
}

export default ForgotPasswordPage
