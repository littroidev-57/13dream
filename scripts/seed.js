import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Blog from '../models/Blog.js';
import SuccessStory from '../models/SuccessStory.js';
import Service from '../models/Service.js';
import { initialBlogs, initialSuccessStories } from '../lib/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/13dreams';

async function seed() {
  try {
    console.log('Connecting to MongoDB:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully.');

    // Seed Blogs
    const existingBlogs = await Blog.countDocuments();
    if (existingBlogs === 0) {
      console.log('Seeding initial blogs...');
      await Blog.insertMany(initialBlogs);
      console.log(`Seeded ${initialBlogs.length} blogs.`);
    } else {
      console.log(`Found ${existingBlogs} existing blogs in database.`);
    }

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
          image: item.localImage || item.image || '',
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
