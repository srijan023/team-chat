import { Input } from "../ui/input";

interface CustomInputFieldProps {
    disabled?: boolean;
    value: string;
    placeholder: string;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

export default function CustomInputField({ disabled, value, placeholder, type, onChange, required }: CustomInputFieldProps) {
    return (
        required ?
            <Input
                className="border-0 outline-0 ring-0"
                disabled={disabled}
                value={value}
                placeholder={placeholder}
                type={type}
                required
                onChange={onChange} />
            :
            <Input
                className="border-0 outline-0 ring-0"
                disabled={disabled}
                value={value}
                placeholder={placeholder}
                type={type}
                required
                onChange={onChange} />

    )
}
