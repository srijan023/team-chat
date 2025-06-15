import z from "zod"
import moment from "moment"

export const signUpSchema = z.object({
    email: z.string().email("Please pass in a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
    dateOfBirth: z.date(),
    fullName: z.string().nonempty("Name is required")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ['confirmPassword']
}).refine(data => {
    const eighteenYearsAgo = moment().subtract(18, "years");
    const birthday = moment(data.dateOfBirth)
    return eighteenYearsAgo.isAfter(birthday)
}, { message: "You must be at least 18 years old to continue", path: ['dateOfBirth'] })

export const signInSchema = z.object({
    email: z.string().email("Please pass in a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters long")
})
