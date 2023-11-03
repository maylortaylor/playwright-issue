import '../reportDetailsModal.scss';

import {
	Backdrop,
	Box,
	Container,
	Divider,
	Menu,
	MenuItem,
	SpeedDial,
	SpeedDialAction,
	SpeedDialIcon,
	Stack,
	Typography,
	styled,
} from '@mui/material';
import { ContentCopy, FileCopy } from '@mui/icons-material';
import React, { useState } from 'react';

import CopyToClipboardChipText from '../../../common/copyToClipboardChipText/copyToClipboardChipText';

interface PositionReportVesselMatchProps {
	vesselMatch: any;
}

export default function PositionReportVesselMatch(
	props: PositionReportVesselMatchProps,
) {
	return (
		<Container
			id="vessel-match-item"
			data-test-id={`vessel-match-item-${props.vesselMatch.vesselName}`}
			disableGutters
			sx={{
				flexGrow: 1,
			}}
		>
			<Stack
				spacing={2}
				sx={{
					margin: '10px 0px 10px 0px',
				}}
			>
				<Box
					sx={{ display: 'flex', gap: '0.5rem' }}
					justifyContent="space-between"
				>
					<CopyToClipboardChipText
						text={props.vesselMatch.vesselName}
						chipVariant="outlined"
						chipSize="medium"
					/>
				</Box>

				<Stack direction="row">
					<Box sx={{ display: 'flex', gap: '0.5rem' }}>
						<Typography variant="body1" fontWeight="bold">
							IMO:
						</Typography>

						<CopyToClipboardChipText
							text={props.vesselMatch.imoNumber}
							chipVariant="outlined"
							chipSize="small"
						/>

						<Divider orientation="vertical" flexItem />
					</Box>

					<Box sx={{ display: 'flex', gap: '0.5rem' }}>
						<Typography
							variant="body1"
							fontWeight="bold"
							sx={{
								paddingLeft: '5px',
							}}
						>
							MMSI:
						</Typography>

						<CopyToClipboardChipText
							text={props.vesselMatch.mmsiNumber}
							chipVariant="outlined"
							chipSize="small"
						/>
					</Box>
				</Stack>

				<Stack direction="row">
					<Box sx={{ display: 'flex', gap: '0.5rem' }}>
						<Typography variant="body1" fontWeight="bold">
							Flag:
						</Typography>

						<CopyToClipboardChipText
							text={props.vesselMatch.flag}
							chipVariant="outlined"
							chipSize="small"
						/>

						<Divider orientation="vertical" flexItem />
					</Box>

					<Box sx={{ display: 'flex', gap: '0.5rem' }}>
						<Typography
							variant="body1"
							fontWeight="bold"
							sx={{
								paddingLeft: '5px',
							}}
						>
							Type:
						</Typography>

						<CopyToClipboardChipText
							text={props.vesselMatch.type}
							chipVariant="outlined"
							chipSize="small"
						/>
					</Box>
				</Stack>
			</Stack>

			<Divider
				sx={{
					borderBottomWidth: '0.15rem',
					margin: '10px 0px 10px 0px',
				}}
			/>
		</Container>
	);
}
