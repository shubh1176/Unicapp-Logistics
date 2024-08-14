"use client";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { House, MessageSquare, Package, ScrollText, ShieldCheck, User, Wallet } from 'lucide-react';

const Sidebar = ({ userData }) => {
  const router = useRouter();

  return (
    <aside className="w-64 bg-[#470a68] text-white flex-shrink-0">
      <div className="flex items-center justify-between bg-[#470a68] p-4">
        <Image src={'/images/whiteonpurple.svg'} height={100} width={150} alt="Logo" />
      </div>
      <div className="p-4">
        <nav className="mt-4">
          <ul>
            <li>
              <button
                onClick={() => router.push('/dashboard/home')}
                className={`w-full text-left py-2 px-4 rounded flex items-center gap-2 hover:bg-[#c964cf] ${router.pathname === '/dashboard/home' ? 'bg-[#c964cf]' : ''}`}
              >
                <House className="w-6 h-6" strokeWidth={1.25} /> Home
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push('/dashboard/account')}
                className={`w-full text-left py-2 px-4 rounded flex items-center gap-2 hover:bg-[#c964cf] ${router.pathname === '/dashboard/account' ? 'bg-[#c964cf]' : ''}`}
              >
                <User className="w-6 h-6" strokeWidth={1.25} /> Account
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push('/dashboard/wallet')}
                className={`w-full text-left py-2 px-4 rounded flex items-center gap-2 hover:bg-[#c964cf] ${router.pathname === '/dashboard/wallet' ? 'bg-[#c964cf]' : ''}`}
              >
                <Wallet className="w-6 h-6" strokeWidth={1.25} /> Wallet
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push('/dashboard/orders')}
                className={`w-full text-left py-2 px-4 rounded flex items-center gap-2 hover:bg-[#c964cf] ${router.pathname === '/dashboard/orders' ? 'bg-[#c964cf]' : ''}`}
              >
                <Package className="w-6 h-6" strokeWidth={1.25} /> Orders
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push('/dashboard/invoices')}
                className={`w-full text-left py-2 px-4 rounded flex items-center gap-2 hover:bg-[#c964cf] ${router.pathname === '/dashboard/invoices' ? 'bg-[#c964cf]' : ''}`}
              >
                <ScrollText className="w-6 h-6" strokeWidth={1.25} /> Invoices
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push('/dashboard/messages')}
                className={`w-full text-left py-2 px-4 rounded flex items-center gap-2 hover:bg-[#c964cf] ${router.pathname === '/dashboard/messages' ? 'bg-[#c964cf]' : ''}`}
              >
                <MessageSquare className="w-6 h-6" strokeWidth={1.25} /> Messages
              </button>
            </li>
            {userData?.isAdmin && (
              <li>
                <button
                  onClick={() => router.push('/dashboard/admin-panel')}
                  className="w-full text-left py-2 px-4 rounded flex items-center gap-2 hover:bg-[#c964cf]"
                >
                  <ShieldCheck className="w-6 h-6" strokeWidth={1.25} /> Admin Panel
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
