/* eslint-disable @typescript-eslint/ban-ts-comment */
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

export const pageview = (url: URL) => {
  // @ts-ignore
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// @ts-ignore
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
