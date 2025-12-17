declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    ttq?: {
      track: (event: string, payload?: Record<string, unknown>) => void;
    };
  }
}

export function trackEvent(event: string, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer?.push({
    event,
    ...payload,
  });

  window.ttq?.track(event, payload);
}
