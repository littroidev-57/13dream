import React from 'react';

export default function GloriousSection() {
  const highlights = [
    {
      icon: 'fa-solid fa-calendar-days',
      title: '15 Years Of Industries Experience',
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      icon: 'fa-solid fa-medal',
      title: 'Best Agency in Area',
      color: 'text-amber-500',
      bg: 'bg-amber-50',
    },
    {
      icon: 'fa-solid fa-building-columns',
      title: 'Partner of Many Foreign Institutions',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
  ];

  return (
    <section className="py-8 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50/70 border border-gray-100 hover:border-red-100 hover:bg-white hover:shadow-lg transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-xl ${item.bg} ${item.color} flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                <i className={item.icon}></i>
              </div>
              <h6 className="text-base font-bold text-gray-800 leading-snug group-hover:text-red-600 transition-colors">
                {item.title}
              </h6>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

