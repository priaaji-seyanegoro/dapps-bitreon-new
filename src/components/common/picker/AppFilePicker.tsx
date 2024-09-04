import React, { useState, useCallback } from 'react';
import { FiArchive, FiFilePlus, FiTrash2, FiUpload } from 'react-icons/fi';
import { useProjectStore } from '@/stores/useProjectStore';
import DialogLoading from '../dialogs/DialogLoading';

interface FilePickerProps {
  projectId: number;
  onFileSelect: (file: File | null) => void;
}

const AppFilePicker: React.FC<FilePickerProps> = ({ projectId, onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { uploadProjectSource } = useProjectStore();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      validateAndSelectFile(file);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSelectFile(file);
    }
  };

  const validateAndSelectFile = (file: File) => {
    console.log(file)
    const validExtensions = ['application/zip', 'application/x-zip-compressed'];
    if (validExtensions.includes(file.type)) {
      setError(null);
      setSelectedFile(file);
      onFileSelect(file);
    } else {
      setError('Only .zip files are allowed.');
      setSelectedFile(null);
      onFileSelect(null);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    onFileSelect(null);
  };

  const handleUploadFile = async () => {
    if (!selectedFile) return;
    setLoading(true);
    await uploadProjectSource(projectId, selectedFile);
    setLoading(false);
    handleRemoveFile();
  };

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${isDragging ? 'border-blue-400 bg-blue-400 bg-opacity-15' : 'border-blue-400 bg-black bg-opacity-20'
          }`}
      >
        <input
          type="file"
          accept=".zip,.rar"
          onChange={handleFileChange}
          className="hidden"
          id="file-input"
        />
        <label htmlFor="file-input" className="cursor-pointer">
          {!selectedFile ? (
            <div className="flex flex-col items-center">
              <FiFilePlus className="text-blue-400 size-16 mb-2" />
              <p className="text-lg font-semibold text-gray-400">
                Drag and drop files or <span className="text-blue-400">Browse</span>
              </p>
              <p className="text-gray-500 italic">
                For <b className='text-gray-300'>Javascript / Typescript project</b> make sure the project includes <b className='text-gray-300'>`npm run build`</b> and
                <b className='text-gray-300'>`npm run start`</b> in the  <b className='text-gray-300'>`package.json`</b> scripts. When zipping the project,
                do not include the <b className='text-gray-300'>`node_modules`</b> folder. Upload the file as a <b className='text-gray-300'>.zip`</b>`.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <FiArchive className="text-blue-400 size-16 mb-2" />
              <p className="text-lg font-semibold text-gray-400">{selectedFile.name}</p>
              <p className="text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
              <div className='flex flex-row items-center space-x-6 mt-4'>
                <button
                  type="button"
                  className="mt-2 text-red-500 flex items-center"
                  onClick={handleRemoveFile}
                >
                  <FiTrash2 className="mr-1" />
                  <span className='text-xs'>REMOVE</span>
                </button>
                <button
                  type="button"
                  className="mt-2 text-emerald-400 flex items-center"
                  onClick={handleUploadFile}
                >
                  <FiUpload className="mr-1" />
                  <span className='text-xs'>UPLOAD</span>
                </button>
              </div>
            </div>
          )}
        </label>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>

      {loading && <DialogLoading message="Uploading file, please wait..." />}
    </div>
  );
};

export default AppFilePicker;