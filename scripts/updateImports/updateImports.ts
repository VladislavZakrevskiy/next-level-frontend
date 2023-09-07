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

			if (isAbsolute(value)) {
				importDeclaration.setModuleSpecifier(
					`@/${value}`
				);
			}
		}
	);
});

project.save();
