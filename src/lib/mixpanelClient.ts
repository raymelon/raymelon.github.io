import mixpanel from 'mixpanel-browser';

// Extend the Config interface to include autocapture
declare module 'mixpanel-browser' {
  interface Config {
    autocapture?: boolean;
  }
}
 
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
 
export const initMixpanel = () => {
  if (!MIXPANEL_TOKEN) {
    console.warn('Mixpanel token is missing! Check your .env file.');
    return;
  }
 
  mixpanel.init(MIXPANEL_TOKEN, { track_pageview : true });
}