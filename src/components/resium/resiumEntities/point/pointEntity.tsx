import * as Cesium from 'cesium';
import * as React from 'react';

import {
	CartesianArgs,
	MainEntityArgs,
} from '../../../../components/resium/resiumEntities';
import { Entity, PointPrimitive, PointPrimitiveCollection } from 'resium';

import { customCesiumColor } from '../../../../../src/theme';

type CombinedArgs = MainEntityArgs & CartesianArgs;

const PointEntity: React.FunctionComponent<CombinedArgs> = (args) => {
	const {
		id,
		name,
		description,
		longitude,
		latitude,
		height = 100,
		ellipsoid,
		result,
		pixelSize = 3,
		color = Cesium.Color.fromCssColorString(
			customCesiumColor.pointEntityColors.orange,
		),
	} = args;

	return (
		<React.Fragment>
			<Entity
				key={id}
				id={id}
				test-data-id={`point-entity-${id}`}
				name={name}
				description={description}
				position={Cesium.Cartesian3.fromDegrees(
					longitude,
					latitude,
					height,
					ellipsoid,
					result,
				)}
				point={{
					pixelSize: pixelSize,
					color: color,
					// * Set a pointPrimitive's scaleByDistance to scale to 3 when the
					// * camera is 2500 meters from the pointPrimitive
					// * and goes to 1 as the camera distance approaches 8.0+6 meters.
					scaleByDistance: new Cesium.NearFarScalar(2500, 3, 8.0e6, 1),
					// * Set a point's translucency to 1.0 when the
					// * camera is 2500 meters from the point
					// * and disappears 0.1 as the camera distance approaches 1500 meters.
					translucencyByDistance: new Cesium.NearFarScalar(2500, 1, 8.0e6, 0.1),
				}}
			/>
			{/* <PointPrimitiveCollection>
				<PointPrimitive
					key={id}
					id={id}
					position={Cesium.Cartesian3.fromDegrees(
						longitude,
						latitude,
						height,
						ellipsoid,
						result,
					)}
					pixelSize={pixelSize}
					color={color}
					// * Make the point only visible when the distance to the camera is between 10 and 1000 meters.
					// distanceDisplayCondition={new Cesium.DistanceDisplayCondition(10.0, 1000.0)}
					// * Set a point's translucency to 1.0 when the
					// * camera is 1500 meters from the point and disappear as
					// * the camera distance approaches 200 meters.
					translucencyByDistance={new Cesium.NearFarScalar(1500, 1.0, 200, 0.0)}
					// name={name}
					// description={description}
				/>
			</PointPrimitiveCollection> */}
		</React.Fragment>
	);
};

export default PointEntity;
