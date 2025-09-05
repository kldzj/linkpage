"use client";

import {
  Check,
  ChevronDown,
  Copy,
  Download,
  Palette,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Config } from "@/lib/config";
import { themes } from "@/lib/themes";
import { cn } from "@/lib/utils";

interface SettingsPanelProps {
  config: Config;
}

export function SettingsPanel({ config: initialConfig }: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [config, setConfig] = useState(initialConfig);

  const updateTheme = (themeUpdates: Partial<Config["theme"]>) => {
    setConfig((prev) => ({
      ...prev,
      theme: { ...prev.theme, ...themeUpdates },
    }));
  };

  const copyConfig = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(config, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy config:", err);
    }
  };

  const downloadConfig = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "linkpage-config.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const applyTheme = (colorScheme: keyof typeof themes) => {
    const root = document.documentElement;
    const themeColors = themes[colorScheme];

    if (themeColors) {
      Object.entries(themeColors).forEach(([key, value]) => {
        if (key !== "name") {
          const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
          root.style.setProperty(cssVar, value);
        }
      });
      updateTheme({ colorScheme });
    }
  };

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="shadow-lg bg-background/95 backdrop-blur-sm border-border/50"
          >
            <Settings className="w-4 h-4 mr-2" />
            Live Settings
            <ChevronDown
              className={cn(
                "w-4 h-4 ml-2 transition-transform duration-200",
                isOpen && "rotate-180",
              )}
            />
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-2">
          <Card className="w-80 shadow-xl bg-background/95 backdrop-blur-sm border-border/50 max-h-[80vh] overflow-y-auto">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Theme Customizer
              </CardTitle>
              <CardDescription className="text-xs">
                Change settings and see live preview
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Palette className="w-3 h-3" />
                  Color Scheme
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(themes).map(([key, theme]) => (
                    <Button
                      key={key}
                      variant={
                        config.theme.colorScheme === key ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => applyTheme(key as keyof typeof themes)}
                      className="justify-start text-xs"
                    >
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: theme.primary }}
                      />
                      {theme.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-border/50">
                <h4 className="text-sm font-medium">Current Theme</h4>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Active:</span>
                  <span className="font-medium capitalize flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          themes[
                            config.theme.colorScheme as keyof typeof themes
                          ]?.primary,
                      }}
                    />
                    {themes[config.theme.colorScheme as keyof typeof themes]
                      ?.name || config.theme.colorScheme}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Links:</span>
                  <span className="font-medium">
                    {Object.keys(config.links).length}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-border/50">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setConfig(initialConfig);
                    applyTheme(
                      initialConfig.theme.colorScheme as keyof typeof themes,
                    );
                  }}
                  className="w-full text-xs"
                >
                  🔄 Reset to Original
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyConfig}
                    className="flex-1"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 mr-1" />
                        Copy Config
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadConfig}
                    className="flex-1"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-border/50">
                <p className="font-medium text-orange-600">
                  🚧 Development Mode
                </p>
                <p>
                  Changes are temporary - update{" "}
                  <code className="bg-muted px-1 rounded">config.json</code> to
                  persist
                </p>
                <p>💡 Use "Copy Config" to save your customizations</p>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
