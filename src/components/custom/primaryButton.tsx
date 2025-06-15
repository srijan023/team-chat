import { MouseEventHandler } from "react";
import { Button } from "../ui/button";

interface ButtonProps {
    disabled: boolean,
    size: "default" | "sm" | "lg" | "icon" | null | undefined,
    type?: "button" | "submit" | "reset" | undefined,
    children?: React.ReactNode
    onClick?: MouseEventHandler
}

export function PrimaryButton({ children, disabled, size, type }: ButtonProps) {
    return (
        <Button className="bg-accent-first text-primary-text hover:bg-accent-first/80 cursor-pointer w-full" size={size} disabled={disabled} type={type}>{children}</Button>)
}

export function SecondaryButton({ disabled, size, type, children, onClick }: ButtonProps) {
    return (
        <Button type={type} disabled={disabled} onClick={onClick} variant={"outline"} size={size} className="bg-primary-background hover:border-accent-first hover:border hover:bg-primary-background hover:text-primary-text text-secondary-text cursor-pointer border-gray-500">
            {children}
        </Button>
    )
}
