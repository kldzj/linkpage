import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { getSocialDisplayName, getSocialIcon } from "@/lib/social-icons";
import { cn } from "@/lib/utils";
import { TrackedLink } from "./tracked-link";

interface LinkData {
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
}

interface LinkCardProps {
  linkKey: string;
  linkData: string | LinkData;
}

export function LinkCard({ linkKey, linkData }: LinkCardProps) {
  const isSimpleLink = typeof linkData === "string";
  const url = isSimpleLink ? linkData : linkData.url;
  const title = isSimpleLink ? getSocialDisplayName(linkKey) : linkData.title;
  const description = !isSimpleLink ? linkData.description : undefined;
  const icon = isSimpleLink
    ? getSocialIcon(linkKey)
    : linkData.icon
      ? linkData.icon
      : getSocialIcon(linkKey);
  const bgImage = !isSimpleLink ? linkData.bgImage : undefined;
  const customColor = !isSimpleLink ? linkData.color : undefined;
  const customBgColor = !isSimpleLink ? linkData.bgColor : undefined;
  const isFeatured = !isSimpleLink ? linkData.featured : false;
  const isHidden = !isSimpleLink ? linkData.hidden : false;
  const size = !isSimpleLink ? linkData.size || "medium" : "medium";

  if (isHidden) return null;

  const cardStyle = {
    color: customColor,
    backgroundColor: customBgColor,
  };

  const hasBackgroundImage = !!bgImage;
  const hasCustomBackground = bgImage || customBgColor;

  return (
    <TrackedLink url={url} title={title}>
      <Card
        className={cn(
          "group relative overflow-hidden transition-all duration-300 ease-out",
          "hover:scale-[1.02] hover:shadow-xl hover:-translate-y-1",
          "border-2 border-transparent hover:border-primary/20",
          "bg-card hover:bg-card/90 py-0",
          hasCustomBackground && "text-white border-white/20",
          isFeatured && "ring-2 ring-primary/30 shadow-lg scale-[1.01]",
        )}
        style={cardStyle}
      >
        {bgImage && (
          <div className="absolute inset-0">
            <Image
              src={`/images/${bgImage}`}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {isFeatured && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium z-10">
            Featured
          </div>
        )}

        {hasBackgroundImage && (
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
        )}

        <div
          className={cn(
            "relative px-4",
            size === "extra-large"
              ? "py-12"
              : size === "large" || isFeatured || hasBackgroundImage
                ? "py-8"
                : size === "small"
                  ? "py-2"
                  : hasBackgroundImage
                    ? "py-4"
                    : "py-3",
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {icon && (
                <div
                  className={cn(
                    "w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0",
                    "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
                    "transition-all duration-300",
                    hasCustomBackground &&
                      "bg-white/20 text-white group-hover:bg-white group-hover:text-black",
                  )}
                >
                  {icon}
                </div>
              )}
              <div className="flex-1 min-w-0 overflow-hidden">
                <div
                  className={cn(
                    "font-medium text-sm sm:text-base truncate",
                    hasCustomBackground ? "text-white" : "text-foreground",
                  )}
                >
                  {title}
                </div>
                {description && (
                  <div
                    className={cn(
                      "text-xs truncate",
                      hasCustomBackground
                        ? "text-white/80"
                        : "text-muted-foreground",
                    )}
                  >
                    {description}
                  </div>
                )}
              </div>
            </div>

            <ArrowUpRight
              className={cn(
                "w-4 h-4 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0",
                hasCustomBackground ? "text-white/80" : "text-muted-foreground",
              )}
            />
          </div>
        </div>

        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10" />
      </Card>
    </TrackedLink>
  );
}
