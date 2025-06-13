import { BackgroundBeams } from "@/components/ui/background-beams";
import AuthScreen from "@/features/auth/components/auth-screen";

export default function Home() {
    return (
        <div className="h-full relative">
            <AuthScreen />
            <BackgroundBeams />
        </div>
    );
}
