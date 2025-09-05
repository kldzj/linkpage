import fs from "node:fs";
import path from "node:path";

const defaultConfig: Config = {
  avatar: "avatar.jpg",
  name: "John Doe",
  biography: "I am a software engineer",
  domain: "https://localhost:3000",
  theme: {
    colorScheme: "default",
    backgroundType: "gradient",
    customBackground: "",
    accentColor: "#3b82f6",
  },
  seo: {
    title: "LinkPage",
    description: "LinkPage is a platform for creating and sharing links",
    keywords: ["links", "social", "profile"],
    favicon: "/favicon.ico",
  },
  analytics: {
    enabled: false,
    googleAnalytics: "",
    plausible: "",
  },
  branding: {
    hideFooter: false,
    sponsoredOnGitHub: false,
  },
  links: {
    facebook: "https://www.facebook.com/your-page",
    twitter: "https://www.twitter.com/your-page",
    instagram: "https://www.instagram.com/your-page",
    linkedin: "https://www.linkedin.com/your-page",
    custom: {
      title: "Custom Link",
      url: "https://www.customlink.com",
      bgImage: "custom.jpg",
      description: "Check out my custom project",
    },
  },
};

declare let global: {
  config: Config;
  watcherInitialized: boolean;
};

export function getConfig(forceReload = false): Config {
  if (global.config && !forceReload) return global.config;
  const configContent = fs.readFileSync(
    process.env.CONFIG_PATH || path.join(process.cwd(), "config.json"),
    "utf-8",
  );

  const config = JSON.parse(configContent) as Config;
  global.config = { ...defaultConfig, ...config };
  console.log("[Config] Loaded!");
  watchConfig();
  return global.config;
}

export function watchConfig() {
  if (global.watcherInitialized) return;
  global.watcherInitialized = true;
  fs.watchFile(
    process.env.CONFIG_PATH || path.join(process.cwd(), "config.json"),
    async () => {
      console.log("[Config] Changed, reloading...");
      global.config = getConfig(true);
      await fetch(`http://localhost:${process.env.PORT}/api/revalidate`, {
        headers: {
          Authorization: `Bearer ${process.env.INVALIDATE_TOKEN}`,
        },
      });
    },
  );
}

export type Config = {
  avatar: string;
  name: string;
  biography: string;
  domain: string;
  theme: {
    colorScheme: "default" | "blue" | "purple" | "green" | "custom";
    backgroundType: "solid" | "gradient" | "image" | "pattern";
    customBackground?: string;
    accentColor?: string;
  };
  seo: {
    title: string;
    description: string;
    keywords?: string[];
    favicon?: string;
  };
  analytics: {
    enabled: boolean;
    googleAnalytics?: string;
    plausible?: string;
    umami?: {
      websiteId: string;
      src?: string;
    };
  };
  branding: {
    hideFooter?: boolean;
    sponsoredOnGitHub?: boolean;
  };
  links: {
    [key: string]:
      | string
      | {
          title: string;
          url: string;
          description?: string;
          icon?: string;
          color?: string;
          bgColor?: string;
          bgImage?: string;
          featured?: boolean;
          hidden?: boolean;
          size?: "small" | "medium" | "large" | "extra-large";
        };
  };
};
