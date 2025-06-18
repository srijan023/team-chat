import { UserProfile } from "@clerk/nextjs";

export default function User() {
    return <div className='w-full h-full'>
        <div className="flex h-full justify-center items-center">
            <UserProfile />
        </div>
    </div>
}
