import { Divider, Grid, List, Stack, Typography } from "@mui/material";

import React from "react";
import { VesselDetailsInfoItem } from "../vesselDetailsInfoItem";

interface VesselDetailsVesselDataTabProps {
	vesselId: string;
}
export function VesselDetailsVesselDataTab(props: VesselDetailsVesselDataTabProps) {
  return (
		<Grid
			id="vessel-details-vessel-data-tab"
			container
			direction="row"
			justifyContent="space-evenly"
		>
			<List
				sx={{
					height: '70vh',
					overflow: 'auto',
				}}
			>
				<Typography variant='h5' fontWeight='bold'>
					IHS Fairplay Vessel Information
				</Typography>
				<VesselDetailsInfoItem label={'Vessel Name'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Call Sign'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'IMO Number'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Official Number'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'MMSI'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Flag'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Port of Registry'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Satellite Number'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Answerback'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Gross Tonnage'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Deadweight Tonnage'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Built Date'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Length'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Breadth'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Draught'} value={props.vesselId} />

				<VesselDetailsInfoItem label={'Vessel Name'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Call Sign'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'IMO Number'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Official Number'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'MMSI'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Flag'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Port of Registry'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Satellite Number'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Answerback'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Gross Tonnage'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Deadweight Tonnage'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Built Date'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Length'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Breadth'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Draught'} value={props.vesselId} />

				<VesselDetailsInfoItem label={'Vessel Name'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Call Sign'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'IMO Number'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Official Number'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'MMSI'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Flag'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Port of Registry'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Satellite Number'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Answerback'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Gross Tonnage'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Deadweight Tonnage'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Built Date'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Length'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Breadth'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Draught'} value={props.vesselId} />
			</List>

			<Divider orientation='vertical' flexItem />

			<List
				sx={{
					height: '70vh',
					overflow: 'auto',
				}}
			>
				<Typography variant='h5' fontWeight='bold'>
					IHS Fairplay Special Features
				</Typography>
				<VesselDetailsInfoItem label={'Feature Number'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Feature Number'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Feature Number'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Feature Number'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Feature Number'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Feature Number'} value={props.vesselId} />
			</List>

		</Grid>
	);
}
