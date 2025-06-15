export type SignInFlow = "signIn" | "signUp";

export type SignInType = {
    email: string,
    password: string
}

export type SignUpType = {
    email: string,
    password: string,
    confirmPassword: string,
    dateOfBirth: Date | undefined,
    fullName: string
}
