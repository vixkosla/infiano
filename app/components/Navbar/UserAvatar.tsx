import { AvatarFallback } from '@radix-ui/react-avatar';
import { Avatar, AvatarImage } from '../ui/avatar';

export function UserAvatar({ src = "https://github.com/shadcn.png"}) {
    return (
        <>
            <Avatar>
                <AvatarImage  src={src}/>
            </Avatar>
        </>
    )
}