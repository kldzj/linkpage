import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { isSubPage, type LinkItem, type SubPage } from "@/lib/config";
import { getSocialDisplayName, getSocialIcon } from "@/lib/social-icons";
import { cn } from "@/lib/utils";
import { TrackedLink } from "./tracked-link";

interface LinkCardProps {
  linkKey: string;
  linkData: string | LinkItem | SubPage;
}

interface ParsedLinkData {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  bgImage?: string;
  customColor?: string;
  customBgColor?: string;
  isFeatured: boolean;
  isHidden: boolean;
  size: "small" | "medium" | "large" | "extra-large";
  url?: string;
  isSubPage: boolean;
}

function parseLinkData(
  linkKey: string,
  linkData: string | LinkItem | SubPage,
): ParsedLinkData {
  const isSimpleLink = typeof linkData === "string";
  const isSubPageLink = isSubPage(linkData);

  if (isSubPageLink) {
    const subPage = linkData as SubPage;
    return {
      title: subPage.title,
      description: subPage.description,
      icon: subPage.icon ? subPage.icon : getSocialIcon(linkKey),
      bgImage: subPage.bgImage,
      customColor: subPage.color,
      customBgColor: subPage.bgColor,
      isFeatured: subPage.featured || false,
      isHidden: subPage.hidden || false,
      size: subPage.size || "medium",
      isSubPage: true,
    };
  }

  const url = isSimpleLink ? linkData : linkData.url;
  const title = isSimpleLink ? getSocialDisplayName(linkKey) : linkData.title;
  const description = !isSimpleLink ? linkData.description : undefined;
  const icon = isSimpleLink
    ? getSocialIcon(linkKey)
    : linkData.icon
      ? getSocialIcon(linkData.icon)
      : getSocialIcon(linkKey);
  const bgImage = !isSimpleLink ? linkData.bgImage : undefined;
  const customColor = !isSimpleLink ? linkData.color : undefined;
  const customBgColor = !isSimpleLink ? linkData.bgColor : undefined;
  const isFeatured = !isSimpleLink ? linkData.featured || false : false;
  const isHidden = !isSimpleLink ? linkData.hidden || false : false;
  const size = !isSimpleLink ? linkData.size || "medium" : "medium";

  return {
    title,
    description,
    icon,
    bgImage,
    customColor,
    customBgColor,
    isFeatured,
    isHidden,
    size,
    url,
    isSubPage: false,
  };
}

function LinkCardContent({
  parsedData,
  hasCustomBackground,
}: {
  parsedData: ParsedLinkData;
  hasCustomBackground: boolean;
}) {
  const {
    title,
    description,
    icon,
    bgImage,
    customColor,
    customBgColor,
    isFeatured,
    size,
    isSubPage,
  } = parsedData;

  const cardStyle = {
    color: customColor,
    backgroundColor: customBgColor,
  };

  const hasBackgroundImage = !!bgImage;

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 ease-out",
        "hover:scale-[1.02] hover:shadow-xl hover:-translate-y-1",
        "border-2 border-transparent hover:border-primary/20",
        "bg-card hover:bg-card/90 py-0",
        isSubPage && "cursor-pointer",
        hasCustomBackground && "text-white border-white/20",
        isFeatured && "ring-2 ring-primary/30 shadow-lg scale-[1.01]",
      )}
      style={cardStyle}
    >
      {bgImage && (
        <div className="absolute inset-0">
          {/** biome-ignore lint/performance/noImgElement: img is sufficient here */}
          <img
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

          {isSubPage ? (
            <ArrowRight
              className={cn(
                "w-4 h-4 transition-all duration-300 group-hover:translate-x-1 flex-shrink-0",
                hasCustomBackground ? "text-white/80" : "text-muted-foreground",
              )}
            />
          ) : (
            <ArrowUpRight
              className={cn(
                "w-4 h-4 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0",
                hasCustomBackground ? "text-white/80" : "text-muted-foreground",
              )}
            />
          )}
        </div>
      </div>

      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10" />
    </Card>
  );
}

export function LinkCard({ linkKey, linkData }: LinkCardProps) {
  const parsedData = parseLinkData(linkKey, linkData);

  if (parsedData.isHidden) return null;

  const hasCustomBackground =
    !!parsedData.bgImage || !!parsedData.customBgColor;

  if (parsedData.isSubPage) {
    return (
      <Link href={`/${linkKey}`}>
        <LinkCardContent
          parsedData={parsedData}
          hasCustomBackground={hasCustomBackground}
        />
      </Link>
    );
  }

  if (!parsedData.url) return null;

  return (
    <TrackedLink url={parsedData.url} title={parsedData.title}>
      <LinkCardContent
        parsedData={parsedData}
        hasCustomBackground={hasCustomBackground}
      />
    </TrackedLink>
  );
}
