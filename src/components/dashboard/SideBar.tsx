import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { menuItems } from '@/utils/menuItems';
import BitreonLogo from '@/assets/images/bitreon_logo.png'
import Image from 'next/image';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    onSelectMenu: (menu: string) => void;
    selectedMenu: string;
}

const Sidebar: React.FC<SidebarProps> = ({
    isOpen,
    toggleSidebar,
    onSelectMenu,
    selectedMenu,
}) => {
    return (
        <div
            className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#040d20] text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out sm:translate-x-0 sm:static`}
        >
            {/* Logo and Workspace Selector */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#040d20]">
                <div className="flex items-center space-x-3">
                    <Image
                        priority 
                        src={BitreonLogo}
                        alt="Bitreon Cloud"
                        width={32} 
                        height={32} 
                    />
                    <span className="text-lg font-semibold">Bitreon</span>
                </div>
                {/* <FiMenu
                    className="w-6 h-6 cursor-pointer lg:hidden"
                    onClick={toggleSidebar}
                /> */}
            </div>

            {/* Menu Items */}
            <div className="mt-8 space-y-1">
                {menuItems.map((item) => (
                    <div
                        key={item.name}
                        onClick={() => onSelectMenu(item.name)}
                        className={`flex items-center px-6 py-3 mx-4 rounded-lg cursor-pointer transition-all duration-200 ${selectedMenu === item.name
                                ? 'bg-[#072441] text-[#2d91f5]'
                                : 'text-gray-200 hover:bg-gray-800 hover:text-white'
                            }`}
                    >
                        <item.icon className="w-6 h-6 mr-4" />
                        <span className="text-sm font-medium">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;