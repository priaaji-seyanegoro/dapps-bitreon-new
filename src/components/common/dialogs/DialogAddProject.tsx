import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import AppButton from '../button/AppButton';
import { FiEdit2, FiPlus } from 'react-icons/fi';
import { frameworks } from '@/utils/constant';
import Image from 'next/image';
import { Project } from '@/stores/useProjectStore';

interface AddProjectDialogProps {
    isOpen: boolean;
    closeModal: () => void;
    onSubmit: (data: ProjectFormData) => void;
    selectedProject: Project | null;
    isEdit: boolean;

}

interface ProjectFormData {
    name: string;
    subdomain: string;
    framework: string;
}

const DialogAddProject: React.FC<AddProjectDialogProps> = ({ isOpen, closeModal, onSubmit, selectedProject, isEdit }) => {
    const { register, handleSubmit, reset, setValue } = useForm<ProjectFormData>({
        defaultValues: {
            name: selectedProject?.name ?? '',
            subdomain: selectedProject?.subdomain ?? '',
            framework: selectedProject?.framework ?? '',
        },
    });

    const [selectedFramework, setSelectedFramework] = useState<string | null>(selectedProject?.framework || null);

    useEffect(() => {
        if (selectedProject) {
            setValue('name', selectedProject.name);
            setValue('subdomain', selectedProject.subdomain);
            setValue('framework', selectedProject.framework);
            setSelectedFramework(selectedProject.framework);
        }
    }, [selectedProject, setValue]);

    const onSubmitHandler: SubmitHandler<ProjectFormData> = (data) => {
        onSubmit({ ...data, framework: selectedFramework || data.framework });
        reset();
        closeModal();
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#0a1a3e] p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-[#64b2ff]">
                                    {selectedProject ? 'Edit' : 'Create'} Project
                                </Dialog.Title>

                                <form onSubmit={handleSubmit(onSubmitHandler)} className="mt-4 space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm text-gray-300">
                                            Project Name
                                        </label>
                                        <input
                                            id="name"
                                            {...register('name', { required: true })}
                                            required
                                            className="mt-1 p-2 block w-full bg-[#1d2e57] border border-[#1d2e57] rounded-md shadow-sm sm:text-sm"
                                            placeholder="Enter project name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="subdomain" className="block text-sm text-gray-300">
                                            Subdomain
                                        </label>
                                        <input
                                            id="subdomain"
                                            required
                                            {...register('subdomain', { required: true })}
                                            className="mt-1 p-2 block w-full bg-[#1d2e57] border border-[#1d2e57] rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Enter subdomain"
                                        />
                                    </div>
                                    {
                                        !isEdit && (
                                            <div >
                                                <label htmlFor="framework" className="block text-sm text-gray-300">
                                                    Framework
                                                </label>
                                                <div className="mt-1 grid grid-cols-4 gap-2 max-h-32 overflow-y-auto">
                                                    {frameworks.map((fw) => (
                                                        <div
                                                            key={fw.value}
                                                            className={`flex flex-col items-center justify-center p-2  cursor-pointer 
                                                ${fw.isDisable ? 'cursor-not-allowed opacity-20' : selectedFramework === fw.value ? 'rounded border border-blue-500' : 'border-transparent hover:border-gray-400'}`}
                                                            onClick={() => !fw.isDisable && setSelectedFramework(fw.value)}
                                                        >
                                                            <Image src={fw.image} alt={fw.name} width={24} height={24} />
                                                            <span className="ml-2 text-xs text-center text-gray-300">{fw.name}</span>
                                                        </div>

                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    }


                                    <div className="flex flex-row justify-end mt-6">
                                        <AppButton
                                            type="submit"
                                            label={`${selectedProject ? 'Edit' : 'Create'} Project`}
                                            onClick={() => { }}
                                            icon={selectedProject ? <FiEdit2 /> : <FiPlus />}
                                            className="mt-4 text-sm"
                                        />
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default DialogAddProject;