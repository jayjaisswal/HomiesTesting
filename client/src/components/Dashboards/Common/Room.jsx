import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Room() {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(20);
  const loaderRef = useRef(null);

  const mainUri = import.meta.env.VITE_MAIN_URI;

  // ✅ Fetch rooms once
  useEffect(() => {
    fetchRooms();
    
  }, []);

  // ✅ Infinite Scroll using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible((prev) => prev + 20);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, []);

  // ✅ Fetch room data from backend
  const fetchRooms = async () => {
    try {
      const { data } = await axios.get(`${mainUri}/api/rooms/all`);
      console.log("Fetched rooms data:", data);
      if (Array.isArray(data)) setRooms(data);
      else if (Array.isArray(data.rooms)) setRooms(data.rooms);
      else if (Array.isArray(data.data)) setRooms(data.data);
      else setRooms([]);
    } catch (err) {
      console.error("Error fetching rooms:", err);
      setRooms([]);
    }
  };



  // ✅ Filter rooms
  const filteredRooms = Array.isArray(rooms)
    ? rooms.filter((room) =>
        room.student
          ? room.student.name?.toLowerCase().includes(search.toLowerCase()) ||
            room.student.urn?.toString().includes(search) ||
            room.student.dept?.toLowerCase().includes(search.toLowerCase())
          : room.roomNumber?.toString().includes(search)
      )
    : [];

  // ✅ Room stats
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter((r) => r.occupied).length;
  const emptyRooms = totalRooms - occupiedRooms;

  return (
    <div className="flex-1 min-h-screen bg-gray-50 overflow-x-hidden lg:ml-64 transition-all duration-300">
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">
          🏨 Room Management
        </h1>

        {/* 🔢 Stats & Search */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
          <input
            type="text"
            placeholder="Search by name, URN, department, or room number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <div className="flex gap-3 text-sm sm:text-base font-medium">
            <div className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg shadow-sm">
              Total: {totalRooms}
            </div>
            <div className="bg-red-100 text-red-700 px-3 py-2 rounded-lg shadow-sm">
              Occupied: {occupiedRooms}
            </div>
            <div className="bg-green-100 text-green-700 px-3 py-2 rounded-lg shadow-sm">
              Empty: {emptyRooms}
            </div>
          </div>
        </div>

        {/* 🧱 Room Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredRooms.slice(0, visible).map((room, index) => (
            <div
              key={room._id || index}
              className={`rounded-2xl border-2 shadow-md p-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg ${
                room.occupied ? "border-red-500" : "border-green-500"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold text-gray-800">
                  Room #{room.roomNumber}
                </span>
                <span
                  className={`text-sm font-bold ${
                    room.occupied ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {room.occupied ? "Occupied" : "Empty"}
                </span>
              </div>

              {room.occupied && room.student ? (
                <div className="mt-2 space-y-1">
                  <p className="font-medium text-gray-800">
                    {room.student.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    URN: {room.student.urn}
                  </p>
                  <p className="text-sm text-gray-600">
                    Dept: {room.student.dept}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500 text-sm mt-2">
                  No student assigned
                </p>
              )}
            </div>
          ))}
        </div>

        {/* 👇 Invisible loader trigger for infinite scroll */}
        <div ref={loaderRef} className="h-10"></div>
      </div>
    </div>
  );
}
