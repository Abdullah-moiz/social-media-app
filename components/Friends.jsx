import Image from 'next/image'
import React from 'react'

export default function Friends({ friendData }) {
    console.log(friendData)

    return (
        <div className="stat">
            <div className="stat-figure text-secondary">
                <div className="avatar online">
                    <div className="w-16  rounded-full">
                        <img src={friendData?.profile || '/profile.png'} alt='No Profile' fill />
                    </div>
                </div>
            </div>
            <div className="stat-value">{friendData?.name}</div>
            <div className="stat-title">{friendData?.email}</div>
            <button className='btn btn-success'>Add Friend</button>
        </div>
    )
}
