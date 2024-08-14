import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const OtpDialog = ({ onSubmit }) => {
  const [open, setOpen] = useState(true);
  const [otp, setOtp] = useState('');

  const handleSubmit = () => {
    if (otp) {
      onSubmit(otp);
      setOpen(false);
    } else {
      console.error('OTP is required');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-3xl h-full max-h-[80vh] p-10">
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-semibold mb-4">Enter OTP</h2>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="OTP"
            className="mb-4 p-2 border rounded"
          />
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-yellow-400 text-white rounded-xl hover:bg-yellow-500 w-80"
          >
            Verify OTP
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OtpDialog;
