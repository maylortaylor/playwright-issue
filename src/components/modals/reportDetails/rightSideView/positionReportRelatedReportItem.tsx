import '../reportDetailsModal.scss';

import { Box, Container, Divider, Stack, Typography } from '@mui/material';

import CopyToClipboardChipText from '../../../common/copyToClipboardChipText/copyToClipboardChipText';
import HyperLinkText from '../../../common/hyperlink/hyperLinkText';
import React from 'react';
import moment from 'moment';

interface PositionReportReplatedReportsItemProps {
	relatedReportItem: any;
}

export default function PositionReportReplatedReportsItem(
	props: PositionReportReplatedReportsItemProps,
) {
	return (
		<Container
			id="related-report-item"
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
				<HyperLinkText id={`related-report-item-${props.relatedReportItem.title}`} text={props.relatedReportItem.title} hrefUrl="/amver-ui/messages/" />

				<Typography
					variant="body1"
					fontWeight="bold"
					sx={{
						margin: '5px 0px 5px 0px',
					}}
				>
					{moment(props.relatedReportItem.timestamp)
						.utc()
						.format('MMMM DD, y, HH:mm:ss')}
				</Typography>

				<Box sx={{ display: 'flex', gap: '0.5rem' }}>
					<Typography variant="body1" fontWeight="bold">
						PrimeID:
					</Typography>

					<CopyToClipboardChipText
						text={props.relatedReportItem.primeId}
						chipVariant="outlined"
						chipSize="small"
					/>
				</Box>
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
