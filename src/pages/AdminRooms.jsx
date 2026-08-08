import { useEffect, useState } from "react";
import {
  BedDouble,
  RefreshCw,
  Loader2,
  AlertTriangle,
  Users,
  IndianRupee,
  Bath,
  Bed,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { toast } from "react-toastify";

import api from "../services/api";

// ==========================================
// Admin Rooms Management
// ==========================================

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    guests: "",
    beds: "",
    bathrooms: "",
    description: "",
    image: "",
    amenities: "",
    isAvailable: true,
  });

  const [saving, setSaving] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [deletingRoom, setDeletingRoom] = useState(null);
  // ==========================================
// Delete Room
// ==========================================

const handleDeleteRoom = async (room) => {
  if (!room?._id) {
    toast.error("Invalid room selected.");
    return;
  }

  const confirmed = window.confirm(
    `Are you sure you want to delete "${room.name || "this room"}"?`
  );

  if (!confirmed) {
    return;
  }

  try {
    setDeletingRoom(room._id);

    await api.delete(
      `/rooms/${room._id}`
    );

    toast.success(
      "Room deleted successfully."
    );

    await fetchRooms();
  } catch (error) {
    console.error(
      "Delete Room Error:",
      error
    );

    toast.error(
      error.response?.data?.message ||
        "Failed to delete room."
    );
  } finally {
    setDeletingRoom(null);
  }
};

// ==========================================
// Toggle Room Availability
// ==========================================

const handleToggleAvailability = async (room) => {
  if (!room?._id) {
    toast.error("Invalid room selected.");
    return;
  }

  try {
    setSaving(true);

    await api.put(
      `/rooms/${room._id}/availability`
    );

    toast.success(
      room.isAvailable
        ? "Room marked unavailable."
        : "Room marked available."
    );

    await fetchRooms();
  } catch (error) {
    console.error(
      "Toggle Availability Error:",
      error
    );

    toast.error(
      error.response?.data?.message ||
        "Failed to update room availability."
    );
  } finally {
    setSaving(false);
  }
};

// ==========================================
// Start Editing Room
// ==========================================

const handleEditRoom = (room) => {
  setEditingRoom(room);

  setFormData({
    name: room.name || "",
    price: room.price ?? "",
    guests: room.guests ?? "",
    beds: room.beds ?? "",
    bathrooms: room.bathrooms ?? "",
    description: room.description || "",
    image: room.image || "",
    amenities: Array.isArray(room.amenities)
      ? room.amenities.join(", ")
      : "",
    isAvailable:
      room.isAvailable !== undefined
        ? room.isAvailable
        : true,
  });

  setShowAddForm(true);
};
// ==========================================
// Update Room
// ==========================================

const handleUpdateRoom = async (event) => {
  event.preventDefault();

  if (!editingRoom?._id) {
    toast.error("No room selected for editing.");
    return;
  }

  try {
    setSaving(true);

    const payload = {
      ...formData,
      price: Number(formData.price),
      guests: Number(formData.guests),
      beds: Number(formData.beds),
      bathrooms: Number(formData.bathrooms),
      amenities: formData.amenities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    await api.put(
      `/rooms/${editingRoom._id}`,
      payload
    );

    toast.success(
      "Room updated successfully."
    );

    setEditingRoom(null);

    setFormData({
      name: "",
      price: "",
      guests: "",
      beds: "",
      bathrooms: "",
      description: "",
      image: "",
      amenities: "",
      isAvailable: true,
    });

    setShowAddForm(false);

    await fetchRooms();
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Failed to update room."
    );
  } finally {
    setSaving(false);
  }
};

  // ==========================================
  // Fetch Rooms
  // ==========================================

  const fetchRooms = async (showRefreshLoader = false) => {
    try {
      if (showRefreshLoader) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await api.get("/rooms");

      const roomData = response.data?.data || [];

      setRooms(roomData);
    } catch (error) {
      console.error(
        "Admin Rooms Error:",
        error
      );

      setRooms([]);

      const message =
        error.response?.data?.message ||
        "Unable to load rooms.";

      setError(message);

      if (showRefreshLoader) {
        toast.error(message);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ==========================================
  // Initial Load
  // ==========================================

  useEffect(() => {
  const timer = setTimeout(() => {
    fetchRooms();
  }, 0);

  return () => {
    clearTimeout(timer);
  };
}, []);

  // ==========================================
  // Refresh Rooms
  // ==========================================

  const handleRefresh = async () => {
    await fetchRooms(true);
  };

  // ==========================================
// Add Room Form
// ==========================================

const handleInputChange = (event) => {
  const { name, value, type, checked } = event.target;

  setFormData((previous) => ({
    ...previous,
    [name]:
      type === "checkbox"
        ? checked
        : value,
  }));
};

const handleAddRoom = async (event) => {
  event.preventDefault();

  try {
    setSaving(true);

    const payload = {
      ...formData,
      price: Number(formData.price),
      guests: Number(formData.guests),
      beds: Number(formData.beds),
      bathrooms: Number(formData.bathrooms),
      amenities: formData.amenities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    await api.post("/rooms", payload);

    toast.success(
      "Room created successfully."
    );

    setFormData({
      name: "",
      price: "",
      guests: "",
      beds: "",
      bathrooms: "",
      description: "",
      image: "",
      amenities: "",
      isAvailable: true,
    });

    setShowAddForm(false);

    await fetchRooms();
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Failed to create room."
    );
  } finally {
    setSaving(false);
  }
};

  // ==========================================
  // Format Price
  // ==========================================

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  // ==========================================
  // Page
  // ==========================================

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">

      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 py-6 sm:py-8">

        {/* =====================================
            Header
        ====================================== */}

        <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-teal-900 to-emerald-800 text-white p-6 sm:p-8 shadow-xl">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-start gap-4">

              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                <BedDouble size={30} />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  Room Management
                </h1>

                <p className="mt-2 text-sm sm:text-base text-slate-200">
                  Manage all homestay rooms from one place.
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={() =>
                setShowAddForm((previous) => !previous)
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 text-white px-5 py-3 font-semibold hover:bg-teal-700 transition"
            >
              Add Room
            </button>

            <button
              type="button"
              onClick={handleRefresh}
              disabled={loading || refreshing}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-slate-900 px-5 py-3 font-semibold hover:bg-slate-100 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {refreshing ? (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              ) : (
                <RefreshCw size={18} />
              )}

              {refreshing
                ? "Refreshing..."
                : "Refresh Rooms"}
            </button>

          </div>

        </section>

        {/* =====================================
    Add Room Form
====================================== */}

{showAddForm && (
  <section className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">

    <div className="mb-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
  {editingRoom
    ? "Edit Room"
    : "Add New Room"}
</h2>

      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
  {editingRoom
    ? "Update the room information below."
    : "Enter room details to add a new homestay room."}
</p>
    </div>

    <form
  onSubmit={
    editingRoom
      ? handleUpdateRoom
      : handleAddRoom
  }
  className="grid grid-cols-1 md:grid-cols-2 gap-5"
>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Room Name"
        required
        className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
      />

      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
        placeholder="Price per night"
        min="1"
        required
        className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
      />

      <input
        type="number"
        name="guests"
        value={formData.guests}
        onChange={handleInputChange}
        placeholder="Maximum Guests"
        min="1"
        required
        className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
      />

      <input
        type="number"
        name="beds"
        value={formData.beds}
        onChange={handleInputChange}
        placeholder="Beds"
        min="1"
        required
        className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
      />

      <input
        type="number"
        name="bathrooms"
        value={formData.bathrooms}
        onChange={handleInputChange}
        placeholder="Bathrooms"
        min="1"
        required
        className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
      />

      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleInputChange}
        placeholder="Image URL"
        required
        className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
      />

      <input
        type="text"
        name="amenities"
        value={formData.amenities}
        onChange={handleInputChange}
        placeholder="Amenities (WiFi, AC, TV)"
        className="md:col-span-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Room Description"
        rows="4"
        required
        className="md:col-span-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500 resize-none"
      />

      <label className="md:col-span-2 flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">

        <input
          type="checkbox"
          name="isAvailable"
          checked={formData.isAvailable}
          onChange={handleInputChange}
          className="h-4 w-4 rounded"
        />

        Room is available

      </label>

      <div className="md:col-span-2 flex flex-wrap gap-3">

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center rounded-xl bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving
  ? editingRoom
    ? "Updating..."
    : "Creating..."
  : editingRoom
    ? "Update Room"
    : "Create Room"}
        </button>

        <button
          type="button"
          onClick={() => {
  setShowAddForm(false);
  setEditingRoom(null);
}}
          disabled={saving}
          className="rounded-xl border border-slate-300 dark:border-slate-700 px-6 py-3 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-60"
        >
          Cancel
        </button>

      </div>

    </form>

  </section>
)}

        {/* =====================================
            Loading State
        ====================================== */}

        {loading && (
          <section className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 shadow-sm">

            <div className="flex flex-col items-center justify-center text-center">

              <Loader2
                size={42}
                className="animate-spin text-teal-700"
              />

              <h2 className="mt-5 text-xl font-bold text-slate-800 dark:text-white">
                Loading Rooms
              </h2>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Please wait while room information is being loaded.
              </p>

            </div>

          </section>
        )}

        {/* =====================================
            Error State
        ====================================== */}

        {!loading && error && (
          <section className="mt-8 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20 p-8 shadow-sm">

            <div className="flex flex-col items-center justify-center text-center">

              <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
                <AlertTriangle
                  size={28}
                  className="text-red-600 dark:text-red-400"
                />
              </div>

              <h2 className="mt-4 text-xl font-bold text-red-800 dark:text-red-300">
                Unable to Load Rooms
              </h2>

              <p className="mt-2 max-w-xl text-sm text-red-700 dark:text-red-400">
                {error}
              </p>

              <button
                type="button"
                onClick={() => fetchRooms()}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700 transition"
              >
                <RefreshCw size={18} />
                Try Again
              </button>

            </div>

          </section>
        )}

        {/* =====================================
            Rooms Content
        ====================================== */}

        {!loading && !error && (
          <section className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">

            {/* =================================
                Section Header
            ================================== */}

            <div className="border-b border-slate-200 dark:border-slate-800 p-5 sm:p-6">

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    All Rooms
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {rooms.length}{" "}
                    {rooms.length === 1
                      ? "room"
                      : "rooms"}{" "}
                    available in the system.
                  </p>
                </div>

              </div>

            </div>

            {/* =================================
                Empty State
            ================================== */}

            {rooms.length === 0 && (
              <div className="p-10 sm:p-14 text-center">

                <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <BedDouble
                    size={30}
                    className="text-slate-400"
                  />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-800 dark:text-white">
                  No Rooms Found
                </h3>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  There are currently no rooms available in the database.
                </p>

              </div>
            )}

            {/* =================================
                Room Table
            ================================== */}

            {rooms.length > 0 && (
              <div className="overflow-x-auto">

                <table className="w-full min-w-[900px]">

                  <thead className="bg-slate-50 dark:bg-slate-800/70">

                    <tr>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Room
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Price
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Guests
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Beds
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Bathrooms
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Availability
                      </th>

                      <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Actions
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {rooms.map((room) => (
                      <tr
                        key={room._id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                      >

                        {/* ==============================
                            Room
                        =============================== */}

                        <td className="px-5 py-5">

                          <div className="flex items-center gap-4">

                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">

                              {room.image ? (
                                <img
                                  src={room.image}
                                  alt={room.name}
                                  className="w-full h-full object-cover"
                                  onError={(event) => {
                                    event.currentTarget.style.display =
                                      "none";
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <BedDouble
                                    size={26}
                                    className="text-slate-400"
                                  />
                                </div>
                              )}

                            </div>

                            <div className="min-w-0">

                              <p className="font-bold text-slate-900 dark:text-white truncate">
                                {room.name || "-"}
                              </p>

                              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                ID: {room._id}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* ==============================
                            Price
                        =============================== */}

                        <td className="px-5 py-5">

                          <div className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">

                            <IndianRupee size={16} />

                            <span>
                              {formatPrice(room.price)}
                            </span>

                            <span className="text-xs font-normal text-slate-500">
                              / night
                            </span>

                          </div>

                        </td>

                        {/* ==============================
                            Guests
                        =============================== */}

                        <td className="px-5 py-5">

                          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">

                            <Users
                              size={17}
                              className="text-teal-700 dark:text-teal-400"
                            />

                            <span className="font-semibold">
                              {room.guests || 0}
                            </span>

                          </div>

                        </td>

                        {/* ==============================
                            Beds
                        =============================== */}

                        <td className="px-5 py-5">

                          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">

                            <Bed
                              size={17}
                              className="text-teal-700 dark:text-teal-400"
                            />

                            <span className="font-semibold">
                              {room.beds || 0}
                            </span>

                          </div>

                        </td>

                        {/* ==============================
                            Bathrooms
                        =============================== */}

                        <td className="px-5 py-5">

                          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">

                            <Bath
                              size={17}
                              className="text-teal-700 dark:text-teal-400"
                            />

                            <span className="font-semibold">
                              {room.bathrooms || 0}
                            </span>

                          </div>

                        </td>

                        {/* ==============================
                            Availability
                        =============================== */}

                        <td className="px-5 py-5">

  <button
    type="button"
    onClick={() =>
      handleToggleAvailability(room)
    }
    disabled={saving}
    className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
  >
    {room.isAvailable ? (
      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition">

        <CheckCircle2 size={15} />

        Available

      </span>
    ) : (
      <span className="inline-flex items-center gap-2 rounded-full bg-red-100 dark:bg-red-900/30 px-3 py-1.5 text-xs font-bold text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition">

        <XCircle size={15} />

        Unavailable

      </span>
    )}
  </button>

</td>

                        {/* ==============================
                            Actions
                        =============================== */}

                        {/* ==============================
    Actions
=============================== */}

<td className="px-5 py-5 text-right">

  <div className="flex items-center justify-end gap-2">

    <button
      type="button"
      onClick={() => handleEditRoom(room)}
      className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600 transition"
    >
      Edit
    </button>

    <button
      type="button"
      onClick={() => handleDeleteRoom(room)}
      disabled={deletingRoom === room._id}
      className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {deletingRoom === room._id
        ? "Deleting..."
        : "Delete"}
    </button>

  </div>

</td>
                      </tr>
                    ))}
                  </tbody>

                </table>

              </div>
            )}

          </section>
        )}

      </div>
    </main>
  );
}