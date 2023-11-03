import {
	AccountBox,
	Close,
	Comment,
	DirectionsBoat,
	FileOpen,
	Info,
	MilitaryTech,
} from '@mui/icons-material';
import {
	Box,
	Chip,
	Dialog,
	Divider,
	IconButton,
	Slide,
	Stack,
	Tab,
	Tabs,
	Typography,
} from '@mui/material';
import React, { ReactElement, Ref, SyntheticEvent, forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { appColorPalette, appDimensions } from '../../../theme';
import {appLoadingAtom, currentVesselDetailsAtom, currentVesselIdAtom, modalStatusAtom} from '../../../store';

import Grid from '@mui/material/Unstable_Grid2';
import { MessageApiResponse } from '../../../types/apis/axiosResponse';
import TabPanel from '../../../../src/components/common/tabs/tabPanel';
import { TransitionProps } from '@mui/material/transitions';
import { VesselDetailsAwardsHistoryTab } from './tabs/vesselDetailsAwardsHistoryTab';
import { VesselDetailsCommentsTab } from './tabs/vesselDetailsCommentsTab';
import { VesselDetailsGeneralInfoTab } from './tabs/vesselDetailsGeneralInfoTab';
import { VesselDetailsOwnershipTab } from './tabs/vesselDetailsOwnershipTab';
import { VesselDetailsReportsHistoryTab } from "./tabs/vesselDetailsReportHistoryTab";
import { VesselDetailsVesselDataTab } from './tabs/vesselDetailsVesselDataTab';
import axios from 'axios';
import moment from 'moment';
import tabProps from '../../../../src/utils/tabUtils';
import { useAtom } from 'jotai';
import { z } from 'zod';

interface VesselDetailsModalProps {
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

export default function VesselDetailsModal(props: VesselDetailsModalProps) {
	const API_URL = `${process.env.REACT_APP_AWS_DEV_URL_MESSAGES_API}/${process.env.API_VERSION}/message`;
	const [isAppLoading, setIsAppLoading] = useAtom(appLoadingAtom);
	const [modalStatus, setModalStatus] = useAtom(
		modalStatusAtom,
	);
	const [value, setValue] = useState(0);
	const [currentVesselDetails] = useAtom(
		currentVesselDetailsAtom,
	);
	const [currentVesselId, setCurrentVesselId] = useAtom(
		currentVesselIdAtom,
	);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const getData = useCallback(() => {
		setIsAppLoading(true);
		const apiOptions = {
			method: 'GET',
			url: `${API_URL}?vessel_id=${currentVesselId}`,
			headers: {
				'Access-Control-Allow-Credentials': true,
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET',
				'Access-Control-Allow-Headers': 'application/json',
			},
		};
		try {
			const response = axios.request<MessageApiResponse>(apiOptions);
			console.log("🚀 ~ file: vesselDetailsModal.tsx:69 ~ getData ~ response:", response)
			// reportDetails = new ReportDetails(
			// 	response.data.messageId,
			// );
			setIsAppLoading(false);
		} catch (error) {
			console.log(error);
			setIsAppLoading(false);
		}
	}, [props.open]);

// 	useEffect(() => {
// 		getData();
// }, [getData]);

	// useEffect(() => { getData(); }, [currentReportDetails.open]);

	return (
		<Dialog
			id="vessel-details-modal"
			sx={{
				top: `${appDimensions.topNavigationHeight}px !important`,
				'& .MuiPaper-root': {
					overflowY: 'hidden',
				}
			}}
			fullScreen
			open={modalStatus.vesselDetailsModalOpen}
			onClose={props.close}
			TransitionComponent={Transition}
		>
			{/* // * Modal Title and Close Button */}
			<Grid
				container
				spacing={0}
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				sx={{
					padding: '20px 20px 0px 20px',
				}}
			>
				<Grid spacing={0}>
					<Stack
						spacing={2}
						sx={{
							padding: '0px'
						}}
					>
						<Stack direction='row' spacing={2} alignItems='center'>
							<Typography variant="h6" color="text.secondary">
								{currentVesselId}
							</Typography>
							<Chip
								label={'AMVER'}
								color='success'
								size='small'
								sx={{
									color: appColorPalette.white
								}}
							/>
							<Typography variant="caption" color="text.secondary">
								Participant since 2019
							</Typography>
						</Stack>
						<Typography variant="body1" color="text.secondary">
								Last report received at:{' '}
								<Box component="span" fontWeight="bold">
									{moment(new Date()).utc().format()}
								</Box>
						</Typography>
					</Stack>
				</Grid>
				<Grid>
					<Stack spacing={2} alignItems='flex-end'>
						<IconButton
								edge="start"
								color="inherit"
								onClick={props.close}
								aria-label="close"
							>
								<Close />
						</IconButton>
						<Stack direction='row' spacing={2} alignItems='center'>
							<Typography variant="body1" color="text.secondary">
									<Box component="span" fontWeight="bold">
										Destination: Rotterdam, Netherlands (NLRTM)
									</Box> {' '}
									{moment(new Date()).utc().format()}
							</Typography>

							<Divider orientation='vertical' flexItem />

							<Typography
								variant='h6'
								sx={{
									color: appColorPalette.green
								}}
								fontWeight='bold'
							>
								On Plot
							</Typography>
						</Stack>
					</Stack>
				</Grid>
			</Grid>

			<Stack
				spacing={0}
				sx={{
					minHeight: '90%',
					padding: '10px',
				}}
			>
				<Tabs
					value={value}
					onChange={handleChange}
					textColor="secondary"
					// variant="fullWidth"
					indicatorColor="secondary"
					aria-label="Vessel Details tabs"
				>
					<Tab
						icon={<Info />}
						label="General Info"
						aria-label="General Info"
						wrapped
						{...tabProps(0)}
					/>
					<Tab
						icon={<DirectionsBoat />}
						label="Vessel Data"
						aria-label="Vessel Data"
						wrapped
						{...tabProps(1)}
					/>
					<Tab
						icon={<AccountBox />}
						label="Ownership"
						aria-label="Ownership"
						wrapped
						{...tabProps(2)}
					/>
					<Tab
						icon={<FileOpen />}
						label="Report History"
						aria-label="Report History"
						wrapped
						{...tabProps(3)}
					/>
					<Tab
						icon={<MilitaryTech />}
						label="Awards History"
						aria-label="Awards History"
						wrapped
						{...tabProps(3)}
					/>
					<Tab
						icon={<Comment />}
						label="Comments"
						aria-label="Comments"
						wrapped
						{...tabProps(4)}
					/>
				</Tabs>

				<Divider flexItem/>

				{/* // * General Info */}
				<TabPanel index={0} value={value}>
					<VesselDetailsGeneralInfoTab vesselId={currentVesselId}  />
				</TabPanel>

				{/* // * Vessel Data */}
				<TabPanel index={1} value={value}>
					<VesselDetailsVesselDataTab vesselId={'data'}  />
				</TabPanel>

				{/* // * Ownership */}
				<TabPanel index={2} value={value}>
					<VesselDetailsOwnershipTab vesselId={'ownership'}  />
				</TabPanel>

				{/* // * Report History */}
				<TabPanel index={3} value={value}>
					<VesselDetailsReportsHistoryTab vesselId={'report'}  />
				</TabPanel>

				{/* // * Awards History */}
				<TabPanel index={4} value={value}>
					<VesselDetailsAwardsHistoryTab vesselId={'awards'}  />
				</TabPanel>

				{/* // * Comments */}
				<TabPanel index={5} value={value}>
					<VesselDetailsCommentsTab vesselId={'comments'}  />
				</TabPanel>
			</Stack>
		</Dialog>
	);
}
