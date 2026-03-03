import { readFileSync, readdirSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { z } from 'zod';

const gameSchema = z.object({
  name: z.string(),
  tagline: z.string().optional(),
  status: z.string().optional(),
  url: z.string().url().optional(),
  asset: z.string().optional()
});

const titleSlideSchema = z.object({
  type: z.literal('title'),
  title: z.string(),
  subtitle: z.string().optional(),
  tagline: z.string().optional()
});

const introSlideSchema = z.object({
  type: z.literal('intro'),
  title: z.string(),
  description: z.string()
});

const productSlideSchema = z.object({
  type: z.literal('product'),
  name: z.string(),
  tagline: z.string().optional(),
  status: z.string().optional(),
  metric: z.string().optional(),
  description: z.string().optional(),
  year: z.string().optional(),
  url: z.string().url().optional(),
  asset: z.string().optional(),
  assets: z.array(z.string()).optional()
});

const vibeJamSlideSchema = z.object({
  type: z.literal('vibe_jam_games'),
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  year: z.string().optional(),
  games: z.array(gameSchema)
});

const ctaSlideSchema = z.object({
  type: z.literal('cta'),
  title: z.string(),
  description: z.string().optional(),
  cta: z.string().optional(),
  url: z.string().url().optional()
});

const slideSchema = z.discriminatedUnion('type', [
  titleSlideSchema,
  introSlideSchema,
  productSlideSchema,
  vibeJamSlideSchema,
  ctaSlideSchema
]);

const portfolioSchema = z.object({
  slides: z.array(slideSchema)
});

const canonicalPortfolioPath = resolve(process.cwd(), 'src/data/portfolio-slides.json');
const canonicalPortfolioRaw = readFileSync(canonicalPortfolioPath, 'utf-8');
const parsedPortfolio = portfolioSchema.parse(JSON.parse(canonicalPortfolioRaw));
const publicPortfolioAssetsPath = resolve(process.cwd(), 'public/assets/portfolio');

const knownAssetAliases: Record<string, string> = {
  'fd38cb93-7699-44b1-9544-af0bc076e2c4.png': 'pixel_post_as_inspo_jlaeqv.png'
};

const availableAssetNames = readdirSync(publicPortfolioAssetsPath);
const availableAssetNameSet = new Set(availableAssetNames);
const availableAssetNameByLowercase = new Map(
  availableAssetNames.map((assetName) => [assetName.toLowerCase(), assetName] as const)
);

const excludedProjectNames = new Set(['UFO Invader Arena (Old)', 'Beyblade Arena v0']);

const masonryProjectNames = new Set(['KaiXi', 'QRQodes', 'Katatagan In A Box']);

export type ProductSlide = z.infer<typeof productSlideSchema>;
export type VibeJamSlide = z.infer<typeof vibeJamSlideSchema>;
export type CtaSlide = z.infer<typeof ctaSlideSchema>;

export interface PortfolioEntity {
  kind: 'product' | 'jam-game';
  sourceId: string;
  sourceTitle?: string;
  sourceSubtitle?: string;
  name: string;
  tagline?: string;
  status?: string;
  metric?: string;
  description?: string;
  year?: string;
  url?: string;
  asset?: string;
  assets?: string[];
}

export type PortfolioGroupId =
  | 'utilities-productivity'
  | 'vibe-coded-games'
  | 'ai-powered-products'
  | 'agentic-ai-automation'
  | 'high-impact-products'
  | 'just-for-fun-creator-tools'
  | 'ai-ml-projects';

export interface PortfolioGroup {
  id: PortfolioGroupId;
  title: string;
  rationale: string;
}

export interface PortfolioStat {
  value: string;
  label: string;
}

export interface GroupDeckModel {
  id: PortfolioGroupId;
  title: string;
  rationale: string;
  description: string;
  href: string;
  color: string;
  projects: PortfolioEntity[];
  stats: PortfolioStat[];
}

const portfolioGroups: PortfolioGroup[] = [
  {
    id: 'vibe-coded-games',
    title: 'Vibe Coding Hackathon',
    rationale: 'Vibe-coded launches and game products built across the 2025 hackathon cycle.'
  },
  {
    id: 'ai-powered-products',
    title: 'AI-Powered Products',
    rationale: 'Generative AI products built for content, communication, and creator workflows.'
  },
  {
    id: 'ai-ml-projects',
    title: 'AI/ML Projects',
    rationale: 'Foundational academic-built systems and experiments across data, simulation, mapping, and AI.'
  },
  {
    id: 'high-impact-products',
    title: 'High-Impact Products',
    rationale: 'Products focused on education, resilience, civic outcomes, and measurable adoption.'
  },
  {
    id: 'utilities-productivity',
    title: 'Utilities & Productivity',
    rationale: 'Practical utilities and operator tools used in recurring workflows.'
  },
  {
    id: 'agentic-ai-automation',
    title: 'Agentic AI & Automation',
    rationale: 'Products that automate workflows, operations, and decision loops.'
  },
  {
    id: 'just-for-fun-creator-tools',
    title: 'Just for Fun & Creator Tools',
    rationale: 'Tools that improve creator velocity, audience insights, and publishing output.'
  }
];

const groupThemePresets: Record<
  PortfolioGroupId,
  Array<{ card: string; tint: string; accent: string; surface: string }>
> = {
  'utilities-productivity': [
    { card: '#22365a', tint: '#2f548d', accent: '#9dc0ff', surface: '#101928' },
    { card: '#2b3f4b', tint: '#40697d', accent: '#b5e5f8', surface: '#131d23' },
    { card: '#273646', tint: '#3f5c77', accent: '#b8d6f2', surface: '#121b22' }
  ],
  'vibe-coded-games': [
    { card: '#6b2e22', tint: '#b8562f', accent: '#ffd0a8', surface: '#2d140f' },
    { card: '#5a2164', tint: '#a740b0', accent: '#f2c2ff', surface: '#230f2a' },
    { card: '#273456', tint: '#3d639e', accent: '#b9d4ff', surface: '#131b2a' },
    { card: '#8b3d10', tint: '#d96f1b', accent: '#ffd7ae', surface: '#341607' },
    { card: '#7f4414', tint: '#d18a2b', accent: '#ffe4ba', surface: '#33200d' },
    { card: '#9a4f12', tint: '#e18a25', accent: '#ffe0b3', surface: '#3d1f08' }
  ],
  'ai-powered-products': [
    { card: '#3e3668', tint: '#6555ac', accent: '#d7ceff', surface: '#1b1830' },
    { card: '#2f496f', tint: '#4a73a3', accent: '#b7d8ff', surface: '#152231' },
    { card: '#3f3354', tint: '#6e4f90', accent: '#e4c9ff', surface: '#1e1828' }
  ],
  'agentic-ai-automation': [
    { card: '#2f496f', tint: '#4a73a3', accent: '#b7d8ff', surface: '#152231' },
    { card: '#3a3f74', tint: '#5c6ec2', accent: '#ced6ff', surface: '#191b32' },
    { card: '#2f5667', tint: '#3f849f', accent: '#b8ecff', surface: '#15262d' }
  ],
  'high-impact-products': [
    { card: '#2f3540', tint: '#4c5a6f', accent: '#dce9ff', surface: '#161a20' },
    { card: '#284844', tint: '#3c786f', accent: '#b4f0e6', surface: '#13221f' },
    { card: '#3f3a25', tint: '#7e7544', accent: '#f3e7ad', surface: '#1f1c12' }
  ],
  'just-for-fun-creator-tools': [
    { card: '#3f4f31', tint: '#607e43', accent: '#d9f7bb', surface: '#1a2312' },
    { card: '#374e63', tint: '#4f7698', accent: '#c2e5ff', surface: '#17212a' },
    { card: '#4c3f60', tint: '#76609a', accent: '#e1d2ff', surface: '#211a2a' }
  ],
  'ai-ml-projects': [
    { card: '#4a3f29', tint: '#7f6c40', accent: '#f5e5b6', surface: '#211a11' },
    { card: '#2f4b43', tint: '#4b7a6d', accent: '#bdeee1', surface: '#13231f' },
    { card: '#3f425f', tint: '#6670aa', accent: '#d3d8ff', surface: '#1b1d2d' }
  ]
};

const stitchGridPalette = [
  '#f59e0b',  // Index 0: Vibe Coding Hackathon (01)
  '#a04e38',  // Index 1: AI-Powered Products
  '#10b981',  // Index 2: AI/ML Projects (03)
  '#0ea5e9',  // Index 3: High-Impact Products
  '#6366f1',  // Index 4: Utilities & Productivity
  '#64748b',  // Index 5: Agentic AI & Automation
  '#f43f5e',  // Index 6: Just for Fun & Creator Tools (07)
  '#f97316',
  '#8b5cf6'
] as const;

export function getPortfolioContent() {
  const titleSlide = parsedPortfolio.slides.find((slide) => slide.type === 'title');
  const introSlide = parsedPortfolio.slides.find((slide) => slide.type === 'intro');
  const products = parsedPortfolio.slides.filter((slide) => slide.type === 'product');
  const vibeJamSections = parsedPortfolio.slides.filter((slide) => slide.type === 'vibe_jam_games');
  const ctaSlide = parsedPortfolio.slides.find((slide) => slide.type === 'cta');

  return {
    titleSlide,
    introSlide,
    products,
    vibeJamSections,
    ctaSlide
  };
}

function getJamEntities(sections: VibeJamSlide[]): PortfolioEntity[] {
  const entities: PortfolioEntity[] = [];

  for (const section of sections) {
    for (let index = 0; index < section.games.length; index += 1) {
      const game = section.games[index];
      if (excludedProjectNames.has(game.name)) {
        continue;
      }

      entities.push({
        kind: 'jam-game',
        sourceId: `${section.title}::${index}`,
        sourceTitle: section.title,
        sourceSubtitle: section.subtitle,
        name: game.name,
        tagline: game.tagline ?? section.subtitle,
        status: game.status,
        description: section.description,
        year: section.year,
        url: game.url,
        asset: game.asset,
        assets: game.asset ? [game.asset] : []
      });
    }
  }

  return entities;
}

export function getAllProjects() {
  const products = parsedPortfolio.slides
    .filter((slide) => slide.type === 'product')
    .filter((slide) => !excludedProjectNames.has(slide.name))
    .map<PortfolioEntity>((slide, index) => ({
      kind: 'product',
      sourceId: `product::${index}`,
      ...slide
    }));
  const jamSections = parsedPortfolio.slides.filter((slide) => slide.type === 'vibe_jam_games');

  const collegeProjects: PortfolioEntity[] = [
    {
      kind: 'product',
      sourceId: 'college::tagalog-dictionary-scraper',
      name: 'Tagalog Dictionary Scraper',
      tagline: 'Dictionary data extraction pipeline',
      metric: '42.7k Tagalog words collected',
      description: 'Python scraper that compiles Tagalog dictionary entries into reusable text, CSV, and JSON outputs.',
      year: '2016',
      url: 'https://github.com/raymelon/tagalog-dictionary-scraper'
    },
    {
      kind: 'product',
      sourceId: 'college::disksim',
      name: 'DiskSim',
      tagline: 'Disk scheduling algorithm simulator',
      metric: '2 scheduling algorithms, 0-199 track simulation range',
      description: 'Java desktop simulator for visualizing disk head movement and comparing FCFS vs SSTF behavior.',
      year: '2016',
      url: 'https://github.com/raymelon/DiskSim',
      asset: 'disksim_screenshot.JPG'
    },
    {
      kind: 'product',
      sourceId: 'college::emergency-response-unit-locator',
      name: 'Emergency Response Unit Locator',
      tagline: 'Genetic-algorithm location optimizer',
      metric: '10x10 city grid model, 100 GA generations',
      description:
        'MATLAB optimization prototype that proposes emergency unit coordinates by minimizing weighted response-distance cost.',
      year: '2017',
      url: 'https://github.com/raymelon/EmergencyResponseUnitLocator'
    },
    {
      kind: 'product',
      sourceId: 'college::traffic-light-neural-network',
      name: 'Traffic Light Neural Network',
      tagline: 'ANN-driven traffic signal prediction',
      metric: '300 training samples, 1k training epochs',
      description: 'C# neural network experiment that predicts next traffic-light states from prior sequence transitions.',
      year: '2017',
      url: 'https://github.com/raymelon/TrafficLightNeuralNetwork',
      asset: 'demo.gif'
    },
    {
      kind: 'product',
      sourceId: 'college::tagbic',
      name: 'TagBic - Tagalog to Bikol Translator',
      tagline: 'Rule-based translation prototype',
      description: 'College translation project exploring phrase-level Tagalog to Bikol conversion.',
      year: '2017'
    },
    {
      kind: 'product',
      sourceId: 'college::pic2mood',
      name: 'pic2mood - Emotion inference engine for images',
      tagline: 'Image emotion classification experiment',
      description: 'College computer-vision prototype for inferring coarse emotional cues from image inputs.',
      year: '2018'
    }
  ];

  return [...products, ...getJamEntities(jamSections), ...collegeProjects];
}

export function getCanonicalEntityCount() {
  return getAllProjects().length;
}

export function assertInclusionParity(renderedCount: number, context: string) {
  const expected = getCanonicalEntityCount();
  if (renderedCount !== expected) {
    throw new Error(`[portfolio] ${context} parity check failed: expected ${expected}, got ${renderedCount}`);
  }
}

export function getPortfolioAssetUrl(assetName?: string) {
  const resolvedAssetName = resolvePortfolioAssetName(assetName);
  if (!resolvedAssetName) {
    return null;
  }

  return `/assets/portfolio/${encodeURIComponent(resolvedAssetName)}`;
}

export function resolvePortfolioAssetName(assetName?: string) {
  if (!assetName) {
    return null;
  }

  const normalizedAssetName = assetName.trim();
  if (!normalizedAssetName) {
    return null;
  }

  const decodeIfEncoded = (value: string) => {
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  };

  const assetCandidates = new Set<string>([
    normalizedAssetName,
    basename(normalizedAssetName),
    decodeIfEncoded(normalizedAssetName),
    basename(decodeIfEncoded(normalizedAssetName))
  ]);

  const aliasCandidates = new Set<string>();
  for (const candidate of assetCandidates) {
    const alias = knownAssetAliases[candidate];
    if (!alias) {
      continue;
    }

    aliasCandidates.add(alias);
    aliasCandidates.add(basename(alias));
    aliasCandidates.add(decodeIfEncoded(alias));
    aliasCandidates.add(basename(decodeIfEncoded(alias)));
  }

  for (const candidate of assetCandidates) {
    if (availableAssetNameSet.has(candidate)) {
      return candidate;
    }
  }

  for (const candidate of aliasCandidates) {
    if (availableAssetNameSet.has(candidate)) {
      return candidate;
    }
  }

  for (const candidate of assetCandidates) {
    const directCaseInsensitiveMatch = availableAssetNameByLowercase.get(candidate.toLowerCase());
    if (directCaseInsensitiveMatch) {
      return directCaseInsensitiveMatch;
    }
  }

  for (const candidate of aliasCandidates) {
    const aliasCaseInsensitiveMatch = availableAssetNameByLowercase.get(candidate.toLowerCase());
    if (aliasCaseInsensitiveMatch) {
      return aliasCaseInsensitiveMatch;
    }
  }

  return null;
}

export function getStatusLabel(status?: string) {
  if (!status) {
    return 'Active';
  }

  return status
    .split('_')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

export function isVideoAsset(assetName?: string) {
  if (!assetName) {
    return false;
  }

  return /\.(mp4|webm|mov)$/i.test(assetName);
}

export function isImageAsset(assetName?: string) {
  if (!assetName) {
    return false;
  }

  return /\.(png|jpe?g|gif|webp|avif|svg)$/i.test(assetName);
}

export function getProjectAssets(project: PortfolioEntity) {
  const seenAssets = new Set<string>();

  return [project.asset, ...(project.assets ?? [])].reduce<string[]>((accumulator, asset) => {
    if (typeof asset !== 'string') {
      return accumulator;
    }

    const normalizedAsset = asset.trim();
    if (!normalizedAsset || seenAssets.has(normalizedAsset)) {
      return accumulator;
    }

    seenAssets.add(normalizedAsset);
    accumulator.push(normalizedAsset);
    return accumulator;
  }, []);
}

export interface ProjectMetricItem {
  value: string | null;
  label: string;
}

function normalizeMetricLabel(metricLabel: string) {
  return metricLabel.replace(/\s+/g, ' ').trim();
}

export function getProjectMetricItems(project: PortfolioEntity, maxItems = Number.POSITIVE_INFINITY): ProjectMetricItem[] {
  if (!project.metric) {
    return [];
  }

  const limit = Number.isFinite(maxItems) ? Math.max(0, Math.trunc(maxItems)) : Number.POSITIVE_INFINITY;
  const segments = project.metric
    .split(',')
    .map((segment) => normalizeMetricLabel(segment))
    .filter((segment) => Boolean(segment));

  const metricItems: ProjectMetricItem[] = [];

  for (const segment of segments) {
    if (metricItems.length >= limit) {
      break;
    }

    const numericToken = segment.match(/([~<>]?\d[\d.,]*(?:k|m|b)?\+?(?:\s*-\s*[~<>]?\d[\d.,]*(?:k|m|b)?\+?)?)/i);
    if (!numericToken) {
      metricItems.push({ value: null, label: segment });
      continue;
    }

    const value = numericToken[1].replace(/\s+/g, ' ').trim();
    const numericRange = numericToken.index ?? 0;
    const before = segment.slice(0, numericRange).trim();
    const after = segment.slice(numericRange + numericToken[1].length).trim();
    const label = normalizeMetricLabel(`${before} ${after}`) || segment;

    metricItems.push({ value, label });
  }

  return metricItems;
}

export function slugifyProjectName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getProjectSlug(project: PortfolioEntity) {
  const base = slugifyProjectName(project.name);
  if (project.kind === 'jam-game') {
    const sourceToken = slugifyProjectName(project.sourceTitle ?? 'vibe-jam');
    return `${base}-${sourceToken}`;
  }

  if (!project.year) {
    return base;
  }

  const yearToken = project.year.toLowerCase();
  if (base.endsWith(`-${yearToken}`)) {
    return base;
  }

  return `${base}-${yearToken}`;
}

export function getProjectBriefHref(project: PortfolioEntity) {
  return `/brief/${getProjectSlug(project)}`;
}

export function getGroupDeckHref(groupId: PortfolioGroupId) {
  return `/deck/${groupId}`;
}

export function usesMasonryMediaLayout(projectName: string) {
  return masonryProjectNames.has(projectName);
}

const productGroupMap: Record<string, PortfolioGroupId> = {
  '02AI.DEV': 'agentic-ai-automation',
  'recaps.fyi': 'ai-powered-products',
  'Level Up! Founders': 'high-impact-products',
  'Cowboy Shooter': 'vibe-coded-games',
  'Cyber Vibe 2025': 'vibe-coded-games',
  'AI Content Empire': 'just-for-fun-creator-tools',
  'Tokwa Chat': 'ai-powered-products',
  Punla: 'high-impact-products',
  Nababaha: 'high-impact-products',
  KaiXi: 'high-impact-products',
  'The Live Almanac Project': 'high-impact-products',
  QRQodes: 'high-impact-products',
  KuyaBai: 'high-impact-products',
  'Call Log Project': 'utilities-productivity',
  CloudWidget: 'just-for-fun-creator-tools',
  Educo: 'high-impact-products',
  'Katatagan In A Box': 'high-impact-products',
  "Ta'allam Learners App": 'high-impact-products',
  'Matigsalug Learners App': 'high-impact-products',
  'Kaalam Cebuano App': 'high-impact-products',
  'Sanut Ilokano App': 'high-impact-products',
  'Buildinpublic Feed': 'just-for-fun-creator-tools',
  Indiewrapped: 'just-for-fun-creator-tools',
  'Make a Bento Grid Today': 'just-for-fun-creator-tools',
  'YouTube Playlist Backup': 'agentic-ai-automation',
  'Voice Chat PWA': 'agentic-ai-automation',
  'AI Components': 'ai-powered-products',
  'Tweet Replies Analyzer': 'just-for-fun-creator-tools',
  'Tokwa Demos': 'agentic-ai-automation',
  'Scrape Analyze Show': 'agentic-ai-automation',
  'YouTube Live Tracker': 'agentic-ai-automation',
  'YouTube Streamer VODs Organizer': 'agentic-ai-automation',
  'Weather Broadcast Livestream Tracker': 'agentic-ai-automation',
  'StreamVOD Archiver Agent': 'utilities-productivity',
  'Automated Twitter': 'agentic-ai-automation',
  'Twitter Feed Algorithm AI': 'agentic-ai-automation',
  'Trading View AI Agent': 'agentic-ai-automation',
  'Document Chat AI Assistant': 'agentic-ai-automation',
  'Minimalist Screen Sleeper': 'utilities-productivity',
  'Convo Archive Nexus': 'ai-powered-products',
  'Pinger Basic': 'utilities-productivity',
  'Tagalog Dictionary Scraper': 'agentic-ai-automation',
  DiskSim: 'ai-ml-projects',
  'Emergency Response Unit Locator': 'ai-ml-projects',
  'Traffic Light Neural Network': 'ai-ml-projects',
  'TagBic - Tagalog to Bikol Translator': 'ai-ml-projects',
  'pic2mood - Emotion inference engine for images': 'ai-ml-projects'
};

function getPortfolioGroupById(groupId: PortfolioGroupId) {
  return portfolioGroups.find((group) => group.id === groupId) as PortfolioGroup;
}

function getProjectYear(project: PortfolioEntity) {
  const parsedYear = Number.parseInt(project.year ?? '', 10);
  return Number.isFinite(parsedYear) ? parsedYear : 0;
}

function sortProjectsByYear(projects: PortfolioEntity[]) {
  return [...projects].sort((left, right) => {
    const yearDelta = getProjectYear(right) - getProjectYear(left);
    if (yearDelta !== 0) {
      return yearDelta;
    }

    return left.name.localeCompare(right.name);
  });
}

export function getProjectGroup(project: PortfolioEntity): PortfolioGroup {
  if (project.kind === 'jam-game') {
    return getPortfolioGroupById('vibe-coded-games');
  }

  const groupId = productGroupMap[project.name] ?? 'utilities-productivity';
  return getPortfolioGroupById(groupId);
}

export function getGroupedProjects(products: PortfolioEntity[]) {
  const grouped = new Map<PortfolioGroupId, PortfolioEntity[]>();

  for (const group of portfolioGroups) {
    grouped.set(group.id, []);
  }

  for (const project of products) {
    const group = getProjectGroup(project);
    const entries = grouped.get(group.id);
    if (entries) {
      entries.push(project);
    }
  }

  return portfolioGroups.map((group) => ({
    ...group,
    projects: sortProjectsByYear(grouped.get(group.id) ?? [])
  }));
}

function formatCount(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

function formatYearsText(years: number) {
  if (years === 1) {
    return `${years} year`;
  }
  return `${years} years`;
}

function getGroupDescription(group: PortfolioGroup, projects: PortfolioEntity[]) {
  if (group.id === 'vibe-coded-games') {
    return 'Vibe-coded launches and game products built across the 2025 hackathon cycle. 15 submissions spanning 2 months.';
  }

  const years = projects
    .map((project) => getProjectYear(project))
    .filter((year) => year > 0)
    .sort((left, right) => left - right);

  if (years.length === 0) {
    return `${group.rationale} ${formatCount(projects.length)} projects in this deck.`;
  }

  const activeYears = years[years.length - 1] - years[0] + 1;
  return `${group.rationale} ${formatCount(projects.length)} projects spanning ${formatYearsText(activeYears)}.`;
}

function parseMetricMagnitude(value: string) {
  const tokens = value
    .split('-')
    .map((token) => token.replace(/[~<>,+\s]/g, '').trim())
    .filter((token) => Boolean(token));

  const parsed = tokens
    .map((token) => {
      const suffix = token.slice(-1).toLowerCase();
      const multipliers: Record<string, number> = { k: 1_000, m: 1_000_000, b: 1_000_000_000 };
      const multiplier = multipliers[suffix] ?? 1;
      const base = multiplier === 1 ? token : token.slice(0, -1);
      const numericValue = Number.parseFloat(base);
      return Number.isFinite(numericValue) ? numericValue * multiplier : null;
    })
    .filter((entry): entry is number => entry !== null);

  if (parsed.length === 0) {
    return null;
  }

  return Math.max(...parsed);
}

function formatImpactLabel(label: string) {
  const normalized = normalizeMetricLabel(label.replace(/^(for|in|on|at|as|to)\s+/i, ''));
  const compact = normalized
    .replace(/^on\s+/i, '')
    .replace(/^as\s+of\s+/i, '')
    .replace(/impressions on first few days of launch/gi, 'launch impressions')
    .replace(/24\/7 weather broadcasts tracked over 3 years/gi, 'weather broadcasts tracked')
    .replace(/students in Philippines across 184 barangays/gi, 'students reached across barangays');

  if (!compact) {
    return 'reported outcome';
  }

  return compact.length > 40 ? `${compact.slice(0, 37).trimEnd()}...` : compact;
}

function getGroupStats(groupId: PortfolioGroupId, projects: PortfolioEntity[]): PortfolioStat[] {
  if (groupId === 'vibe-coded-games') {
    return [
      { value: '3rd place', label: 'hackathon finish' },
      { value: '11 submissions', label: 'official entries' },
      { value: '3 weeks', label: 'build window' }
    ];
  }

  const rankedMetrics = projects
    .flatMap((project) =>
      getProjectMetricItems(project, 3)
        .filter((item) => Boolean(item.value))
        .map((item) => ({
          value: item.value as string,
          label: formatImpactLabel(item.label),
          magnitude: parseMetricMagnitude(item.value as string)
        }))
    )
    .filter((metric) => metric.magnitude !== null)
    .sort((left, right) => (right.magnitude as number) - (left.magnitude as number));

  const stats: PortfolioStat[] = [];
  const seenLabels = new Set<string>();
  for (const metric of rankedMetrics) {
    const labelKey = `${metric.value}::${metric.label}`.toLowerCase();
    if (seenLabels.has(labelKey)) {
      continue;
    }

    seenLabels.add(labelKey);
    stats.push({ value: metric.value, label: metric.label });
    if (stats.length >= 2) {
      return stats;
    }
  }

  const quantifiedProjects = projects.filter((project) => getProjectMetricItems(project).some((item) => Boolean(item.value))).length;
  const linkedProjects = projects.filter((project) => Boolean(project.url)).length;
  const yearValues = projects.map((project) => getProjectYear(project)).filter((year) => year > 0);
  const activeYears =
    yearValues.length > 0 ? Math.max(...yearValues) - Math.min(...yearValues) + 1 : null;

  const fallbacks: PortfolioStat[] = [];
  if (groupId === 'ai-ml-projects') {
    fallbacks.push({ value: formatCount(projects.filter((project) => project.url?.includes('github.com')).length), label: 'public repos' });
  }

  fallbacks.push({ value: formatCount(projects.length), label: 'projects shipped' });

  if (quantifiedProjects > 0) {
    fallbacks.push({ value: formatCount(quantifiedProjects), label: 'quantified projects' });
  }

  if (linkedProjects > 0) {
    fallbacks.push({ value: formatCount(linkedProjects), label: 'live demos or repos' });
  }

  if (activeYears !== null) {
    fallbacks.push({ value: formatCount(activeYears), label: 'active years represented' });
  }

  for (const fallback of fallbacks) {
    if (stats.some((stat) => stat.label === fallback.label)) {
      continue;
    }

    stats.push(fallback);
    if (stats.length >= 2) {
      break;
    }
  }

  return stats;
}

export function getCoverCardStats(projects: PortfolioEntity[]): PortfolioStat[] {
  const projectsWithMetrics = projects.filter((project) => getProjectMetricItems(project).length > 0).length;
  const liveProjects = projects.filter((project) => Boolean(project.url)).length;
  const mediaAssets = projects.reduce((total, project) => total + getProjectAssets(project).length, 0);

  return [
    { value: formatCount(projects.length), label: 'total projects' },
    { value: formatCount(projectsWithMetrics), label: 'with measurable outcomes' },
    { value: formatCount(mediaAssets + liveProjects), label: 'media + live links' }
  ];
}

export function getStitchGridPalette() {
  return stitchGridPalette;
}

export function getGroupDeckModels(projects: PortfolioEntity[]): GroupDeckModel[] {
  return getGroupedProjects(projects)
    .map((group, index) => ({
      id: group.id,
      title: group.title,
      rationale: group.rationale,
      description: getGroupDescription(group, group.projects),
      href: getGroupDeckHref(group.id),
      color: stitchGridPalette[index] ?? stitchGridPalette[stitchGridPalette.length - 1],
      projects: group.projects,
      stats: getGroupStats(group.id, group.projects)
    }));
}

export function getGroupDeckById(groupId: PortfolioGroupId, projects: PortfolioEntity[]) {
  return getGroupDeckModels(projects).find((group) => group.id === groupId);
}

function hashValue(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash);
}

export function getProjectTheme(project: PortfolioEntity) {
  const group = getProjectGroup(project);
  const candidates = groupThemePresets[group.id];
  const signature = `${project.name}|${project.status ?? ''}|${getProjectAssets(project).join('|')}`;
  const choice = candidates[hashValue(signature) % candidates.length];

  return {
    card: choice.card,
    tint: choice.tint,
    accent: choice.accent,
    surface: choice.surface
  };
}

export function getProjectBySlug(slug: string) {
  return getAllProjects().find((project) => getProjectSlug(project) === slug);
}

export function getPortfolioGroups() {
  return portfolioGroups;
}
