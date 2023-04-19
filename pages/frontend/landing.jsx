import Cookies from 'js-cookie'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

export default function Landing() {
    const router = useRouter();
    useEffect(() => {
        if(!Cookies.get('token')){
            router.push('/')
        }
    }, [])

  return (
    <div>Landing</div>
  )
}
