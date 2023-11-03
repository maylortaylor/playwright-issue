import * as Cesium from 'cesium';
import * as React from 'react';

import {
	CartesianArgs,
	MainEntityArgs,
	ModelGraphicsArgs,
} from '../../resiumEntities';
import { Entity, ModelGraphics } from 'resium';

type CombinedArgs = MainEntityArgs & CartesianArgs & ModelGraphicsArgs;

const ModelGraphicsEntity: React.FunctionComponent<CombinedArgs> = (args) => {
	const {
		name,
		description,
		longitude,
		latitude,
		height,
		ellipsoid,
		result,
		minimumPixelSize = 15,
		maximumScale = 100,
		color,
	} = args;

	return (
		<React.Fragment>
			<Entity
				name={name}
				description={description}
				position={Cesium.Cartesian3.fromDegrees(
					longitude,
					latitude,
					height,
					ellipsoid,
					result,
				)}
			>
				<ModelGraphics
					uri="./glb/low_poly_cargo_ship.glb?raw-hex"
					minimumPixelSize={minimumPixelSize}
					maximumScale={maximumScale}
					color={color}
				/>
			</Entity>
		</React.Fragment>
	);
};

export default ModelGraphicsEntity;
