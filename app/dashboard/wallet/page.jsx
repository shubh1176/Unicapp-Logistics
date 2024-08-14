"use client";
import { useEffect, useState } from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
import { useRouter } from 'next/navigation';
import { db } from '@/utils/db';
import * as schema from '@/utils/schema';
import { eq } from 'drizzle-orm';
import moment from 'moment';
import Image from 'next/image';
import DepositDialog from './_components/DepositDialog';
import { CircleArrowUp, CircleUserRound, House, ShieldCheck, WalletMinimal } from 'lucide-react';


const svgArray = [
  '/images/loading1.svg',
  '/images/loading2.svg',
  '/images/loading3.svg',
  '/images/loading4.svg',
  '/images/loading5.svg'
];

const LoadingComponent = () => {
  const [currentSvgIndex, setCurrentSvgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSvgIndex((prevIndex) => (prevIndex + 1) % svgArray.length);
    }, 200); // Change SVG every 200ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4">
        <Image src={svgArray[currentSvgIndex]} alt="Loading animation" width={50} height={50} />
      </div>
      <div>
        <span className="text-lg font-medium">Loading</span>
      </div>
    </div>
  );
};

function WalletPage() {
  const { user } = useUser();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDepositDialog, setShowDepositDialog] = useState(false);

  useEffect(() => {
    if (user) {
      const loadUserData = async () => {
        try {
          const email = user.primaryEmailAddress.emailAddress;

          // Fetch user data including wallet balance and transactions
          const fetchedUserData = await db
            .select()
            .from(schema.UserData)
            .leftJoin(schema.TransactionData, eq(schema.TransactionData.userEmail, schema.UserData.email))
            .where(eq(schema.UserData.email, email))
            .then(result => {
              if (!result || !result.length) return null;
              const userData = {
                ...result[0].UserData,
                transactions: result
                  .filter(row => row.TransactionData !== null) // Ensure TransactionData is not null
                  .map(row => ({
                    transaction_id: row.TransactionData.transaction_id,
                    amount: row.TransactionData.amount,
                    date: row.TransactionData.date,
                    description: row.TransactionData.description,
                  }))
              };
              return userData;
            });

          setUserData(fetchedUserData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      };

      loadUserData();
    }
  }, [user]);

  const generateTransactionId = () => {
    return `#trnc_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleDeposit = async (amount) => {
    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const order = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Unicapp Logistics',
        description: 'Deposit to wallet',
        order_id: order.id,
        handler: async (response) => {
          try {
            const newBalance = parseFloat(userData.wallet) + amount;

            // Update wallet balance in the database
            await db.update(schema.UserData)
              .set({ wallet: newBalance })
              .where(eq(schema.UserData.email, user.primaryEmailAddress.emailAddress))
              .execute();

            // Create a transaction record
            await db.insert(schema.TransactionData)
              .values({
                transaction_id: generateTransactionId(),
                userEmail: user.primaryEmailAddress.emailAddress,
                amount,
                date: new Date().toISOString(),
                description: 'Wallet Deposit',
              })
              .execute();

            // Fetch updated user data
            const updatedUserData = await db
              .select()
              .from(schema.UserData)
              .leftJoin(schema.TransactionData, eq(schema.TransactionData.userEmail, schema.UserData.email))
              .where(eq(schema.UserData.email, user.primaryEmailAddress.emailAddress))
              .then(result => {
                if (!result || !result.length) return null;
                const userData = {
                  ...result[0].UserData,
                  transactions: result
                    .filter(row => row.TransactionData !== null) // Ensure TransactionData is not null
                    .map(row => ({
                      transaction_id: row.TransactionData.transaction_id,
                      amount: row.TransactionData.amount,
                      date: row.TransactionData.date,
                      description: row.TransactionData.description,
                    }))
                };
                return userData;
              });

            setUserData(updatedUserData);
            setShowDepositDialog(false);
          } catch (error) {
            console.error('Error updating wallet balance:', error);
          }
        },
        prefill: {
          email: user.primaryEmailAddress.emailAddress,
        },
        theme: {
          color: '#9E3CE1',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {showDepositDialog && (
        <DepositDialog
          onClose={() => setShowDepositDialog(false)}
          onDeposit={handleDeposit}
        />
      )}

      <div className="flex flex-grow">
        <aside className="w-64 bg-gradient-to-b from-[#470a68] to-[#8D14CE] text-white flex-shrink-0">
          <div className="flex items-center justify-between p-4 mt-7">
            <Image src={'/images/yellowcaplogo.svg'} height={50} width={150} alt="Logo" onClick={()=>router.replace('/')} className="hover:cursor-pointer"/>
          </div>
          <div className="p-4">
            <nav className="mt-4">
              <ul>
                <li>
                  <a href="/dashboard" className="flex py-2 px-4 rounded items-center gap-2 mb-2 hover:bg-[#c964cf]">
                  <CircleUserRound /> Account
                  </a>
                </li>
                <li>
                  <a href="/dashboard/wallet" className=" py-2 px-4 rounded flex items-center gap-2 mb-2 hover:bg-[#c964cf] bg-[#c964cf]">
                    <WalletMinimal /> Wallet
                  </a>
                </li>
                {userData?.isAdmin && (
                  <li>
                    <a href="/dashboard/admin-panel" className=" py-2 px-4 rounded flex items-center gap-2 mb-2 hover:bg-[#c964cf]">
                      <ShieldCheck /> Admin Panel
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-6">
          <header className="flex items-center justify-between p-4 bg-white shadow-lg w-full mb-10">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard/booking/location')}
                className="px-4 py-2 bg-[#FFDD00] font-filson text-black rounded-xl hover:bg-[#ffdd00c9]"
              >
                + Book a new pickup
              </button>
            </div>
            <div className="flex items-center space-x-4 border-2 rounded-lg py-2 px-3">
              <UserButton />
              <div>
                <p className="text-lg font-semibold">{user?.fullName || 'Guest'}</p>
              </div>
            </div>
          </header>
          <h2 className="text-2xl font-bold mb-4">Wallet</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex flex-col mb-4 gap-6">
              <div className="text-gray-500">CURRENT BALANCE</div>
              <div className="text-5xl font-bold">₹ {userData?.wallet || '0'}</div>
            </div>
            <div className="flex flex-row justify-start mt-16 gap-5">
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-md flex flex-row gap-3"
                onClick={() => setShowDepositDialog(true)}
              >
                Deposit <CircleArrowUp />
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h3 className="text-xl font-bold mb-4">Transaction History</h3>
            {userData?.transactions?.length > 0 ? (
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b text-left">Date</th>
                    <th className="py-2 px-4 border-b text-left">Amount</th>
                    <th className="py-2 px-4 border-b text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.transactions.map((transaction, index) => (
                    <tr key={transaction.transaction_id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-2 px-4 border-b">{moment(transaction.date).format('MMMM Do YYYY, h:mm:ss a')}</td>
                      <td className="py-2 px-4 border-b">₹ {transaction.amount}</td>
                      <td className="py-2 px-4 border-b">{transaction.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-gray-700">No transactions found.</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default WalletPage;
