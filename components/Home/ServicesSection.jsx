import React from 'react';
import Link from 'next/link';
import { servicesData } from '@/lib/seedData';

export default function ServicesSection() {
  const featuredServices = servicesData.slice(0, 3);

  return (
    <section className="py-16 md:py-20 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-red-600 font-bold text-xs uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full border border-red-100">
            End-to-End Solutions
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mt-3">
            Our <span className="text-red-600">Expert Services</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-2">
            Personalized guidance from application processing to visa approval and pre-departure briefings.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredServices.map((service) => (
            <div
              key={service.id}
              className="bg-slate-50/80 rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:bg-white hover:border-red-100 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors mb-3">
                  <Link href={`/service/${service.slug}`}>{service.title}</Link>
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-200/60">
                <Link
                  href={`/service/${service.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 transition-colors"
                >
                  <span>Learn More</span>
                  <i className="fa-solid fa-circle-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/service"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gray-900 hover:bg-red-600 text-white font-bold text-sm shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>Explore All Services</span>
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
