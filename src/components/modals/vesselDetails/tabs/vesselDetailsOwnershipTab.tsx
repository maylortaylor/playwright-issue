import { Divider, Grid, List, Typography } from "@mui/material";

import React from "react";
import { VesselDetailsInfoItem } from "../vesselDetailsInfoItem";

interface VesselDetailsOwnershipTabProps {
	vesselId: string;
}
export function VesselDetailsOwnershipTab(props: VesselDetailsOwnershipTabProps) {
  return (
		<Grid
			id="vessel-details-ownership-tab"
			container
			direction="row"
			justifyContent="space-evenly"
		>
			<List
				sx={{
					height: '70vh',
					overflow: 'auto',
					width: '100%',
				}}
			>
				<Typography variant='h5' fontWeight='bold'>
					IHS Fairplay Affiliation Information
				</Typography>
				<Typography variant='h6'>
					Owner
				</Typography>

				<Divider flexItem />

				<VesselDetailsInfoItem label={'Owner Name'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Effective Date'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Previous Owner Name'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Previous Owner Effective Date'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Address'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Web'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Email'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Fax'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Telex'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'True Nationality'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Registered Nationality'} value={props.vesselId} />

				<Typography variant='h6'>
					Group Beneficial Owner
				</Typography>

				<Divider flexItem />

				<VesselDetailsInfoItem label={'Owner Name'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Effective Date'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Previous Owner Name'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Previous Owner Effective Date'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Address'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Web'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Email'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Fax'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Telex'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'True Nationality'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Registered Nationality'} value={props.vesselId} />

			</List>

		</Grid>
	);
}
