import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button';
const SettingsPage = async () => {
    const session = await auth();

    return (
        <div>
            {JSON.stringify(session)}
            
        </div>
    )
}

export default SettingsPage