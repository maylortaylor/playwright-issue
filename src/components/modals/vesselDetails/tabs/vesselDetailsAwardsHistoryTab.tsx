import { Button, Divider, Grid, List, Stack, Typography } from "@mui/material";

import { MilitaryTech } from "@mui/icons-material";
import React from "react";
import { VesselDetailsInfoItem } from "../vesselDetailsInfoItem";

interface VesselDetailsAwardsHistoryTabProps {
	vesselId: string;
}
export function VesselDetailsAwardsHistoryTab(props: VesselDetailsAwardsHistoryTabProps) {
  return (
		<Grid
			id="vessel-details-awards-history-tab"
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

				<VesselDetailsInfoItem label={'Last Year Awards'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Consecutive Awards (pre-1991)'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Total Awards (pre-1991)'} value={props.vesselId} />
				<VesselDetailsInfoItem label={'Total Awards'} value={props.vesselId} />

				<Stack
					direction='row'
					justifyContent='flex-end'
					sx={{
						paddingTop: '20px'
					}}
				>
					<Button
						startIcon={<MilitaryTech />}
						variant="contained"
						color="primary"
						aria-label="Go To Awards"
					>
						Go to Awards
					</Button>
				</Stack>

			</List>

		</Grid>
	);
}
