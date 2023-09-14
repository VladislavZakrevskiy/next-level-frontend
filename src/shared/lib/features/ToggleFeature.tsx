import { FeatureFlags } from "@/shared/types/featureFlags";
import { FC, ReactNode } from "react";
import { getFeatureFlags } from "./setGetFeature";

interface Props {
	feature: keyof FeatureFlags;
	on: ReactNode;
	off: ReactNode;
}

export const ToggleFeatures: FC<Props> = ({
	feature,
	off,
	on,
}) => (getFeatureFlags(feature) ? on : off);
