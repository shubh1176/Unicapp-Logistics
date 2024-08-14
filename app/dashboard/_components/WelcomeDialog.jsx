import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const WelcomeDialog = ({ onClose }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    onClose();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-3xl h-full max-h-[80vh] p-10">
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
          <p className="text-gray-500 mb-6">Your account has been successfully created.</p>
          <button
            onClick={handleClose}
            className="px-6 py-3 bg-yellow-400 text-white rounded-xl hover:bg-yellow-500 w-80"
          >
            Get Started
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeDialog;
