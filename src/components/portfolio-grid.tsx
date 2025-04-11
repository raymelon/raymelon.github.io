"use client"
import { useTheme } from "next-themes";
import { MagicCard } from "@/components/magicui/magic-card";
import Link from "next/link";
import { useState } from "react";

interface PortfolioItem {
  title?: string;
  imageUrl?: string;
  videoUrl?: string;
  description: string;
  url: string;
  tags: string[];
}

const portfolioItems: PortfolioItem[] = [
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
    url: "",
    tags: ["browser-automation", "ai", "2025"]
  },
  {
    imageUrl: "https://pbs.twimg.com/ext_tw_video_thumb/1861889348955979776/pu/img/2xmojdicvXxLTePy.jpg",
    description: "Document Chat AI Assistant",
    url: "https://twitter.com/pseudokid/status/1861895287855624617",
    tags: ["desktop", "ai", "2024"]
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
    url: "",
    tags: ["full-stack", "ai", "2024"]
  },
  {
    title: "Twitter Unfollower Agent",
    description: "AI Agent that tracks Twitter Unfollowers",
    url: "https://github.com/raymelon/ai6z-twitter-agents",
    tags: ["twitter", "ai", "2025"]
  },
  {
    videoUrl: "https://video.twimg.com/ext_tw_video/1806998259489222657/pu/vid/avc1/1920x1080/z3mz1fMMppqL24KB.mp4?tag=14",
    title: "ChatGPT clone built in 3 hours",
    description: "ChatGPT clone built in 3 hours",
    url: "https://x.com/pseudokid/status/1806998353571713320",
    tags: ["frontend", "ai", "2024"]
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
    title: "recaps.fyi",
    description: "recaps.fyi",
    url: "https://recaps.fyi",
    tags: ["full-stack", "remotion", "nextjs", "2024"]
  },
  {
    videoUrl: "https://video.twimg.com/ext_tw_video/1712953781024063488/pu/vid/avc1/1280x720/k9YKgvF2v5kOsnLa.mp4?tag=12",
    title: "Frontend Grid Shuffle",
    description: "Frontend Grid Shuffle",
    url: "https://x.com/pseudokid/status/1712955695300260318",
    tags: ["frontend", "2023"]
  },
  {
    imageUrl: "https://res.cloudinary.com/dxsornfee/image/upload/v1738792234/1602323347376_btp2eb.jpg",
    title: "Ta'allam Learners App",
    description: "Ta'allam Learners App",
    url: "",
    tags: ["mobile", "react-native", "android", "ios", "2017"]
  },
  {
    imageUrl: "https://res.cloudinary.com/dxsornfee/image/upload/v1738792313/Simulator_Screen_Shot_-_iPhone_12_Pro_Max_-_2021-04-30_at_12.47.53_abbadx.png",
    title: "Katatagan In A Box",
    description: "Business Continuity Toolkit for MSMEs",
    url: "https://play.google.com/store/apps/details?id=xyz.orangefix.katatagan",
    tags: ["mobile", "react-native", "android", "ios", "2019"]
  },
  {
    imageUrl: "https://res.cloudinary.com/dxsornfee/image/upload/v1738792238/1601667424678_mvo3uc.jpg",
    title: "Matigsalug Learners App",
    description: "Matigsalug Learners App",
    url: "",
    tags: ["mobile", "react-native", "android", "ios", "2018"]
  },
  {
    imageUrl: "https://res.cloudinary.com/dxsornfee/image/upload/v1738792241/1602522448880_rtrk1b.jpg",
    title: "Kaalam Cebuano App",
    description: "Kaalam Cebuano App",
    url: "",
    tags: ["mobile", "react-native", "android", "ios", "2018"]
  },
  {
    imageUrl: "https://res.cloudinary.com/dxsornfee/image/upload/v1738792243/1599205837166_bv4zcn.jpg",
    title: "Sanut Ilokano App",
    description: "Sanut Ilokano App",
    url: "",
    tags: ["mobile", "react-native", "android", "ios", "2018"]
  },
  {
    imageUrl: "https://res.cloudinary.com/dxsornfee/image/upload/v1738927546/1YZva9yKdCmhCkDP-unnamed_2520_1_jirfjy.jpg",
    title: "Educo Learners App",
    description: "Educo Learners App",
    url: "https://play.google.com/store/apps/details?id=com.Educo.educocwdpardo&hl=en_US&gl=US",
    tags: ["full-stack", "nodejs", "2020"]
  },
  {
    imageUrl: "https://res.cloudinary.com/dxsornfee/image/upload/v1738927509/ajckHzGuoDvb7Qr3-1024x500_kv7fjp.png",
    title: "Yazi",
    description: "Yazi",
    url: "https://play.google.com/store/apps/details?id=com.yazi.app.user&hl=en&gl=US",
    tags: ["mobile", "react-native", "android", "ios", "2020"]
  },
  {
    imageUrl: "https://res.cloudinary.com/dxsornfee/image/upload/v1738927515/8D9o8QA87DSxk7os-guide-1024x500_20banner_go4icv.png",
    title: "Yazi Guide",
    description: "Yazi Guide",
    url: "https://play.google.com/store/apps/details?id=com.yazi.app.guide",
    tags: ["mobile", "react-native", "android", "ios", "2020"]
  },
  {
    imageUrl: "https://res.cloudinary.com/dxsornfee/image/upload/v1738927556/kgylLkDHKTHQjaRn-dash-widget_logo_var2_COLORED_miz0hi.png",
    title: "Dash Widget",
    description: "Dash Widget",
    url: "",
    tags: ["wordpress plugin", "2022"]
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
    description: "An Artificial Neural Network based Traffic Light Controller for intersections.",
    url: "https://github.com/raymelon/tagalog-dictionary-scraper",
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
];

// Get unique tags from all portfolio items
const allTags = Array.from(
  new Set(portfolioItems.flatMap(item => item.tags).sort())
);

export function PortfolioGrid() {
  const { theme } = useTheme();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  
  const filteredItems = activeTag 
    ? portfolioItems.filter(item => item.tags.includes(activeTag))
    : portfolioItems;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTag(null)}
          className={`text-blue-600 dark:text-blue-400 hover:underline ${
            activeTag === null ? 'underline' : ''
          }`}
        >
          all
        </button>
        {allTags.map((tag, index) => (
          <>
            <span className="text-gray-500">•</span>
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`text-blue-600 dark:text-blue-400 hover:underline ${
                activeTag === tag ? 'underline' : ''
              }`}
            >
              {tag}
            </button>
          </>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
        {filteredItems.map((item, index) => (
          <Link href={item.url} target="_blank" key={index}>
            <MagicCard
              className="cursor-pointer flex flex-col items-center justify-center shadow-2xl h-[250px]"
              gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            >
              <div className={`flex flex-col items-center ${(item.imageUrl || item.videoUrl) ? 'gap-1' : 'gap-4 p-4'}`}>
                {item.videoUrl ? (
                  <div className="h-40 w-full flex items-center justify-center">
                    <video
                      src={item.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="max-h-full max-w-full object-cover rounded-md"
                    />
                  </div>
                ) : item.imageUrl ? (
                  <div className="h-44 w-[90%] flex items-center justify-center">
                    <img
                      src={item.imageUrl}
                      alt={item.description}
                      className="max-h-full max-w-full object-cover rounded-md"
                    />
                  </div>
                ) : item.title ? (
                  <h2 className="text-1xl whitespace-nowrap">{item.title}</h2>
                ) : null}
                
                <p className="mt-2 text-sm text-center text-muted-foreground">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, i) => (
                    <span key={tag} className="text-xs text-blue-600 dark:text-blue-400">
                      {tag} {(i < item.tags.length - 1) && <span className="text-gray-500">•</span>}
                    </span>
                  ))}
                </div>
              </div>
            </MagicCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
