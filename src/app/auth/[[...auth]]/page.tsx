import { BackgroundBeams } from "@/components/ui/background-beams";
import AuthScreen from "@/features/auth/components/auth-screen";

export default function Authenticate() {
    return <div className='h-full'>
        <div className="h-full relative">
            <AuthScreen />
            <BackgroundBeams />
        </div>
    </div>
}
