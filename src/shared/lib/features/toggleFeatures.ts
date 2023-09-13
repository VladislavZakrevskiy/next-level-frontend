import { FeatureFlags } from "@/shared/types/featureFlags";
import { getFeatureFlags } from "./setGetFeature";

interface toggleFeaturesProps<T> {
	name: keyof FeatureFlags;
	on: () => T;
	off: () => T;
}

export const toggleFeatures = <T>(
	props: toggleFeaturesProps<T>
): T => {
	const { name, off, on } = props;
	return getFeatureFlags(name) ? on() : off();
};
