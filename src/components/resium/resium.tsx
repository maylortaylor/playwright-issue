import './resium.scss';

import * as Cesium from 'cesium';

import { CameraFlyTo, ImageryLayer, Scene, ScreenSpaceEvent, ScreenSpaceEventHandler, Viewer } from 'resium';
import { Cartesian2, Color, ScreenSpaceEventType } from 'cesium';
import {
	Component,
	RefObject,
	createRef,
	useCallback,
	useEffect,
	useState,
} from 'react';
import {
	EllipseGraphicsEntity,
	PointEntity,
} from '../../components/resium/resiumEntities';
import { WritableAtom, useAtom } from 'jotai';
import {
	appLoadingAtom,
	isLeftSideDrawerOpenAtom,
	mapCurrentMouseXY,
	vesselLocationAtom,
} from '../../store/';
import axios, { AxiosResponse } from 'axios';
import {
	mapboxImageryProvider_infrared,
	mapboxImageryProvider_radar,
} from '../../utils/mapbox/imageryProviders';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import React from 'react';
import { fakeShipData } from '../../configs/fakeShipData';
import { imageryProviderAtom } from '../../store/imageryProviderLayersAtom';
import mapboxProviderViewModels from '../../utils/mapbox/providerViewModels';
import moment from 'moment';

const emptyCredits = document.createElement('div');

type ResiumState = {
	cesiumRef?: () => RefObject<any>;
	showClickEllipse?: boolean;
	clickMapX?: number | undefined;
	clickMapY?: number | undefined;
	xmin?: number | undefined;
	xmax?: number | undefined;
	ymin?: number | undefined;
	ymax?: number | undefined;
};

export default function ResiumComponent() {
	const cesiumRef = () => createRef();
	const [vesselLocations, setVesselLocation] = useAtom(vesselLocationAtom);
	const [currentMouseXy, setCurrentMouseXy] = useAtom(mapCurrentMouseXY);

	const [state, setState] = useState<ResiumState>({
		cesiumRef: cesiumRef,
		showClickEllipse: false,
		clickMapX: undefined,
		clickMapY: undefined,
		xmin: undefined,
		xmax: undefined,
		ymin: undefined,
		ymax: undefined,
	});
	const [isLeftSideDrawerOpen] = useAtom(isLeftSideDrawerOpenAtom);
	const [isActive_infrared] = useAtom(
		imageryProviderAtom.layers.find((l) => l.name === 'Infrared')
			?.layer as WritableAtom<boolean, unknown[], any>,
	);
	const [isActive_radar] = useAtom(
		imageryProviderAtom.layers.find((l) => l.name === 'Radar')
			?.layer as WritableAtom<boolean, unknown[], any>,
	);
	const [isAppLoading, setIsAppLoading] = useAtom(appLoadingAtom);
	const getSocketUrl = useCallback(() => {
		return new Promise<string>((resolve) => {
			setTimeout(() => {
				resolve(`${process.env.REACT_APP_WS_DEV_URL}`);
			}, 2000);
		});
	}, []);


	// const { sendMessage, lastMessage, readyState } = useWebSocket(
	// 	getSocketUrl, {
	// 	share: true,
	// 	onOpen: () =>	console.log("WS OPENED"),
	// 	onClose: () => console.log('WS CLOSED'),
	// 	shouldReconnect: (closeEvent) => true,
	// 	onMessage: (event: WebSocketEventMap['message']) =>  processMessages(event),
	// 	reconnectAttempts: 10,
	// 	// * attemptNumber will be 0 the first time it attempts to reconnect,
	// 	// * so this equation results in a reconnect pattern of
	// 	// * 1 second, 2 seconds, 4 seconds, 8 seconds, and then caps at 10 seconds until the maximum number of attempts is reached
	//   reconnectInterval: (attemptNumber) =>
	//     Math.min(Math.pow(2, attemptNumber) * 1000, 10000),
	// });

	const processMessages = (event: { data: string }) => {
		const responseData = JSON.stringify(event?.data);
		const latitude = responseData!.match(/(latitude=-*\d+.\d+)/g);
		const longitude = responseData!.match(/(longitude=-*\d+.\d+)/g);
		const lat = latitude![0].match(/(-*\d+.\d+)/g);
		const long = longitude![0].match(/(-*\d+.\d+)/g);
		const updatedItem = {
			id: crypto.randomUUID(),
			Longitude: parseFloat(long![0]),
			Latitude: parseFloat(lat![0]),
			color: Color.RED,
		};
		console.log(
			`🚀 ~ file: resium.tsx:105 ~ processMessages ~ ${vesselLocations.length} updatedItem:`,
			updatedItem,
		);
		vesselLocations.push(updatedItem as never);
		setVesselLocation((prevState) => vesselLocations as any);
	};

	const getData = async (xmin, ymin, xmax, ymax) => {
		setIsAppLoading(true);
		const urlbase = `${process.env.REACT_APP_AWS_DEV_URL}/mda-next/api/v1/streamio/messages/bbox`;
		const date = moment().format('YYYY-MM-DD');
		const fullUrl = `${urlbase}?xmin=${xmin}&ymin=${ymin}&xmax=${xmax}&ymax=${ymax}&date=${date}`;

		console.log(
			'🚀 ~ file: resium.tsx:91 ~ ResiumComponent ~ getData ~ fullUrl:',
			fullUrl,
		);
		const options = {
			method: 'GET',
			url: fullUrl,
			headers: {
				'Access-Control-Allow-Credentials': true,
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET',
				'Access-Control-Allow-Headers': 'application/json',
			},
		};
		try {
			const response = await axios.request<AxiosResponse>(options);
			console.log(
				'🚀 ~ file: resium.tsx:101 ~ ResiumComponent ~ getData ~ RESPONSE API:',
				response,
			);
			vesselLocations.push(response.data as never);
			setIsAppLoading(false);
		} catch (error) {
			console.log(error);
			setIsAppLoading(false);
		}
	};

	const getLocationFromScreenXY = (x: number, y: number) => {
		const scene = state.cesiumRef!().current?.cesiumElement?.scene;
		if (!scene) return;
		const ellipsoid = scene.globe.ellipsoid;
		const cartesian = scene.camera.pickEllipsoid(
			new Cesium.Cartesian2(x, y),
			ellipsoid,
		);
		if (!cartesian) return;
		const { latitude, longitude, height } =
			ellipsoid.cartesianToCartographic(cartesian);
		const lon = longitude * (180 / Math.PI);
		const lat = latitude * (180 / Math.PI);
		console.log(`COORDS: ${lat}, ${lon}`);
		setCurrentMouseXy({
			latitude: lat,
			longitude: lon
		});

		return { lat, lon, height };
	};

	function toDegrees(coords) {
		const cart = new Cesium.Cartesian3(coords.x, coords.y, 0);
		const pos = Cesium.Cartographic.fromCartesian(cart);
		if (pos){
			return [pos.longitude / Math.PI * 180, pos.latitude / Math.PI * 180]
		}
		return null;
	}

	const getMouseLocationFromMapXY = (coords: { position: Cartesian2; } | { startPosition: Cartesian2; endPosition: Cartesian2; }) => {
		console.log(coords);

		// const viewer = new Cesium.Viewer("resium-map-viewer");

		// const ray = viewer.camera.getPickRay(coords.endPosition);
    // const mousePosition = viewer.scene.globe.pick(ray, viewer.scene);
    // if (Cesium.defined(mousePosition)) {
    //     const cartographic = Cesium.Cartographic.fromCartesian(mousePosition);
    //     const latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(3);
    //     const longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(3);
    //     const heightString = cartographic.height.toFixed(2);
    //     const lhtext =
    //         `Lat: ${(latitudeString).slice(-8)}, Lon: ${(longitudeString).slice(-8)}, Alt: ${(heightString).slice(-7)}`;

    //     console.log(lhtext);
    // }
		// const cart3 = Cesium.Cartesian2.fromCartesian3(coords.startPosition);
		// console.log('startPosition', coords.startPosition);

		// const latlon = toDegrees(coords.startPosition);
		// console.log(latlon);

		// const longitudeString = Cesium.Math.toDegrees(coords.startPosition.x);
		// const latitudeString = Cesium.Math.toDegrees(coords.startPosition.y);
		// console.log(`LAT/LON: ${latitudeString}, ${longitudeString}`);
		// setCurrentMouseXy({
		// 	latitude: latitudeString,
		// 	longitude: longitudeString
		// });

		return coords;
	};

	const clickMap = (object, entity) => {
		const coords = getLocationFromScreenXY(object.position.x, object.position.y);
		console.log(
			'🚀 ~ file: resium.tsx:132 ~ ResiumComponent ~ coords:',
			coords,
		);

		setState({
			cesiumRef: cesiumRef,
			showClickEllipse: true,
			clickMapX: coords!.lon,
			clickMapY: coords!.lat,
			xmin: coords!.lon,
			ymin: coords!.lat,
			xmax: coords!.lon + 0.4,
			ymax: coords!.lat + 0.4,
		});
		// getData(
		// 	state.xmin,
		// 	state.ymin,
		// 	state.xmax,
		// 	state.ymax,
		// );

		console.log('🚀 ~ file: resium.tsx:154 ~ ResiumComponent ~ state:', state);

		setTimeout(() => {
			setState({
				showClickEllipse: false,
			});
		}, 1000);
	};

	// const xmin = '-82.880859';
	// const ymin = '27.604454';
	// const xmax = '-82.372742';
	// const ymax = '27.953165';
	const xmin = '-180';
	const ymin = '-90';
	const xmax = '180';
	const ymax = '90';
	// getData(xmin, ymin, xmax, ymax);
	useEffect(() => {
		getData(xmin, ymin, xmax, ymax);
	}, []);

	const shipEntities = vesselLocations.map((ship: any) => (
		<PointEntity
			key={ship.id}
			id={`ship-point-${ship.id}`}
			test-data-id={`ship-point-${ship.id}`}
			name={ship.id}
			description={`vessel name: ${ship.id} <br/><br/> lat: ${ship.Latitude}, <br/> long: ${ship.Longitude}`}
			longitude={ship.Longitude}
			latitude={ship.Latitude}
			height={100}
			color={ship.color}
		/>
	));

	return (
		<Viewer
			key={'resium-map-viewer'}
			id="resium-map-viewer"
			// full={true}
			ref={state.cesiumRef}
			sceneMode={Cesium.SceneMode.SCENE2D}
			timeline={false}
			animation={false}
			navigationInstructionsInitiallyVisible={false}
			imageryProviderViewModels={mapboxProviderViewModels}
			creditContainer={emptyCredits}
			// baseLayerPicker={false}
			// dataSources={mapboxDataSources}
			// onClick={clickMap}
			className={
				isLeftSideDrawerOpen ? 'resium-viewer-open' : 'resium-viewer-closed'
			}
		>
			<CameraFlyTo
				once={true}
				destination={Cesium.Cartesian3.fromDegrees(0.0, 0.0, 40000000)}
			/>
			<ScreenSpaceEventHandler>
				<ScreenSpaceEvent
					action={(evt: { position: Cartesian2; } | { startPosition: Cartesian2; endPosition: Cartesian2; }) => getMouseLocationFromMapXY(evt)}
					type={ScreenSpaceEventType.MOUSE_MOVE} />
			</ScreenSpaceEventHandler>

			<Scene debugShowFramesPerSecond={true} />
			{/* <ImageryLayer
				imageryProvider={
					new ArcGisMapServerImageryProvider({
						url: '//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer',
					})
				}
			></ImageryLayer> */}

			<ImageryLayer
				show={isActive_infrared}
				imageryProvider={mapboxImageryProvider_infrared}
			/>
			<ImageryLayer
				show={isActive_radar}
				imageryProvider={mapboxImageryProvider_radar}
			/>

			<EllipseGraphicsEntity
				id={'new-api-point'}
				name={'new API bounding box'}
				description={'new API bounding box description'}
				show={state.showClickEllipse!}
				widthInKm={50}
				longitude={state.clickMapX}
				latitude={state.clickMapY}
			/>

			{shipEntities}
		</Viewer>
	);
}
