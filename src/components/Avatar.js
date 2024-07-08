import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserCircle2 } from 'lucide-react'

const Avatar = ({ imageURL, userId, width, height, disable , extraWidth = 0, extraHeight = 0 }) => {
    const path = usePathname()
    return (
        <Link
            href={disable ? path :  "/"+userId}
        >
            {
                imageURL ? (
                    <Image
                        src={imageURL}
                        width={width + extraWidth}
                        height={height + extraHeight}
                        alt='current user'
                        className='rounded-full overflow-hidden drop-shadow-sm'
                    />
                ) :
                    (
                        <UserCircle2 className='font-light text-gray-700' width={width + extraWidth}
                        height={height + extraHeight}/>
                    )
            }
        </Link>
    )
}

export default Avatar