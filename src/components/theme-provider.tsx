"use client";

import { useEffect } from "react";
import type { Config } from "@/lib/config";
import { themes } from "@/lib/themes";

interface ThemeProviderProps {
  config: Config;
  children: React.ReactNode;
}

export function ThemeProvider({ config, children }: ThemeProviderProps) {
  useEffect(() => {
    const { theme } = config;
    const root = document.documentElement;

    if (
      theme.colorScheme !== "custom" &&
      themes[theme.colorScheme as keyof typeof themes]
    ) {
      const themeColors = themes[theme.colorScheme as keyof typeof themes];

      Object.entries(themeColors).forEach(([key, value]) => {
        if (key !== "name") {
          const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
          root.style.setProperty(cssVar, value);
        }
      });
    }

    if (theme.accentColor) {
      root.style.setProperty("--primary", theme.accentColor);
    }

    const body = document.body;
    body.className = body.className.replace(/bg-\S+/g, "");

    switch (theme.backgroundType) {
      case "solid":
        body.style.background = "var(--background)";
        break;
      case "gradient":
        body.style.background =
          "linear-gradient(135deg, var(--background) 0%, var(--muted) 100%)";
        break;
      case "image":
        if (theme.customBackground) {
          body.style.background = `url(${theme.customBackground}) center/cover fixed`;
          body.style.position = "relative";
        }
        break;
    }
  }, [config]);

  return <>{children}</>;
}
