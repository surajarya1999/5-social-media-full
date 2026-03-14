export default function Footer() {
  return (
    <footer className="bg-[#111118] border-t border-gray-800 mt-10">
      <div className="max-w-5xl mx-auto px-5 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-sm font-extrabold text-indigo-400">🌐 PublicSpace</p>
        <p className="text-xs text-gray-500">© {new Date().getFullYear()} Public Space. All rights reserved.</p>
        <div className="flex gap-4 text-xs text-gray-500">
          <span>📋 Rules</span>
          <span>🔐 Secure</span>
          <span>👥 Community</span>
        </div>
      </div>
    </footer>
  );
}