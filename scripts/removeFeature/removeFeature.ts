import {
	JsxAttribute,
	Node,
	Project,
	SyntaxKind,
} from "ts-morph";

type featureStateType = "off" | "on";

const toggleFunctionName = "toggleFeatures";
const toggleComponentName = "ToggleFeatures";

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
			child.getText() === toggleFunctionName
		) {
			isToggle = true;
		}
	});

	return isToggle;
};

const isToggleComponent = (node: Node) => {
	let isToggle = false;
	node.forEachChild((child) => {
		if (
			child.isKind(SyntaxKind.Identifier) &&
			child.getText() === toggleComponentName
		) {
			isToggle = true;
		}
	});

	return isToggle;
};

const replaceToggleFunction = (node: Node) => {
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
};

const getAttributeNodeByName = (
	jsxAttributes: JsxAttribute[],
	name: string
) => {
	return jsxAttributes.find(
		(attr) => attr.getName() === name
	);
};

const getReplacedComponent = (
	attribute?: JsxAttribute
) => {
	const value = attribute
		?.getFirstDescendantByKind(
			SyntaxKind.JsxExpression
		)
		?.getExpression()
		?.getText();

	if (value?.startsWith("(")) {
		return value.slice(1, -1);
	}

	return value;
};

const replaceComponent = (node: Node) => {
	const attributes = node.getDescendantsOfKind(
		SyntaxKind.JsxAttribute
	);

	const onAttribute = getAttributeNodeByName(
		attributes,
		"on"
	);
	const offAttribute = getAttributeNodeByName(
		attributes,
		"off"
	);

	const featureNameAttribute =
		getAttributeNodeByName(attributes, "feature");
	const featureName = featureNameAttribute
		?.getFirstDescendantByKind(
			SyntaxKind.StringLiteral
		)
		?.getText()
		?.slice(1, -1);

	if (featureName !== removedFeatureName) return;

	const offValue =
		getReplacedComponent(offAttribute);
	const onValue =
		getReplacedComponent(onAttribute);

	if (featureState === "on" && onValue) {
		node.replaceWithText(onValue);
	}

	if (featureState === "off" && offValue) {
		node.replaceWithText(offValue);
	}
};

files.forEach((sourceFile) => {
	sourceFile.forEachDescendant((node) => {
		if (
			node.isKind(SyntaxKind.CallExpression) &&
			isToggleFunction(node)
		) {
			replaceToggleFunction(node);
		}

		if (
			node.isKind(
				SyntaxKind.JsxSelfClosingElement
			) &&
			isToggleComponent(node)
		) {
			replaceComponent(node);
		}
	});
});

project.save();
