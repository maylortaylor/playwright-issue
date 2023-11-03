import '../reportDetailsModal.scss';

import { Box, Divider, Typography } from '@mui/material';

import React from 'react';

const helpTextLines = [
	'AMVER/report type//',
	'A/vessel name/International Radio Call Sign//',
	'B/Time//',
	'C/latitude/longitude//',
	'E/current course//',
	'F/estimated average speed//',
	'G/port of departure/latitude/longitude/',
	'I/destination/latitude/longitude/estimated time of arrival//',
	'K/port of arrival/latitude/ longitude/time of arrival//',
	'---',
	'L/navigation method/leg speed/ latitude/longitude/port or landmark name/estimated time of arrival/estimated time of departure//',
	'---',
	'M/contact information//',
	'V/medical personnel aboard this voyage//',
	'X/remarks//',
	'Y/relay instructions//',
	'Z/end of report//',
];

interface ReportHelpTextProps {
	children?: React.ReactNode;
}

function ReportHelpText(props: ReportHelpTextProps) {
	const { children, ...other } = props;

	return (
		<div
			id="report-help-text"
			aria-label="report-help-text"
			className="report-help-text"
			{...other}
		>
			{helpTextLines.map((helpTextLine: string, index: number) =>
				helpTextLine !== '---' ? (
					<div key={index}>
						<Typography key={index} variant="caption">
							{helpTextLine}
						</Typography>
						<br key={`line-break-${index}`} />
					</div>
				) : (
					<div key={index}>
						<Divider
							key={index}
							sx={{
								margin: '10px 0px 10px 0px',
							}}
						/>
					</div>
				),
			)}
		</div>
	);
}

export default ReportHelpText;
