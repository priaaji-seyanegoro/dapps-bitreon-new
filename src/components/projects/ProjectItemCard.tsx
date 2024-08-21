import React from "react";
import { FiEdit2, FiTrash2, FiCode, FiPackage, FiServer } from "react-icons/fi";
import Image from "next/image";
import { Project } from "@/stores/useProjectStore";
import { getFrameworkByValue } from "@/utils/constant";

interface ProjectCardProps {
    project: Project;
    onSelect: (id: number) => void;
    onEdit: (project: Project) => void;
    onDelete: (project: Project) => void;
    className?: string;
}

const ProjectItemCard: React.FC<ProjectCardProps> = ({ project, onSelect, onEdit, onDelete, className = "" }) => {
    return (
        <div
            onClick={() => onSelect(project.id)}
            className={`w-[250px] h-[150px] p-4 bg-[#192650] border border-[#1774d1] rounded-lg shadow-md hover:shadow-lg transition cursor-pointer ${className}`}
        >
            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex space-x-2 items-center">
                        <Image
                            src={getFrameworkByValue(project.framework)?.image ?? ""}
                            alt={project.packageManager}
                            width={24}
                            height={24}
                        />
                        <h3 className="font-bold text-sm text-center">{project.name}</h3>
                    </div>
                    <div className="flex space-x-3 items-center">
                        <FiEdit2
                            className="h-5 w-5 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(project);
                            }}
                        />
                        <FiTrash2
                            className="h-5 w-5 text-red-500 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(project);
                            }}
                        />
                    </div>
                </div>

                <div className="flex space-x-2 items-center">
                    <FiCode color="#1774d1" className="h-5 w-5" />
                    <span className="text-xs">{project.framework}</span>
                </div>
                <div className="flex space-x-2 items-center">
                    <FiPackage color="#1774d1" className="h-5 w-5" />
                    <span className="text-xs">{project.packageManager}</span>
                </div>
                <div className="flex space-x-2 items-center">
                    <FiServer color="#1774d1" className="h-5 w-5" />
                    <span className="text-xs">{project.port}</span>
                </div>
            </div>
        </div>
    );
};

export default ProjectItemCard;