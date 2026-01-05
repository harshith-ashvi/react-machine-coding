"use client";

import FeatureFlagProvider from "./feature-flag-provider";
import Feature from "./feature";

export const Example = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Feature feature="isDarkMode">
        <p>🌙 Dark Mode Enabled</p>
      </Feature>

      <Feature feature="isChatEnabled" fallback={<p>Upgrade to enable chat</p>}>
        <p>💬 Chat Feature Enabled</p>
      </Feature>

      <Feature
        feature="isAnalyticsEnabled"
        fallback={<p>Upgrade to enable analytics</p>}
      >
        <p>📊 Analytics Enabled</p>
      </Feature>
    </div>
  );
};

const FeatureFlagComp = () => {
  return (
    <div className="max-w-4xl mx-auto min-h-screen pt-8">
      <FeatureFlagProvider>
        <Example />
      </FeatureFlagProvider>
    </div>
  );
};

export default FeatureFlagComp;
