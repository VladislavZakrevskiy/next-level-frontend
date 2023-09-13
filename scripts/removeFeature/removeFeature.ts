import {
	Node,
	Project,
	SyntaxKind,
} from "ts-morph";

type featureStateType = "off" | "on";

const removedFeatureName = process.argv[2];
const featureState: featureStateType = process
	.argv[3] as featureStateType;

if (!removedFeatureName) {
	throw new Error("no Feature Flag");
}

if (!featureState) {
	throw new Error("no Feature State (off or on)");
}

if (
	featureState !== "off" &&
	featureState !== "on"
) {
	throw new Error(
		"feature state is not on or off"
	);
}

const project = new Project({});

project.addSourceFilesAtPaths("src/**/*.tsx");
project.addSourceFilesAtPaths("src/**/*.ts");

const files = project.getSourceFiles();

const isToggleFunction = (node: Node) => {
	let isToggle = false;
	node.forEachChild((child) => {
		if (
			child.isKind(SyntaxKind.Identifier) &&
			child.getText() === "toggleFeature"
		) {
			isToggle = true;
		}
	});

	return isToggle;
};

files.forEach((sourceFile) => {
	sourceFile.forEachDescendant((node) => {
		if (
			node.isKind(SyntaxKind.CallExpression) &&
			isToggleFunction(node)
		) {
			const objectOptions =
				node.getFirstAncestorByKind(
					SyntaxKind.ObjectLiteralExpression
				);

			if (!objectOptions) return;

			const onFunctionProperty =
				objectOptions.getProperty("on");
			const offFunctionProperty =
				objectOptions.getProperty("off");
			const featureNameProperty =
				objectOptions.getProperty("name");

			const onFunction =
				onFunctionProperty?.getFirstAncestorByKind(
					SyntaxKind.ArrowFunction
				);
			const offFunction =
				offFunctionProperty?.getFirstAncestorByKind(
					SyntaxKind.ArrowFunction
				);
			const featureName = featureNameProperty
				?.getFirstAncestorByKind(
					SyntaxKind.StringLiteral
				)
				?.getText()
				.slice(1, -1);

			if (featureName !== removedFeatureName) {
				return;
			}

			if (featureState === "on") {
				node.replaceWithText(
					onFunction?.getBody().getText() ?? ""
				);
			}

			if (featureState === "off") {
				node.replaceWithText(
					offFunction?.getBody().getText() ?? ""
				);
			}
		}
	});
});

project.save();
