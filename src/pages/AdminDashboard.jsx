import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import api from "../services/api";

import {
  Users,
  BedDouble,
  CalendarDays,
  IndianRupee,
  Clock3,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Loader2,
  AlertTriangle,
  Eye,
  ShieldCheck,
  Hotel,
  UserRound,
} from "lucide-react";

// ==========================================
// Date Formatter
// ==========================================

const formatDate = (date) => {
  if (!date) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

// ==========================================
// Currency Formatter
// ==========================================

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));
};

// ==========================================
// Booking Status Style
// ==========================================

const getStatusStyle = (status) => {
  switch (status) {
    case "Confirmed":
      return {
        className:
          "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
        icon: CheckCircle2,
      };

    case "Completed":
      return {
        className:
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
        icon: CheckCircle2,
      };

    case "Cancelled":
      return {
        className:
          "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300",
        icon: XCircle,
      };

    default:
      return {
        className:
          "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
        icon: Clock3,
      };
  }
};

// ==========================================
// Admin Dashboard
// ==========================================

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] =
    useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState("");

  // ==========================================
  // Fetch Admin Dashboard
  // ==========================================

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/admin/dashboard"
      );

      setDashboardData(
        response.data?.data || null
      );
    } catch (error) {
      console.error(
        "Admin Dashboard Error:",
        error
      );

      setDashboardData(null);

      setError(
        error.response?.data?.message ||
          "Unable to load admin dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
// Update Booking Status
// ==========================================

const updateBookingStatus = async (
  bookingId,
  status
) => {
  try {
    setActionLoading(bookingId);

    await api.put(
      `/bookings/${bookingId}/status`,
      {
        status,
      }
    );

    toast.success(
      `Booking ${status.toLowerCase()} successfully`
    );

    await fetchDashboard();
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Failed to update booking status."
    );
  } finally {
    setActionLoading("");
  }
};

  // ==========================================
  // Initial Load
  // ==========================================

  useEffect(() => {
  const loadDashboard = async () => {
    await fetchDashboard();
  };

  loadDashboard();
}, []);

  // ==========================================
  // Loading State
  // ==========================================

  if (loading) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center px-5">
        <div className="text-center">
          <Loader2
            size={42}
            className="animate-spin text-teal-700 mx-auto"
          />

          <h2 className="mt-5 text-xl font-bold">
            Loading Admin Dashboard
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Fetching users, rooms and booking
            statistics...
          </p>
        </div>
      </section>
    );
  }

  // ==========================================
  // Error State
  // ==========================================

  if (error || !dashboardData) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center px-5">
        <div className="w-full max-w-lg rounded-2xl border border-red-200 dark:border-red-900 bg-white dark:bg-slate-900 p-8 shadow-sm text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center">
            <AlertTriangle
              size={30}
              className="text-red-600"
            />
          </div>

          <h1 className="text-2xl font-bold mt-5">
            Unable to Load Dashboard
          </h1>

          <p className="mt-3 text-slate-500 dark:text-slate-400">
            {error ||
              "Admin dashboard data is unavailable."}
          </p>

          <button
            type="button"
            onClick={fetchDashboard}
            className="mt-6 inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white px-5 py-3 rounded-xl font-semibold transition"
          >
            <RefreshCw size={18} />

            Try Again
          </button>
        </div>
      </section>
    );
  }

  // ==========================================
  // Dashboard Data
  // ==========================================

  const users =
    dashboardData.users || {};

  const rooms =
    dashboardData.rooms || {};

  const bookings =
    dashboardData.bookings || {};

  const revenue =
    dashboardData.revenue || {};

  const recentBookings =
    dashboardData.recentBookings || [];

  // ==========================================
  // Main Statistics
  // ==========================================

  const mainStats = [
    {
      label: "Total Users",
      value: users.total || 0,
      description:
        "Registered customer accounts",
      icon: Users,
    },
    {
      label: "Total Rooms",
      value: rooms.total || 0,
      description:
        `${rooms.available || 0} currently available`,
      icon: BedDouble,
    },
    {
      label: "Total Bookings",
      value: bookings.total || 0,
      description:
        "All booking requests",
      icon: CalendarDays,
    },
    {
      label: "Estimated Revenue",
      value: formatCurrency(
        revenue.estimated || 0
      ),
      description:
        "Confirmed + completed bookings",
      icon: IndianRupee,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-5 py-8">

        {/* ======================================
            Admin Welcome Banner
        ====================================== */}

        <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-teal-900 to-emerald-800 text-white p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                <ShieldCheck size={17} />

                Administrator
              </div>

              <h1 className="mt-5 text-3xl md:text-4xl font-bold">
                Admin Dashboard
              </h1>

              <p className="mt-3 max-w-2xl text-slate-200">
                Monitor Trishul Homestay users,
                rooms, bookings and estimated
                booking revenue from one place.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 self-start lg:self-center">

  <Link
    to="/admin/rooms"
    className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 font-semibold transition"
  >
    <BedDouble size={18} />
    Manage Rooms
  </Link>

  <button
    type="button"
    onClick={fetchDashboard}
    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-slate-900 px-5 py-3 font-semibold hover:bg-slate-100 transition"
  >
    <RefreshCw size={18} />
    Refresh Dashboard
  </button>

</div>
          </div>
        </section>

        {/* ======================================
            Main Statistics
        ====================================== */}

        <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
          {mainStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </p>

                    <h2 className="mt-2 text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                      {stat.value}
                    </h2>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-950 flex items-center justify-center shrink-0">
                    <Icon
                      size={24}
                      className="text-teal-700 dark:text-teal-400"
                    />
                  </div>
                </div>

                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  {stat.description}
                </p>
              </article>
            );
          })}
        </section>

        {/* ======================================
            Room + Booking Overview
        ====================================== */}

        <section className="grid lg:grid-cols-3 gap-8 mt-10">

          {/* ====================================
              Room Overview
          ==================================== */}

          <article className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-950 flex items-center justify-center">
                <Hotel
                  size={24}
                  className="text-teal-700 dark:text-teal-400"
                />
              </div>

              <div>
                <p className="text-sm text-teal-700 dark:text-teal-400 font-semibold">
                  Inventory
                </p>

                <h2 className="text-xl font-bold">
                  Room Overview
                </h2>
              </div>
            </div>

            <div className="mt-6 space-y-4">

              <OverviewRow
                label="Total Rooms"
                value={rooms.total || 0}
              />

              <OverviewRow
                label="Available Rooms"
                value={rooms.available || 0}
              />

              <OverviewRow
                label="Unavailable Rooms"
                value={rooms.unavailable || 0}
              />

            </div>
          </article>

          {/* ====================================
              Booking Status Overview
          ==================================== */}

          <article className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">

            <div>
              <p className="text-sm text-teal-700 dark:text-teal-400 font-semibold">
                Booking Management
              </p>

              <h2 className="text-xl font-bold mt-1">
                Booking Status Overview
              </h2>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Current distribution of all booking
                requests.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">

              {/* Pending */}

              <StatusCard
                label="Pending"
                value={bookings.pending || 0}
                icon={Clock3}
                className="bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300"
              />

              {/* Confirmed */}

              <StatusCard
                label="Confirmed"
                value={bookings.confirmed || 0}
                icon={CheckCircle2}
                className="bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300"
              />

              {/* Completed */}

              <StatusCard
                label="Completed"
                value={bookings.completed || 0}
                icon={CheckCircle2}
                className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
              />

              {/* Cancelled */}

              <StatusCard
                label="Cancelled"
                value={bookings.cancelled || 0}
                icon={XCircle}
                className="bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300"
              />

            </div>

            <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">

              <div className="flex flex-wrap items-center justify-between gap-4">

                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Total Bookings
                  </p>

                  <p className="text-2xl font-bold mt-1">
                    {bookings.total || 0}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Estimated Revenue
                  </p>

                  <p className="text-2xl font-bold mt-1 text-teal-700 dark:text-teal-400">
                    {formatCurrency(
                      revenue.estimated || 0
                    )}
                  </p>
                </div>

              </div>
            </div>
          </article>
        </section>

        {/* ======================================
            Recent Bookings
        ====================================== */}

        <section className="mt-10">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">

            <div>
              <p className="text-sm uppercase tracking-wider font-semibold text-teal-700 dark:text-teal-400">
                Latest Activity
              </p>

              <h2 className="text-2xl md:text-3xl font-bold mt-1">
                Recent Bookings
              </h2>

              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Latest booking requests received by
                Trishul Homestay.
              </p>
            </div>

            <button
              type="button"
              onClick={fetchDashboard}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              <RefreshCw size={18} />

              Refresh
            </button>
          </div>

          {/* ====================================
              No Recent Bookings
          ==================================== */}

          {recentBookings.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 text-center shadow-sm">

              <div className="w-16 h-16 mx-auto rounded-full bg-teal-100 dark:bg-teal-950 flex items-center justify-center">
                <CalendarDays
                  size={30}
                  className="text-teal-700 dark:text-teal-400"
                />
              </div>

              <h3 className="text-xl font-bold mt-5">
                No bookings found
              </h3>

              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Recent booking activity will appear
                here.
              </p>

            </div>
          ) : (
            <div className="grid gap-5">

              {recentBookings.map((booking) => {
                const statusInfo =
                  getStatusStyle(
                    booking.status
                  );

                const StatusIcon =
                  statusInfo.icon;

                return (
                  <article
                    key={booking._id}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-lg transition"
                  >
                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

                      {/* ========================
                          Booking Information
                      ======================== */}

                      <div className="flex-1">

                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                          <div className="flex items-start gap-4">

                            <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-950 flex items-center justify-center shrink-0">
                              <BedDouble
                                size={23}
                                className="text-teal-700 dark:text-teal-400"
                              />
                            </div>

                            <div>
                              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Booking
                              </p>

                              <h3 className="text-xl font-bold mt-1">
                                {booking.roomId
                                  ?.name ||
                                  "Room"}
                              </h3>

                              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                ID:{" "}
                                {booking._id
                                  ?.slice(-8)
                                  .toUpperCase()}
                              </p>
                            </div>

                          </div>

                          <div
                            className={`inline-flex items-center gap-1.5 self-start rounded-full px-3 py-1.5 text-sm font-semibold ${statusInfo.className}`}
                          >
                            <StatusIcon
                              size={16}
                            />

                            {booking.status ||
                              "Pending"}
                          </div>

                        </div>

                        {/* ========================
                            Guest + Dates
                        ======================== */}

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Guest
                            </p>

                            <div className="flex items-center gap-2 mt-1">
                              <UserRound
                                size={16}
                                className="text-teal-700"
                              />

                              <p className="font-semibold">
                                {booking.guestName ||
                                  booking.userId
                                    ?.name ||
                                  "-"}
                              </p>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Check-In
                            </p>

                            <div className="flex items-center gap-2 mt-1">
                              <CalendarDays
                                size={16}
                                className="text-teal-700"
                              />

                              <p className="font-semibold">
                                {formatDate(
                                  booking.checkIn
                                )}
                              </p>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Check-Out
                            </p>

                            <div className="flex items-center gap-2 mt-1">
                              <CalendarDays
                                size={16}
                                className="text-teal-700"
                              />

                              <p className="font-semibold">
                                {formatDate(
                                  booking.checkOut
                                )}
                              </p>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Guests
                            </p>

                            <div className="flex items-center gap-2 mt-1">
                              <Users
                                size={16}
                                className="text-teal-700"
                              />

                              <p className="font-semibold">
                                {booking.guests || 0}
                              </p>
                            </div>
                          </div>

                        </div>

                        {/* ========================
                            User Account
                        ======================== */}

                        {booking.userId && (
                          <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800">

                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Customer Account
                            </p>

                            <p className="mt-1 font-semibold">
                              {booking.userId.name ||
                                "-"}
                            </p>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 break-all">
                              {booking.userId.email ||
                                "-"}
                            </p>

                          </div>
                        )}

                      </div>

                      {/* ========================
                          Actions
                      ======================== */}

                      <div className="xl:w-48 shrink-0">

                        <Link
                          to={`/booking/${booking._id}`}
                          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white px-5 py-3 font-semibold transition"
                        >
                          <Eye size={18} />

                          View Details
                        </Link>
                        {booking.status === "Pending" && (
  <div className="mt-3 flex gap-2">
    <button
      onClick={() =>
        updateBookingStatus(booking._id, "Confirmed")
      }
      disabled={actionLoading === booking._id}
      className="rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
    >
      {actionLoading === booking._id
        ? "Processing..."
        : "Confirm"}
    </button>

    <button
      onClick={() =>
        updateBookingStatus(booking._id, "Cancelled")
      }
      disabled={actionLoading === booking._id}
      className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
    >
      {actionLoading === booking._id
        ? "Processing..."
        : "Cancel"}
    </button>
  </div>
)}

{booking.status === "Confirmed" && (
  <div className="mt-3 flex gap-2">
    <button
      onClick={() =>
        updateBookingStatus(booking._id, "Completed")
      }
      disabled={actionLoading === booking._id}
      className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
    >
      {actionLoading === booking._id
        ? "Processing..."
        : "Complete"}
    </button>

    <button
      onClick={() =>
        updateBookingStatus(booking._id, "Cancelled")
      }
      disabled={actionLoading === booking._id}
      className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
    >
      {actionLoading === booking._id
        ? "Processing..."
        : "Cancel"}
    </button>
  </div>
)}

                        <p className="mt-2 text-center text-xs text-slate-400">
                          Created{" "}
                          {formatDate(
                            booking.createdAt
                          )}
                        </p>

                      </div>

                    </div>
                  </article>
                );
              })}

            </div>
          )}
        </section>

        {/* ======================================
            Admin Information
        ====================================== */}

        <section className="mt-10 rounded-2xl border border-teal-200 dark:border-teal-900 bg-teal-50 dark:bg-teal-950/20 p-6">

          <div className="flex items-start gap-4">

            <div className="w-11 h-11 rounded-xl bg-teal-100 dark:bg-teal-900 flex items-center justify-center shrink-0">
              <ShieldCheck
                size={22}
                className="text-teal-700 dark:text-teal-300"
              />
            </div>

            <div>
              <h3 className="font-bold text-lg">
                Administrator Access
              </h3>

              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-6">
                This dashboard contains protected
                management information and can only
                be accessed by authenticated users
                with the admin role.
              </p>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}

// ==========================================
// Room Overview Row
// ==========================================

function OverviewRow({
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 dark:bg-slate-800 p-4">

      <span className="text-sm text-slate-600 dark:text-slate-300">
        {label}
      </span>

      <span className="text-lg font-bold">
        {value}
      </span>

    </div>
  );
}

// ==========================================
// Booking Status Card
// ==========================================

function StatusCard({
  label,
  value,
  icon: Icon,
  className,
}) {
  return (
    <div
      className={`rounded-xl p-4 ${className}`}
    >
      <div className="flex items-center justify-between gap-3">

        <Icon size={21} />

        <span className="text-2xl font-bold">
          {value}
        </span>

      </div>

      <p className="mt-3 text-sm font-semibold">
        {label}
      </p>
    </div>
  );
}