import ProjectPage from '@/app/dashboard/ProjectPage';
import SettingPage from '@/app/dashboard/SettingPage';
import React from 'react';

interface ContentProps {
    selectedMenu: string;
}

const Content: React.FC<ContentProps> = ({ selectedMenu }) => {
    const renderContent = () => {
        switch (selectedMenu) {
            case 'Dashboard':
                return <ProjectPage />;
            case 'Settings':
                return <SettingPage />;
            default:
                return <div>Page not found</div>;
        }
    };

    return (
        <div className="p-8">
            {renderContent()}
        </div>
    );
};

export default Content;