import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <DotPattern
                className={cn(
                    "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
                )} />
        </>
    )
}
