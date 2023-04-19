import React, { useState } from 'react'
import Navbar from './Navbar'
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { login_me } from '@/services/auth';

export default function Login() {

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email) {
            setError({ ...error, email: "Email Field is Required" })
            return;
        }
        if (!formData.password) {
            setError({ ...error, password: "Password Field is required" })
            return;
        }
        const handleSubmit = async (e) => {

            e.preventDefault();
            if (!formData.email) {
                setError({ ...error, email: "Email Field is Required" })
                return;
            }
            if (!formData.password) {
                setError({ ...error, password: "Password Field is required" })
                return;
            }

            const res = await login_me(formData);
            if (res.success) {
                Cookies.set('token', res?.finalData?.token);
                localStorage.setItem('user', JSON.stringify(res?.finalData?.user));
                dispatch(setUserData(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null));
                Router.push('/');
            }
            else {
                toast.error(res.message);
            }
        }
    }

    return (
        <div className='w-full h-screen bg-base-100'>
            <div className="flex h-full flex-col items-center  text-center justify-center px-6 py-8 mx-auto  lg:py-0">
                <div className="w-full bg-white text-black rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Sign in to your account
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                            <div className='text-left'>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                <input onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 " placeholder="name@company.com" required="" />
                                {
                                    error.email && <p className="text-sm text-red-500">{error.email}</p>
                                }
                            </div>
                            <div className='text-left'>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                <input onChange={(e) => setFormData({ ...formData, password: e.target.value })} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5" required="" />
                                {
                                    error.password && <p className="text-sm text-red-500">{error.password}</p>
                                }
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300   dark:focus:ring-indigo-600 " required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <Link href="/auth/forgetPassword" className="text-sm font-medium text-dark hover:underline ">Forgot password?</Link>
                            </div>
                            <button type="submit" className="w-full text-white btn btn-dark focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-dark dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Sign in</button>
                            <p className="text-sm font-light ">
                                Don’t have an account yet? <Link href="/auth/register" className="font-medium text-dark hover:underline ">Sign up</Link>
                            </p>
                        </form>
                    </div>

                </div>
                <ToastContainer />
            </div>
        </div>
    )
}
