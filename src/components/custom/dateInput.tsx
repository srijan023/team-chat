"use client"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { useState } from "react"

interface DateInputProps {
    label: string,
    date: Date | undefined,
    setDateAction: (val: Date | undefined) => void,
    errors?: string
}

export default function DateInput({ label, setDateAction, date, errors }: DateInputProps) {
    const [open, setOpen] = useState(false)

    return (
        <div className="w-full flex flex-col gap-2">
            <Label htmlFor="date" className="px-1 font-normal">
                {label}
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className={`w-full bg-secondary-background hover:bg-secondary-background text-primary-text hover:text-primary-text ${errors ? 'border border-red-400' : 'border-0'} outline-0 justify-between font-normal`}
                    >
                        {date ? date.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                {errors ? <p className="text-xs italic text-red-400">{errors}</p> : ""}
                <PopoverContent className="bg-secondary-background text-primary-text border-0 w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setDateAction(date)
                            setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>)
}
