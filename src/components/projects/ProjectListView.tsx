"use client";

import React, { useEffect, useState } from "react";
import { Project, useProjectStore } from "@/stores/useProjectStore";
import { FiPlus } from "react-icons/fi";
import DialogAddProject from "../common/dialogs/DialogAddProject";
import DialogDeleteProject from "../common/dialogs/DialogDeleteProject";
import ProjectItemCard from "./ProjectItemCard";
import { useRouter } from "next/navigation";

const ProjectListView: React.FC = () => {
    const router = useRouter();
    const {
        projects,
        fetchProjects,
        createProject,
        selectProject,
        updateProject,
        deleteProject,
        selectedProject,
    } = useProjectStore();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => {
        selectProject(null);
        setIsDialogOpen(false);
    };

    const openDialogDelete = (project: Project) => {
        selectProject(project);
        setIsDialogDeleteOpen(true);
    };

    const closeDialogDelete = () => {
        selectProject(null);
        setIsDialogDeleteOpen(false);
    };

    const handleAddOrUpdateProject = (data: { name: string; subdomain: string; framework: string }) => {
        if (selectedProject) {
            updateProject(selectedProject.id, data);
        } else {
            createProject(data);
        }
        closeDialog();
    };

    const handleDelete = () => {
        if (selectedProject) {
            deleteProject(selectedProject.id);
            closeDialogDelete();
        }
    };

    const navigateToDetail = (projectId: number) => {
        router.push(`/dashboard/project/${projectId}`);
    };

    return (
        <div className="mt-4 p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Add New Card */}
            <div
                onClick={openDialog}
                className="flex items-center justify-center w-[250px] h-[170px] border-2 border-dashed border-[#1565b5] rounded-lg cursor-pointer bg-blue-500 bg-opacity-10 hover:bg-opacity-25 transition"
            >
                <div className="flex flex-col items-center text-center">
                    <FiPlus className="w-12 h-12" />
                    <div className="mt-2 text-sm">Project</div>
                </div>
            </div>

            {/* Project Cards */}
            {projects.map((project) => (
                <ProjectItemCard
                    key={project.id}
                    project={project}
                    onSelect={(id) => navigateToDetail(id)}
                    onEdit={() => {
                        selectProject(project);
                        openDialog();
                    }}
                    onDelete={() => openDialogDelete(project)}
                />
            ))}

            {/* Add/Edit Project Dialog */}
            <DialogAddProject
                isOpen={isDialogOpen}
                closeModal={closeDialog}
                onSubmit={handleAddOrUpdateProject}
                selectedProject={selectedProject}
            />

            {/* Delete Project Dialog */}
            <DialogDeleteProject
                isOpen={isDialogDeleteOpen}
                closeModal={closeDialogDelete}
                onConfirm={handleDelete}
                projectName={selectedProject?.name ?? ""}
            />
        </div>
    );
};

export default ProjectListView;