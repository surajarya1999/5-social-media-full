"use client";

import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { logout } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const currentUser = useAppSelector(s => s.user.currentUser);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false); // ✅ added

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gradient-to-r from-[#0a0a0f] to-[#111118] backdrop-blur-md">
      
      {/* width responsive */}
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-3 sm:px-4 md:px-6">

        {/* Logo */}
        <Link href="/feed" className="flex items-center gap-2 text-white font-bold text-base sm:text-lg">
          <span>🌐</span>
          <span className="truncate">
            Public<span className="text-blue-500">Space</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/feed" className="text-gray-300 hover:text-white text-sm transition">🏠 Feed</Link>
          {currentUser && (
            <Link href="/profile" className="text-gray-300 hover:text-white text-sm transition">👤 Profile</Link>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">
          {currentUser ? (
            <>
              {/* Avatar + Name */}
              <div className="flex items-center gap-2">
                <img
                  src={currentUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.name}`}
                  alt={currentUser.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                />
                <span className="hidden md:block text-sm text-gray-300 truncate max-w-[100px]">
                  {currentUser.name}
                </span>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="hidden sm:block bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="hidden sm:block bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-lg transition">
              Login →
            </Link>
          )}

          {/* Mobile Icons + Hamburger */}
          <div className="flex md:hidden items-center gap-2 ml-1">
            <Link href="/feed" className="text-gray-300 hover:text-white text-lg">🏠</Link>
            {currentUser && (
              <Link href="/profile" className="text-gray-300 hover:text-white text-lg">👤</Link>
            )}

            {/* ✅ Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white text-xl ml-1"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#111118] border-t border-gray-800 px-4 py-3 space-y-3">

          <Link href="/feed" className="block text-gray-300 py-2 rounded-lg hover:bg-gray-800">
            🏠 Feed
          </Link>

          {currentUser && (
            <Link href="/profile" className="block text-gray-300 py-2 rounded-lg hover:bg-gray-800">
              👤 Profile
            </Link>
          )}

          <div className="border-t border-gray-700 pt-3">
            {currentUser ? (
              <>
                <p className="text-sm text-white">{currentUser.name}</p>

                <button
                  onClick={handleLogout}
                  className="mt-2 w-full text-left text-red-400 py-2 rounded-lg hover:bg-red-500/10"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="block text-blue-400 py-2">
                Login →
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}