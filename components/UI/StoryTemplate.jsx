'use client';

import React, { useState, useEffect, useRef } from 'react';
import PageBanner from '@/components/UI/PageBanner';
import Link from 'next/link';
import Image from 'next/image';

function normalizeImageUrl(url) {
  if (!url) return '';
  return url.replace(/^https?:\/\/13dreamsconsultants\.com\/img\//, '/img/');
}

const tabs = [
  { label: 'Visa Stories', href: '/story', type: 'visa' },
  { label: 'IELTS Success Stories', href: '/story/ielts', type: 'ielts' },
  { label: 'PTE Success Stories', href: '/story/pte', type: 'pte' },
];

const ITEMS_PER_PAGE = 12;

export default function StoryTemplate({
  title,
  breadcrumbLabel,
  stories = [],
  activeType = 'visa',
  badgeLabel,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const gridSectionRef = useRef(null);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeType]);

  // Filter stories by search term
  const filteredStories = stories.filter((story) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      story.studentName?.toLowerCase().includes(term) ||
      story.title?.toLowerCase().includes(term) ||
      story.countryOrScore?.toLowerCase().includes(term) ||
      story.testimonial?.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredStories.length / ITEMS_PER_PAGE);

  // Paginated subset of stories
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredStories.length);
  const paginatedStories = filteredStories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);
    if (gridSectionRef.current) {
      gridSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const isVisa = activeType === 'visa';

  return (
    <>
      <PageBanner
        title={title}
        breadcrumbs={[
          { label: 'Success Stories', href: '/story' },
          ...(breadcrumbLabel ? [{ label: breadcrumbLabel, href: null }] : []),
        ]}
      />

      <section ref={gridSectionRef} className="py-14 md:py-20 bg-gray-50/50 scroll-mt-24">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Category Tabs - Only Active Category Shown in the Center */}
          <div className="flex items-center justify-center mb-8">
            {tabs
              .filter((tab) => activeType === tab.type)
              .map((tab) => (
                <Link
                  key={tab.type}
                  href={tab.href}
                  className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full text-sm font-bold bg-red-600 text-white border border-red-600 shadow-lg shadow-red-600/25 cursor-default"
                >
                  <span>{tab.label}</span>
                </Link>
              ))}
          </div>

          {/* Instagram Social Banner for Visa Stories */}
          {isVisa && (
            <div className="mb-12 text-center max-w-2xl mx-auto">
              <p className="text-sm sm:text-base text-gray-600 mb-4 font-medium leading-relaxed">
                Watch real student visa celebrations, visa handover videos, and live success stories directly from our official Instagram!
              </p>
              <a
                href="https://www.instagram.com/13dreamsconsultants/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <i className="fa-brands fa-instagram text-lg"></i>
                <span>Follow @13dreamsconsultants on Instagram</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-xs opacity-80"></i>
              </a>
            </div>
          )}

          {/* Stories Grid */}
          {filteredStories.length > 0 ? (
            <>
              {isVisa ? (
                /* Instagram Reels Grid - Clean 9:16 Video Cards (Zero Side Black Screen, Zero Top/Bottom Bars) */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto justify-items-center">
                  {paginatedStories.map((reel, idx) => {
                    const storyKey = reel.reelId || reel.id || `${currentPage}-${idx}`;
                    return (
                      <div
                        key={storyKey}
                        className="w-[280px] h-[500px] rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl border border-gray-200/80 transition-all duration-300 hover:-translate-y-1.5 relative flex-shrink-0"
                      >
                        {/* Cropping wrapper: zero side black screen, zero top/bottom Instagram bars */}
                        <div className="relative w-full h-full overflow-hidden bg-white">
                          <iframe
                            src={`https://www.instagram.com/reel/${reel.reelId || reel.id}/embed/`}
                            className="absolute border-0"
                            style={{
                              top: '-64px',
                              left: '-80px',
                              width: '440px',
                              height: '700px',
                            }}
                            title={reel.title || reel.studentName}
                            loading="lazy"
                            scrolling="no"
                            allowFullScreen
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* IELTS / PTE Scorecards Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {paginatedStories.map((story, idx) => {
                    const storyKey = story._id || `${currentPage}-${idx}`;
                    const imgUrl = normalizeImageUrl(story.image);
                    return (
                      <div
                        key={storyKey}
                        className="bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
                      >
                        {/* Media Container */}
                        <div className="relative h-64 overflow-hidden bg-white">
                          <div
                            onClick={() => setSelectedImage(story)}
                            className="w-full h-full relative cursor-pointer group/score flex items-center justify-center bg-white"
                          >
                            <Image
                              src={imgUrl}
                              alt={story.studentName}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                              priority={idx < 4}
                              className="object-contain p-2 bg-white group-hover/score:scale-105 transition-transform duration-300"
                            />
                            {/* Magnify overlay for Scorecard */}
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white font-bold text-xs pointer-events-none">
                              <span className="px-3.5 py-1.5 rounded-full bg-red-600/90 backdrop-blur-sm flex items-center gap-1.5 shadow-lg">
                                <i className="fa-solid fa-magnifying-glass-plus"></i> View Scorecard
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Card Content Info */}
                        <div className="py-3.5 px-4 bg-white text-center">
                          <h4 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1 group-hover:text-red-600 transition-colors">
                            {story.studentName}
                          </h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200 max-w-6xl mx-auto">
                  {/* Results Count Text */}
                  <p className="text-sm text-gray-500 order-2 sm:order-1">
                    Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span> to{' '}
                    <span className="font-semibold text-gray-900">{endIndex}</span> of{' '}
                    <span className="font-semibold text-gray-900">{filteredStories.length}</span> {isVisa ? 'reels' : 'stories'}
                  </p>

                  {/* Page Buttons */}
                  <div className="flex items-center gap-1.5 order-1 sm:order-2">
                    {/* Previous Button */}
                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all ${
                        currentPage === 1
                          ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 shadow-sm active:scale-95 cursor-pointer'
                      }`}
                      aria-label="Previous Page"
                    >
                      <i className="fa-solid fa-chevron-left text-xs"></i>
                      <span className="hidden sm:inline">Prev</span>
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {getPageNumbers().map((page, pIdx) => {
                        if (page === '...') {
                          return (
                            <span
                              key={`ellipsis-${pIdx}`}
                              className="w-9 h-9 flex items-center justify-center text-gray-400 font-semibold"
                            >
                              …
                            </span>
                          );
                        }

                        const isCurrent = currentPage === page;
                        return (
                          <button
                            key={`page-${page}`}
                            type="button"
                            onClick={() => handlePageChange(page)}
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-red-600 text-white shadow-md shadow-red-600/30 scale-105'
                                : 'bg-white text-gray-700 border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 shadow-sm'
                            }`}
                            aria-label={`Page ${page}`}
                            aria-current={isCurrent ? 'page' : undefined}
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>

                    {/* Next Button */}
                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all ${
                        currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 shadow-sm active:scale-95 cursor-pointer'
                      }`}
                      aria-label="Next Page"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <i className="fa-solid fa-chevron-right text-xs"></i>
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-200">
              <i className="fa-solid fa-graduation-cap text-5xl mb-4 text-gray-300 block"></i>
              <h3 className="text-lg font-bold text-gray-700 mb-1">No Stories Found</h3>
              <p className="text-sm text-gray-500">
                {searchTerm
                  ? `No success stories matched "${searchTerm}". Try another keyword.`
                  : 'Check back soon for new student success stories!'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal for Scorecards (IELTS / PTE) */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 pt-32 sm:pt-36 md:pt-40 pb-6 sm:pb-8 overflow-y-auto"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[calc(100vh-160px)] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col my-auto animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider">
                  {selectedImage.category}
                </span>
                <h3 className="font-bold text-base text-gray-900">{selectedImage.studentName}</h3>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="p-3 sm:p-4 bg-white flex items-center justify-center overflow-auto flex-grow">
              <img
                src={normalizeImageUrl(selectedImage.image)}
                alt={selectedImage.studentName}
                className="max-h-[56vh] sm:max-h-[62vh] w-auto object-contain rounded-lg"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-2.5 bg-white border-t border-gray-100 flex items-center justify-end flex-shrink-0">
              <a
                href={normalizeImageUrl(selectedImage.image)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-colors flex-shrink-0"
              >
                <i className="fa-solid fa-arrow-up-right-from-square"></i> Open Original
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
