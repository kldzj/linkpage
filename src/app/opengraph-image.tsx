import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getConfig } from "@/lib/config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const alt = "LinkPage Profile";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const themeColors = {
  default: "#6366f1",
  blue: "#3b82f6",
  purple: "#8b5cf6",
  green: "#10b981",
};

export default async function Image() {
  const config = getConfig();

  const accentColor =
    config.theme.accentColor ||
    themeColors[config.theme.colorScheme as keyof typeof themeColors] ||
    themeColors.default;

  let avatarSrc: string | null = null;
  try {
    const avatarPath = join(process.cwd(), "images", config.avatar);
    const avatarData = await readFile(avatarPath);
    const base64 = Buffer.from(avatarData).toString("base64");

    const ext = config.avatar.toLowerCase();
    let mimeType = "image/jpeg";
    if (ext.endsWith(".png")) mimeType = "image/png";
    else if (ext.endsWith(".webp")) mimeType = "image/webp";
    else if (ext.endsWith(".gif")) mimeType = "image/gif";

    avatarSrc = `data:${mimeType};base64,${base64}`;
  } catch (error) {
    // Avatar not found or couldn't be loaded, will use initials instead
    console.log(`Avatar not found: ${config.avatar}, error: ${error}`);
    avatarSrc = null;
  }

  const bgColor = "#ffffff";
  const textColor = "#1a1a1a";
  const mutedColor = "#6b7280";

  const hideBranding =
    config.branding?.hideFooter && config.branding?.sponsoredOnGitHub;

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bgColor,
        backgroundImage: `linear-gradient(135deg, ${bgColor} 0%, #f8fafc 100%)`,
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 20%, ${accentColor}15 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${accentColor}10 0%, transparent 50%)`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: "24px",
          padding: "60px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "60px",
            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}CC)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "48px",
            fontWeight: "bold",
            color: "white",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          {avatarSrc ? (
            // biome-ignore lint/performance/noImgElement: img is sufficient here
            <img
              src={avatarSrc}
              alt={config.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            config.name.charAt(0).toUpperCase()
          )}
        </div>

        <h1
          style={{
            fontSize: "56px",
            fontWeight: "bold",
            color: textColor,
            margin: 0,
            lineHeight: 1.1,
            maxWidth: "800px",
          }}
        >
          {config.name}
        </h1>

        <p
          style={{
            fontSize: "28px",
            color: mutedColor,
            margin: 0,
            lineHeight: 1.4,
            maxWidth: "700px",
            textAlign: "center",
          }}
        >
          {config.biography.length > 120
            ? `${config.biography.substring(0, 120)}...`
            : config.biography}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "16px 32px",
            background: accentColor,
            borderRadius: "50px",
            color: "white",
            fontSize: "20px",
            fontWeight: "600",
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          }}
        >
          <span>🔗</span>
          <span>{Object.keys(config.links).length} Links Available</span>
        </div>
      </div>

      {!hideBranding && (
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "40px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "18px",
            color: mutedColor,
            fontWeight: "500",
          }}
        >
          <span>⚡</span>
          <span>LinkPage</span>
        </div>
      )}
    </div>,
    {
      ...size,
    },
  );
}
