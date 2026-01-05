"use client";

import React, { createContext, useContext } from "react";

export type FeaturesType = {
  isDarkMode: boolean;
  isChatEnabled: boolean;
  isAnalyticsEnabled: boolean;
};

export type FeatureFlagContextType = {
  features: FeaturesType;
  isFeatureEnabled: (feature: keyof FeaturesType) => boolean;
};

export const FeatureFlag = createContext<FeatureFlagContextType | null>(null);

const FeatureFlagProvider = ({ children }: { children: React.ReactNode }) => {
  const features: FeaturesType = {
    isDarkMode: true,
    isChatEnabled: true,
    isAnalyticsEnabled: false,
  };

  const isFeatureEnabled = (feature: keyof FeaturesType) => {
    return Boolean(features[feature]);
  };

  return (
    <FeatureFlag.Provider value={{ features, isFeatureEnabled }}>
      {children}
    </FeatureFlag.Provider>
  );
};

export const useFeatureFlag = () => {
  const context = useContext(FeatureFlag);
  if (!context) {
    throw new Error("Error");
  }
  return context;
};

export default FeatureFlagProvider;
