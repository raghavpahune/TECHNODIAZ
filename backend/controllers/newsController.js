import axios from 'axios';
import { fallbackDB } from '../config/db.js';

const FALLBACK_ARTICLES = [
  {
    id: 'art_1',
    title: 'Quantum Bio-Computing: Merging Living Organisms with Silicon Microchips',
    description: 'Researchers uncover novel bio-hybrid neural interfaces capable of processing machine learning workflows using sustainable plant electrolytes.',
    url: 'https://news.ycombinator.com',
    source: 'TechNature Labs',
    publishedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    tags: ['Biotech', 'Quantum', 'AI'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'art_2',
    title: 'Green AI: Transforming Massive Neural Networks for 80% Lower Carbon Emissions',
    description: 'Breakthrough algorithmic pruning and edge silicon architectures allow LLMs to operate efficiently on renewable micro-grids.',
    url: 'https://dev.to',
    source: 'EcoCode Dispatch',
    publishedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    tags: ['SustainableAI', 'GreenTech', 'ML'],
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'art_3',
    title: 'Next-Gen WebAssembly & WebGPU: Native Performance in the Modern Browser',
    description: 'How modern web standards are transforming browser-based graphics, computer vision models, and distributed edge computing.',
    url: 'https://github.com',
    source: 'Dev.to Tech Radar',
    publishedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    tags: ['WebAssembly', 'WebGPU', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'art_4',
    title: 'Autonomous Robotics in Precision Agriculture & Reforestation',
    description: 'Swarm drone intelligence and computer vision algorithms are planting 10,000 native saplings daily while monitoring soil health.',
    url: 'https://techcrunch.com',
    source: 'Global Tech Chronicle',
    publishedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    tags: ['Robotics', 'Agriculture', 'IoT'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'art_5',
    title: 'Zero-Knowledge Cryptography: The Future of Decentralized Identity and Data Privacy',
    description: 'ZK-SNARKs and homomorphic encryption enable verifiable authentication without exposing sensitive credentials or personal telemetry.',
    url: 'https://wired.com',
    source: 'CyberSecurity Pulse',
    publishedAt: new Date(Date.now() - 1000 * 60 * 480).toISOString(),
    tags: ['CyberSecurity', 'Cryptography', 'Privacy'],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80'
  }
];

let newsCache = {
  timestamp: 0,
  articles: FALLBACK_ARTICLES
};

export const getTechNews = async (req, res) => {
  try {
    const now = Date.now();
    // Use cached news if fetched in the last 15 minutes
    if (newsCache.articles.length > 0 && now - newsCache.timestamp < 15 * 60 * 1000) {
      return res.json({
        success: true,
        source: 'cache',
        articles: newsCache.articles
      });
    }

    try {
      // Attempt to fetch from Dev.to public API (free, reliable, no API key required)
      const response = await axios.get('https://dev.to/api/articles?tag=technology&per_page=8', {
        timeout: 3000
      });

      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        const fetched = response.data.map((item, idx) => ({
          id: `devto_${item.id || idx}`,
          title: item.title,
          description: item.description || item.readable_publish_date,
          url: item.url,
          source: item.user?.name || 'Dev Community',
          publishedAt: item.published_at || new Date().toISOString(),
          tags: item.tag_list || ['Technology', 'Software'],
          image: item.cover_image || item.social_image || FALLBACK_ARTICLES[idx % FALLBACK_ARTICLES.length].image
        }));

        // Merge with our nature-tech articles
        newsCache = {
          timestamp: now,
          articles: [...fetched, ...FALLBACK_ARTICLES.slice(0, 3)]
        };

        return res.json({
          success: true,
          source: 'live_api',
          articles: newsCache.articles
        });
      }
    } catch (apiErr) {
      console.warn('[TechNews API] External API unavailable, serving curated tech news cache:', apiErr.message);
    }

    newsCache.timestamp = now;
    newsCache.articles = FALLBACK_ARTICLES;

    return res.json({
      success: true,
      source: 'curated_feed',
      articles: newsCache.articles
    });
  } catch (err) {
    return res.json({
      success: true,
      source: 'fallback',
      articles: FALLBACK_ARTICLES
    });
  }
};
