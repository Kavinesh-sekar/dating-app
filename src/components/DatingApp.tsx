import { useState } from "react";
import { WelcomeScreen } from "./WelcomeScreen";
import { AuthModal } from "./AuthModal";
import { SwipeInterface } from "./SwipeInterface";
import { ChatInterface } from "./ChatInterface";
import { NavigationBar } from "./NavigationBar";
import { ProfileScreen } from "./ProfileScreen";
import { SettingsScreen } from "./SettingsScreen";

type AppState = "welcome" | "main";
type MainTab = "discover" | "matches" | "profile" | "settings";

export function DatingApp() {
  const [appState, setAppState] = useState<AppState>("welcome");
  const [activeTab, setActiveTab] = useState<MainTab>("discover");
  const [showAuth, setShowAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      setAppState("main");
    } else {
      setShowAuth(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuth(false);
    setAppState("main");
  };

  const handleOpenChat = () => {
    setActiveTab("matches");
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case "discover":
        return <SwipeInterface onOpenChat={handleOpenChat} />;
      case "matches":
        return <ChatInterface onBack={() => setActiveTab("discover")} />;
      case "profile":
        return <ProfileScreen />;
      case "settings":
        return <SettingsScreen />;
      default:
        return <SwipeInterface onOpenChat={handleOpenChat} />;
    }
  };

  if (appState === "welcome") {
    return (
      <>
        <WelcomeScreen onGetStarted={handleGetStarted} />
        <AuthModal
          isOpen={showAuth}
          onClose={() => setShowAuth(false)}
          onSuccess={handleAuthSuccess}
        />
      </>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderMainContent()}
      </div>

      {/* Navigation */}
      <NavigationBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        matchCount={3}
        messageCount={3}
      />
    </div>
  );
}