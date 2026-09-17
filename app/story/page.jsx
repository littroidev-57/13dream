import StoryTemplate from '@/components/UI/StoryTemplate';
import dbConnect from '@/lib/dbConnect';
import SuccessStory from '@/models/SuccessStory';
import { initialSuccessStories } from '@/lib/seedData';

export const metadata = {
  title: 'Visa Success Stories | 13 Dreams Consultants',
  description:
    'Hear directly from our successful students who received their study visas for Canada, Australia, UK, and Europe with 13 Dreams Consultants.',
};

export const revalidate = 60;

export default async function VisaSuccessStoriesPage() {
  let visaStories = [];
  try {
    await dbConnect();
    const docs = await SuccessStory.find({ category: 'visa' }).sort({ createdAt: -1 }).lean();
    if (docs && docs.length > 0) {
      visaStories = JSON.parse(JSON.stringify(docs));
    }
  } catch (err) {
    console.warn('MongoDB fetch error, falling back to seed stories:', err.message);
  }

  if (visaStories.length === 0) {
    visaStories = initialSuccessStories.filter((s) => s.category === 'visa');
  }

  return (
    <StoryTemplate
      title="Visa Success Stories"
      breadcrumbLabel={null}
      stories={visaStories}
      activeType="visa"
      badgeLabel={null}
    />
  );
}
