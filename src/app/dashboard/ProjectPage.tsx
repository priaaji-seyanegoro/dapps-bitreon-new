"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Project, useProjectStore } from "@/stores/useProjectStore";
import ProjectListView from "@/components/projects/ProjectListView";
import ProjectDetail from "./project/ProjectDetailPage";

const ProjectPage: React.FC = () => {
    const pathname = usePathname();
    const { projects } = useProjectStore();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        const projectId = pathname.split("/").pop(); // Extract project ID from the URL
        const project = projects.find((p) => p.id === Number(projectId));
        setSelectedProject(project || null);
    }, [pathname, projects]);

    return (
        <div className="flex w-full min-h-screen">
            <div className="flex-1">
                {selectedProject ? (
                    <ProjectDetail project={selectedProject} />
                ) : (
                    <ProjectListView />
                )}
            </div>
        </div>
    );
};

export default ProjectPage;