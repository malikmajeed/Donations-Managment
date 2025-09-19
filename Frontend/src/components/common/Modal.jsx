import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  maxWidth = 'max-w-4xl',
  showCloseButton = true,
  showHeader = true,
  footer
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[60]" />
        <Dialog.Content className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full ${maxWidth} h-[90vh] overflow-hidden bg-white rounded-lg shadow-xl z-[60]`}>
          <div className="flex flex-col h-full">
            {/* Header - Fixed */}
            {showHeader && (
              <div className="flex justify-between items-start p-6 border-b border-gray-200">
                {title && (
                  <Dialog.Title className="text-2xl font-bold text-gray-800">
                    {title}
                  </Dialog.Title>
                )}
                {showCloseButton && (
                  <Dialog.Close className="text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none">
                    <X className="w-6 h-6" />
                  </Dialog.Close>
                )}
              </div>
            )}

            {/* Close button without header */}
            {!showHeader && showCloseButton && (
              <Dialog.Close className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none z-10">
                <X className="w-6 h-6" />
              </Dialog.Close>
            )}

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                {footer}
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
