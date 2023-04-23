import React from 'react'
import Link from 'next/link'
import { AiFillHome } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import { FaUserPlus } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Image from 'next/image';

export default function Navbar() {
    const router = useRouter();

    const user = useSelector(state => state?.User?.userData)

    const handleLogout = () => {
        Cookies.remove('token');
        localStorage.removeItem('user');
        router.push('/')
    }

    return (
        <div className={`navbar z-50 bg-base-100 fixed top-0 left-0`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link href={'/frontend/landing'}><AiFillHome className="mx-2" /> Home</Link></li>
                        <li><Link href={'/frontend/landing'}> <IoIosCreate className="mx-2" />Create Post</Link></li>
                        <li><Link href={'/frontend/landing'}><FaUserPlus className="mx-2" />Friend Requests</Link></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost normal-case text-xl">SocialBook</a>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        {
                            user?.profile !== null ? <div className="w-10 rounded-full">
                                <Image alt='none' className='rounded-full' fill src={user?.profile} />
                            </div> :
                                <div className="avatar placeholder">
                                    <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                                        <span className="text-xs">AA</span>
                                    </div>
                                </div>

                        }

                    </label>
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <Link href={'/frontend/profile/userProfile'} className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link >
                        </li>
                        <li><Link href={''} >Settings</Link ></li>
                        <li onClick={handleLogout}><Link href={''} >Logout</Link ></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
