import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Blog from '../models/Blog.js';
import SuccessStory from '../models/SuccessStory.js';
import Service from '../models/Service.js';
import Destination from '../models/Destination.js';
import { initialBlogs, initialSuccessStories, destinationsData } from '../lib/seedData.js';
import { countryPageData } from '../lib/pageData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/13dreams';

async function seed() {
  try {
    console.log('Connecting to MongoDB:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully.');

    // Seed / Sync Destinations (Countries)
    console.log(`Syncing ${destinationsData.length} study destinations (including Malta, Singapore, Netherlands) to MongoDB...`);
    let syncedDestCount = 0;
    for (let i = 0; i < destinationsData.length; i++) {
      const dest = destinationsData[i];
      const detail = countryPageData[dest.id] || {};
      const doc = {
        id: dest.id,
        slug: dest.slug,
        name: dest.name,
        countryName: detail.countryName || dest.name.replace('Study in ', ''),
        image: dest.image,
        bannerImg: detail.bannerImg || dest.image,
        description: dest.description,
        tagline: detail.tagline || '',
        overview: detail.overview || dest.description,
        whyStudyPoints: detail.whyStudyPoints || [],
        topUniversities: detail.topUniversities || [],
        visaFacts: detail.visaFacts || [],
        metaTitle: detail.metaTitle || `${dest.name} | 13 Dreams Consultants`,
        metaDesc: detail.metaDesc || dest.description,
        keywords: detail.keywords || [],
        order: i + 1,
      };

      await Destination.findOneAndUpdate(
        { id: dest.id },
        { $set: doc },
        { upsert: true, returnDocument: 'after' }
      );
      syncedDestCount++;
    }
    const totalDestInDb = await Destination.countDocuments();
    console.log(`Successfully synced ${syncedDestCount} destinations! Total destinations in database: ${totalDestInDb}.`);

    // Seed / Sync Blogs
    console.log(`Syncing ${initialBlogs.length} blogs to MongoDB...`);
    let syncedBlogsCount = 0;
    for (const item of initialBlogs) {
      await Blog.findOneAndUpdate(
        { slug: item.slug },
        { $set: item },
        { upsert: true, returnDocument: 'after' }
      );
      syncedBlogsCount++;
    }
    const totalBlogsInDb = await Blog.countDocuments();
    console.log(`Successfully synced ${syncedBlogsCount} blogs! Total blogs in database: ${totalBlogsInDb}.`);

    // Seed / Sync Success Stories
    console.log(`Syncing ${initialSuccessStories.length} authentic success stories to MongoDB...`);
    let syncedStoriesCount = 0;
    for (const item of initialSuccessStories) {
      await SuccessStory.findOneAndUpdate(
        { image: item.image, category: item.category },
        { $set: item },
        { upsert: true, returnDocument: 'after' }
      );
      syncedStoriesCount++;
    }
    const totalStoriesInDb = await SuccessStory.countDocuments();
    console.log(`Successfully synced ${syncedStoriesCount} stories! Total stories in database: ${totalStoriesInDb}.`);

    // Seed Services from servicesScraped.json
    const scrapedServicesPath = path.join(__dirname, '../lib/servicesScraped.json');
    if (fs.existsSync(scrapedServicesPath)) {
      const scrapedServices = JSON.parse(fs.readFileSync(scrapedServicesPath, 'utf8'));
      console.log(`Found ${scrapedServices.length} scraped services to seed.`);

      let seededCount = 0;
      for (let i = 0; i < scrapedServices.length; i++) {
        const item = scrapedServices[i];
        const serviceDoc = {
          slug: item.slug,
          title: item.title,
          subtitle: item.subtitle || '',
          metaTitle: item.metaTitle || `${item.title} | 13 Dreams Consultants`,
          metaDesc: item.metaDesc || '',
          image: item.image || item.localImage || '',
          content: item.content,
          order: i + 1,
        };

        // Upsert by slug so re-running seed updates or inserts properly
        await Service.findOneAndUpdate(
          { slug: item.slug },
          { $set: serviceDoc },
          { upsert: true, returnDocument: 'after' }
        );
        seededCount++;
      }
      console.log(`Successfully upserted ${seededCount} services into MongoDB!`);
    } else {
      console.warn('lib/servicesScraped.json not found, skipping service seeding.');
    }

    console.log('All seeding tasks completed.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
