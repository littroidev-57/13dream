'use client';

import React from 'react';
import Link from 'next/link';

// Curated Instagram Reels from 13 Dreams Consultants
export const instagramReels = [
  {
    id: 'DWBle0XiZmj',
    url: 'https://www.instagram.com/13dreamsconsultants/reel/DWBle0XiZmj/',
    title: 'Surprise Australia Study Visa Grant',
  },
  {
    id: 'Dbf5-aoxeNm',
    url: 'https://www.instagram.com/reel/Dbf5-aoxeNm/?stkn=bHFob3ZqaTkzdG5t',
    title: 'Student Visa Approved Celebration',
  },
  {
    id: 'DXooiMQiCBG',
    url: 'https://www.instagram.com/reel/DXooiMQiCBG/?stkn=aHhldm11MGdsOG5s',
    title: 'Overseas Study Dream Come True',
  },
  {
    id: 'DWOiy3mEU6m',
    url: 'https://www.instagram.com/reel/DWOiy3mEU6m/?stkn=d3JpcHRkYm52emFx',
    title: 'Australia Visa Handover Moment',
  },
  {
    id: 'DVi5h-PEcKp',
    url: 'https://www.instagram.com/reel/DVi5h-PEcKp/?stkn=MXF5cWt4Zjl0eTUzeQ==',
    title: 'Emotional Study Visa Success',
  },
  {
    id: 'DVQqyPSEWHN',
    url: 'https://www.instagram.com/reel/DVQqyPSEWHN/?stkn=ZHR6cTRmeTRlNzNi',
    title: 'USA Student Visa Approved',
  },
  {
    id: 'DVIacDekT23',
    url: 'https://www.instagram.com/reel/DVIacDekT23/?stkn=NTYzaWlydTBxanR1',
    title: 'Australia Study Visa Granted',
  },
  {
    id: 'DU5gzuKkfXU',
    url: 'https://www.instagram.com/reel/DU5gzuKkfXU/?stkn=MXN4Z2lucGhlazZycg==',
    title: 'Fast-Track Student Visa Result',
  },
  {
    id: 'DU0TXwfEXnp',
    url: 'https://www.instagram.com/reel/DU0TXwfEXnp/?stkn=MWpqdWtwa20wbm5iNw==',
    title: 'Top University Admission & Visa',
  },
  {
    id: 'DT2qW6dEdVf',
    url: 'https://www.instagram.com/reel/DT2qW6dEdVf/?stkn=MXJsbTRzZjZoY3I4ag==',
    title: 'Australia Higher Education Grant',
  },
  {
    id: 'DSaBYMakRj9',
    url: 'https://www.instagram.com/reel/DSaBYMakRj9/?stkn=am5zN3djMDMyeGhw',
    title: 'Pure Happiness: Student Visa Achieved',
  },
  {
    id: 'DSXWC37kTf-',
    url: 'https://www.instagram.com/reel/DSXWC37kTf-/?stkn=dXdseHk1NjNjbWx1',
    title: 'Canada Study Permit Victory',
  },
  {
    id: 'DSSQwoekb9N',
    url: 'https://www.instagram.com/reel/DSSQwoekb9N/?stkn=aHUycnA5MTVpZzBx',
    title: 'UK Visa Approval Handover',
  },
  {
    id: 'DSKtMI0Efjx',
    url: 'https://www.instagram.com/reel/DSKtMI0Efjx/?stkn=MTY0N2QzZTg1OWozeg==',
    title: 'Visa Handover & Student Review',
  },
  {
    id: 'DRzOSjhkZTu',
    url: 'https://www.instagram.com/reel/DRzOSjhkZTu/?stkn=aWhvYjZzNXkwcGNr',
    title: 'Australia Visa Grant Celebration',
  },
  {
    id: 'DRwwjAFkQb4',
    url: 'https://www.instagram.com/reel/DRwwjAFkQb4/?stkn=emlybGV2NnVydnBv',
    title: 'New Zealand / Australia Journey',
  },
  {
    id: 'DRhSf7KEcFP',
    url: 'https://www.instagram.com/reel/DRhSf7KEcFP/?stkn=MWRoeHY0aGtkYXlodQ==',
    title: 'Student Visa Handover Experience',
  },
];

export default function VideoSuccessStories() {
  return (
    <section className="story-marquee-section">
      <div className="container">
        {/* Only Title - Centered */}
        <div className="section-title text-center" style={{ marginBottom: '35px' }}>
          <h2>
            <span>Success </span>
            <b>Stories</b>
          </h2>
        </div>
      </div>

      {/* Infinite Seamless Scrolling Marquee with Pause on Hover */}
      <div className="story-marquee-container">
        <div className="story-marquee-track">
          {/* Loop twice for a seamless, continuous, infinite marquee */}
          {[...instagramReels, ...instagramReels].map((reel, index) => (
            <div key={`${reel.id}-${index}`} className="story-reel-card">
              <div className="story-card-body">
                <iframe
                  src={`https://www.instagram.com/reel/${reel.id}/embed/`}
                  className="story-iframe"
                  title={reel.title}
                  loading="lazy"
                  scrolling="no"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom See More Button */}
      <div style={{ textAlign: 'center', marginTop: '45px' }}>
        <Link href="/story" className="bizwheel-btn theme-2">
          See More Video
        </Link>
      </div>
    </section>
  );
}
