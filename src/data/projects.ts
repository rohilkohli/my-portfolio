export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  details: {
    role: string;
    year: string;
    client: string;
    challenge: string;
    solution: string;
    technologies: string[];
  };
}

export const projects: Project[] = [
  {
    id: "fintech-dashboard",
    title: "Fintech Dashboard",
    subtitle: "Finance",
    description: "A real-time financial monitoring tool with complex data visualization and dark mode UI.",
    image: "https://picsum.photos/seed/fintech/800/600",
    details: {
      role: "Lead Frontend Developer",
      year: "2025",
      client: "FinCorp Global",
      challenge: "Processing millions of data points in real-time without compromising UI performance.",
      solution: "Implemented WebWorkers for data processing and WebGL for rendering complex charts.",
      technologies: ["React", "D3.js", "WebGL", "TypeScript", "Node.js"]
    }
  },
  {
    id: "neon-commerce",
    title: "Neon Commerce",
    subtitle: "E-Commerce",
    description: "High-performance headless commerce platform built for luxury fashion brands.",
    image: "https://picsum.photos/seed/fashion/800/600",
    details: {
      role: "Full Stack Engineer",
      year: "2024",
      client: "LuxeMode",
      challenge: "Creating a seamless, app-like shopping experience on the web.",
      solution: "Utilized Next.js for SSR and Framer Motion for fluid page transitions.",
      technologies: ["Next.js", "Shopify API", "Framer Motion", "Tailwind CSS"]
    }
  },
  {
    id: "ai-assistant",
    title: "AI Assistant",
    subtitle: "Artificial Intelligence",
    description: "Voice-activated AI interface with fluid animations and natural language processing.",
    image: "https://picsum.photos/seed/ai/800/600",
    details: {
      role: "UI/UX Designer & Developer",
      year: "2025",
      client: "TechFlow AI",
      challenge: "Making AI interactions feel natural and less robotic.",
      solution: "Designed a conversational UI with real-time voice visualization.",
      technologies: ["React", "OpenAI API", "Web Audio API", "Three.js"]
    }
  },
  {
    id: "crypto-exchange",
    title: "Crypto Exchange",
    subtitle: "Web3",
    description: "Decentralized exchange interface focusing on trust, transparency and speed.",
    image: "https://picsum.photos/seed/crypto/800/600",
    details: {
      role: "Blockchain Developer",
      year: "2024",
      client: "Decentra",
      challenge: "Ensuring security and transparency in every transaction.",
      solution: "Integrated smart contracts directly into the UI with real-time validation.",
      technologies: ["Solidity", "Ethers.js", "React", "Web3.js"]
    }
  },
  {
    id: "spatial-audio",
    title: "Spatial Audio",
    subtitle: "Media",
    description: "Immersive audio streaming platform with 3D sound visualization.",
    image: "https://picsum.photos/seed/audio/800/600",
    details: {
      role: "Creative Developer",
      year: "2025",
      client: "SonicWave",
      challenge: "Visualizing 3D audio in a browser environment.",
      solution: "Created a custom audio visualizer using Three.js and Web Audio API.",
      technologies: ["Three.js", "Web Audio API", "React", "GLSL"]
    }
  },
  {
    id: "health-tracker",
    title: "Health Tracker",
    subtitle: "Wellness",
    description: "Biometric data visualization for elite athletes and performance tracking.",
    image: "https://picsum.photos/seed/health/800/600",
    details: {
      role: "Product Engineer",
      year: "2024",
      client: "EliteFit",
      challenge: "Displaying complex biometric data in an understandable way.",
      solution: "Developed interactive data visualizations that simplify complex metrics.",
      technologies: ["React Native", "D3.js", "Firebase", "HealthKit"]
    }
  }
];
