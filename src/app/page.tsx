import Image from "next/image";
import Link from "next/link";
import { BackgroundEffects } from "@/components/background-effects";
import { LinkCard } from "@/components/link-card";
import { SettingsPanel } from "@/components/settings-panel";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getConfig } from "@/lib/config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Home() {
  const config = getConfig();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative">
      <BackgroundEffects />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 mt-8 space-y-4 animate-fade-in">
            <div className="relative animate-scale-in">
              <Avatar className="w-28 h-28 mx-auto ring-4 ring-primary/10 ring-offset-4 ring-offset-background shadow-xl transition-all duration-300 hover:ring-primary/20 hover:scale-105">
                <Image
                  priority
                  className="object-cover"
                  src={`/images/${config.avatar}`}
                  alt={config.name}
                />
                <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                  {config.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-2 animate-slide-up">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                {config.name}
              </h1>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {config.biography}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(config.links).map(([key, value], index) => (
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
