import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const RoleSelectionDialog = ({ onSelect }) => {
  const [open, setOpen] = useState(true);
  const [selectedRole, setSelectedRole] = useState('Individual');

  const handleSelect = () => {
    onSelect(selectedRole);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-3xl h-full max-h-[80vh] p-10">
        <div className="flex flex-col items-center justify-center h-full">
          <img src="/images/blackonwhitelogo.svg" alt="Logo" className="mb-8" />
          <h2 className="text-2xl font-semibold mb-4">How can we define you better?</h2>
          <p className="text-gray-500 mb-6">We'll fit your experience to your needs. Don't worry, you can change it later.</p>
          <div className="flex mb-6 gap-4">
            <button
              onClick={() => setSelectedRole('Individual')}
              className={`w-40 h-48 border rounded-xl flex flex-col items-center justify-center gap-4 ${selectedRole === 'Individual' ? 'bg-blue-100' : 'bg-white'}`}
            >
              <img src="/images/Customer.svg" alt="Individual" className="w-12 h-12" />
              <span>Individual</span>
            </button>
            <button
              onClick={() => setSelectedRole('Business')}
              className={`w-40 h-48 border rounded-xl flex flex-col items-center justify-center gap-4 ${selectedRole === 'Business' ? 'bg-blue-100' : 'bg-white'}`}
            >
              <img src="/images/office.svg" alt="Business" className="w-12 h-12" />
              <span>Business</span>
            </button>
          </div>
          <button
            onClick={handleSelect}
            className="px-6 py-3 bg-yellow-400 text-white rounded-xl hover:bg-yellow-500 w-80"
          >
            Unicapp it!
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoleSelectionDialog;
