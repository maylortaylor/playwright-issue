export type BuildPaths = {
	build: string;
	cesiumAssets: string;
	cesiumBuildSource: string;
	cesiumSource?: string;
	cesiumThirdParty?: string;
	cesiumWidgets?: string;
	cesiumWorkers?: string;
	css: string;
	fonts: string;
	images: string;
	entry: string;
	favicon: string;
	html: string;
	src: string;
	tsconfig: string;
	testResults: string;
};

export type BuildOptions = {
	isDev: boolean;
	paths: BuildPaths;
	port: number;
};
