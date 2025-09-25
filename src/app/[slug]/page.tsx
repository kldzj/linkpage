import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackgroundEffects } from "@/components/background-effects";
import { LinkCard } from "@/components/link-card";
import { SettingsPanel } from "@/components/settings-panel";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getConfig, isSubPage, type SubPage } from "@/lib/config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface SubPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SubPageComponent({ params }: SubPageProps) {
  const config = getConfig();
  const { slug } = await params;

  const linkData = config.links[slug];
  if (!linkData || !isSubPage(linkData)) {
    notFound();
  }

  const subPage = linkData as SubPage;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative">
      <BackgroundEffects />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="mb-6 animate-fade-in">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="mb-4 -ml-2 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to main
              </Button>
            </Link>
          </div>

          <div className="text-center mb-8 space-y-4 animate-fade-in">
            <div className="relative animate-scale-in">
              <Avatar className="w-24 h-24 mx-auto ring-4 ring-primary/10 ring-offset-4 ring-offset-background shadow-xl transition-all duration-300 hover:ring-primary/20 hover:scale-105">
                {/** biome-ignore lint/performance/noImgElement: img is sufficient here */}
                <img
                  className="object-cover"
                  src={`/images/${config.avatar}`}
                  alt={config.name}
                />
                <AvatarFallback className="text-xl font-semibold bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                  {config.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-2 animate-slide-up">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                {subPage.title}
              </h1>
              {subPage.description && (
                <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {subPage.description}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(subPage.pages).map(([key, value], index) => (
              <div
                key={key}
                className="animate-slide-up"
                style={{
                  animationDelay: `${index * 100 + 250}ms`,
                  animationFillMode: "both",
                }}
              >
                <LinkCard linkKey={key} linkData={value} />
              </div>
            ))}
          </div>

          {(!config.branding?.hideFooter ||
            !config.branding?.sponsoredOnGitHub) && (
            <div className="text-center mt-12 pt-8 border-t border-border/50">
              {config.branding?.hideFooter &&
              !config.branding?.sponsoredOnGitHub ? (
                <div className="space-y-2">
                  <p className="text-xs text-orange-600 font-medium">
                    ⚠️ Footer hidden without GitHub sponsorship
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Please{" "}
                    <a
                      href="https://github.com/sponsors/kldzj"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-foreground text-pink-600"
                    >
                      sponsor this project
                    </a>{" "}
                    and set{" "}
                    <code className="bg-muted px-1 rounded">
                      sponsoredOnGitHub: true
                    </code>{" "}
                    to hide this footer
                  </p>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Powered by{" "}
                  <Link
                    href="https://github.com/kldzj/linkpage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-foreground"
                  >
                    LinkPage
                  </Link>
                  {process.env.NODE_ENV !== "production" && (
                    <>
                      {" • "}
                      <Link
                        href="https://github.com/sponsors/kldzj"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-foreground text-pink-600"
                      >
                        💖 Sponsor
                      </Link>
                    </>
                  )}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <SettingsPanel config={config} />
    </div>
  );
}

export async function generateStaticParams() {
  const config = getConfig();

  return Object.keys(config.links)
    .filter((key) => isSubPage(config.links[key]))
    .map((slug) => ({
      slug,
    }));
}
