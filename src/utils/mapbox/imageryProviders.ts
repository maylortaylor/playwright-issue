import * as Cesium from 'cesium';

const imageryLayers: Cesium.ImageryLayer[] = [];
const baseLayers: Cesium.ImageryLayer[] = [];
let mapboxStyleImageryProvider: Cesium.MapboxStyleImageryProvider;
let mapboxImageryLayerCollection: Cesium.ImageryLayerCollection;
let radarImageryLayer: Cesium.ImageryLayer;
const mapboxDataSources: Cesium.DataSourceCollection =
	new Cesium.DataSourceCollection();
let radarDataSource: Cesium.DataSource;

function setupLayers() {
	addBaseLayerOption('Bing Maps Aerial', Cesium.createWorldImageryAsync());

	addAdditionalLayerOption(
		'United States GOES Infrared',
		new Cesium.WebMapServiceImageryProvider({
			url: 'https://mesonet.agron.iastate.edu/cgi-bin/wms/goes/conus_ir.cgi?',
			layers: 'goes_conus_ir',
			credit: 'Infrared data courtesy Iowa Environmental Mesonet',
			parameters: {
				transparent: 'true',
				format: 'image/png',
			},
		}),
	);

	addAdditionalLayerOption(
		'United States Weather Radar',
		new Cesium.WebMapServiceImageryProvider({
			url: 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi?',
			layers: 'nexrad-n0r',
			credit: 'Radar data courtesy Iowa Environmental Mesonet',
			parameters: {
				transparent: 'true',
				format: 'image/png',
			},
		}),
	);
}

async function addBaseLayerOption(
	name: string,
	imageryProviderPromise: Promise<Cesium.IonImageryProvider>,
) {
	try {
		const imageryProvider = await Promise.resolve(imageryProviderPromise);

		const layer = new Cesium.ImageryLayer(imageryProvider, {});
		baseLayers.push(layer);
		updateLayerList();
	} catch (error) {
		console.error(`There was an error while creating ${name}. ${error}`);
	}
}

async function addAdditionalLayerOption(
	name: string,
	imageryProviderPromise: Cesium.WebMapServiceImageryProvider,
	alpha: number = 0.5,
	show: boolean = true,
) {
	try {
		const imageryProvider = await Promise.resolve(imageryProviderPromise);
		const layer = new Cesium.ImageryLayer(imageryProvider, {
			alpha: alpha,
			show: show,
		});
		imageryLayers.push(layer);
		// Cesium.knockout.track(layer, ['alpha', 'show', 'name']);
		updateLayerList();
	} catch (error) {
		console.error(`There was an error while creating ${name}. ${error}`);
	}
}

function updateLayerList() {
	// const numLayers = imageryLayers.length;
	// viewModel.layers.splice(0, viewModel.layers.length);
	// for (let i = numLayers - 1; i >= 0; --i) {
	// 	viewModel.layers.push(imageryLayers.get(i));
	// }
}

setupLayers();

// new MapboxImageryProvider({
// 	mapId: 'strets-v12',
// 	accessToken:
// 		'sk.eyJ1IjoibWF5bG9ydGF5bG9yIiwiYSI6ImNsanNuamt2ZjA4MWUzcGp1Z2h4MnV4dmkifQ.Cgk-BP_SP3RIC3gE-NUamA',
// 	// url: 'https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif',
// });

// const imageryProviderPromise = await Promise.resolve(
// 	new WebMapServiceImageryProvider({
// 		url: 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi?',
// 		layers: 'nexrad-n0r',
// 		credit: 'Radar data courtesy Iowa Environmental Mesonet',
// 		parameters: {
// 			transparent: 'true',
// 			format: 'image/png',
// 		},
// 	})
// );

// var mapboxImageryProviders: ImageryProvider[] = [];
// mapboxImageryProviders.push(
// 	new WebMapServiceImageryProvider({
// 		url: 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi?',
// 		layers: 'nexrad-n0r',
// 		credit: 'Radar data courtesy Iowa Environmental Mesonet',
// 		parameters: {
// 			transparent: 'true',
// 			format: 'image/png',
// 		},
// 	})
// );

const mapboxImageryProvider_radar = new Cesium.WebMapServiceImageryProvider({
	url: 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi?',
	layers: 'nexrad-n0r',
	credit: 'Radar data courtesy Iowa Environmental Mesonet',
	parameters: {
		transparent: 'true',
		format: 'image/png',
	},
});

const mapboxImageryProvider_infrared = new Cesium.WebMapServiceImageryProvider({
	url: 'https://mesonet.agron.iastate.edu/cgi-bin/wms/goes/conus_ir.cgi?',
	layers: 'goes_conus_ir',
	credit: 'Infrared data courtesy Iowa Environmental Mesonet',
	parameters: {
		transparent: 'true',
		format: 'image/png',
	},
});

const mapboxImageryLayer = new Cesium.ImageryLayer(
	new Cesium.WebMapServiceImageryProvider({
		url: 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi?',
		layers: 'nexrad-n0r',
		credit: 'Radar data courtesy Iowa Environmental Mesonet',
		parameters: {
			transparent: 'true',
			format: 'image/png',
		},
	}),
	{},
);

// imageryLayers.push(mapboxImageryLayer);

export { mapboxImageryProvider_radar, mapboxImageryProvider_infrared };
