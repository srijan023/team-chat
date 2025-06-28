import Image from "next/image";
import UserRegistrationForm from "./components/UserRegistrationForm";

export default function UserRegistrationPage() {
    return (
        <div className="z-10 relative h-full flex items-center justify-center">
            <div className="absolute z-5 bg-black/80 h-full w-full">
            </div>
            <div className="absolute z-3 h-full w-full">
                <Image src={'https://images.unsplash.com/photo-1600673645627-1c47394132ac?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt='Background image' height={700} width={700} className="h-full w-full object-cover" />
            </div>
            <div className="relative md:h-auto md:w-[420px] z-10">
                <UserRegistrationForm />
            </div>
        </div>
    )
}
