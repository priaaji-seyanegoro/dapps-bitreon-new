"use client";

import AppBar from '@/components/dashboard/AppBar';
import Content from '@/components/dashboard/Content';
import Sidebar from '@/components/dashboard/SideBar';
import { useUserStore } from '@/stores/useUserStore';
import React, { useEffect, useState } from 'react';

const DashboardLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState('Dashboard');
    const { user, fetchUserProfile } = useUserStore();

    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const handleSelectMenu = (menu: string) => setSelectedMenu(menu);

    return (
        <div className="flex min-h-screen w-full">
            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                onSelectMenu={handleSelectMenu}
                selectedMenu={selectedMenu}
            />

            {/* Content Area */}
            <div
                className={`flex flex-col flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'
                    }`}
            >
                <AppBar
                    username={user?.username ?? "-"}
                    avatarUrl="https://www.inaa.org/wp-content/uploads/2023/04/header-cloud-computing.jpg"
                />
                <div className="p-8 text-white bg-gradient-to-br from-[#0a1a3e] via-[#161c3d] to-[#020f2f] min-h-screen">
                    {/* <div className="p-8 text-white bg-gradient-to-br from-[#0a1a3e] via-[#161c3d] to-[#020f2f] min-h-screen"> */}
                    <Content selectedMenu={selectedMenu} />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;