export type SignInFlow = "signIn" | "signUp";

export type SignInType = {
    emailAddress: string,
    password: string
}

export type SignUpType = {
    emailAddress: string,
    password: string,
    confirmPassword: string,
    dateOfBirth: Date | undefined,
    firstName: string
    lastName: string
}
