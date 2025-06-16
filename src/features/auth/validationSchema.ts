import z from "zod"
import moment from "moment"

export const signUpSchema = z.object({
    emailAddress: z.string().email("Please pass in a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
    dateOfBirth: z.date(),
    firstName: z.string().nonempty("First Name is required"),
    lastName: z.string().nonempty("Last Name is required")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ['confirmPassword']
}).refine(data => {
    const eighteenYearsAgo = moment().subtract(18, "years");
    const birthday = moment(data.dateOfBirth)
    return eighteenYearsAgo.isAfter(birthday)
}, { message: "You must be at least 18 years old to continue", path: ['dateOfBirth'] })

export const signInSchema = z.object({
    emailAddress: z.string().email("Please pass in a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters long")
})
