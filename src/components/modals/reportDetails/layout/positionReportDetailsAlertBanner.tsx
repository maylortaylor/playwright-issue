import { Delete, MarkUnreadChatAlt, QuestionMark } from '@mui/icons-material'

import { Alert } from '@mui/material'
import React from 'react'
import { ReportMessageStatus } from '../../../../types/enums/reportMessageStatus'

interface PositionReportDetailsAlertBannerProps {
	status: number;
}
export default function PositionReportDetailsAlertBanner(props: PositionReportDetailsAlertBannerProps) {
	return (
		<>
		{
			{
				0: // UNKNOWN
				<>
					<Alert severity="info" variant="filled"
						iconMapping={{
							info: <QuestionMark />
						}}>
						{ReportMessageStatus[props.status]} ({props.status}) - See Issues Tab
					</Alert>
				</>,
			1: // UNREAD
				<>
					<Alert severity="info" variant="filled"
						iconMapping={{
							info: <MarkUnreadChatAlt />
						}}>
						{ReportMessageStatus[props.status]} ({props.status}) - See Issues Tab
					</Alert>
				</>,
			2: //  OK
				<>
					<Alert severity="success" variant="filled">
						{ReportMessageStatus[props.status]} ({props.status}) - See Issues Tab
					</Alert>
				</>,
			3: // INTERVENTION_REQUIRED
				<>
					<Alert severity="warning" variant="filled">
						{ReportMessageStatus[props.status]} ({props.status}) - See Issues Tab
					</Alert>
				</>,
			4: // INTERVENTION_FAILED
				<>
					<Alert severity="error" variant="filled">
						{ReportMessageStatus[props.status]} ({props.status}) - See Issues Tab
					</Alert>
				</>,
			5: // ALERT
				<>
					<Alert severity="error" variant="filled">
						{ReportMessageStatus[props.status]} ({props.status}) - See Issues Tab
					</Alert>
				</>,
			6: // DELETED
				<>
					<Alert severity="info" variant="filled"
						iconMapping={{
							info: <Delete />
						}}>
						{ReportMessageStatus[props.status]} ({props.status}) - See Issues Tab
					</Alert>
				</>,
			}[props.status]
		}
		</>
	)
}
