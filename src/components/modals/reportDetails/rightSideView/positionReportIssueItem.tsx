import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from '@mui/material';

import { ExpandMore } from '@mui/icons-material';
import React from 'react';
import { ReportMessageDetails } from '../../../../types/apis/reportDetails';

interface PositionReportIssueItemProps {
	issueItem?: any;
	reportDetails: ReportMessageDetails;
}

export default function PositionReportIssueItem(props: PositionReportIssueItemProps) {
	const [expanded, setExpanded] = React.useState('missingLinesPanel');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
	return (
		<Container
			id="issue-item"
			disableGutters
			sx={{
				flexGrow: 1,
			}}
		>
			<Accordion expanded={expanded === 'missingLinesPanel'} onChange={handleChange('missingLinesPanel')}>
				<AccordionSummary
					expandIcon={<ExpandMore />}
				>
					<Typography
						variant="h5"
						fontWeight="bold"
					>
						Missing Lines
					</Typography>
				</AccordionSummary>
				<AccordionDetails>

						{props.reportDetails.missingLines?.map((lineItem, index) => (
							<Typography
								key={index}
								variant="body1"
								color="error"
								fontWeight="bold"
								>
								{lineItem}
							</Typography>
						))}

				</AccordionDetails>
			</Accordion>

			{/* <Typography
				variant="body1"
				color="error"
				fontWeight="bold"
				sx={{
					margin: '10px 0px 10px 0px',
				}}
			>
				{props.issueItem}
			</Typography> */}

			{/* <Divider
				sx={{
					borderBottomWidth: '0.15rem',
					margin: '10px 0px 10px 0px',
				}} /> */}
		</Container>
	);
}
