"use client";

import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { logout } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const currentUser = useAppSelector(s => s.user.currentUser);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gradient-to-r from-[#0a0a0f] to-[#111118] backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 md:px-6">

        {/* Logo */}
        <Link href="/feed" className="flex items-center gap-2 text-white font-bold text-lg">
          <span>🌐</span>
          <span>Public<span className="text-blue-500">Space</span></span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/feed" className="text-gray-300 hover:text-white text-sm transition">🏠 Feed</Link>
          {currentUser && (
            <Link href="/profile" className="text-gray-300 hover:text-white text-sm transition">👤 Profile</Link>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <>
              <div className="flex items-center gap-2">
                <img
                  src={currentUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.name}`}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="hidden md:block text-sm text-gray-300">{currentUser.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1.5 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-lg transition">
              Login →
            </Link>
          )}
        </div>

        {/* Mobile Nav Links */}
        <div className="flex md:hidden items-center gap-3 ml-2">
          <Link href="/feed" className="text-gray-300 hover:text-white text-lg">🏠</Link>
          {currentUser && (
            <Link href="/profile" className="text-gray-300 hover:text-white text-lg">👤</Link>
          )}
        </div>

      </div>
    </nav>
  );
}