import { ListItem, Typography } from "@mui/material";

import React from "react";

interface VesselDetailsInfoItemProps {
	label: string;
	value: string;
}
export function VesselDetailsInfoItem(props: VesselDetailsInfoItemProps) {
  return (
		<ListItem
			disableGutters
			sx={{
				justifyContent: 'space-between'
			}}
		>
			<Typography variant='body1' fontWeight='bold'>
				{props.label}:
			</Typography>
			<Typography variant='body1'>
				{props.value}
			</Typography>
		</ListItem>
	)
}
