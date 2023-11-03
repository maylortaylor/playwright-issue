import {
	Alert,
	Dialog,
	Divider,
	IconButton,
	Slide,
	Stack,
	Typography,
} from '@mui/material';
import {
	Close,
	Delete,
	MarkUnreadChatAlt,
	QuestionMark,
} from '@mui/icons-material';
import React, { ReactElement, Ref, forwardRef, useMemo } from 'react';
import { currentReportDetailsAtom, currentReportIdAtom, modalStatusAtom } from '../../../store';

import DevCode from '../../../../src/components/common/devCode/devCode';
import Grid from '@mui/material/Unstable_Grid2';
import PositionReportDetailsAlertBanner from './layout/positionReportDetailsAlertBanner';
import PositionReportDetailsHeader from './layout/positionReportDetailsHeader';
import PositionReportModalButtons from './layout/positionReportDetailsModalButtons';
import ReportDetailsRightSide from './layout/positionReportDetailsRightSidePane';
import ReportHelpText from './layout/reportHelpText';
import { ReportMessageStatus } from '../../../types/enums/reportMessageStatus';
import RichTextEditor from './layout/richTextEditor';
import { TransitionProps } from '@mui/material/transitions';
import _ from 'lodash';
import { appDimensions } from '../../../theme';
import { useAtom } from 'jotai';

interface ReportDetailsModalProps {
	open: boolean;
	close: () => void;
}

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: ReactElement<any, any>;
	},
	ref: Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function ReportDetailsModal(props: ReportDetailsModalProps) {
	const [modalStatus, setModalStatus] = useAtom(
		modalStatusAtom,
	);
	const [currentReportDetails, setCurrentReportDetails] = useAtom(
		currentReportDetailsAtom,
	);

	return (
		<Dialog
			id="report-details-modal"
			sx={{
				top: `${appDimensions.topNavigationHeight}px !important`,
			}}
			fullScreen
			open={modalStatus.reportDetailsModalOpen}
			onClose={props.close}
			TransitionComponent={Transition}
		>
			{/* // * Modal Title and Close Button */}
			<Grid
				container
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				sx={{
					padding: '20px',
				}}
			>
				<Stack>
					<Typography variant="h6">
						Report Details
					</Typography>
					<DevCode itemToDisplay={currentReportDetails} />
				</Stack>
				<Grid>
					<IconButton
						edge="start"
						color="inherit"
						onClick={props.close}
						aria-label="close"
					>
						<Close />
					</IconButton>
				</Grid>
			</Grid>

			<Divider sx={{ marginBottom: '10px' }} />

			<Stack
				justifyContent="space-between"
				sx={{
					minHeight: '90%',
					padding: '10px',
				}}
			>
				{/* // * Content Area  */}
				<Grid
					container
					direction="row"
					spacing={2}
					justifyContent="space-between"
					sx={{
						paddingBottom: '20px',
					}}
				>
					<Grid xs={8}>
						{/* // * Alert Status */}
						<PositionReportDetailsAlertBanner status={currentReportDetails.status} />

						{/* // * Position Report details */}
						<PositionReportDetailsHeader
							title={currentReportDetails.reportType}
							date={currentReportDetails.dateReceived}
							primeId={currentReportDetails.messageId}
						/>

						{/* // * Main Content Area */}
						<Grid container columns={{ sm: 8, md: 12 }} sx={{ height: '80%' }}>
							<Grid sm={6} md={8}>
								<RichTextEditor key={'rich-text-editor'} messageBody={currentReportDetails.originalMessage!} />
							</Grid>
							<Grid sm={6} md={4}>
								<ReportHelpText key={'report-help-text'} />
							</Grid>
						</Grid>
					</Grid>

					{/* // * Right Side Content */}
					<ReportDetailsRightSide reportDetails={currentReportDetails} />
				</Grid>

				{/* // * Bottom Action Buttons */}
				<PositionReportModalButtons />
			</Stack>
		</Dialog>
	);
}
