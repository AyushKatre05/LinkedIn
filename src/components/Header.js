'use client'
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { headerNavLink } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { ContextData } from '@/providers/provider'
import Avatar from './Avatar'
import { Search } from 'lucide-react'

const Header = () => {
    const path = usePathname()
    const router = useRouter()
    const [openUserMenu, setOpenUserMenu] = useState(false)
    const { user, fetchCurrentUserDetails } = useContext(ContextData)

    const handleOpenClose = () => {
        setOpenUserMenu((prev) => !prev)
    }

    const handleUserLogout = async () => {
        const response = await axios.get('/api/logout')
        setOpenUserMenu(false)
        toast(response?.data.message)
        router.push("/login")
    }

    return (
        <header className='h-16 bg-white sticky z-40 shadow top-0'>
            <div className='container mx-auto h-full flex items-center px-4 justify-between'>
                <div className='grid grid-cols-[170px,1fr] items-center'>
                    <Link href={"/"}>
                        <Image 
                            src={'/logo.png'}
                            width={190}
                            height={70}
                            alt='logo'
                        />
                    </Link>

                    {/* Search input */}
                    <div className='w-full items-center gap-2 border bg-slate-100 px-1 rounded hidden lg:flex'>
                        <input 
                            type='text' 
                            placeholder='Search here...'
                            className='w-full max-w-52 bg-slate-100 py-1 px-2 outline-none'
                        />
                        <Search />
                    </div>
                </div>

                <div className='flex items-center gap-10 h-full'>
                    {/* Navbar */}
                    <nav className='hidden lg:flex items-center gap-4 h-full'>
                        {headerNavLink.map((navlink, index) => { 
                            const isActive = path === navlink.route
                            const Icon = navlink.icon
                            return (
                                <Link 
                                    href={navlink.route}
                                    key={index}
                                    className={`flex flex-col justify-center items-center gap-1 h-full px-4 ${isActive ? 'bg-slate-100' : ''}`}
                                >
                                    <Icon />
                                    <p className='text-sm'>{navlink.label}</p>
                                </Link>
                            )
                        })}
                    </nav>

                    <div>
                        {/* Current user login image */}
                        <div className='flex flex-col justify-center items-center cursor-pointer relative'>
                            <div onClick={handleOpenClose} className='flex flex-col justify-center items-center'>
                                <Avatar
                                    userId={user?._id}
                                    imageURL={user?.profile_pic}
                                    width={28}
                                    height={28}
                                    disable={true}
                                />
                                <p className='text-sm'>Me</p>
                            </div>
                            
                            {/* User menu */}
                            {openUserMenu && (
                                <div className='shadow absolute top-14 right-0 min-w-60 p-4 rounded bg-white'>
                                    <div className='font-semibold text-center flex flex-col justify-center items-center'>
                                        <Avatar
                                            userId={user?._id}
                                            imageURL={user?.profile_pic}
                                            width={45}
                                            height={45}
                                            extraWidth={20}
                                            extraHeight={20}
                                        />
                                        <p className='text-lg'>
                                            { user?.firstName + " " + user?.lastName }
                                        </p>
                                        <p className='text-sm'>
                                            {user?.occupation}
                                        </p>
                                    </div>

                                    <div className='p-[0.5px] my-1 bg-slate-200'></div>

                                    {/* Mobile responsive */}
                                    <nav className='flex lg:hidden justify-center flex-col gap-2 h-full'>
                                        {headerNavLink.map((navlink, index) => { 
                                            const isActive = path === navlink.route
                                            const Icon = navlink.icon
                                            return (
                                                <Link 
                                                    href={navlink.route}
                                                    key={index}
                                                    className={`flex flex-row gap-2 h-full px-4 py-3 ${isActive ? 'bg-slate-100' : ''}`}
                                                    onClick={handleOpenClose}
                                                >
                                                    <Icon />
                                                    <p className='text-sm'>{navlink.label}</p>
                                                </Link>
                                            )
                                        })}
                                    </nav>

                                    <button className='bg-red-600 text-white rounded hover:bg-red-700 w-full py-1' onClick={handleUserLogout}>Logout</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
