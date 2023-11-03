import * as Cesium from 'cesium';
import * as React from 'react';

import { EllipseGraphicArgs, MainEntityArgs } from '..';
import { EllipseGraphics, Entity } from 'resium';

import { customCesiumColor } from '../../../../theme';

type CombinedArgs = MainEntityArgs & EllipseGraphicArgs;

const EllipseGraphicsEntity: React.FunctionComponent<CombinedArgs> = (args) => {
	const { name, description, longitude, latitude, show, widthInKm = 42 } = args;

	return (
		<React.Fragment>
			<Entity
				name={name}
				description={description}
				position={Cesium.Cartesian3.fromDegrees(longitude!, latitude!, 150000)}
			>
				<EllipseGraphics
					show={show}
					fill={true}
					height={20000}
					semiMinorAxis={widthInKm * 1000}
					semiMajorAxis={widthInKm * 1000}
					material={Cesium.Color.fromAlpha(
						Cesium.Color.fromCssColorString(
							customCesiumColor.ellipseColors.pink,
						),
						0.25,
					)}
				/>
			</Entity>
		</React.Fragment>
	);
};

export default EllipseGraphicsEntity;
