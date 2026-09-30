import dns from 'dns';
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore if not supported in environment
}

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

const TARGET_URIS = process.env.MONGODB_URI
  ? [{ name: 'Custom MongoDB', uri: process.env.MONGODB_URI }]
  : [
      { name: 'Local MongoDB', uri: 'mongodb://localhost:27017/13dreams' },
      { name: 'Atlas Live MongoDB', uri: 'mongodb+srv://littroidev_db_user:wU5WwulIPnZql2nu@cluster0.nhy2e6y.mongodb.net/13dreams' },
    ];

async function seedTarget(target) {
  console.log(`\n========================================`);
  console.log(`Connecting to ${target.name}: ${target.uri.replace(/:([^:@]+)@/, ':****@')}`);
  console.log(`========================================`);

  const conn = await mongoose.createConnection(target.uri, { serverSelectionTimeoutMS: 15000 }).asPromise();
  console.log(`✓ ${target.name} connected successfully.`);

  const DestinationModel = conn.model('Destination', Destination.schema);
  const BlogModel = conn.model('Blog', Blog.schema);
  const StoryModel = conn.model('SuccessStory', SuccessStory.schema);
  const ServiceModel = conn.model('Service', Service.schema);

  // Seed / Sync Destinations (Countries)
  console.log(`Syncing ${destinationsData.length} study destinations to ${target.name}...`);
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

    await DestinationModel.findOneAndUpdate(
      { id: dest.id },
      { $set: doc },
      { upsert: true, returnDocument: 'after' }
    );
    syncedDestCount++;
  }
  const totalDestInDb = await DestinationModel.countDocuments();
  console.log(`✓ Successfully synced ${syncedDestCount} destinations to ${target.name}! Total: ${totalDestInDb}.`);

  // Seed / Sync Blogs
  console.log(`Syncing ${initialBlogs.length} blogs to ${target.name}...`);
  let syncedBlogsCount = 0;
  for (const item of initialBlogs) {
    await BlogModel.findOneAndUpdate(
      { slug: item.slug },
      { $set: item },
      { upsert: true, returnDocument: 'after' }
    );
    syncedBlogsCount++;
  }
  const totalBlogsInDb = await BlogModel.countDocuments();
  console.log(`✓ Successfully synced ${syncedBlogsCount} blogs to ${target.name}! Total: ${totalBlogsInDb}.`);

  // Seed / Sync Success Stories
  console.log(`Syncing ${initialSuccessStories.length} authentic success stories to ${target.name}...`);
  let syncedStoriesCount = 0;
  for (const item of initialSuccessStories) {
    await StoryModel.findOneAndUpdate(
      {
        $or: [
          { image: item.image, category: item.category },
          { studentName: item.studentName, category: item.category },
        ],
      },
      { $set: item },
      { upsert: true, returnDocument: 'after' }
    );
    syncedStoriesCount++;
  }
  const totalStoriesInDb = await StoryModel.countDocuments();
  console.log(`✓ Successfully synced ${syncedStoriesCount} stories to ${target.name}! Total: ${totalStoriesInDb}.`);

  // Seed Services
  const scrapedServicesPath = path.join(__dirname, '../lib/servicesScraped.json');
  if (fs.existsSync(scrapedServicesPath)) {
    const scrapedServices = JSON.parse(fs.readFileSync(scrapedServicesPath, 'utf8'));
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

      await ServiceModel.findOneAndUpdate(
        { slug: item.slug },
        { $set: serviceDoc },
        { upsert: true, returnDocument: 'after' }
      );
      seededCount++;
    }
    console.log(`✓ Successfully upserted ${seededCount} services into ${target.name}!`);
  }

  await conn.close();
  console.log(`✓ Finished sync for ${target.name}.\n`);
}

async function seed() {
  try {
    for (const target of TARGET_URIS) {
      try {
        await seedTarget(target);
      } catch (targetErr) {
        console.error(`✗ Error syncing to ${target.name}:`, targetErr.message);
      }
    }
    console.log('All seeding operations completed.');
    process.exit(0);
  } catch (error) {
    console.error('Fatal seeding error:', error);
    process.exit(1);
  }
}

seed();
