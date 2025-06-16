import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";

interface CustomInputFieldProps {
    disabled?: boolean;
    value: string;
    placeholder?: string;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string
    label?: string
    errors?: string;
}

export default function CustomInputField({ errors, disabled, label, name, value, placeholder, type, onChange }: CustomInputFieldProps) {
    return (
        <div className="ourInput w-full flex flex-col gap-2">
            <Label className="px-1 text-sm" htmlFor={name}>{label}</Label>
            <Input
                id={name}
                className={`${errors ? "border border-red-400" : "border-0"} outline-0 ring-0`}
                disabled={disabled}
                value={value}
                placeholder={placeholder}
                type={type}
                onChange={onChange} />
            {
                errors ? <p className="text-xs italic text-red-400">{errors}</p> : ""
            }
        </div>

    )
}
