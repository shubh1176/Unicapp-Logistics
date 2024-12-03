"use client";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { UserButton, useUser, useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { db } from "@/utils/db";
import * as schema from "@/utils/schema";
import moment from "moment";
import { eq, and } from "drizzle-orm";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  ShieldCheck,
  Truck,
  WalletMinimal,
  ChevronUp,
  Menu,
  X,
  LogOut,
  ChevronDown,
  UserRound,
  Save,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"; // Import Dialog components
import { Button } from "@/components/ui/button"; // Assuming Button is here
import { preferredTimeSlotState } from "@/recoil/store"; // Recoil state for preferredTimeSlot
import SaveAddressComponent from "@/components/SaveAddressComponent";
import DashboardMobileHeader from "@/components/DashboardMobileHeader";

const svgArray = [
  "/images/loading1.svg",
  "/images/loading2.svg",
  "/images/loading3.svg",
  "/images/loading4.svg",
  "/images/loading5.svg",
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
        <Image
          src={svgArray[currentSvgIndex]}
          alt="Loading animation"
          width={50}
          height={50}
        />
      </div>
      <div>
        <span className="text-lg font-medium">Loading</span>
      </div>
    </div>
  );
};

function DashboardPage() {
  const { user } = useUser();
  const { signOut } = useClerk(); // Add signOut from Clerk
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [individualOrders, setIndividualOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar state
  const [activeTab, setActiveTab] = useState("pickupDrop"); // Active tab state
  const [preferredTimeSlot, setPreferredTimeSlot] = useRecoilState(
    preferredTimeSlotState
  ); // Time slot state
  const [timeSlotDialogOpen, setTimeSlotDialogOpen] = useState(false); // Added state for Dialog open/close

  const timeSlots = [
    "09:00 - 10:00 AM",
    "10:00 - 11:00 AM",
    "11:00 - 12:00 PM",
    "12:00 - 01:00 PM",
    "01:00 - 02:00 PM",
    "02:00 - 03:00 PM",
    "03:00 - 04:00 PM",
    "04:00 - 05:00 PM",
    "05:00 - 06:00 PM",
  ];

  useEffect(() => {
    if (user) {
      const loadData = async () => {
        try {
          console.log(
            "Fetching user data for email:",
            user.primaryEmailAddress.emailAddress
          );
          const email = user.primaryEmailAddress.emailAddress;

          // Fetch user data
          const fetchedUser = await db
            .select()
            .from(schema.UserData)
            .where(eq(schema.UserData.email, email))
            .execute();

          console.log("Fetched user data:", fetchedUser);

          if (fetchedUser.length === 0) {
            console.log("User does not exist, redirecting to role selection");
            router.push("/dashboard/onboarding/role");
            return;
          }

          const userData = fetchedUser[0];
          setUserData(userData);

          if (!userData.onboarded) {
            console.log("User is not onboarded, redirecting to role selection");
            router.push("/dashboard/onboarding/role");
            return;
          }

          if (userData.onboarded && !userData.verified) {
            console.log(
              "User is onboarded but not verified, redirecting to number verification"
            );
            router.push("/dashboard/onboarding/number-verification");
            return;
          }

          if (userData.role === "Business" && userData.verified) {
            console.log(
              "User is a verified business, checking organization data"
            );
            const orgData = await db
              .select()
              .from(schema.OrganizationData)
              .where(eq(schema.OrganizationData.userEmail, email))
              .execute();

            console.log("Fetched organization data:", orgData);

            if (orgData.length === 0) {
              console.log(
                "Business user has not completed organization onboarding, redirecting to organization onboarding"
              );
              router.push("/dashboard/onboarding/business/organisation");
              return;
            }
          }

          // Fetch orders for Business
          console.log("Fetching orders for email:", email);
          const fetchedOrders = await db
            .select()
            .from(schema.OrderData)
            .where(eq(schema.OrderData.userEmail, email))
            .execute();

          console.log("Fetched orders:", fetchedOrders);

          setOrders(fetchedOrders);
          setFilteredOrders(fetchedOrders);

          // Fetch orders for Individual role
          const fetchedIndividualOrders = await db
            .select()
            .from(schema.OrderData)
            .where(
              and(
                eq(schema.OrderData.userEmail, email),
                eq(schema.OrderData.user_role, "Individual")
              )
            )
            .execute();

          console.log("Fetched individual orders:", fetchedIndividualOrders);

          setIndividualOrders(fetchedIndividualOrders);

          // Open the dialog if preferredTimeSlot is empty
          if (!userData.preferredTimeSlot) {
            setPreferredTimeSlot("");
          }
        } catch (error) {
          console.error("Error fetching user data and orders:", error);
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }
  }, [user]);

  useEffect(() => {
    if (statusFilter) {
      setFilteredOrders(
        orders.filter((order) => order.status === statusFilter)
      );
    } else {
      setFilteredOrders(orders);
    }
  }, [statusFilter, orders]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Order Placed":
        return "bg-blue-100 text-blue-500";
      case "Out for delivery":
        return "bg-green-100 text-green-500";
      case "In-Transit":
        return "bg-yellow-100 text-yellow-500";
      case "Delivered":
        return "bg-green-200 text-green-700";
      case "Completed":
        return "bg-gray-200 text-gray-700";
      case "Return to Origin (RTO)":
        return "bg-red-100 text-red-500";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const toggleRole = async (newValue) => {
    if (userData) {
      const newRole = newValue ? "Business" : "Individual";

      try {
        // Update role in the database
        await db
          .update(schema.UserData)
          .set({ role: newRole })
          .where(eq(schema.UserData.email, userData.email))
          .execute();

        // Update state with new role
        setUserData({ ...userData, role: newRole });
        // window.location.reload(); // Refresh the page
      } catch (error) {
        console.error("Error updating user role:", error);
      }
    }
  };

  const handleTimeSlotChange = (e) => {
    setPreferredTimeSlot(e.target.value);
  };

  const handleConfirmTimeSlot = async () => {
    if (userData && preferredTimeSlot) {
      try {
        // Update the user's preferred time slot in the database
        await db
          .update(schema.UserData)
          .set({ preferredTimeSlot })
          .where(eq(schema.UserData.email, userData.email))
          .execute();

        // Optionally reload or update the user data in state
        setUserData({ ...userData, preferredTimeSlot });
        setTimeSlotDialogOpen(false); // Close dialog after successful update
      } catch (error) {
        console.error("Error updating preferred time slot:", error);
      }
    }
  };

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const orderCount = (status) =>
    orders.filter((order) => order.status === status).length;

  const filteredIndividualOrders =
    activeTab === "pickupDrop"
      ? individualOrders.filter((order) => order.order_type === "Pickup & Drop")
      : individualOrders.filter((order) => order.order_type === "Courier");

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-transparent lg:bg-gradient-to-b lg:from-[#470a68] lg:to-[#8D14CE]    ">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 bg-gradient-to-b from-[#470a68] to-[#8D14CE] text-white w-52 lg:w-[15%] transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:relative lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 mt-7 ml-3">
          <Image
            height={200}
            width={200}
            src={"/images/yellowwhiteonpurple.svg"}
            onClick={() => router.replace("/")}
            className="hover:cursor-pointer"
          ></Image>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <div className="p-4">
          <nav className="mt-4">
            <ul>
              <li>
                <button
                  onClick={() => router.push("/dashboard")}
                  className="w-full flex py-2 px-4 rounded items-center gap-2 mb-2 hover:bg-[#c964cf] bg-[#c964cf]"
                >
                  <CircleUserRound /> Account
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/dashboard/wallet")}
                  className="w-full py-2 px-4 rounded flex items-center gap-2 mb-2 hover:bg-[#c964cf]"
                >
                  <WalletMinimal /> Wallet
                </button>
              </li>
              {userData?.isAdmin && (
                <li>
                  <button
                    onClick={() => router.push("/dashboard/admin-panel")}
                    className="py-2 px-4 rounded flex items-center gap-2 mb-2 hover:bg-[#c964cf]"
                  >
                    <ShieldCheck /> Admin Panel
                  </button>
                </li>
              )}
              <li className="">
                {/* Sign Out Button for small screens */}
                <button
                  onClick={signOut}
                  className="flex items-center gap-2 py-2 px-4 text-left w-full hover:bg-[#c964cf]"
                >
                  <LogOut size={20} /> Sign Out
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <DashboardMobileHeader /> {/* shown on small screens only */}
      {/* Main Content */}
      <div className="lg:w-[85%] lg:h-screen lg:p-3">
        <div className="flex flex-col flex-grow bg-white rounded-lg overflow-y-scroll h-full hide-scrollbar  lg:my-auto">
          {/* Header for Large Screens */}
          <header className="hidden lg:flex items-center justify-between pt-4 pb-3 px-4  w-full mb-3">
            <div className="flex items-center space-x-4 lg:justify-between w-full">
              <button
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu size={24} />
              </button>
              <button
                onClick={() => router.push("/dashboard/booking/location")}
                className="px-4 py-2 bg-[#FFDD00] font-filson text-black rounded-xl hover:bg-[#ffdd00c9]"
              >
                + Book a new pickup
              </button>
              <div className="flex items-center space-x-2">
                {userData && (
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={userData.role === "Business"}
                      onCheckedChange={toggleRole}
                      id="role-switch"
                    />
                    <label
                      htmlFor="role-switch"
                      className="text-lg font-semibold"
                    >
                      {/* {userData.role === "Business" ? "Business" : "Individual"}
                       */}
                      Business
                    </label>
                  </div>
                )}
                <div className="hidden lg:flex items-center border-2 rounded-lg py-1 px-3">
                  {/* Combined Dropdown for account, wallet, and sign out */}
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 text-lg">
                      {user?.fullName || "Guest"}
                      <ChevronDown />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Dialog
                        open={timeSlotDialogOpen}
                        onOpenChange={setTimeSlotDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <DropdownMenuItem>
                            Select Preferred Time Slot
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Select Your Preferred Time Slot
                            </DialogTitle>
                          </DialogHeader>
                          <select
                            value={preferredTimeSlot}
                            onChange={handleTimeSlotChange}
                            className="p-2 border border-gray-300 rounded w-full"
                          >
                            <option value="">Select a time slot</option>
                            {timeSlots.map((slot) => (
                              <option key={slot} value={slot}>
                                {slot}
                              </option>
                            ))}
                          </select>
                          <DialogFooter>
                            <Button
                              onClick={handleConfirmTimeSlot}
                              disabled={!preferredTimeSlot}
                            >
                              Confirm
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <DropdownMenuItem onClick={signOut}>
                        <LogOut size={16} /> Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </header>
          <hr className="border-gray-200 border-1 w-full" />

          {/* Content based on role */}
          {userData?.role === "Business" ? (
            <div className="flex-1 bg-gray-50 rounded-lg">
              {/* Business User Content */}
              <h1 className="text-3xl font-generalSemiBold mb-4 ml-6 mt-4">
                Welcome {user?.firstName} 👋
              </h1>
              <div className="p-4 mb-4 -translate-x-3.5 ml-6">
                <h3 className="text-2xl font-generalMedium mb-5">
                  Orders Summary
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-3xl shadow bg-[#F5F5F5] text-center flex flex-col h-40">
                    <div className="flex flex-row justify-between">
                      <p className="text-gray-500 font-filson">Total Orders</p>
                      <Image
                        src={"/images/Truck.svg"}
                        width={30}
                        height={30}
                        alt="Truck"
                      />
                    </div>
                    <p className="text-4xl font-bold mt-10">{orders.length}</p>
                  </div>
                  <div className="p-4 rounded-3xl shadow bg-[#F5F5F5] text-center flex flex-col h-40">
                    <div className="flex flex-row justify-between">
                      <p className="text-gray-500 font-filson">Order Placed</p>
                      <Image
                        src={"/images/Boxes.svg"}
                        width={30}
                        height={30}
                        alt="Boxes"
                      />
                    </div>
                    <p className="text-4xl font-bold mt-10">
                      {orderCount("Order Placed")}
                    </p>
                  </div>
                  <div className="p-4 rounded-3xl shadow bg-[#F5F5F5] text-center flex flex-col h-40">
                    <div className="flex flex-row justify-between">
                      <p className="text-gray-500 font-filson">In-Transit</p>
                      <Image
                        src={"/images/return.svg"}
                        width={30}
                        height={30}
                        alt="Return"
                      />
                    </div>
                    <p className="text-4xl font-bold mt-10">
                      {orderCount("In-Transit")}
                    </p>
                  </div>
                  <div className="p-4 rounded-3xl shadow bg-[#F5F5F5] text-center flex flex-col h-40">
                    <div className="flex flex-row justify-between">
                      <p className="text-gray-500 font-filson">
                        Return to Origin (RTO)
                      </p>
                      <Image
                        src={"/images/chart.svg"}
                        width={30}
                        height={30}
                        alt="Chart"
                      />
                    </div>
                    <p className="text-4xl font-bold mt-10">
                      {orderCount("Return to Origin (RTO)")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white  ml-6 mr-6">
                <h2 className="text-2xl  font-generalMedium mt-5 mb-8">
                  Delivery Reports
                </h2>

                <div className="flex justify-between items-center  mb-4">
                  <div className="flex w-full pl-7 space-x-8 border-b border-gray-300">
                    {[
                      { label: "All Deliveries", value: "" },
                      { label: "In-Transit", value: "In-Transit" },
                      { label: "Scheduled", value: "Scheduled" },
                      { label: "Completed", value: "Completed" },
                      { label: "Failed Attempts", value: "Failed Attempts" },
                      { label: "Returns", value: "Returns" },
                    ].map((filter) => (
                      <button
                        key={filter.value}
                        onClick={() => setStatusFilter(filter.value)}
                        className={`relative pb-4  text-sm font-medium ${
                          statusFilter === filter.value
                            ? "text-[#0094B2]"
                            : "text-gray-700 hover:text-gray-900"
                        }`}
                      >
                        {filter.label}
                        {statusFilter === filter.value && (
                          <span
                            className="absolute bottom-0 left-0 h-[2px] bg-[#0094B2] w-full"
                            style={{
                              transition: "width 0.3s ease-in-out",
                            }}
                          ></span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredOrders.length > 0 ? (
                  <>
                    <div className="overflow-x-auto rounded shadow max-w-full">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-200">
                            <TableHead className="font-filson ">
                              Order ID
                            </TableHead>
                            <TableHead className="font-filson">
                              Delivery Type:
                            </TableHead>
                            <TableHead className="font-filson">Date</TableHead>
                            <TableHead className="font-filson">
                              Weight
                            </TableHead>
                            <TableHead className="font-filson">
                              Status
                            </TableHead>
                            <TableHead className="font-filson">
                              Special Instructions
                            </TableHead>
                            <TableHead className="font-filson">
                              Amount
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {currentOrders.map((order) => (
                            <>
                              <TableRow
                                key={order.order_id}
                                onClick={() =>
                                  setExpandedOrderId(
                                    order.order_id === expandedOrderId
                                      ? null
                                      : order.order_id
                                  )
                                }
                              >
                                <TableCell>{order.order_id}</TableCell>
                                <TableCell>
                                  {order.deliveryType || "N/A"}
                                </TableCell>
                                <TableCell>
                                  {moment(order.date).format("LL")}
                                </TableCell>
                                <TableCell>{order.weight} kg</TableCell>
                                <TableCell className="flex items-center mt-2">
                                  <div
                                    className={`${getStatusStyle(
                                      order.status
                                    )} rounded-2xl px-4 `}
                                  >
                                    <span>{order.status}</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  {order.specialInstructions}
                                </TableCell>
                                <TableCell>₹{order.amount}</TableCell>
                              </TableRow>
                              {expandedOrderId === order.order_id && (
                                <TableRow key={`${order.order_id}-details`}>
                                  <TableCell colSpan={7}>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 py-0  ">
                                      <div className="flex flex-col border rounded-lg bg-gray-50 px-4 py-0 pb-6">
                                        <div className="flex flex-row gap-2 mt-3">
                                          <Truck size={20} strokeWidth={1.25} />{" "}
                                          <h4 className="font-bold mb-4">
                                            {" "}
                                            ORDER DETAILS
                                          </h4>
                                        </div>
                                        <div className="flex flex-wrap gap-4 justify-between">
                                          <div>
                                            <p className="font-generalMedium text-gray-400">
                                              ORDER DATE:
                                            </p>{" "}
                                            <p className="text-gray-800">
                                              {moment(order.date).format("LL")}
                                            </p>
                                          </div>
                                          <div>
                                            <p className="font-generalMedium text-gray-400">
                                              DELIVERY TYPE:
                                            </p>{" "}
                                            <p className="text-gray-800">
                                              {order.deliveryType || "N/A"}
                                            </p>
                                          </div>
                                          <div>
                                            <p className="font-generalMedium text-gray-400">
                                              DELIVERY FEES:
                                            </p>{" "}
                                            <p className="text-gray-800">
                                              {order.deliveryFees || "N/A"}
                                            </p>
                                          </div>
                                          <div>
                                            <p className="font-generalMedium text-gray-400 mr-5">
                                              INSURANCE:
                                            </p>{" "}
                                            <p className="text-gray-800">
                                              {order.insurance || "N/A"}
                                            </p>
                                          </div>
                                          <div>
                                            <p className="font-generalMedium text-gray-400 ">
                                              WEIGHT / DIMENSION:
                                            </p>{" "}
                                            <p className="text-gray-800">
                                              {order.weight || "N/A"} kg (
                                              {order.length}cm x {order.width}cm
                                              x {order.height}cm)
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex flex-col border rounded-lg bg-gray-50 px-4 py-2 pb-6">
                                        <div className="flex flex-row gap-2 mt-0">
                                          <UserRound
                                            size={20}
                                            strokeWidth={1.25}
                                          />{" "}
                                          <span className="font-bold mb-4">
                                            CUSTOMER INFORMATION
                                          </span>
                                        </div>
                                        <div className="flex flex-row  gap-10 justify-between">
                                          <div className="text-sm">
                                            <p className="font-generalMedium text-gray-400 text-base">
                                              FROM:
                                            </p>{" "}
                                            <p className="text-gray-800">
                                              {order.pickupLocation || "N/A"}
                                            </p>
                                          </div>
                                          <div className="text-sm">
                                            <p className="font-generalMedium text-gray-400 text-base">
                                              TO:
                                            </p>{" "}
                                            <p className="text-gray-800">
                                              {order.dropLocation || "N/A"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex flex-col border rounded-lg bg-gray-50 px-4 py-2 pb-6">
                                        <div className="flex flex-row gap-2 mt-0">
                                          <Truck size={20} strokeWidth={1.25} />
                                          <h4 className="font-bold mb-4">
                                            {" "}
                                            DELIVERY INFORMATION
                                          </h4>
                                        </div>
                                        <div>
                                          <p className="font-generalMedium text-gray-400 text-base">
                                            SHIPPED THROUGH:
                                          </p>{" "}
                                          <p className="text-gray-800">
                                            {order.shipping_service || "N/A"}
                                          </p>
                                        </div>
                                        <div>
                                          <p className="font-generalMedium text-gray-400 text-base">
                                            TRACKING NUMBER:
                                          </p>{" "}
                                          <p className="text-gray-800">
                                            {" "}
                                            {order.Tracking_number || "N/A"}
                                          </p>
                                        </div>
                                        <div>
                                          <p className="font-generalMedium text-gray-400 text-base">
                                            TRACKING LINK:
                                          </p>{" "}
                                          <p className="text-gray-800">
                                            {" "}
                                            {order.Tracking_link || "N/A"}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              )}
                            </>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    <div className="flex justify-between items-center mt-4  mb-4 rounded border">
                      <div className="flex gap-2 items-center  ">
                        <div className="mt-0">
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <button className="px-4 py-3 font-filson bg-white border-r border-gray-300  text-gray-700 hover:bg-gray-100 flex flex-row gap-1">
                                {itemsPerPage} <ChevronUp />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => setItemsPerPage(5)}
                              >
                                5
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setItemsPerPage(10)}
                              >
                                10
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setItemsPerPage(15)}
                              >
                                15
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setItemsPerPage(20)}
                              >
                                20
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setItemsPerPage(50)}
                              >
                                50
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <span className="text-gray-700 ">
                          {`${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
                            currentPage * itemsPerPage,
                            filteredOrders.length
                          )} of ${filteredOrders.length} Orders`}
                        </span>
                      </div>
                      <div className="flex  items-center">
                        <button className="px-4 py-3 flex gap-1 items-end rounded hover:cursor-pointer border-l">
                          Page 1 <ChevronDown size={20} />
                        </button>

                        <button
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                          variant="outline"
                          className="px-4 py-3  rounded hover:cursor-pointer border-l"
                        >
                          <ChevronLeft />
                        </button>

                        <button
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          variant="outline"
                          className="px-4 py-3 rounded hover:cursor-pointer  border-l"
                        >
                          <ChevronRight />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-4 text-center text-gray-700">
                    No orders found.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col  w-full p-6 lg:px-8 lg:py-5 bg-gray-50 rounded-lg ">
              <h1 className="text-3xl font-extrabold text-gray-800 mb-6 hidden sm:block">
                Welcome {user?.firstName} 👋
              </h1>

              <div className="flex flex-col gap-4 items-center w-full space-y-8 ">
                {/* Orders Section */}
                <div className="bg-white p-6 rounded-3xl shadow-lg w-full  ">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-700">
                      Your Orders
                    </h2>
                  </div>

                  <div className="lg:hidden mb-6 ">
                    {/* <div className="flex justify-center mb-4 ">
                    <button
                      onClick={() => setActiveTab("pickupDrop")}
                      className={`text-lg px-4 py-2 focus:outline-none ${
                        activeTab === "pickupDrop"
                          ? "bg-white text-[#0094B2]"
                          : "bg-white text-black"
                      }`}
                    >
                      Pickup & Drop
                    </button>
                    <button
                      onClick={() => setActiveTab("courier")}
                      className={`text-lg px-4 py-2 rounded-r-full focus:outline-none ${
                        activeTab === "courier"
                          ? "bg-white text-[#0094B2]"
                          : "bg-white text-black"
                      }`}
                    >
                      Courier
                    </button>
                  </div> */}

                    <div className="space-y-4">
                      {filteredIndividualOrders.slice(0, 4).map((order) => (
                        <div
                          key={order.order_id}
                          className={`bg-black bg-opacity-5 rounded-lg p-4 cursor-pointer ${
                            expandedOrderId === order.order_id
                              ? "bg-black bg-opacity-5"
                              : ""
                          }`}
                          onClick={() =>
                            setExpandedOrderId(
                              order.order_id === expandedOrderId
                                ? null
                                : order.order_id
                            )
                          }
                        >
                          <div className="flex justify-between">
                            <div className="w-full">
                              <div className="flex items-center mb-2">
                                <Image
                                  src={"/images/arrowupgreen.svg"}
                                  height={25}
                                  width={25}
                                  alt="Pickup Location"
                                />
                                <p className="text-lg ml-2 font-generalMedium overflow-hidden truncate max-w-full">
                                  {order.pickupLocation || "N/A"}
                                </p>
                              </div>
                              <div className="flex items-center mb-2">
                                <Image
                                  src={"/images/arrowdownred.svg"}
                                  height={25}
                                  width={25}
                                  alt="Drop Location"
                                />
                                <p className="text-lg ml-2 font-generalMedium overflow-hidden truncate max-w-full">
                                  {order.dropLocation || "N/A"}
                                </p>
                              </div>
                              <div className="border-t border-dashed w-full border-black mb-7"></div>{" "}
                              {/* Adjusted width to w-full */}
                            </div>
                          </div>
                          <div className="flex flex-row justify-between">
                            <p className="text-gray-600 text-xs mt-2">
                              {moment(order.date).format("LL")}
                            </p>
                            <p
                              className={`px-3 py-1 rounded-full ${getStatusStyle(
                                order.status
                              )}`}
                            >
                              {order.status || "N/A"}
                            </p>
                          </div>
                          {expandedOrderId === order.order_id && (
                            <div className="mt-4 space-y-4">
                              <div className="flex justify-between">
                                <div className="text-sm">
                                  <p className="text-gray-400">Order ID:</p> <p>{order.order_id}</p>
                                </div>
                                <div className="text-sm">
                                  <p className="text-gray-400">Delivery Fees:</p> <p>₹{order.amount}</p>
                                </div>
                              </div>
                              <div className="flex justify-between">
                                <div className="text-sm">
                                  <p className="text-gray-400">Weight/Dimension:</p>{" "}
                                  <p>
                                    {order.weight || "N/A"} kg ({order.length}cm
                                    x {order.width}cm x {order.height}cm)
                                  </p>
                                </div>

                                {/* <div className="text-sm">
                                  <p className="text-gray-400">Special Instructions:</p>{" "}
                                  <p>{order.specialInstructions || "N/A"}</p>
                                </div> */}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Table for Large Screens */}
                  {individualOrders.length > 0 && (
                    <div className="hidden lg:block overflow-x-auto">
                      <Table className="w-full">
                        <TableHeader className="bg-gray-100">
                          <TableRow>
                            <TableHead className="text-gray-600">
                              Order ID
                            </TableHead>
                            <TableHead className="text-gray-600">
                              Date
                            </TableHead>
                            <TableHead className="text-gray-600">
                              Order Type
                            </TableHead>
                            <TableHead className="text-gray-600">
                              Status
                            </TableHead>
                            <TableHead className="text-gray-600">
                              Weight
                            </TableHead>
                            <TableHead className="text-gray-600">
                              Special Instructions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-200">
                          {individualOrders.map((order) => (
                            <TableRow
                              key={order.order_id}
                              className="hover:bg-gray-50 transition-colors duration-200"
                            >
                              <TableCell className="py-4 text-gray-800">
                                {order.order_id}
                              </TableCell>
                              <TableCell className="py-4 text-gray-800">
                                {moment(order.date).format("LL")}
                              </TableCell>
                              <TableCell className="py-4 text-gray-800">
                                {order.order_type || "N/A"}
                              </TableCell>
                              <TableCell className="py-4 text-gray-800">
                                <span
                                  className={`px-3 py-1 rounded-full ${getStatusStyle(
                                    order.status
                                  )}`}
                                >
                                  {order.status || "N/A"}
                                </span>
                              </TableCell>
                              <TableCell className="py-4 text-gray-800">
                                {order.weight || "N/A"} kg
                              </TableCell>
                              <TableCell className="py-4 text-gray-800">
                                {order.specialInstructions || "N/A"}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>

                {/* Saved Addresses Section */}
                {/* <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl  lg:block">
                <h2 className="text-3xl font-semibold text-gray-700 mb-4">
                  Saved Addresses
                </h2>
                <p className="text-gray-600 mb-6">No saved addresses found</p>
                <button
                  onClick={() => router.push("/dashboard/account")}
                  className="px-6 py-2 bg-[#F5F5F5] text-black rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  + Add a new address
                </button>
              </div> */}
                <div className="w-full py-5 bg-gray-50">
                  <SaveAddressComponent />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
