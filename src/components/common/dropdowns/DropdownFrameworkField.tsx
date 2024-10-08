import React, { useState } from 'react';
import Image from 'next/image';

interface Framework {
  name: string;
  value: string;
  image: string;
}

interface FrameworkDropdownProps {
  frameworks: Framework[];
  selectedFramework: Framework | null;
  onSelect: (framework: Framework) => void;
}

const DropdownFrameworkField: React.FC<FrameworkDropdownProps> = ({
  frameworks,
  selectedFramework,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <div
        onClick={toggleDropdown}
        className="flex items-center justify-between bg-gray-800 text-white p-3 rounded cursor-pointer"
      >
        {selectedFramework ? (
          <div className="flex items-center space-x-2">
            <Image
              src={selectedFramework.image}
              alt={selectedFramework.name}
              width={6}
              height={6}
            />
            <span>{selectedFramework.name}</span>
          </div>
        ) : (
          <span>Select a framework</span>
        )}
        <span className="ml-2">&#9662;</span>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white text-black rounded shadow-lg">
          {frameworks.map((framework) => (
            <div
              key={framework.value}
              onClick={() => {
                onSelect(framework);
                setIsOpen(false);
              }}
              className="flex items-center p-2 hover:bg-gray-200 cursor-pointer"
            >
              <Image
                src={framework.image}
                alt={framework.name}
                className="mr-2"
                height={6}
                width={6}
              />
              <span>{framework.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownFrameworkField;