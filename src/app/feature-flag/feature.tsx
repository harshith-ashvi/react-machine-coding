"use client";

import React from "react";
import { FeaturesType, useFeatureFlag } from "./feature-flag-provider";

interface FeatureProps {
  children: React.ReactNode;
  fallback?: React.ReactNode | null;
  feature: keyof FeaturesType;
}

const Feature = ({ children, fallback = null, feature }: FeatureProps) => {
  const { isFeatureEnabled } = useFeatureFlag();
  const isEnabled = isFeatureEnabled(feature);
  return isEnabled ? <>{children}</> : <>{fallback}</>;
};

export default Feature;
