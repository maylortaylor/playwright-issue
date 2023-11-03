import '../reportDetailsModal.scss';

import { Box, Container, Divider, Stack, Typography } from '@mui/material';

import CopyToClipboardChipText from '../../../common/copyToClipboardChipText/copyToClipboardChipText';
import React from 'react';
import moment from 'moment';

interface PositionReportAuditLogItemProps {
	auditLogItem: any;
}

export default function PositionReportAuditLogItem(
	props: PositionReportAuditLogItemProps,
) {
	return (
		<Container
			id="audit-log-item"
			data-test-id={`audit-log-item-${props.auditLogItem.timestamp}`}
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
				<Typography
					variant="body1"
					fontWeight="bold"
					sx={{
						margin: '5px 0px 5px 0px',
					}}
				>
					{moment(props.auditLogItem.timestamp)
						.utc()
						.format('MMMM DD, y, HH:mm:ss')}
				</Typography>

				<Box sx={{ display: 'flex', gap: '0.5rem' }}>
					<Typography
						variant="body1"
						fontWeight="bold"
						sx={{
							paddingLeft: '5px',
						}}
					>
						User:
					</Typography>

					<Typography
						variant="body1"
						sx={{
							paddingLeft: '5px',
						}}
					>
						{props.auditLogItem.user}
					</Typography>
				</Box>
			</Stack>

			<Typography variant="body1">{props.auditLogItem.body}</Typography>

			<Divider
				sx={{
					borderBottomWidth: '0.15rem',
					margin: '10px 0px 10px 0px',
				}}
			/>
		</Container>
	);
}
