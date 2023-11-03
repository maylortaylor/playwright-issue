import { Box, Divider, Grid, List } from "@mui/material";

import React from "react";
import { VesselDetailsInfoItem } from "../vesselDetailsInfoItem";
import VesselImage from '../../../../assets/images/vessel_image.png';
import VesselVoyageImage from '../../../../assets/images/voyage_image.png';

interface VesselDetailsGeneralInfoTabProps {
	vesselId: string;
}
export function VesselDetailsGeneralInfoTab(props: VesselDetailsGeneralInfoTabProps) {
  return (
		<Grid
			id="vessel-details-general-info-tab"
			container
			direction="row"
			justifyContent="space-around"
			alignItems='stretch'
			sx={{
				paddingBottom: '20px',
				height: '70vh',
				overflow: 'auto',
			}}
		>
			<List>
				<VesselDetailsInfoItem label={'Vessel Name'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Call Sign'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'IMO Number'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Vessel Type'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Flag'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Inmarsat Number'} value={props.vesselId} />
			</List>

			<Divider orientation='vertical' flexItem />

			<List>
				<VesselDetailsInfoItem label={'Satellite Number'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Current Radio'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Radio Watch'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Voyage Medic'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'SAR Q Medic'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Digital Call Select'} value={props.vesselId} />
			</List>

			<Divider orientation='vertical' flexItem />

			<List>
				<VesselDetailsInfoItem label={'AMVER member'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'AMVER member since'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'ARES member'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'AUSREP member'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'JASREP member'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'MAREP member'} value={props.vesselId} />
			</List>

			<Divider orientation='vertical' flexItem />

			<List>
				<VesselDetailsInfoItem label={'Voyage Number'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Creator'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Created at'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Departure Port'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Speed Made Good'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Terminator'} value={props.vesselId} />
			</List>

			<Divider flexItem />

			<Grid
				container direction="row"
				justifyContent="space-between"
				alignItems='center'
				sx={{
					paddingTop: '20px'
				}}
			>
				<Box
					component="img"
					alt="Vessel image"
					sx={{
						width: '49%'
					}}
					src={VesselImage}
				/>

				<Divider orientation='vertical' flexItem />

				<Box
					component="img"
					alt="Vessel Voyage image"
					sx={{
						width: '49%'
					}}
					src={VesselVoyageImage}
				/>
			</Grid>
		</Grid>
	);
}
