import {
	ArrowForward,
	Delete,
	Email,
	FileDownload,
	Print,
	Restore,
} from '@mui/icons-material';
import { Button, Stack } from '@mui/material';

import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';

export default function PositionReportDetailsModalButtons() {
	return (
		<Grid
			id="position-report-details-action-buttons"
			container
			direction="row"
			justifyContent="space-between"
			sx={{
				paddingBottom: '20px',
			}}
		>
			<Stack spacing={2} direction="row">
				<Button
					startIcon={<Print />}
					variant="contained"
					aria-label="print"
				>
					Print
				</Button>
				<Button startIcon={<Email />} variant="contained" aria-label="email">
					Email
				</Button>
				<Button
					startIcon={<FileDownload />}
					variant="contained"
					aria-label="export"
				>
					Export
				</Button>
			</Stack>
			<Stack spacing={2} direction="row">
				<Button
					startIcon={<Restore />}
					variant="contained"
					color="warning"
					aria-label="revert"
				>
					Revert To Original
				</Button>
				<Button
					startIcon={<Delete />}
					variant="contained"
					color="error"
					aria-label="delete"
				>
					Delete
				</Button>
			</Stack>
			<Stack spacing={2} direction="row">
				<Button variant="outlined" aria-label="cancel">
					Cancel
				</Button>
				<Button
					startIcon={<ArrowForward />}
					variant="contained"
					color="success"
					aria-label="next report"
				>
					Save Changes
				</Button>
			</Stack>
		</Grid>
	);
}
