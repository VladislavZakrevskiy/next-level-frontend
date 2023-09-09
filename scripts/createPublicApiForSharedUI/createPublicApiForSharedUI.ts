import path from "path";
import { Project } from "ts-morph";

const project = new Project({});

project.addSourceFilesAtPaths("src/**/*.tsx");
project.addSourceFilesAtPaths("src/**/*.ts");

const slices = [
	"app",
	"shared",
	"features",
	"widgets",
	"pages",
	"entities",
];
const files = project.getSourceFiles();
const sharedUiDir = project.getDirectory(
	path.resolve(
		__dirname,
		"..",
		"..",
		"src",
		"shared",
		"ui"
	)
);
const componentsDirs =
	sharedUiDir?.getDirectories();

componentsDirs?.forEach((dir) => {
	const indexFilePath =
		dir.getPath() + "/index.ts";
	const indexFile = dir.getSourceFile(
		indexFilePath
	);

	if (!indexFile) {
		const sourceCode = `export * from ${dir.getBaseName()};`;
		const file = dir.createSourceFile(
			indexFilePath,
			sourceCode
		);

		file.save();
	}
});

const isAbsolute = (value: string) => {
	if (
		slices.some((slice) =>
			value.startsWith(slice)
		)
	) {
		return true;
	}

	return false;
};

files.forEach((sourceFile) => {
	const importDeclarations =
		sourceFile.getImportDeclarations();
	importDeclarations.forEach(
		(importDeclaration) => {
			const value =
				importDeclaration.getModuleSpecifierValue();
			const valueWithoutAlias = value.replace(
				"@/",
				""
			).split(',').join('/');

			const segments =
				valueWithoutAlias.split("/");

			const isSharedLayer =
				segments[0] === "shared";
			const isUISlice = segments[1] === "ui";

			if (
				isAbsolute(valueWithoutAlias) &&
				isSharedLayer &&
				isUISlice
			) {
				const result = valueWithoutAlias
					.split("/")
					.slice(0, 3).join('/');
				importDeclaration.setModuleSpecifier(
					`@/${result}`
				);
			}
		}
	);
});

project.save();
