import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.fce207f3835c42e58394ba75353e848d',
  appName: 'LoveMate - Dating App',
  webDir: 'dist',
  server: {
    url: 'https://fce207f3-835c-42e5-8394-ba75353e848d.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#E91E63",
      showSpinner: false
    }
  }
};

export default config;