import { Box, Container, Divider, Tab, Tabs, Typography } from '@mui/material';
import {
	DirectionsBoat,
	FileOpen,
	WarningAmber,
	WorkHistory,
} from '@mui/icons-material';
import React, { SyntheticEvent, useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import PositionReportAuditLogItem from '../rightSideView/positionReportAuditLogItem';
import PositionReportIssueItem from '../rightSideView/positionReportIssueItem';
import PositionReportIssuesPanel from '../rightSideView/positionReportIssuesPanel';
import PositionReportReplatedReportsItem from '../rightSideView/positionReportRelatedReportItem';
import PositionReportVesselMatch from '../rightSideView/positionReportVesselMatchItem';
import { ReportMessageDetails } from '../../../../types/apis/reportDetails'
import TabPanel from '../../../common/tabs/tabPanel';
import tabProps from '../../../../utils/tabUtils';
import { z } from 'zod';

const vesselMatches: Array<any> = [
	{
		vesselName: 'William',
		mmsiNumber: 877728,
		imoNumber: 3750,
		type: 'Crude Oil Tanker',
		flag: 'Australia',
	},
	{
		vesselName: 'Mathews',
		mmsiNumber: 737273,
		imoNumber: 3852,
		type: 'Fishing Boat',
		flag: 'Australia',
	},
	{
		vesselName: 'Stanton',
		mmsiNumber: 555211,
		imoNumber: 7223,
		type: 'Crude Oil Tanker',
		flag: 'China',
	},
	{
		vesselName: 'Ward',
		mmsiNumber: 714251,
		imoNumber: 8378,
		type: 'Cruise Liner',
		flag: 'Panama',
	},
	{
		vesselName: 'Ortega',
		mmsiNumber: 853875,
		imoNumber: 6727,
		type: 'Crude Oil Tanker',
		flag: 'Australia',
	},
	{
		vesselName: 'Beck',
		mmsiNumber: 682288,
		imoNumber: 9795,
		type: 'Fishing Boat',
		flag: 'China',
	},
	{
		vesselName: 'Burgess',
		mmsiNumber: 112055,
		imoNumber: 2109,
		type: 'Crude Oil Tanker',
		flag: 'UK',
	},
	{
		vesselName: 'Wolf',
		mmsiNumber: 987892,
		imoNumber: 4976,
		type: 'Crude Oil Tanker',
		flag: 'Panama',
	},
	{
		vesselName: 'Greene',
		mmsiNumber: 967156,
		imoNumber: 6968,
		type: 'Cruise Liner',
		flag: 'Australia',
	},
	{
		vesselName: 'Townsend',
		mmsiNumber: 228086,
		imoNumber: 8891,
		type: 'Fishing Boat',
		flag: 'USA',
	},
	{
		vesselName: 'Briggs',
		mmsiNumber: 606462,
		imoNumber: 2106,
		type: 'Fishing Boat',
		flag: 'Panama',
	},
	{
		vesselName: 'Reese',
		mmsiNumber: 193023,
		imoNumber: 4303,
		type: 'Fishing Boat',
		flag: 'China',
	},
	{
		vesselName: 'Carlson',
		mmsiNumber: 993514,
		imoNumber: 8951,
		type: 'Fishing Boat',
		flag: 'USA',
	},
	{
		vesselName: 'Rivers',
		mmsiNumber: 283922,
		imoNumber: 4187,
		type: 'Cruise Liner',
		flag: 'China',
	},
];

const auditLog: Array<any> = [
	{
		timestamp: 1667384857000,
		user: 'John Doe',
		body: 'AMVER/PR//\\nA/9628199//\\nK/LOS ANGELES/3343N/12074W/ 032200Z//\\n,',
	},
	{
		timestamp: 1667384857000,
		user: 'John Doe',
		body: 'AMVER/PR//\\nA/9628199//\\nK/LOS ANGELES/3343N/12074W/ 032200Z//\\n,',
	},
	{
		timestamp: 1667384857000,
		user: 'John Doe',
		body: 'AMVER/PR//\\nA/9628199//\\nK/LOS ANGELES/3343N/12074W/ 032200Z//\\n,',
	},
	{
		timestamp: 1667384857000,
		user: 'John Doe',
		body: 'AMVER/PR//\\nA/9628199//\\nK/LOS ANGELES/3343N/12074W/ 032200Z//\\n,',
	},
	{
		timestamp: 1667384857000,
		user: 'John Doe',
		body: 'AMVER/PR//\\nA/9628199//\\nK/LOS ANGELES/3343N/12074W/ 032200Z//\\n,',
	},
	{
		timestamp: 1667384857000,
		user: 'John Doe',
		body: 'AMVER/PR//\\nA/9628199//\\nK/LOS ANGELES/3343N/12074W/ 032200Z//\\n,',
	},
	{
		timestamp: 1667384857000,
		user: 'John Doe',
		body: 'AMVER/PR//\\nA/9628199//\\nK/LOS ANGELES/3343N/12074W/ 032200Z//\\n,',
	},
	{
		timestamp: 1667384857000,
		user: 'John Doe',
		body: 'AMVER/PR//\\nA/9628199//\\nK/LOS ANGELES/3343N/12074W/ 032200Z//\\n,',
	},
	{
		timestamp: 1667384857000,
		user: 'John Doe',
		body: 'AMVER/PR//\\nA/9628199//\\nK/LOS ANGELES/3343N/12074W/ 032200Z//\\n,',
	},
	{
		timestamp: 1667384857000,
		user: 'John Doe',
		body: 'AMVER/PR//\\nA/9628199//\\nK/LOS ANGELES/3343N/12074W/ 032200Z//\\n,',
	},
	{
		timestamp: 1667384857000,
		user: 'John Doe',
		body: 'AMVER/PR//\\nA/9628199//\\nK/LOS ANGELES/3343N/12074W/ 032200Z//\\n,',
	},
];

const relatedReports: Array<any> = [
	{
		timestamp: 1667384857000,
		title: 'Sail Plan',
		primeId: '123-456-789',
	},
	{
		timestamp: 1667384857000,
		title: 'Sail Plan',
		primeId: '123-456-789',
	},
	{
		timestamp: 1667384857000,
		title: 'Sail Plan',
		primeId: '123-456-789',
	},
	{
		timestamp: 1667384857000,
		title: 'Sail Plan',
		primeId: '123-456-789',
	},
	{
		timestamp: 1667384857000,
		title: 'Sail Plan',
		primeId: '123-456-789',
	},
	{
		timestamp: 1667384857000,
		title: 'Sail Plan',
		primeId: '123-456-789',
	},
	{
		timestamp: 1667384857000,
		title: 'Sail Plan',
		primeId: '123-456-789',
	},
	{
		timestamp: 1667384857000,
		title: 'Sail Plan',
		primeId: '123-456-789',
	},
	{
		timestamp: 1667384857000,
		title: 'Sail Plan',
		primeId: '123-456-789',
	},
	{
		timestamp: 1667384857000,
		title: 'Sail Plan',
		primeId: '123-456-789',
	},
];

interface ReportDetailsRightSidePaneProps {
	reportDetails: ReportMessageDetails;
}

export default function ReportDetailsRightSide(props: ReportDetailsRightSidePaneProps) {
	const [value, setValue] = useState(0);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Grid id="report-details-right-side-pane" xs={4}>
			<Tabs
				value={value}
				onChange={handleChange}
				textColor="secondary"
				variant="fullWidth"
				indicatorColor="secondary"
				aria-label="table tabs"
				scrollButtons
				allowScrollButtonsMobile
			>
				<Tab
					icon={<WarningAmber />}
					label="Issues"
					aria-label="Report Issues"
					wrapped
					{...tabProps(0)}
				/>
				<Tab
					icon={<DirectionsBoat />}
					label="Vessel Matches"
					aria-label="Vessel Matches"
					wrapped
					{...tabProps(1)}
				/>
				<Tab
					icon={<FileOpen />}
					label="Related Reports"
					aria-label="Related Reports"
					wrapped
					{...tabProps(2)}
				/>
				<Tab
					icon={<WorkHistory />}
					label="Audit Log"
					aria-label="Audit Log"
					wrapped
					{...tabProps(3)}
				/>
			</Tabs>

			{/* // * Issues */}
			<PositionReportIssuesPanel
				value={value}
				reportDetails={props.reportDetails}
			/>

			{/* // * Vessel Matches */}
			<TabPanel index={1} value={value}>
				<Divider
					sx={{
						borderBottomWidth: '0.15rem',
					}}
				/>
				<Container
					id="position-report-details-vessel-matches"
					disableGutters
					sx={{
						overflow: 'hidden',
						overflowY: 'scroll',
						height: '60vh',
					}}
				>
					{vesselMatches.map((vesselMatch, index) => (
						<PositionReportVesselMatch key={index} vesselMatch={vesselMatch} />
					))}
				</Container>
			</TabPanel>

			{/* // * Related Reports */}
			<TabPanel index={2} value={value}>
				<Divider
					sx={{
						borderBottomWidth: '0.15rem',
					}}
				/>
				<Container
					id="position-report-details-related-reports"
					disableGutters
					sx={{
						overflow: 'hidden',
						overflowY: 'scroll',
						height: '60vh',
					}}
				>
					{relatedReports.map((relatedReport, index) => (
						<PositionReportReplatedReportsItem
							key={index}
							relatedReportItem={relatedReport}
						/>
					))}
				</Container>
			</TabPanel>

			{/* // * Audit Log */}
			<TabPanel index={3} value={value}>
				<Divider
					sx={{
						borderBottomWidth: '0.15rem',
					}}
				/>
				<Container
					id="position-report-details-audit-logs"
					disableGutters
					sx={{
						overflow: 'hidden',
						overflowY: 'scroll',
						height: '60vh',
					}}
				>
					{auditLog.map((logItem, index) => (
						<PositionReportAuditLogItem key={index} auditLogItem={logItem} />
					))}
				</Container>
			</TabPanel>
		</Grid>
	);
}
