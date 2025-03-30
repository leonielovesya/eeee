import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface ModalProps {
  children?: React.ReactNode;  
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const WelcomeModal: React.FC<ModalProps> = ({ 
  children, 
  open, 
  onOpenChange 
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to minigpt!</DialogTitle>
          <DialogDescription>
            This is still in beta!
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
