import { Cartesian3, Color, Ellipsoid } from 'cesium';

export type CartesianArgs = {
	longitude: number;
	latitude: number;
	height?: number | undefined;
	ellipsoid?: Ellipsoid | undefined;
	result?: Cartesian3 | undefined;
};

export type MainEntityArgs = {
	id: string;
	name: string;
	description: string;
	pixelSize?: number;
	color?: Color;
};

export type ModelGraphicsArgs = {
	minimumPixelSize?: number;
	maximumScale?: number;
};

export type PolylineGraphicArgs = {
	coordinates: number[];
	width: number;
};

export type EllipseGraphicArgs = {
	show: boolean;
	longitude: number | undefined;
	latitude: number | undefined;
	widthInKm: number;
};
