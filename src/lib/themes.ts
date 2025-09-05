export const themes = {
  default: {
    name: "Default",
    primary: "oklch(0.205 0 0)",
    primaryForeground: "oklch(0.985 0 0)",
    background: "oklch(1 0 0)",
    foreground: "oklch(0.145 0 0)",
    muted: "oklch(0.97 0 0)",
    mutedForeground: "oklch(0.556 0 0)",
    accent: "oklch(0.97 0 0)",
    accentForeground: "oklch(0.205 0 0)",
  },
  blue: {
    name: "Ocean Blue",
    primary: "oklch(0.6 0.25 240)",
    primaryForeground: "oklch(0.985 0 0)",
    background: "oklch(0.98 0.01 240)",
    foreground: "oklch(0.15 0.02 240)",
    muted: "oklch(0.95 0.02 240)",
    mutedForeground: "oklch(0.5 0.05 240)",
    accent: "oklch(0.92 0.03 240)",
    accentForeground: "oklch(0.2 0.02 240)",
  },
  purple: {
    name: "Royal Purple",
    primary: "oklch(0.55 0.25 280)",
    primaryForeground: "oklch(0.985 0 0)",
    background: "oklch(0.98 0.01 280)",
    foreground: "oklch(0.15 0.02 280)",
    muted: "oklch(0.95 0.02 280)",
    mutedForeground: "oklch(0.5 0.05 280)",
    accent: "oklch(0.92 0.03 280)",
    accentForeground: "oklch(0.2 0.02 280)",
  },
  green: {
    name: "Forest Green",
    primary: "oklch(0.5 0.2 140)",
    primaryForeground: "oklch(0.985 0 0)",
    background: "oklch(0.98 0.01 140)",
    foreground: "oklch(0.15 0.02 140)",
    muted: "oklch(0.95 0.02 140)",
    mutedForeground: "oklch(0.5 0.05 140)",
    accent: "oklch(0.92 0.03 140)",
    accentForeground: "oklch(0.2 0.02 140)",
  },
};

export function getThemeCSS(theme: keyof typeof themes, accentColor?: string) {
  const themeColors = themes[theme];
  if (!themeColors) return "";

  return `
    :root {
      --primary: ${accentColor ? accentColor : themeColors.primary};
      --primary-foreground: ${themeColors.primaryForeground};
      --background: ${themeColors.background};
      --foreground: ${themeColors.foreground};
      --muted: ${themeColors.muted};
      --muted-foreground: ${themeColors.mutedForeground};
      --accent: ${themeColors.accent};
      --accent-foreground: ${themeColors.accentForeground};
    }
  `;
}
