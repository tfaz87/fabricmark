/**
 * FabricMark — Algolia index population script
 * 
 * Run this once to populate your Algolia brands index.
 * Then re-run whenever you add or update a brand.
 * 
 * Usage:
 *   1. npm install algoliasearch
 *   2. Set your ALGOLIA_ADMIN_KEY environment variable
 *   3. node upload-brands.js
 * 
 * Your Admin API key is in Algolia dashboard → API Keys → Admin API Key
 * NEVER commit your admin key to GitHub. Use environment variables only.
 * 
 * Application ID: 6OA13BJ9VJ
 * Search-only key (public, safe to commit): d775f74398bee37ef076cb1e2c314fa3
 */

const algoliasearch = require('algoliasearch');

const APP_ID = '6OA13BJ9VJ';
const ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY; // set this as env var, never hardcode

if (!ADMIN_KEY) {
  console.error('ERROR: Set ALGOLIA_ADMIN_KEY environment variable first.');
  console.error('  Mac/Linux: export ALGOLIA_ADMIN_KEY=your_admin_key_here');
  console.error('  Windows:   set ALGOLIA_ADMIN_KEY=your_admin_key_here');
  process.exit(1);
}

const client = algoliasearch(APP_ID, ADMIN_KEY);
const brandsIndex = client.initIndex('brands');
const guidesIndex = client.initIndex('guides');
const suppliersIndex = client.initIndex('suppliers');

// ── BRAND DATA ──────────────────────────────────────────────────────────────
// Each record maps to a brand review page.
// objectID must match the HTML filename (used to build the URL).
// Sanity integration: when Sanity is set up, this data comes from Sanity's API
// instead of being hardcoded here. This script becomes a Sanity webhook handler.

const brands = [
  {
    objectID: 'zara',
    name: 'Zara',
    slug: 'zara',
    url: '/brands/zara.html',
    category: 'Fast fashion',
    country: 'Spain',
    group: 'Inditex Group',
    scores: { quality: 3, ethics: 3, transparency: 4 },
    qualityScore: 3,
    ethicsScore: 3,
    transparencyScore: 4,
    priceTier: 3,
    priceLabel: '£££',
    fabricTypes: ['Cotton', 'Wool', 'Linen', 'Silk', 'Viscose', 'Lyocell', 'Modal', 'Polyester', 'Polyamide', 'Acrylic', 'Elastane'],
    naturalFibres: ['Cotton', 'Wool', 'Linen', 'Silk'],
    syntheticFibres: ['Polyester', 'Polyamide', 'Acrylic', 'Elastane'],
    manufacturingCountries: ['Spain', 'Portugal', 'Morocco', 'Turkey', 'China', 'Bangladesh'],
    certifications: [],
    updatedAt: '2026-04-01',
    excerpt: 'Zara sits at the premium end of fast fashion. Quality varies considerably item to item — strong on tailored pieces, weaker on casualwear.',
    searchableText: 'Zara Inditex fast fashion Spain quality ethics transparency fabric wool cotton polyester'
  },
  {
    objectID: 'hm',
    name: 'H&M',
    slug: 'hm',
    url: '/brands/hm.html',
    category: 'Fast fashion',
    country: 'Sweden',
    group: 'H&M Group',
    scores: { quality: 2, ethics: 2, transparency: 3 },
    qualityScore: 2,
    ethicsScore: 2,
    transparencyScore: 3,
    priceTier: 2,
    priceLabel: '££',
    fabricTypes: ['Cotton', 'Viscose', 'Lyocell', 'Polyester', 'Polyamide', 'Acrylic', 'Elastane'],
    naturalFibres: ['Cotton'],
    syntheticFibres: ['Polyester', 'Polyamide', 'Acrylic', 'Elastane'],
    manufacturingCountries: ['Bangladesh', 'China', 'Cambodia', 'Vietnam', 'India', 'Pakistan', 'Turkey'],
    certifications: ['BCI'],
    updatedAt: '2026-04-01',
    excerpt: 'H&M sits at the lower end of fast fashion quality. Low price points are reflected in fabric choices and longevity. Greenwashing concerns around the Conscious Collection.',
    searchableText: 'H&M Hennes Mauritz fast fashion Sweden quality ethics transparency fabric polyester cotton Conscious Collection'
  },
  {
    objectID: 'primark',
    name: 'Primark',
    slug: 'primark',
    url: '/brands/primark.html',
    category: 'Fast fashion',
    country: 'Ireland',
    group: 'Associated British Foods',
    scores: { quality: 1, ethics: 1, transparency: 2 },
    qualityScore: 1,
    ethicsScore: 1,
    transparencyScore: 2,
    priceTier: 1,
    priceLabel: '£',
    fabricTypes: ['Cotton', 'Polyester', 'Acrylic', 'Elastane'],
    naturalFibres: ['Cotton'],
    syntheticFibres: ['Polyester', 'Acrylic', 'Elastane'],
    manufacturingCountries: ['Bangladesh', 'China', 'India', 'Pakistan', 'Cambodia'],
    certifications: ['GOTS (partial)'],
    updatedAt: '2026-04-01',
    excerpt: 'Primark is the lowest price point in UK fast fashion. Garments are designed to last weeks, not seasons. Significant ethical and transparency concerns.',
    searchableText: 'Primark budget fast fashion Ireland ABF quality ethics transparency cheap'
  },
  {
    objectID: 'next',
    name: 'Next',
    slug: 'next',
    url: '/brands/next.html',
    category: 'Contemporary',
    country: 'United Kingdom',
    group: 'Next PLC',
    scores: { quality: 3, ethics: 3, transparency: 3 },
    qualityScore: 3,
    ethicsScore: 3,
    transparencyScore: 3,
    priceTier: 3,
    priceLabel: '£££',
    fabricTypes: ['Cotton', 'Wool', 'Viscose', 'Polyester', 'Elastane'],
    naturalFibres: ['Cotton', 'Wool'],
    syntheticFibres: ['Polyester', 'Elastane'],
    manufacturingCountries: ['Bangladesh', 'China', 'India', 'Sri Lanka', 'Turkey'],
    certifications: ['BCI'],
    updatedAt: '2026-04-01',
    excerpt: 'Next offers solid mid-market quality across basics and occasionwear. Consistent construction standards and a reliable mid-range option for UK shoppers.',
    searchableText: 'Next contemporary UK mid-range quality ethics fabric cotton wool'
  },
  {
    objectID: 'marks-and-spencer',
    name: 'Marks & Spencer',
    slug: 'marks-and-spencer',
    url: '/brands/marks-and-spencer.html',
    category: 'Contemporary',
    country: 'United Kingdom',
    group: 'M&S Group',
    scores: { quality: 4, ethics: 3, transparency: 4 },
    qualityScore: 4,
    ethicsScore: 3,
    transparencyScore: 4,
    priceTier: 4,
    priceLabel: '££££',
    fabricTypes: ['Cotton', 'Wool', 'Linen', 'Cashmere', 'Viscose', 'Polyester'],
    naturalFibres: ['Cotton', 'Wool', 'Linen', 'Cashmere'],
    syntheticFibres: ['Polyester'],
    manufacturingCountries: ['United Kingdom', 'Sri Lanka', 'Bangladesh', 'India', 'Turkey'],
    certifications: ['BCI', 'GOTS', 'Fairtrade cotton'],
    updatedAt: '2026-04-01',
    excerpt: 'M&S offers consistently good quality for a high street brand. Strong on natural fibres, especially in knitwear and tailoring. A reliable choice for longevity.',
    searchableText: 'Marks Spencer M&S contemporary UK quality ethics cashmere wool cotton linen premium'
  },
  {
    objectID: 'asos',
    name: 'ASOS',
    slug: 'asos',
    url: '/brands/asos.html',
    category: 'Fast fashion',
    country: 'United Kingdom',
    group: 'ASOS PLC',
    scores: { quality: 2, ethics: 2, transparency: 3 },
    qualityScore: 2,
    ethicsScore: 2,
    transparencyScore: 3,
    priceTier: 2,
    priceLabel: '££',
    fabricTypes: ['Cotton', 'Viscose', 'Polyester', 'Elastane', 'Polyamide'],
    naturalFibres: ['Cotton'],
    syntheticFibres: ['Polyester', 'Elastane', 'Polyamide'],
    manufacturingCountries: ['China', 'Bangladesh', 'India', 'Turkey', 'Morocco'],
    certifications: [],
    updatedAt: '2026-04-01',
    excerpt: 'ASOS is a multi-brand platform that also sells own-label clothing. Quality is inconsistent and typically reflects the low price points. Primarily a convenience platform.',
    searchableText: 'ASOS online fast fashion UK quality ethics polyester cotton'
  },
  {
    objectID: 'river-island',
    name: 'River Island',
    slug: 'river-island',
    url: '/brands/river-island.html',
    category: 'Fast fashion',
    country: 'United Kingdom',
    group: 'River Island',
    scores: { quality: 2, ethics: 2, transparency: 2 },
    qualityScore: 2,
    ethicsScore: 2,
    transparencyScore: 2,
    priceTier: 3,
    priceLabel: '£££',
    fabricTypes: ['Cotton', 'Viscose', 'Polyester', 'Elastane'],
    naturalFibres: ['Cotton'],
    syntheticFibres: ['Polyester', 'Elastane'],
    manufacturingCountries: ['China', 'Bangladesh', 'India', 'Turkey'],
    certifications: [],
    updatedAt: '2026-04-01',
    excerpt: 'River Island occupies the mid-range fast fashion tier but quality often does not match the pricing. Limited transparency on supply chain and sustainability.',
    searchableText: 'River Island fast fashion UK quality ethics transparency'
  },
  {
    objectID: 'uniqlo',
    name: 'Uniqlo',
    slug: 'uniqlo',
    url: '/brands/uniqlo.html',
    category: 'Contemporary',
    country: 'Japan',
    group: 'Fast Retailing',
    scores: { quality: 4, ethics: 3, transparency: 4 },
    qualityScore: 4,
    ethicsScore: 3,
    transparencyScore: 4,
    priceTier: 3,
    priceLabel: '£££',
    fabricTypes: ['Cotton', 'Wool', 'Linen', 'Cashmere', 'Silk', 'Polyester', 'Nylon'],
    naturalFibres: ['Cotton', 'Wool', 'Linen', 'Cashmere', 'Silk'],
    syntheticFibres: ['Polyester', 'Nylon'],
    manufacturingCountries: ['China', 'Vietnam', 'Bangladesh', 'Indonesia', 'Japan'],
    certifications: ['BCI', 'Better Cotton'],
    updatedAt: '2026-04-01',
    excerpt: 'Uniqlo is exceptional value for quality. Their LifeWear philosophy emphasises longevity over trend. Cashmere, merino and HEATTECH lines are consistently well-made.',
    searchableText: 'Uniqlo Japan contemporary quality ethics cashmere wool cotton LifeWear HEATTECH basics'
  },
  {
    objectID: 'arket',
    name: 'Arket',
    slug: 'arket',
    url: '/brands/arket.html',
    category: 'Contemporary',
    country: 'Sweden',
    group: 'H&M Group',
    scores: { quality: 4, ethics: 3, transparency: 4 },
    qualityScore: 4,
    ethicsScore: 3,
    transparencyScore: 4,
    priceTier: 4,
    priceLabel: '££££',
    fabricTypes: ['Cotton', 'Wool', 'Linen', 'Cashmere', 'Silk', 'Lyocell', 'Polyester'],
    naturalFibres: ['Cotton', 'Wool', 'Linen', 'Cashmere', 'Silk'],
    syntheticFibres: ['Polyester'],
    manufacturingCountries: ['Portugal', 'Turkey', 'India', 'China'],
    certifications: ['GOTS', 'BCI', 'RWS'],
    updatedAt: '2026-04-01',
    excerpt: 'Arket is H&M Group\'s quality-focused brand. Consistently good fabric choices, strong on natural fibres, and more transparent than its parent company on supply chain.',
    searchableText: 'Arket H&M Group contemporary Sweden premium quality ethics wool cashmere linen cotton'
  },
  {
    objectID: 'cos',
    name: 'COS',
    slug: 'cos',
    url: '/brands/cos.html',
    category: 'Contemporary',
    country: 'Sweden',
    group: 'H&M Group',
    scores: { quality: 4, ethics: 3, transparency: 4 },
    qualityScore: 4,
    ethicsScore: 3,
    transparencyScore: 4,
    priceTier: 4,
    priceLabel: '££££',
    fabricTypes: ['Cotton', 'Wool', 'Linen', 'Silk', 'Lyocell', 'Viscose', 'Polyester'],
    naturalFibres: ['Cotton', 'Wool', 'Linen', 'Silk'],
    syntheticFibres: ['Polyester'],
    manufacturingCountries: ['Portugal', 'Turkey', 'China', 'India'],
    certifications: ['GOTS', 'BCI'],
    updatedAt: '2026-04-01',
    excerpt: 'COS offers considered, minimalist design with better-than-average quality for the contemporary market. Strong on construction and natural fibre content.',
    searchableText: 'COS H&M Group contemporary Sweden minimalist quality ethics wool linen cotton'
  },
  {
    objectID: 'mango',
    name: 'Mango',
    slug: 'mango',
    url: '/brands/mango.html',
    category: 'Fast fashion',
    country: 'Spain',
    group: 'Punto Fa SL',
    scores: { quality: 3, ethics: 2, transparency: 3 },
    qualityScore: 3,
    ethicsScore: 2,
    transparencyScore: 3,
    priceTier: 3,
    priceLabel: '£££',
    fabricTypes: ['Cotton', 'Viscose', 'Linen', 'Polyester', 'Elastane'],
    naturalFibres: ['Cotton', 'Linen'],
    syntheticFibres: ['Polyester', 'Elastane'],
    manufacturingCountries: ['Bangladesh', 'China', 'India', 'Morocco', 'Turkey'],
    certifications: ['BCI'],
    updatedAt: '2026-04-01',
    excerpt: 'Mango sits between fast fashion and contemporary. Quality is better than H&M but inconsistent. Mediterranean style aesthetic with a mid-range price point.',
    searchableText: 'Mango Spain fast fashion contemporary quality ethics cotton linen viscose'
  },
  {
    objectID: 'massimo-dutti',
    name: 'Massimo Dutti',
    slug: 'massimo-dutti',
    url: '/brands/massimo-dutti.html',
    category: 'Premium',
    country: 'Spain',
    group: 'Inditex Group',
    scores: { quality: 4, ethics: 3, transparency: 4 },
    qualityScore: 4,
    ethicsScore: 3,
    transparencyScore: 4,
    priceTier: 5,
    priceLabel: '£££££',
    fabricTypes: ['Cotton', 'Wool', 'Linen', 'Silk', 'Cashmere', 'Leather', 'Polyester'],
    naturalFibres: ['Cotton', 'Wool', 'Linen', 'Silk', 'Cashmere'],
    syntheticFibres: ['Polyester'],
    manufacturingCountries: ['Spain', 'Portugal', 'Turkey', 'India', 'China'],
    certifications: [],
    updatedAt: '2026-04-01',
    excerpt: 'Massimo Dutti is Inditex\'s premium brand, offering genuinely better fabric quality than Zara at a significantly higher price. Strong on tailoring and natural fibres.',
    searchableText: 'Massimo Dutti Inditex premium Spain quality cashmere wool silk linen tailoring'
  },
  {
    objectID: 'patagonia',
    name: 'Patagonia',
    slug: 'patagonia',
    url: '/brands/patagonia.html',
    category: 'Sustainable',
    country: 'United States',
    group: 'Patagonia Inc',
    scores: { quality: 5, ethics: 5, transparency: 5 },
    qualityScore: 5,
    ethicsScore: 5,
    transparencyScore: 5,
    priceTier: 5,
    priceLabel: '£££££',
    fabricTypes: ['Recycled polyester', 'Organic cotton', 'Wool', 'Hemp', 'Nylon'],
    naturalFibres: ['Organic cotton', 'Wool', 'Hemp'],
    syntheticFibres: ['Recycled polyester', 'Nylon'],
    manufacturingCountries: ['Vietnam', 'India', 'China', 'Sri Lanka', 'Mexico'],
    certifications: ['Fair Trade', 'GOTS', 'bluesign', 'B Corp', 'RWS'],
    updatedAt: '2026-04-01',
    excerpt: 'Patagonia is the gold standard for ethical outdoor clothing. B Corp certified, fully transparent on supply chain, with a genuine repair and reuse programme.',
    searchableText: 'Patagonia sustainable outdoor USA quality ethics recycled organic cotton wool B Corp Fair Trade'
  }
];

// ── GUIDE DATA ───────────────────────────────────────────────────────────────

const guides = [
  {
    objectID: 'how-to-read-a-clothing-label',
    title: 'How to read a clothing label',
    slug: 'how-to-read-a-clothing-label',
    url: '/guides/how-to-read-a-clothing-label.html',
    category: 'Fabrics',
    excerpt: 'What fabric content percentages actually mean, and what to look for before you hand over your money.',
    searchableText: 'clothing label fabric content percentage care symbols natural synthetic fibre cotton polyester'
  },
  {
    objectID: 'natural-vs-synthetic-fibres',
    title: 'Natural vs synthetic fibres',
    slug: 'natural-vs-synthetic-fibres',
    url: '/guides/natural-vs-synthetic-fibres.html',
    category: 'Fabrics',
    excerpt: 'The real difference between cotton, polyester, viscose, lyocell and everything in between.',
    searchableText: 'natural synthetic fibres cotton wool linen silk polyester acrylic viscose lyocell'
  },
  {
    objectID: 'what-is-fast-fashion',
    title: 'What is fast fashion?',
    slug: 'what-is-fast-fashion',
    url: '/guides/what-is-fast-fashion.html',
    category: 'Sustainability',
    excerpt: 'The environmental and human cost of the fast fashion model — explained without the greenwashing.',
    searchableText: 'fast fashion environmental impact sustainability ethical human cost supply chain'
  },
  {
    objectID: 'shopping-sustainably-on-a-budget',
    title: 'Shopping sustainably on a budget',
    slug: 'shopping-sustainably-on-a-budget',
    url: '/guides/shopping-sustainably-on-a-budget.html',
    category: 'Buying',
    excerpt: 'How to find better quality clothing without spending more than you need to.',
    searchableText: 'sustainable shopping budget ethical quality secondhand thrift charity shop'
  }
];

// ── CONFIGURE INDICES ────────────────────────────────────────────────────────

async function setup() {
  console.log('Setting up Algolia indices...\n');

  // Configure brands index — searchable attributes and facets
  await brandsIndex.setSettings({
    searchableAttributes: [
      'name',
      'searchableText',
      'excerpt',
      'fabricTypes',
      'manufacturingCountries',
      'certifications'
    ],
    attributesForFaceting: [
      'filterOnly(category)',
      'filterOnly(qualityScore)',
      'filterOnly(ethicsScore)',
      'filterOnly(transparencyScore)',
      'filterOnly(priceTier)',
      'filterOnly(fabricTypes)',
      'filterOnly(naturalFibres)',
      'filterOnly(syntheticFibres)',
      'filterOnly(certifications)',
      'filterOnly(country)'
    ],
    ranking: [
      'typo', 'geo', 'words', 'filters', 'proximity',
      'attribute', 'exact', 'custom'
    ],
    customRanking: ['desc(qualityScore)', 'desc(ethicsScore)'],
    highlightPreTag: '<mark>',
    highlightPostTag: '</mark>'
  });

  // Configure guides index
  await guidesIndex.setSettings({
    searchableAttributes: ['title', 'searchableText', 'excerpt'],
    attributesForFaceting: ['filterOnly(category)']
  });

  // Configure suppliers index (ready for when supplier data is added)
  await suppliersIndex.setSettings({
    searchableAttributes: ['name', 'country', 'fabricTypes', 'certifications', 'searchableText'],
    attributesForFaceting: [
      'filterOnly(country)',
      'filterOnly(fabricTypes)',
      'filterOnly(certifications)',
      'filterOnly(verified)'
    ]
  });

  console.log('✓ Index settings configured\n');

  // Upload brand records
  console.log('Uploading brand records...');
  const brandResult = await brandsIndex.saveObjects(brands);
  console.log(`✓ ${brands.length} brands uploaded (task: ${brandResult.taskIDs[0]})\n`);

  // Upload guide records
  console.log('Uploading guide records...');
  const guideResult = await guidesIndex.saveObjects(guides);
  console.log(`✓ ${guides.length} guides uploaded (task: ${guideResult.taskIDs[0]})\n`);

  console.log('All done. Your Algolia indices are ready.');
  console.log('\nIndex summary:');
  console.log(`  brands:    ${brands.length} records`);
  console.log(`  guides:    ${guides.length} records`);
  console.log(`  suppliers: 0 records (add via Sanity)`);
}

setup().catch(err => {
  console.error('Upload failed:', err.message);
  process.exit(1);
});
