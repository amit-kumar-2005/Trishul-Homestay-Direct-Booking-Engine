import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  ArrowLeft,
  BedDouble,
  CalendarDays,
  CircleCheck,
  CircleX,
  Clock3,
  IndianRupee,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // AuthContext se logged-in user
  const { user } = useAuth();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // Logged In User / Role
  // ==========================================

  const isAdmin = user?.role === "admin";

  const dashboardPath = isAdmin
    ? "/admin/dashboard"
    : "/dashboard";

  // ==========================================
  // Fetch Booking Details
  // ==========================================

  const fetchBookingDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        `/bookings/${id}`
      );

      setBooking(response.data.data);
    } catch (err) {
      console.error(
        "Booking details error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to load booking details."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      // The fetch function intentionally updates
      // component state after the external API request.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchBookingDetails();
    }
  }, [id, fetchBookingDetails]);

  // ==========================================
  // Date Formatter
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "N/A";

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
  // Number Of Nights
  // ==========================================

  const nights = useMemo(() => {
    if (
      !booking?.checkIn ||
      !booking?.checkOut
    ) {
      return 0;
    }

    const checkIn = new Date(
      booking.checkIn
    );

    const checkOut = new Date(
      booking.checkOut
    );

    const difference =
      checkOut.getTime() -
      checkIn.getTime();

    return Math.max(
      0,
      Math.ceil(
        difference /
          (1000 * 60 * 60 * 24)
      )
    );
  }, [booking]);

  // ==========================================
  // Estimated Total
  // ==========================================

  const estimatedTotal = useMemo(() => {
    const price = Number(
      booking?.roomId?.price || 0
    );

    return price * nights;
  }, [booking, nights]);

  // ==========================================
  // Status Styling
  // ==========================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return {
          badge:
            "bg-green-100 text-green-700 border-green-200",
          icon: (
            <CircleCheck
              size={16}
              className="text-green-600"
            />
          ),
        };

      case "Completed":
        return {
          badge:
            "bg-blue-100 text-blue-700 border-blue-200",
          icon: (
            <CircleCheck
              size={16}
              className="text-blue-600"
            />
          ),
        };

      case "Cancelled":
        return {
          badge:
            "bg-red-100 text-red-700 border-red-200",
          icon: (
            <CircleX
              size={16}
              className="text-red-600"
            />
          ),
        };

      default:
        return {
          badge:
            "bg-amber-100 text-amber-700 border-amber-200",
          icon: (
            <Clock3
              size={16}
              className="text-amber-600"
            />
          ),
        };
    }
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center px-5">
        <div className="flex flex-col items-center gap-3">
          <LoaderCircle
            size={38}
            className="animate-spin text-teal-600"
          />

          <p className="text-slate-600 dark:text-slate-300">
            Loading booking details...
          </p>
        </div>
      </section>
    );
  }

  // ==========================================
  // Error
  // ==========================================

  if (error || !booking) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center px-5">
        <div className="w-full max-w-lg rounded-2xl border border-red-200 bg-white dark:bg-slate-900 p-8 shadow-sm text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <CircleX
              size={28}
              className="text-red-600"
            />
          </div>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Booking Not Available
          </h1>

          <p className="mt-3 text-slate-600 dark:text-slate-300">
            {error ||
              "Booking could not be found."}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <button
              type="button"
              onClick={() =>
                navigate(dashboardPath)
              }
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700 transition"
            >
              <ArrowLeft size={18} />

              {isAdmin
                ? "Back to Admin Dashboard"
                : "Back to Dashboard"}
            </button>

            <button
              type="button"
              onClick={fetchBookingDetails}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              <RefreshCw size={18} />
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  const statusStyle =
    getStatusStyle(booking.status);

  const shortBookingId = booking._id
    ? booking._id.slice(-8).toUpperCase()
    : "N/A";

  return (
    <section className="bg-slate-50 dark:bg-slate-950 min-h-screen py-10 px-5">
      <div className="max-w-5xl mx-auto">
        {/* =====================================
            Top Navigation
        ====================================== */}

        <div className="mb-6">
          <Link
            to={dashboardPath}
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 dark:text-teal-400 hover:underline"
          >
            <ArrowLeft size={18} />

            {isAdmin
              ? "Back to Admin Dashboard"
              : "Back to Dashboard"}
          </Link>
        </div>

        {/* =====================================
            Header
        ====================================== */}

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
              {isAdmin
                ? "Admin Booking Details"
                : "Booking Details"}
            </p>

            <h1 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              {isAdmin
                ? "Booking Details"
                : "Your Reservation"}
            </h1>

            <p className="mt-2 text-slate-600 dark:text-slate-300">
              {isAdmin
                ? "Review the complete guest reservation and booking information."
                : "Review your complete Trishul Homestay booking information."}
            </p>
          </div>

          <div
            className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${statusStyle.badge}`}
          >
            {statusStyle.icon}

            {booking.status || "Pending"}
          </div>
        </div>

        {/* =====================================
            Main Booking Card
        ====================================== */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          {/* ===================================
              Room Header
          ==================================== */}

          <div className="border-b border-slate-200 dark:border-slate-800 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-teal-100 dark:bg-teal-950">
                  <BedDouble
                    size={27}
                    className="text-teal-700 dark:text-teal-400"
                  />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Room
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                    {booking.roomId?.name ||
                      "Room information unavailable"}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Booking ID: {shortBookingId}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-slate-800 px-5 py-4">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Booking Requested
                </p>

                <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                  {formatDate(
                    booking.createdAt
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* =====================================
              Stay Information
          ====================================== */}

          <div className="p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Stay Information
            </h3>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <InfoBox
                icon={
                  <CalendarDays size={20} />
                }
                label="Check-In"
                value={formatDate(
                  booking.checkIn
                )}
              />

              <InfoBox
                icon={
                  <CalendarDays size={20} />
                }
                label="Check-Out"
                value={formatDate(
                  booking.checkOut
                )}
              />

              <InfoBox
                icon={
                  <UsersRound size={20} />
                }
                label="Guests"
                value={`${booking.guests || 0} ${
                  Number(booking.guests) === 1
                    ? "Guest"
                    : "Guests"
                }`}
              />

              <InfoBox
                icon={<Clock3 size={20} />}
                label="Duration"
                value={`${nights} ${
                  nights === 1
                    ? "Night"
                    : "Nights"
                }`}
              />
            </div>
          </div>

          {/* =====================================
              Price Information
          ====================================== */}

          <div className="border-t border-slate-200 dark:border-slate-800 p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Price Summary
            </h3>

            <div className="mt-5 rounded-xl bg-slate-50 dark:bg-slate-800 p-5">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Room Price
                  </p>

                  <div className="mt-1 flex items-center">
                    <IndianRupee
                      size={18}
                      className="text-teal-600"
                    />

                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                      {Number(
                        booking.roomId
                          ?.price || 0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </span>

                    <span className="ml-1 text-sm text-slate-500">
                      / night
                    </span>
                  </div>
                </div>

                <div className="sm:text-right">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Estimated Total
                  </p>

                  <p className="mt-1 text-2xl font-bold text-teal-700 dark:text-teal-400">
                    {formatCurrency(
                      estimatedTotal
                    )}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {nights}{" "}
                    {nights === 1
                      ? "night"
                      : "nights"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================
              Guest Information
          ====================================== */}

          <div className="border-t border-slate-200 dark:border-slate-800 p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Guest Information
            </h3>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <DetailRow
                icon={
                  <UserRound size={20} />
                }
                label="Guest Name"
                value={
                  booking.guestName ||
                  "N/A"
                }
              />

              <DetailRow
                icon={<Mail size={20} />}
                label="Email Address"
                value={
                  booking.email || "N/A"
                }
              />

              <DetailRow
                icon={<Phone size={20} />}
                label="Phone Number"
                value={
                  booking.phone || "N/A"
                }
              />

              <DetailRow
                icon={
                  <UsersRound size={20} />
                }
                label="Number of Guests"
                value={`${
                  booking.guests || 0
                }`}
              />
            </div>
          </div>

          {/* =====================================
              Special Request
          ====================================== */}

          <div className="border-t border-slate-200 dark:border-slate-800 p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Special Request
            </h3>

            <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5">
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                {booking.specialRequest?.trim()
                  ? booking.specialRequest
                  : "No special request was added for this booking."}
              </p>
            </div>
          </div>

          {/* =====================================
              Booking Status Information
          ====================================== */}

          <div className="border-t border-slate-200 dark:border-slate-800 p-6 md:p-8">
            {booking.status ===
            "Cancelled" ? (
              <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-5">
                <CircleX
                  size={22}
                  className="mt-0.5 shrink-0 text-red-600"
                />

                <div>
                  <h4 className="font-bold text-red-700">
                    Booking Cancelled
                  </h4>

                  <p className="mt-1 text-sm text-red-600">
                    This booking has been
                    cancelled and is no longer
                    active.
                  </p>
                </div>
              </div>
            ) : booking.status ===
              "Completed" ? (
              <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-5">
                <CircleCheck
                  size={22}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <div>
                  <h4 className="font-bold text-blue-700">
                    Stay Completed
                  </h4>

                  <p className="mt-1 text-sm text-blue-600">
                    This booking has been
                    marked as completed.
                  </p>
                </div>
              </div>
            ) : booking.status ===
              "Confirmed" ? (
              <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-5">
                <ShieldCheck
                  size={22}
                  className="mt-0.5 shrink-0 text-green-600"
                />

                <div>
                  <h4 className="font-bold text-green-700">
                    Booking Confirmed
                  </h4>

                  <p className="mt-1 text-sm text-green-600">
                    {isAdmin
                      ? "This reservation has been confirmed."
                      : "Your reservation has been confirmed."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-5">
                <Clock3
                  size={22}
                  className="mt-0.5 shrink-0 text-amber-600"
                />

                <div>
                  <h4 className="font-bold text-amber-700">
                    Confirmation Pending
                  </h4>

                  <p className="mt-1 text-sm text-amber-600">
                    {isAdmin
                      ? "This booking request has been received and is awaiting confirmation."
                      : "Your booking request has been received and is awaiting confirmation."}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* =====================================
              Bottom Actions
          ====================================== */}

          <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-6 md:px-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
              <Link
                to={dashboardPath}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-3 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <ArrowLeft size={18} />

                {isAdmin
                  ? "Admin Dashboard"
                  : "My Bookings"}
              </Link>

              <Link
                to="/rooms"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700 transition"
              >
                <BedDouble size={18} />

                Explore More Rooms
              </Link>
            </div>
          </div>
        </div>

        {/* =====================================
            Information Note
        ====================================== */}

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <MapPin
            size={20}
            className="mt-0.5 shrink-0 text-teal-600"
          />

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white">
              Trishul Homestay
            </h4>

            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {isAdmin
                ? "Review the booking details when managing or assisting the guest with this reservation."
                : "Keep your booking details available when contacting the homestay regarding your reservation."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// Small Information Box
// ==========================================

function InfoBox({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
      <div className="flex items-center gap-2 text-teal-600">
        {icon}

        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {label}
        </span>
      </div>

      <p className="mt-3 font-bold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

// ==========================================
// Guest Detail Row
// ==========================================

function DetailRow({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
      <div className="mt-1 text-teal-600">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-words font-semibold text-slate-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}