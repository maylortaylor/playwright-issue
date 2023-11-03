import { Box, Typography } from '@mui/material';

import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import moment from 'moment';

interface PositionReportDetailsHeaderProps {
	title: string;
	date: string;
	primeId: string;
}

export default function PositionReportDetailsHeader(
	props: PositionReportDetailsHeaderProps,
) {
	return (
		<Box
			id="position-report-details-header"
			sx={(theme) => ({
				backgroundColor: theme.palette.primary.contrastText,
				margin: '10px 0px 10px 0px',
				padding: '5px',
			})}
		>
			<Grid container direction="row" justifyContent="space-between">
				<Grid xs={6}>
					<Typography variant="h6" color="text.secondary">
						{props.title}
					</Typography>
				</Grid>
				<Grid xs={6}>
					<Typography
						sx={{ textAlign: 'right' }}
						variant="subtitle1"
						color="text.secondary"
					>
						<Box component="span" fontWeight="bold">
							Recieved:
						</Box>{' '}
						{moment(props.date).utc().format('MMM/DD/YYYY HH:mm:ss')}
					</Typography>
				</Grid>
				<Grid xs={12}>
					<Typography variant="caption" color="text.secondary">
						<Box component="span" fontWeight="bold">
							PrimeId:
						</Box>{' '}
						{props.primeId}
					</Typography>
				</Grid>
			</Grid>
		</Box>
	);
}
