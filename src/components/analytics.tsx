"use client";

import Script from "next/script";
import { useEffect } from "react";

interface AnalyticsProps {
  config: {
    enabled: boolean;
    googleAnalytics?: string;
    plausible?: string;
    umami?: {
      websiteId: string;
      src?: string;
    };
  };
}

export function Analytics({ config }: AnalyticsProps) {
  useEffect(() => {
    if (config.enabled && typeof window !== "undefined") {
      // Custom analytics tracking can be added here
      console.log("Page viewed");
    }
  }, [config.enabled]);

  if (!config.enabled) return null;

  return (
    <>
      {/* Google Analytics */}
      {config.googleAnalytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalytics}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${config.googleAnalytics}');
            `}
          </Script>
        </>
      )}

      {/* Plausible Analytics */}
      {config.plausible && (
        <Script
          defer
          data-domain={config.plausible}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}

      {/* Umami Analytics */}
      {config.umami && (
        <Script
          defer
          data-website-id={config.umami.websiteId}
          src={config.umami.src || "https://cloud.umami.is/script.js"}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}

export function trackLinkClick(linkTitle: string, url: string) {
  if (typeof window !== "undefined") {
    // Google Analytics
    if (window.gtag) {
      window.gtag("event", "click", {
        event_category: "Link",
        event_label: linkTitle,
        value: url,
      });
    }

    // Plausible
    if (window.plausible) {
      window.plausible("Link Click", {
        props: {
          title: linkTitle,
          url: url,
        },
      });
    }

    // Umami
    if (window.umami) {
      window.umami.track("Link Click", {
        title: linkTitle,
        url: url,
      });
    }

    console.log(`Link clicked: ${linkTitle} -> ${url}`);
  }
}

declare global {
  interface Window {
    // biome-ignore lint/suspicious/noExplicitAny: Unknown type
    gtag?: (...args: any[]) => void;
    // biome-ignore lint/suspicious/noExplicitAny: Unknown type
    plausible?: (event: string, options?: any) => void;
    umami?: {
      // biome-ignore lint/suspicious/noExplicitAny: Unknown type
      track: (event: string, data?: any) => void;
    };
  }
}
