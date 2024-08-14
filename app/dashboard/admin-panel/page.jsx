"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import { db } from '@/utils/db';
import * as schema from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from 'next/image';

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

const EditDialog = ({ open, onOpenChange, title, value, onSave }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value); // Update input value when the dialog opens
  }, [value]);

  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="mb-4"
        />
        <DialogFooter>
          <Button onClick={() => onSave(inputValue)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const AdminPanel = () => {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchColumn, setSearchColumn] = useState('order_id');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [editDialog, setEditDialog] = useState({ open: false, field: '', orderId: '', value: '' });

  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const email = user.primaryEmailAddress.emailAddress;

        // Fetch user data
        const fetchedUser = await db
          .select()
          .from(schema.UserData)
          .where(eq(schema.UserData.email, email))
          .then(result => result[0]);

        if (fetchedUser && fetchedUser.isAdmin) {
          setIsAdmin(true);
          const fetchedOrders = await db.select().from(schema.OrderData);
          setOrders(fetchedOrders);
          setFilteredOrders(fetchedOrders);
        } else {
          router.push('/dashboard');
        }
        setLoading(false);
      }
    };

    checkAdmin();
  }, [user, router]);

  const updateOrderField = async (orderId, field, newValue) => {
    try {
      await db
        .update(schema.OrderData)
        .set({ [field]: newValue })
        .where(eq(schema.OrderData.order_id, orderId));
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === orderId ? { ...order, [field]: newValue } : order
        )
      );
    } catch (error) {
      console.error('Error updating order field:', error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await db
        .update(schema.OrderData)
        .set({ status: newStatus })
        .where(eq(schema.OrderData.order_id, orderId));
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleEditSave = (newValue) => {
    updateOrderField(editDialog.orderId, editDialog.field, newValue);
    setEditDialog({ open: false, field: '', orderId: '', value: '' });
  };

  useEffect(() => {
    const filtered = orders.filter(order => {
      const value = order[searchColumn]?.toString().toLowerCase();
      return value && value.includes(searchTerm.toLowerCase());
    });
    setFilteredOrders(filtered);
  }, [searchTerm, searchColumn, orders]);

  if (loading) {
    return <LoadingComponent />;
  }

  if (!isAdmin) {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <button
          onClick={() => router.push('/dashboard')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>
      <div className="bg-white p-6 rounded shadow">
        <div className="mb-6 flex items-center">
          <h2 className="text-2xl font-semibold mr-4">Orders</h2>
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 border rounded mr-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={searchColumn}
            onChange={(e) => setSearchColumn(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="order_id">Order ID</option>
            <option value="userEmail">User Email</option>
            <option value="date">Date</option>
            <option value="paymentId">Payment ID</option>
            <option value="otp">OTP</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                {Object.keys(schema.OrderData).map((key) => (
                  <TableHead key={key}>{key}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.order_id}>
                  {Object.keys(schema.OrderData).map((key) => (
                    <TableCell
                      key={key}
                      className="whitespace-nowrap"
                      onClick={() => setEditDialog({ open: true, field: key, orderId: order.order_id, value: order[key] })}
                    >
                      {order[key]}
                    </TableCell>
                  ))}
                  <TableCell className="whitespace-nowrap">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">{order.status}</button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.order_id, 'Order Placed')}>Order Placed</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.order_id, 'Out for delivery')}>Out for delivery</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.order_id, 'In-Transit')}>In-Transit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.order_id, 'Delivered')}>Delivered</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.order_id, 'Completed')}>Completed</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.order_id, 'Return to Origin (RTO)')}>Return to Origin (RTO)</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <EditDialog
        open={editDialog.open}
        onOpenChange={(open) => setEditDialog({ ...editDialog, open })}
        title={`Edit ${editDialog.field}`}
        value={editDialog.value}
        onSave={handleEditSave}
      />
    </div>
  );
};

export default AdminPanel;
