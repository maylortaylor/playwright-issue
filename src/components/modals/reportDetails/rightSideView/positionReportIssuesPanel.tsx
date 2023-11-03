import { Container, Divider, Typography } from '@mui/material';

import PositionReportIssueItem from './positionReportIssueItem';
import PositionReportKeywordItem from './positionReportKeywordItem';
import React from 'react';
import { ReportMessageDetails } from '../../../../types/apis/reportDetails';
import TabPanel from '../../../../components/common/tabs/tabPanel';
import _ from 'lodash';

interface PositionReportIssueItemProps {
	value: number;
	reportDetails: ReportMessageDetails;
}

export default function PositionReportIssuesPanel(props: PositionReportIssueItemProps) {
	return (
		<TabPanel index={0} value={props.value}>
			<Divider
				sx={{
					borderBottomWidth: '0.15rem',
				}}
			/>
			<Container
				id="position-report-details-issue-items"
				disableGutters
				sx={{
					overflow: 'hidden',
					overflowY: 'scroll',
					height: '60vh',
				}}
			>
				{
					(_.isEmpty(props.reportDetails.missingLines) && _.isEmpty(props.reportDetails.keywords)) &&
					<Typography
						variant="h5"
						fontWeight="bold"
					>
						None
					</Typography>
				}
				{
					props.reportDetails.missingLines!.length > 0 ?
						<PositionReportIssueItem reportDetails={props.reportDetails} /> :
						null
				}
				{
					props.reportDetails.keywords!.length > 0 ?
						<PositionReportKeywordItem reportDetails={props.reportDetails} /> :
						null
				}
			</Container>
		</TabPanel>
	);
}
