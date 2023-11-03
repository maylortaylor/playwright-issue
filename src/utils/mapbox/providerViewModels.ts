import * as Cesium from 'cesium';

import LocationPng from '../../assets/images/location.png';

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const MAPBOX_USERNAME = 'maylortaylor';
const MAPBOX_STYLE_OUTDOORS = 'cljsq8lo401ag01ns5kcf9mg2';
const MAPBOX_STYLE_SATELLITE_STREETS = 'cljsohp0101bc01pg6kasaqy9';
const MAPBOX_STYLE_NAVIGATION_NIGHT = 'cljsqr3dh010v01qvb6nv7ryb';

const mapboxProviderViewModels: Cesium.ProviderViewModel[] = [];
mapboxProviderViewModels.push(
	new Cesium.ProviderViewModel({
		name: 'Mapbox Outdoors',
		iconUrl: Cesium.buildModuleUrl(LocationPng),
		tooltip: 'some tooltip text (optional)',
		category: 'Polestar Mapboxes',
		creationFunction: function () {
			// return new MapboxImageryProvider({
			// 	mapId: 'cljsqr3dh010v01qvb6nv7ryb',
			// 	accessToken: MAPBOX_ACCESS_TOKEN,
			// 	url: 'https://api.mapbox.com/v4/',
			// });
			return new Cesium.UrlTemplateImageryProvider({
				// url: 'https://api.mapbox.com/styles/mapbox/streets-v12',
				url: `https://api.mapbox.com/styles/v1/${MAPBOX_USERNAME}/${MAPBOX_STYLE_OUTDOORS}/tiles/256/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`,
			});
		},
	}),
	new Cesium.ProviderViewModel({
		name: 'Mapbox Satellite Streets',
		iconUrl: Cesium.buildModuleUrl(LocationPng),
		tooltip: 'some tooltip text (optional)',
		category: 'Polestar Mapboxes',
		creationFunction: function () {
			return new Cesium.UrlTemplateImageryProvider({
				url: `https://api.mapbox.com/styles/v1/${MAPBOX_USERNAME}/${MAPBOX_STYLE_SATELLITE_STREETS}/tiles/256/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`,
			});
		},
	}),
	new Cesium.ProviderViewModel({
		name: 'Mapbox Navigation Night',
		iconUrl: Cesium.buildModuleUrl(LocationPng),
		tooltip: 'some tooltip text (optional)',
		category: 'Polestar Mapboxes',
		creationFunction: function () {
			return new Cesium.UrlTemplateImageryProvider({
				url: `https://api.mapbox.com/styles/v1/${MAPBOX_USERNAME}/${MAPBOX_STYLE_NAVIGATION_NIGHT}/tiles/256/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`,
			});
		},
	}),
);

export default mapboxProviderViewModels;
