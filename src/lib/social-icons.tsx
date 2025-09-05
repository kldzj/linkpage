import {
  Briefcase,
  Camera,
  Coffee,
  Facebook,
  Github,
  Globe,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Music,
  Phone,
  Star,
  Twitch,
  Twitter,
  User,
  Video,
  Youtube,
  Zap,
} from "lucide-react";

const socialIconMap = {
  // Social Media
  facebook: <Facebook className="w-4 h-4" />,
  twitter: <Twitter className="w-4 h-4" />,
  x: <Twitter className="w-4 h-4" />,
  instagram: <Instagram className="w-4 h-4" />,
  linkedin: <Linkedin className="w-4 h-4" />,
  github: <Github className="w-4 h-4" />,
  youtube: <Youtube className="w-4 h-4" />,
  twitch: <Twitch className="w-4 h-4" />,
  tiktok: <Video className="w-4 h-4" />,

  // Communication
  email: <Mail className="w-4 h-4" />,
  mail: <Mail className="w-4 h-4" />,
  phone: <Phone className="w-4 h-4" />,
  whatsapp: <MessageCircle className="w-4 h-4" />,
  telegram: <MessageCircle className="w-4 h-4" />,
  discord: <MessageCircle className="w-4 h-4" />,

  // Creative
  music: <Music className="w-4 h-4" />,
  spotify: <Music className="w-4 h-4" />,
  soundcloud: <Music className="w-4 h-4" />,
  photography: <Camera className="w-4 h-4" />,
  portfolio: <Briefcase className="w-4 h-4" />,

  // Generic
  website: <Globe className="w-4 h-4" />,
  blog: <Globe className="w-4 h-4" />,
  shop: <Globe className="w-4 h-4" />,
  custom: <Globe className="w-4 h-4" />,
  link: <Globe className="w-4 h-4" />,

  // Fun
  coffee: <Coffee className="w-4 h-4" />,
  donate: <Heart className="w-4 h-4" />,
  support: <Heart className="w-4 h-4" />,
  favorite: <Star className="w-4 h-4" />,
  featured: <Zap className="w-4 h-4" />,

  // Default
  default: <User className="w-4 h-4" />,
};

export function getSocialIcon(key: string): React.ReactNode {
  const normalizedKey = key.toLowerCase().replace(/[-_\s]/g, "");
  return (
    socialIconMap[normalizedKey as keyof typeof socialIconMap] ||
    socialIconMap.default
  );
}

const socialDisplayNames = {
  // Social Media
  facebook: "Facebook",
  twitter: "Twitter",
  x: "X",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  github: "GitHub",
  youtube: "YouTube",
  twitch: "Twitch",
  tiktok: "TikTok",

  // Communication
  email: "Email",
  mail: "Email",
  phone: "Phone",
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  discord: "Discord",

  // Creative
  music: "Music",
  spotify: "Spotify",
  soundcloud: "SoundCloud",
  photography: "Photography",
  portfolio: "Portfolio",

  // Generic
  website: "Website",
  blog: "Blog",
  shop: "Shop",
  custom: "Custom Link",
  link: "Link",

  // Fun
  coffee: "Buy me a coffee",
  donate: "Donate",
  support: "Support",
  favorite: "Favorite",
  featured: "Featured",

  // Default
  default: "Link",
};

export function getSocialDisplayName(key: string): string {
  const normalizedKey = key.toLowerCase().replace(/[-_\s]/g, "");
  return (
    socialDisplayNames[normalizedKey as keyof typeof socialDisplayNames] ||
    // Fallback to title case
    key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()
  );
}

export function getAllSocialIcons() {
  return Object.keys(socialIconMap).filter((key) => key !== "default");
}
