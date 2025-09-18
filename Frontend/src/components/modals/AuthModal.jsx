import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { AuthenticationForm } from '../common/AuthenticationForm';

const AuthModal = ({ type = 'login', isOpen, onClose }) => {
  const [currentType, setCurrentType] = useState(type);

  const handleTypeChange = (newType) => {
    setCurrentType(newType);
  };

  // Update currentType when prop changes
  React.useEffect(() => {
    setCurrentType(type);
  }, [type]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white shadow-xl overflow-hidden z-[60] max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 hover:text-gray-700 transition-all duration-200 z-10 focus:outline-none">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </Dialog.Close>

          {/* Modal Content */}
          <div className="p-6">
            <AuthenticationForm 
              type={currentType} 
              onTypeChange={handleTypeChange}
              onSuccess={onClose}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AuthModal;
