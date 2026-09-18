import Link from 'next/link';

export default function AnnouncementBar() {
  return (
    <div className="bg-red-600 text-white hover:text-black text-center py-3 sm:py-3.5 px-4 text-xs sm:text-sm font-semibold tracking-wide hover:bg-red-700 transition-colors duration-200 shadow-sm">
      <Link href="/apply" className="inline-flex items-center gap-2 hover:text-black transition-colors duration-200">
        <span>📢 Avail Free Counselling  — Apply Online</span>
        <span className="text-sm">➡️</span>
      </Link>
    </div>
  );
}
