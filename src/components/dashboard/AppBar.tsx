import React from 'react';
import { useRouter } from 'next/navigation';
import { FaSignOutAlt } from 'react-icons/fa';
import { FiBell, FiLogOut, FiUser } from 'react-icons/fi';
import AuthService from '@/services/auth';

interface AppBarProps {
    username: string;
    avatarUrl: string;
}

const AppBar: React.FC<AppBarProps> = ({ username, avatarUrl }) => {
    const router = useRouter();

    const handleLogout = () => {
        AuthService.logout(router);
    };


    return (
        <div className="flex justify-between items-center px-6 py-4 bg-[#040d20] text-white">
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <img src={avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full" />
                    <span>{username}</span>
                </div>
                {/* <FiBell className="w-6 h-6 cursor-pointer" /> */}
            </div>
            <FiLogOut onClick={handleLogout} className='w-5 h-5' color='#2d91f5' />
        </div>
    );
};

export default AppBar;