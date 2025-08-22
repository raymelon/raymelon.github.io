"use client"
import { useTheme } from "next-themes";
import { MagicCard } from "@/components/magicui/magic-card";
import Link from "next/link";
import { useState, useMemo } from "react";

interface PortfolioItem {
  title?: string;
  imageUrl?: string;
  videoUrl?: string;
  description: string;
  url: string;
  tags: string[];
  year?: number; // Add year for easier sorting
}

// Helper function to extract year from tags
const getYearFromTags = (tags: string[]): number | undefined => {
  const yearTag = tags.find(tag => /^\d{4}$/.test(tag));
  return yearTag ? parseInt(yearTag, 10) : undefined;
};

const portfolioItems: PortfolioItem[] = [
  {
    imageUrl: "https://res.cloudinary.com/dxsornfee/image/upload/v1744972218/02ai.dev_hero_wwacbd.png",
    title: "02AI.DEV",
    description: "Building AI workflows for your business.",
    url: "https://02ai.dev?ref=raymelonportfolio",
    tags: ["ai-agency", "ai", "2025"]
  },
  {
    imageUrl: "https://res.cloudinary.com/dxsornfee/image/upload/v1752451852/top_games_ybdvs6.png",
    title: "Vibe coded 9 games in 3 weeks",
    description: "Vibe coded 9 games in 3 weeks.",
    url: "https://x.com/pseudokid/status/1923473371880358177",
    tags: ["Orange Web3 Vibe Jam", "ai", "2025"]
  },
  {
    imageUrl: "https://res.cloudinary.com/dxsornfee/image/upload/v1752451896/pixel_post_as_inspo_jlaeqv.png",
    title: "ixel Post 2D",
    description: "Pixel Post 2D - 3rd 🏆 in Orange Vibe Jam",
    url: "https://x.com/pseudokid/status/1930738134070837658",
    tags: ["Orange Web3 Vibe Jam", "ai", "2025"]
  },
  {
    videoUrl: "https://res.cloudinary.com/dxsornfee/video/upload/v1744354160/ioMxNPSbhYMDjSEz_vbqpwl.mp4",
    title: "Cyber Vibe 2025",
    description: "Cyberpunk inspired vibe-coded game",
    url: "https://cybervibe.raymelon.com/",
    tags: ["2025 Vibe Coding Game Jam", "vibe coding", "2025"]
  },
  {
    videoUrl: "https://res.cloudinary.com/dxsornfee/video/upload/v1744355240/aaIp7ipELMRFarnw_idtwri.mp4",
    title: "Cowboy Shooter",
    description: "Wild west inspired vibe-coded game",
    url: "https://x.com/pseudokid/status/1897981468862996910",
    tags: ["2025 Vibe Coding Game Jam", "vibe coding", "2025"]
  },
  {
    videoUrl: "https://res.cloudinary.com/dxsornfee/video/upload/v1744355179/-LNr2te0Y7TxMskw_ocmagq.mp4",
    title: "2025 Vibe Coding Game Jam Landing Page Entry",
    description: "2025 Vibe Coding Game Jam Landing Page Entry",
    url: "https://x.com/pseudokid/status/1904570854660514268",
    tags: ["2025 Vibe Coding Game Jam", "vibe coding", "2025"]
  },
  {
    videoUrl: "https://res.cloudinary.com/dxsornfee/video/upload/v1738791292/video_3_ympe6m.mp4",
    title: "Trading View AI Agent",
    description: "Trading View AI Agent",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7347874514304737280/",
    tags: ["browser-automation", "ai", "2025"]
  },
  {
    imageUrl: "https://pbs.twimg.com/ext_tw_video_thumb/1861889348955979776/pu/img/2xmojdicvXxLTePy.jpg",
    description: "Document Chat AI Assistant",
    url: "https://twitter.com/pseudokid/status/1861895287855624617",
    tags: ["desktop", "streamlit","ai", "2024"]
  },
  {
    videoUrl: "https://video.twimg.com/ext_tw_video/1828424822340112384/pu/vid/avc1/720x1280/FBRzb30zFRQQwHC6.mp4?tag=12",
    title: "Card",
    description: "AI agent that mimics Twitter Feed Algorithm",
    url: "https://x.com/pseudokid/status/1828448886723395623",
    tags: ["twitter", "backend", "ai", "telegram", "2024"]
  },
  {
    videoUrl: "https://res.cloudinary.com/dxsornfee/video/upload/v1738790655/video_89_hk6nza.mp4",
    title: "Tokwa AI Chat",
    description: "Tokwa AI Chat",
    url: "https://x.com/02AIDEV/status/1939276659711967478",
    tags: ["full-stack", "nextjs", "ai", "2024"]
  },
  {
    title: "Twitter Unfollower Agent",
    description: "AI Agent that tracks Twitter Unfollowers",
    url: "https://github.com/raymelon/ai6z-twitter-agents",
    tags: ["twitter", "python", "js", "ai", "2025"]
  },
  {
    videoUrl: "https://video.twimg.com/ext_tw_video/1806998259489222657/pu/vid/avc1/1920x1080/z3mz1fMMppqL24KB.mp4?tag=14",
    title: "ChatGPT clone built in 3 hours",
    description: "ChatGPT clone built in 3 hours",
    url: "https://x.com/pseudokid/status/1806998353571713320",
    tags: ["frontend", "react", "ai", "2024"]
  },
  {
    imageUrl: "https://pbs.twimg.com/ext_tw_video_thumb/1835589451977797632/pu/img/qCEtn7ylmHDeISza.jpg",
    title: "This Portfolio",
    description: "this portfolio, literally",
    url: "https://twitter.com/pseudokid/status/1835589504125591861",
    tags: ["frontend", "full-stack", "nextjs", "2024"]
  },
  {
    imageUrl: "https://pbs.twimg.com/ext_tw_video_thumb/1795045702663630848/pu/img/xKbxqhBSlV-KMcMJ.jpg",
    title: "Level Up! Founders",
    description: "Level Up! Founders",
    url: "https://x.com/pseudokid/status/1795046078414295340",
    tags: ["frontend", "ai", "astrojs", "2024"]
  },
  {
    imageUrl: "https://pbs.twimg.com/media/GVDoN4taEAEJ2hN?format=jpg&name=small",
    title: "First App in 2012",
    description: "First App in 2012",
    url: "https://x.com/pseudokid/status/1825559056985260518",
    tags: ["desktop", "visual basic", "C#", "2012"]
  },
  {
    videoUrl: "https://res.cloudinary.com/dxsornfee/video/upload/v1738792064/1708578272992_4_kckjur.mp4",
    title: "recaps.fyi - text to video",
    description: "recaps.fyi - text to video",
    url: "https://www.linkedin.com/in/raymelfrancisco/details/experience/edit/forms/2425422872/?profileFormEntryPoint=PROFILE_SECTION",
    tags: ["full-stack", "remotion", "nextjs", "2024"]
  },
  {
    videoUrl: "https://video.twimg.com/ext_tw_video/1712953781024063488/pu/vid/avc1/1280x720/k9YKgvF2v5kOsnLa.mp4?tag=12",
    title: "Frontend Grid Shuffle",
    description: "Frontend Grid Shuffle",
    url: "https://x.com/pseudokid/status/1712955695300260318",
    tags: ["frontend", "tailwind", "2023"]
  },
  {
    imageUrl: "https://res.cloudinary.com/dxsornfee/image/upload/v1738792234/1602323347376_btp2eb.jpg",
    title: "Ta'allam Learners App",
    description: "Ta'allam Learners App",
    url: "https://www.linkedin.com/in/raymelfrancisco/details/experience/urn:li:fsd_profilePosition:(ACoAABvJbyEBkRxqlRRzs9jmLOK2Pk1004fyro8,1314964216)/treasury/",
    tags: ["mobile", "android", "ios", "2017"]
  },
  {
    imageUrl: "https://res.cloudinary.com/dxsornfee/image/upload/v1752452448/katataganmay202020fastforward-ezgif.com-video-to-gif-converter_ff4y5m.gif",
    title: "Katatagan In A Box",
    description: "Business Continuity App for MSMEs",
    url: "https://play.google.com/store/apps/details?id=xyz.orangefix.katatagan",
    tags: ["mobile", "react-native", "android", "ios", "2019"]
  },
  {
    imageUrl: "https://res.cloudinary.com/dxsornfee/image/upload/v1738792238/1601667424678_mvo3uc.jpg",
    title: "Matigsalug Learners App",
    description: "Matigsalug Learners App",
    url: "https://www.linkedin.com/in/raymelfrancisco/details/experience/urn:li:fsd_profilePosition:(ACoAABvJbyEBkRxqlRRzs9jmLOK2Pk1004fyro8,1314964216)/treasury/",
    tags: ["mobile", "react-native", "android", "ios", "2018"]
  },
  {
    imageUrl: "https://res.cloudinary.com/dxsornfee/image/upload/v1738792241/1602522448880_rtrk1b.jpg",
    title: "Kaalam Cebuano App",
    description: "Kaalam Cebuano App",
    url: "https://www.linkedin.com/in/raymelfrancisco/details/experience/urn:li:fsd_profilePosition:(ACoAABvJbyEBkRxqlRRzs9jmLOK2Pk1004fyro8,1314964216)/treasury/",
    tags: ["mobile", "android", "ios", "2018"]
  },
  {
    imageUrl: "https://res.cloudinary.com/dxsornfee/image/upload/v1738792243/1599205837166_bv4zcn.jpg",
    title: "Sanut Ilokano App",
    description: "Sanut Ilokano App",
    url: "https://www.linkedin.com/in/raymelfrancisco/details/experience/urn:li:fsd_profilePosition:(ACoAABvJbyEBkRxqlRRzs9jmLOK2Pk1004fyro8,1314964216)/treasury/",
    tags: ["mobile", "android", "ios", "2018"]
  },
  {
    imageUrl: "https://res.cloudinary.com/dxsornfee/image/upload/v1738927546/1YZva9yKdCmhCkDP-unnamed_2520_1_jirfjy.jpg",
    title: "Educo Learners App",
    description: "Educo Learners App",
    url: "https://play.google.com/store/apps/details?id=com.Educo.educocwdpardo&hl=en_US&gl=US",
    tags: ["full-stack", "mobile", "nodejs", "2020"]
  },
  {
    imageUrl: "https://res.cloudinary.com/dxsornfee/image/upload/v1738927509/ajckHzGuoDvb7Qr3-1024x500_kv7fjp.png",
    title: "Yazi",
    description: "Yazi",
    url: "https://play.google.com/store/apps/details?id=com.yazi.app.user&hl=en&gl=US",
    tags: ["mobile", "firebase", "react-native", "2020"]
  },
  {
    imageUrl: "https://res.cloudinary.com/dxsornfee/image/upload/v1738927515/8D9o8QA87DSxk7os-guide-1024x500_20banner_go4icv.png",
    title: "Yazi Guide",
    description: "Yazi Guide",
    url: "https://play.google.com/store/apps/details?id=com.yazi.app.guide",
    tags: ["mobile", "firebase", "react-native", "2020"]
  },
  {
    imageUrl: "https://res.cloudinary.com/dxsornfee/image/upload/v1738927556/kgylLkDHKTHQjaRn-dash-widget_logo_var2_COLORED_miz0hi.png",
    title: "Dash Widget",
    description: "Dash Widget",
    url: "https://orangefix.xyz/portfolio/",
    tags: ["wordpress plugin", "php", "facebook-api", "2022"]
  },
  {
    title: "Tagalog Dictionary Scraper",
    description: "Collects 42,723 Tagalog words from tagalog.pinoydictionary.com",
    url: "https://github.com/raymelon/tagalog-dictionary-scraper",
    tags: ["github", "scraping", "python", "2016"]
  },
  {
    imageUrl: "https://raw.githubusercontent.com/raymelon/TrafficLightNeuralNetwork/master/misc/demo.gif",
    title: "Traffic Light Neural Network",
    description: "Traffic Light Neural Network",
    url: "https://github.com/raymelon/TrafficLightNeuralNetwork",
    tags: ["github", "ai", "c#", "2017"]
  },
  {
    imageUrl: "https://raw.githubusercontent.com/raymelon/DiskSim/master/screencap/Capture%20SSTF.JPG",
    title: "DiskSim",
    description: "Disk Scheduling Algorithms Simulator",
    url: "https://github.com/raymelon/DiskSim",
    tags: ["github", "simulator", "java", "2016"]
  },
  {
    imageUrl: "https://raw.githubusercontent.com/raymelon/VolPI/refs/heads/master/screenshots/v1/volpi_v1_unmuted.jpg",
    title: "VolPI",
    description: "Volπ: Volume Percent Indicator",
    url: "https://github.com/raymelon/VolPI",
    tags: ["github", "simulator", "c#", "2016"]
  },
  // Add more items as needed
].map(item => ({
  ...item,
  year: getYearFromTags(item.tags) // Pre-calculate year
}));

// Get unique tags from all portfolio items
const allTags = Array.from(
  new Set(portfolioItems.flatMap(item => item.tags).sort())
);

type SortOrder = 'default' | 'year-asc' | 'year-desc';

export function PortfolioGrid() {
  const { theme } = useTheme();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('year-desc'); // Default sort by year descending

  const sortedAndFilteredItems = useMemo(() => {
    let items = [...portfolioItems];

    // Sort items
    if (sortOrder === 'year-asc') {
      items.sort((a, b) => (a.year ?? 0) - (b.year ?? 0));
    } else if (sortOrder === 'year-desc') {
      items.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    }
    // Add other sort orders if needed, like 'default' which might be insertion order or title

    // Filter items
    if (activeTag) {
      items = items.filter(item => item.tags.includes(activeTag));
    }

    return items;
  }, [activeTag, sortOrder]);


  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-medium text-sm mr-1">Filter by Tag:</span>
          <button
            onClick={() => setActiveTag(null)}
            className={`text-blue-600 dark:text-blue-400 hover:underline text-sm ${
              activeTag === null ? 'underline font-bold' : ''
            }`}
          >
            all
          </button>
          {allTags.map((tag, index) => {
            const isYearTag = /^\d{4}$/.test(tag);
            return (
              <>
                {index > 0 && <span key={`sep-${index}`} className="text-gray-500 text-xs">•</span>}
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)} // Allow clicking any tag, including years
                  className={`text-sm hover:underline text-blue-600 dark:text-blue-400 ${ // Use same base style for all tags
                    activeTag === tag ? 'underline font-bold' : '' // Apply active style regardless of tag type
                  }`}
                >
                  {tag}
                </button>
              </>
            );
          })}
        </div>

        {/* Sort Controls */}
        <div className="flex flex-wrap gap-2 items-center">
           <span className="font-medium text-sm mr-1">Sort by Year:</span>
           <button
            onClick={() => setSortOrder('year-asc')}
            className={`text-green-600 dark:text-green-400 hover:underline text-sm ${
              sortOrder === 'year-asc' ? 'underline font-bold' : ''
            }`}
          >
            Oldest First
          </button>
          <span className="text-gray-500 text-xs">•</span>
           <button
            onClick={() => setSortOrder('year-desc')}
            className={`text-green-600 dark:text-green-400 hover:underline text-sm ${
              sortOrder === 'year-desc' ? 'underline font-bold' : ''
            }`}
          >
            Newest First
          </button>
        </div>
      </div>


      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 w-full space-y-4">
        {sortedAndFilteredItems.map((item, index) => (
          <div key={`${item.url}-${index}`} className="break-inside-avoid mb-4">
            <Link href={item.url} target="_blank">
              <MagicCard
                className="cursor-pointer flex flex-col items-center justify-center shadow-xl p-3"
                gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
              >
                <div className="flex flex-col items-center w-full">
                  {item.videoUrl ? (
                    <div className="w-full flex items-center justify-center min-h-[180px] mb-2">
                      <video
                        src={item.videoUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="object-contain rounded-md max-h-[400px]"
                      />
                    </div>
                  ) : item.imageUrl ? (
                    <div className="w-full flex items-center justify-center min-h-[180px] mb-2">
                      <img
                        src={item.imageUrl}
                        alt={item.description}
                        className="object-contain rounded-md max-h-[400px]"
                      />
                    </div>
                  ) : item.title ? (
                    <h2 className="text-1xl whitespace-nowrap mb-2">{item.title}</h2>
                  ) : null}
                  
                  <p className="mt-1 text-sm text-center text-muted-foreground mb-3 px-2">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1 justify-center items-center w-full px-2 pb-1">
                    {item.tags.map((tag, i) => {
                      const isYearTag = /^\d{4}$/.test(tag);
                      return (
                        <>
                          <button
                            key={tag}
                            onClick={(e) => {
                              e.preventDefault(); // Prevent navigating via the parent Link
                              e.stopPropagation(); // Stop the event from bubbling up
                              // If the clicked tag is already active, deactivate it (show all). Otherwise, activate it.
                              setActiveTag(prevActiveTag => prevActiveTag === tag ? null : tag);
                            }}
                            className={`text-xs hover:underline text-blue-600 dark:text-blue-400 px-2 py-1 rounded ${ // Use same base style for all tags
                              activeTag === tag ? 'underline font-bold' : '' // Apply active style regardless of tag type
                            }`}
                            // No longer disabled
                          >
                            {tag}
                          </button>
                          {/* Add dot separator if not the last tag */}
                          {i < item.tags.length - 1 && <span className="text-gray-500 text-xs mx-1">•</span>}
                        </>
                      )
                    })}
                  </div>
                </div>
              </MagicCard>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
