import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useState } from 'react';

function DepositDialog({ onClose, onDeposit }) {
  const [amount, setAmount] = useState('');

  const handleDeposit = () => {
    const numericAmount = parseInt(amount, 10); // Parse as an integer
    if (!isNaN(numericAmount) && numericAmount > 0) {
      onDeposit(numericAmount);
    } else {
      alert('Please enter a valid amount'); // Optional: Notify the user if the amount is invalid
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white p-6 h-96 w-96 rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-start">
          <Image src={'/images/eyesdown.svg'} height={50} width={50} className="mb-3" alt="Deposit Icon" />
          <h3 className="text-3xl font-bold mb-4 mt-4 text-center">Deposit Money</h3>
          <p className="text-gray-600 mb-4 text-center">Add money to your wallet to make seamless transactions.</p>
        </div>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="mb-4 p-3 border rounded-md w-full text-center text-lg"
        />
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md mr-2 hover:bg-gray-400 transition duration-150"
          >
            Cancel
          </button>
          <button
            onClick={handleDeposit}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-150"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}

export default DepositDialog;
