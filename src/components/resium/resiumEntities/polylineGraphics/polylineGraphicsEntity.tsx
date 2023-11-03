import * as Cesium from 'cesium';
import * as React from 'react';

import { Entity, PolylineGraphics } from 'resium';
import {
	MainEntityArgs,
	PolylineGraphicArgs,
} from '../../../../components/resium/resiumEntities';

type CombinedArgs = MainEntityArgs & PolylineGraphicArgs;

const PolylineGraphicsEntity: React.FunctionComponent<CombinedArgs> = (
	args,
) => {
	const { name, description, color, coordinates, width = 4 } = args;

	return (
		<React.Fragment>
			<Entity {...args} name={name} description={description}>
				<PolylineGraphics
					positions={Cesium.Cartesian3.fromDegreesArrayHeights(coordinates)}
					width={width}
					arcType={Cesium.ArcType.RHUMB}
					material={
						new Cesium.PolylineOutlineMaterialProperty({
							color: color,
							outlineWidth: 0.5,
							outlineColor: Cesium.Color.BLACK,
						})
					}
				/>
			</Entity>
		</React.Fragment>
	);
};

export default PolylineGraphicsEntity;
