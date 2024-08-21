import React, { useState } from "react";
import { Project, useProjectStore } from "@/stores/useProjectStore";
import { FiChevronLeft, FiGitBranch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import ProjectItemCard from "@/components/projects/ProjectItemCard";
import DialogAddProject from "@/components/common/dialogs/DialogAddProject";
import DialogDeleteProject from "@/components/common/dialogs/DialogDeleteProject";
import AppFilePicker from "@/components/common/picker/AppFilePicker";
import AppButton from "@/components/common/button/AppButton";
import DialogLoading from "@/components/common/dialogs/DialogLoading";

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  const router = useRouter();
  const { selectProject, deleteProject, selectedProject, updateProject, buildProjectPipeline, loading } = useProjectStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);

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
    }

    closeDialog();
  };

  const handleDelete = () => {
    if (selectedProject) {
      deleteProject(selectedProject.id);
      closeDialogDelete();
      navigateToDashboard();
    }
  };

  const handleBuildPipeline = async () => {
    await buildProjectPipeline(project.id);
  };

  const navigateToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-row items-center justify-between">
        <div
          className="flex flex-row space-x-2 cursor-pointer"
          onClick={() => { navigateToDashboard() }}
        >
          <FiChevronLeft className="h-6 w-6" />
          Back
        </div>

        <AppButton
          icon={<FiGitBranch />}
          label="BUILD PIPELINE"
          onClick={handleBuildPipeline}
          className="px-4 py-1 text-xs"
        />
      </div>

      <ProjectItemCard
        key={project.id}
        className="w-[350px]"
        project={project}
        onSelect={() => { }}
        onEdit={() => {
          selectProject(project);
          openDialog();
        }}
        onDelete={() => openDialogDelete(project)}
      />

      <AppFilePicker
        onFileSelect={() => { }}
        projectId={project.id}
      />

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

      {/* Loading Dialog */}
      {loading && <DialogLoading message="Building pipeline, please wait..." />}
    </div>
  );
};

export default ProjectDetail;