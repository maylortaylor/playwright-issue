import { AssignmentLate, Clear, Dangerous, Delete, Done, Help, NotificationImportant, OpenInNew, Radar, Sailing, UTurnLeft, Warning } from "@mui/icons-material";
import {
	Box,
	Button,
	LinearProgress,
	Stack,
	Tab,
	Tabs,
	Typography,
} from '@mui/material';
import { DataGrid, GridActionsCellItem, GridCellParams, GridColDef, GridComparatorFn, GridFilterItem, GridRowParams, GridToolbar } from "@mui/x-data-grid"
import { MessageApiResponse, MessagesApiResponse } from '../../types/apis/axiosResponse';
import React, { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { appLoadingAtom, messageUtilityListAtom } from '../../store';

import { Add } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2';
import MessagesUtilityService from "../../services/messageUtility.api";
import PageContainerComponent from '../../layouts/pageContainer';
import { ReportMessageStatus } from '../../types/enums/reportMessageStatus';
import _ from 'lodash';
import { appColorPalette } from '../../theme';
import messageUtilityListPageTabsAtom from "../../../src/store/messageUtilityListPageTabsAtom";
import moment from "moment";
import { useAtom } from 'jotai';
import { useSearchParams } from 'react-router-dom';

export default function MessagesUtilityListPage() {
	const [tabValue, setTabValue] = useAtom(messageUtilityListPageTabsAtom);
	const [tableLoading, setTableLoading] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams({tab: ''});

	const tabSearchParam = searchParams.get("tab");
	const messageIdParam = searchParams.get("message_id");

	const handleTabChange = (event: SyntheticEvent, newValue: number) => {
		const tabNumber = newValue;
		let tabName = 'All';
		setTabValue(tabNumber);

		switch (tabNumber) {
			case 0:
				tabName = 'All'
				break;
			case 1:
				tabName = 'Attention'
				break;
			case 2:
				tabName = 'Rejected'
				break;
			case 3:
				tabName = 'Edited'
				break;
			case 4:
				tabName = 'Archived'
				break;
			case 5:
				tabName = 'Deleted'
				break;
			default:
				tabName = 'All'
				break;
		}

		setSearchParams(prev => {
			prev.set("tab", tabName);
			return prev;
		}, {replace: true});
	};
	const [messageUtilityList, setMessageUtilityList] = useAtom(
		messageUtilityListAtom,
	);
	const [currentReportId, setCurrentReportId] = useAtom(
		currentReportIdAtom,
	);
	const [isAppLoading, setIsAppLoading] = useAtom(appLoadingAtom);
	const [modalStatus, setModalStatus] = useAtom(
		modalStatusAtom,
	);
	const [currentReportDetails, setCurrentReportDetails] = useAtom(
		currentReportDetailsAtom,
	);

	const keywordComparator: GridComparatorFn<[]> = (v1, v2, param1, param2) => (v1.length - v2.length);

	const handleViewReportButtonClick = async (e: React.MouseEvent<HTMLButtonElement>, index) => {
		setCurrentReportId(index);
		await getReportDetails(index);
		setSearchParams(prev => {
			prev.set("message_id", index);
			return prev;
		}, {replace: true});

		setModalStatus({reportDetailsModalOpen: true, vesselDetailsModalOpen: false});
	}

	async function getReportDetails(currentReportId) {
		setIsAppLoading(true);
		await MessagesUtilityService.getReportDetailsData(currentReportId)
		.then((response: MessageApiResponse) => {
			setCurrentReportDetails(response);
			setIsAppLoading(false);
			return response;
		})
		.catch((e: Error) => {
			setIsAppLoading(false);
			console.log(e);
		});
	}


	const tableColumns: GridColDef[] = [
		{
			field: 'messageId',
			headerName: 'ID',
			type: 'string',
			filterable: false,
			hideable: false,
			sortable: false,
		},
		{
			field: 'actions',
			headerName: 'Actions',
			type: 'actions',
			filterable: false,
			hideable: false,
			sortable: false,
			flex: 1,
			getActions: (params: GridRowParams) => [
				<GridActionsCellItem
					key={params.id}
					id={`view-report-button-${params.id}`}
					icon={<OpenInNew color='secondary' />}
					onClick={(e) => handleViewReportButtonClick(e, params.id)}
					label='View Report'
				/>
			],
		},
		{
			field: 'status',
			headerName: 'Status',
			type: 'number',
			filterable: true,
			hideable: false,
			sortable: true,
			flex: 2.5,
			align: 'center',
			getApplyQuickFilterFn: (filterItem: GridFilterItem, column: GridColDef) => {
				if (!filterItem.field || !filterItem.value || !filterItem.operator) {
					return null;
				}

				return (params: GridCellParams): boolean => {
					return Number(params.value) >= Number(filterItem.value);
				}
			},
			renderCell: (params) => (
				<>
					{
						{
							0: // UNKNOWN
								<Stack display='flex'
									sx={{
										alignItems: 'center'
									}}
								>
									<Help color='error' />
									<Typography color='error' variant='subtitle2'>
										{ReportMessageStatus[params.value]} ({params.value})
									</Typography>
								</Stack>,
							1: // UNREAD
								<Stack display='flex'
									sx={{
										alignItems: 'center'
									}}
								>
									<NotificationImportant color='info' />
									<Typography color='info.dark' variant='subtitle2'>
										{ReportMessageStatus[params.value]} ({params.value})
									</Typography>
								</Stack>,
							2: //  OK
								<Stack display='flex'
									sx={{
										alignItems: 'center'
									}}
								>
									<Done color='success' />
									<Typography color='success.main' variant='subtitle2'>
										{ReportMessageStatus[params.value]} ({params.value})
									</Typography>
								</Stack>,
							3: // INTERVENTION_REQUIRED
								<Stack display='flex'
									sx={{
										alignItems: 'center'
									}}
								>
									<AssignmentLate color='warning' />
									<Typography color='warning.main' variant='subtitle2'>
										{ReportMessageStatus[params.value]} ({params.value})
									</Typography>
								</Stack>,
							4: // INTERVENTION_FAILED
								<Stack display='flex'
									sx={{
										alignItems: 'center'
									}}
								>
									<Dangerous color='error' />
									<Typography color='error' variant='subtitle2'>
										{ReportMessageStatus[params.value]} ({params.value})
									</Typography>
								</Stack>,
							5: // ALERT
								<Stack display='flex'
									sx={{
										alignItems: 'center'
									}}
								>
									<Warning color='error' />
									<Typography color='error' variant='subtitle2'>
										{ReportMessageStatus[params.value]} ({params.value})
									</Typography>
								</Stack>,
							6: // DELETED
								<Stack display='flex'
									sx={{
										alignItems: 'center'
									}}
								>
									<Delete color='error'/>
									<Typography color='error' variant='subtitle2'>
										{ReportMessageStatus[params.value]} ({params.value})
									</Typography>
								</Stack>
						}[params.value]
					}
				</>
			)
		},
		{
			field: 'keywords',
			headerName: 'Keyword Found',
			type: 'string',
			filterable: false,
			hideable: false,
			sortable: true,
			flex: 1,
			align: 'center',
			sortingOrder: ['desc', 'asc', null],
			renderCell: (params) => (
				<>
					{
						(_.isEmpty(params.value)) ?
						<Stack direction='row' justifyContent='center'>
							<Clear color='error'/>
						</Stack>
						:
						params.value.length
					}
				</>
			),
			sortComparator: keywordComparator
		},
		{
			field: 'dateReceived',
			headerName: 'Date Received',
			type: 'dateTime',
			filterable: false,
			hideable: false,
			sortable: true,
			flex: 2,
			align: 'center',
			valueGetter: (params) => {
				return new Date(params.value)
			},
			renderCell: (params) => {
				return <>
					<Stack display='flex'>
						<Typography variant='subtitle2'>
							{`${moment(params.value).utc().format('MMM/DD/YYYY')}`}
						</Typography>
						<Typography variant='subtitle2'>
							{`${moment(params.value).utc().format('HH:mm:ss a')}`}
						</Typography>
					</Stack>
				</>;
			}
		},
		{
			field: 'reportType',
			headerName: 'Report Type',
			type: 'string',
			filterable: true,
			hideable: false,
			sortable: true,
			align: 'center',
			flex: 1.5,
			renderCell: (params) => (
				<>
					{
						{
							'Deviation Report':
								<>
									<Stack
										display='flex'
										sx={{
											textAlign: 'center',
											alignItems: 'center'
										}}
									>
										<UTurnLeft color='info' />
										<Typography color='info.dark' variant='subtitle2'>
											{params.value}
										</Typography>
									</Stack>
								</>,
							'Position Report':
								<>
									<Stack
										display='flex'
										sx={{
											textAlign: 'center',
											alignItems: 'center'
										}}
									>
										<Radar color='info' />
										<Typography color='info.dark' variant='subtitle2'>
											{params.value}
										</Typography>
									</Stack>
								</>,
							'Sail Plan Report':
								<>
									<Stack
										display='flex'
										sx={{
											textAlign: 'center',
											alignItems: 'center'
										}}
									>
										<Sailing color='info' />
										<Typography color='info.dark' variant='subtitle2'>
											{params.value}
										</Typography>
									</Stack>
								</>
						}[params.value]
					}
				</>
			)
		},
		{
			field: 'vesselName',
			headerName: 'Vessel Name',
			type: 'string',
			filterable: false,
			hideable: false,
			sortable: true,
			flex: 2
		},
		{
			field: 'imoNumber',
			headerName: 'IMO Number',
			type: 'number',
			filterable: false,
			hideable: false,
			sortable: true,
			flex: 1
		},
		{
			field: 'callSign',
			headerName: 'Call Sign',
			type: 'string',
			filterable: false,
			hideable: false,
			sortable: true,
			flex: 1
		},
		{
			field: 'attention',
			headerName: 'Attention',
			type: 'string',
			filterable: false,
			hideable: false,
			sortable: true,
			flex: 1
		},
		{
			field: 'position',
			headerName: 'Position',
			type: 'string',
			filterable: false,
			hideable: false,
			sortable: false,
			description: 'Lon/Lat',
			flex: 1,
			valueGetter: (params) => {
				if (_.isEmpty(params.value)) {
					return;
				}
				return `${params.value.longitude}, ${params.value.latitude}`
			},
		}
	];

	useMemo(async () => {
		if (_.isEmpty(messageIdParam) === false) {
			await getReportDetails(messageIdParam);
			setModalStatus({reportDetailsModalOpen: true, vesselDetailsModalOpen: false});
		}
	}, []);

	useEffect(() => {
		(async () => {
			setTableLoading(true);
			switch (tabSearchParam) {
				case 'Attention':
					await MessagesUtilityService.getAttentionMessages()
					.then((response: MessagesApiResponse) => {
						const messagesMap = response.messages.map(obj => {
							return obj;
						});
						setMessageUtilityList(messagesMap);
						setTableLoading(false);
						return messagesMap;
					})
					.catch((e: Error) => {
						setTableLoading(false);
						console.log(e);
					});
					break;
				case 'Rejected':
					await MessagesUtilityService.getParsedFailedMessages()
					.then((response: MessagesApiResponse) => {
						const messagesMap = response.messages.map(obj => {
							return obj;
						});
						setMessageUtilityList(messagesMap);
						setTableLoading(false);
						return messagesMap;
					})
					.catch((e: Error) => {
						setTableLoading(false);
						console.log(e);
					});
					break;
				default: // ALL, EDITED, ARCHIVED, DELETED
					await MessagesUtilityService.getAllMessages()
					.then((response: MessagesApiResponse) => {
						const messagesMap = response.messages.map(obj => {
							return obj;
						});
						setMessageUtilityList(messagesMap);
						setTableLoading(false);
						return messagesMap;
					})
					.catch((e: Error) => {
						setTableLoading(false);
						console.log(e);
					});
					break;
			}
		})();
		return () => {
			// this gets called when the component unmounts
		};
	}, [setMessageUtilityList, tabSearchParam]);

	return (
		<PageContainerComponent>
			<Typography
				variant="h5"
				sx={{
					margin: '10px 0px 30px 0px',
					textAlign: 'left',
				}}
			>
				Message Utility
			</Typography>
			<Box
				sx={{
					backgroundColor: 'background.default',
					borderBottom: 1,
					borderColor: 'divider',
				}}
			>
				<Grid container spacing={2}>
					<Grid xs={2}>
						<Button
							aria-label={'create new message'}
							size="small"
							variant="contained"
							sx={{
								minWidth: 0,
								color: appColorPalette.white
							}}
							startIcon={<Add />}
						>
							New Message
						</Button>
					</Grid>
				</Grid>

				<DataGrid
					initialState={{
							columns: {
								columnVisibilityModel: {
									// Hide columns messageId, the other columns will remain visible
									messageId: false,
								},
							},
						}}
					rows={messageUtilityList}
					columns={tableColumns}
					getRowId={(row) => row.messageId}
					slots={{
						loadingOverlay: LinearProgress,
						toolbar: GridToolbar
					}}
					loading={tableLoading}
				/>
			</Box>
		</PageContainerComponent>
	);
}
