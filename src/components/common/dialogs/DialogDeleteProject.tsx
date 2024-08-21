import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import AppButton from '../button/AppButton';

interface DialogConfirmDeleteProps {
    isOpen: boolean;
    closeModal: () => void;
    onConfirm: () => void;
    projectName: string;
}

const DialogDeleteProject: React.FC<DialogConfirmDeleteProps> = ({
    isOpen,
    closeModal,
    onConfirm,
    projectName,
}) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={closeModal}>
                <div className="min-h-screen px-4 text-center">
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

                    <span className="inline-block h-screen align-middle" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-[#0a1a3e] shadow-xl rounded-2xl">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-[#64b2ff]"
                            >
                                Confirm Delete
                            </Dialog.Title>
                            <div className="mt-4">
                                <p className="text-sm text-gray-300">
                                    Are you sure you want to delete the project <span className="font-bold">{projectName}</span>? This action cannot be undone.
                                </p>
                            </div>

                            <div className="mt-6 flex justify-end space-x-4">
                                <AppButton
                                    type="button"
                                    onClick={closeModal}
                                    label="Cancel"
                                    className="text-sm bg-gray-300 hover:bg-gray-400"
                                />
                                <AppButton
                                    type="button"
                                    onClick={onConfirm}
                                    label="Remove Project"
                                    className="text-sm bg-red-600 hover:bg-red-700"
                                />
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default DialogDeleteProject;