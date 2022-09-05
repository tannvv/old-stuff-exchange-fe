import React from 'react';
import { useAuth } from '~/context/AuthContext';

const Profile = () => {
    const { logOut, user } = useAuth()!;

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {}
    };
    return (
        <div className="w-[300px] m-auto">
            <h1 className="text-center text-2xl font-bold pt-12">Account</h1>
            <div>
                <p>Welcome, {user?.fullName}</p>
                <p>Welcome, {user?.building?.name}</p>
            </div>
            <button onClick={handleSignOut} className="border py-2 px-5 mt-10">
                Logout
            </button>
        </div>
    );
};

export default Profile;
