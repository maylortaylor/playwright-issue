import { AssignmentLate, Check, Clear, Dangerous, Delete, Done, Help, NotificationImportant, Radar, Sailing, UTurnLeft, Warning } from '@mui/icons-material';
import {
	Button,
	Checkbox,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	Select,
	Stack,
	TableContainer,
	Typography,
} from '@mui/material';
import { MessageApiResponse, MessagesApiResponse } from '../../../types/apis/axiosResponse';
import React, { useCallback, useEffect, useMemo } from 'react';
import { appLoadingAtom, currentReportDetailsAtom, currentReportIdAtom, currentVesselDetailsAtom, currentVesselIdAtom, messageUtilityListAtom, modalStatusAtom } from '../../../store';

import HyperLinkText from '../hyperlink/hyperLinkText';
import MUIDataTable from 'mui-datatables';
import MessagesUtilityService from "../../../services/messageUtility.api";
import ReportDetailsModal from '../../../../src/components/modals/reportDetails/reportDetailsModal';
import { ReportMessageStatus } from '../../../types/enums/reportMessageStatus';
import VesselDetailsModal from '../../../../src/components/modals/vesselDetails/vesselDetailsModal';
import _ from 'lodash';
import enumToArray from '../../../../src/utils/enumToArray';
import moment from 'moment';
// import { testTableData } from '../../../configs/fakeTableData';
import { useAtom } from 'jotai';
import { useSearchParams } from 'react-router-dom';

interface DataTableComponentProps {
	api: string;
}
interface Column {
	name: string;
	label: string;
	options?: unknown;
}

export default function DataTableComponent(props: DataTableComponentProps) {
	const [searchParams, setSearchParams] = useSearchParams({message_id: ''});
	const messageId = searchParams.get("message_id");

	const [messageUtilityList, setMessageUtilityList] = useAtom(
		messageUtilityListAtom,
	);
	const [currentReportDetails, setCurrentReportDetails] = useAtom(
		currentReportDetailsAtom,
	);
	const [modalStatus, setModalStatus] = useAtom(
		modalStatusAtom,
	);
	const [currentReportId, setCurrentReportId] = useAtom(
		currentReportIdAtom,
	);
	const [currentVesselId, setCurrentVesselId] = useAtom(
		currentVesselIdAtom,
	);
	const [currentVesselDetails, setCurrentVesselDetails] = useAtom(
		currentVesselDetailsAtom,
	);
	const [isAppLoading, setIsAppLoading] = useAtom(appLoadingAtom);
	const handleViewReportButtonClick = async (e: React.MouseEvent<HTMLButtonElement>, index) => {
		setCurrentReportId(messageUtilityList[index].messageId);
		await getReportDetails(messageUtilityList[index].messageId);
		setSearchParams(prev => {
			prev.set("message_id", messageUtilityList[index].messageId);
			return prev;
		}, {replace: true});

		setModalStatus({reportDetailsModalOpen: true, vesselDetailsModalOpen: false});
	}

	const tableOptions = {
		caseSensitive: false,
		count: messageUtilityList.length,
		download: true,
		downloadOptions: {filename: 'reportDetailsList.csv', separator: ','},
		elevation: 8,
		filter: true,
		fixedHeader: true,
		filterType: 'checkbox',
		pagination: true,
		rowsPerPage: 50,
		rowsPerPageOptions: [50, 100, 200],
		print: true,
		responsive: 'standard', // standard, simple, vertical
		search: true,
		searchPlaceholder: 'Search Report Messages...',
		// customSearch: (searchQuery, currentRow, columns) => {
		// 	let isFound = false;
		// 	currentRow.forEach(col => {
		// 		if (col){
		// 			if (col.toString().toUpperCase().includes(searchQuery.toUpperCase())) {
		// 				isFound = true;
		// 			}
		// 		} else {
		// 			isFound = false;
		// 		}
		// 	});
		// 	return isFound;
		// },
		selectableRows: 'none',
		sort: true,
		viewColumns: true,
	};


	const viewReportButton = (index) => (
		<Button
			id={`view-report-button-${index}`}
			data-test-id={`view-report-button-${index}`}
			aria-label='view report'
			data-index={index}
			size='small'
			variant='contained'
			sx={{
				minWidth: 0,
			}}
			onClick={(e) => handleViewReportButtonClick(e, index)}
		>
			View Report
		</Button>
	);


	const tableColumns: Column[] = [
		{
			name: "messageId",
			label: "Id",
			options: {
				filter: false,
				sort: false,
				display: false
			}
		},
		{
			name: 'actions',
			label: 'Actions',
			options: {
				filter: false,
				sort: false,
				empty: false,
				display: true,
				customBodyRenderLite: (dataIndex, rowIndex) => {
					return viewReportButton(dataIndex);
				},
			},
		},
		{
			name: 'status',
			label: 'Status',
			options: {
				filter: true,
				sort: true,
				empty: false,
				display: true,
				filterType: 'custom',
				customFilterListOptions: {
					update: (filterList, filterPos, index) => {
						filterList[index].splice(filterPos, 1);
						return filterList;
					}
				},
				filterOptions: {
					logic: (status, filters, row) => {
						if (filters.length) return !filters.includes(ReportMessageStatus[status]);
						return false;
					},
					display: (filterList, onChange, index, column) => {
						const optionValues = enumToArray(ReportMessageStatus);
						return (
							<FormControl>
								<InputLabel htmlFor='select-multiple-chip'>
									Status
								</InputLabel>
								<Select
									multiple
									value={filterList[index]}
									renderValue={selected => selected.join(', ')}
									onChange={event => {
										filterList[index] = event.target.value;
										onChange(filterList[index], index, column);
									}}
								>
									{optionValues.map((item: any) => (
										<MenuItem key={item.label} value={item.label}>
											<Checkbox
												color='primary'
												checked={filterList[index].indexOf(item.label) > -1}
											/>
											<ListItemText primary={item.label} />
										</MenuItem>
									))}
								</Select>
							</FormControl>
						);
					}
				},
				customBodyRender: (value, tableMeta, updateValue) => {
					return (
						<>
							{
								{
									0: // UNKNOWN
										<>
											<Typography color='error' display='flex' variant='subtitle2'>
												<Help color='error' />
												{value} ({ReportMessageStatus[value]})
											</Typography>
										</>,
									1: // UNREAD
										<>
											<Typography color='info.dark' display='flex' variant='subtitle2'>
												<NotificationImportant color='info' />
												{value} ({ReportMessageStatus[value]})
											</Typography>
										</>,
									2: //  OK
										<>
											<Typography color='success.main' display='flex' variant='subtitle2'>
												<Done color='success' />
												{value} ({ReportMessageStatus[value]})
											</Typography>
										</>,
									3: // INTERVENTION_REQUIRED
										<>
											<Typography color='warning.main' display='flex' variant='subtitle2'>
												<AssignmentLate color='warning' />
												{value} ({ReportMessageStatus[value]})
											</Typography>
										</>,
									4: // INTERVENTION_FAILED
										<>
											<Typography color='error' display='flex' variant='subtitle2'>
												<Dangerous color='error' />
												{value} ({ReportMessageStatus[value]})
											</Typography>
										</>,
									5: // ALERT
										<>
											<Typography color='error' display='flex' variant='subtitle2'>
												<Warning color='error' />
												{value} ({ReportMessageStatus[value]})
											</Typography>
										</>,
									6: // DELETED
										<>
											<Typography color='error' display='flex' variant='subtitle2'>
												<Delete />
												{value} ({ReportMessageStatus[value]})
											</Typography>
										</>,
								}[value]
							}
						</>
					);
				},
			},
		},
		{
			name: 'keywords',
			label: 'Keyword Found',
			options: {
				filter: false,
				sort: true,
				empty: false,
				display: true,
				sortCompare: (order) =>
					({ data: keywords1 }, { data: keywords2 }) =>
              (keywords1.length - keywords2.length) * (order === 'desc' ? 1 : -1),
				hint: 'Sort by number of keywords',
				customBodyRenderLite: (dataIndex) => {
					const values = messageUtilityList[dataIndex].keywords;
					if (_.isEmpty(values)) {
						return (
							<Stack direction='row' justifyContent='center'>
								<Clear color='error'/>
							</Stack>
						)
					} else {
						return (
							<Stack direction='row' justifyContent='center'>
								<Check color='success'/> ({values?.length})
							</Stack>
						)
					}
				},
			},
		},
		{
			name: 'dateReceived',
			label: 'Date Received',
			options: {
				filter: false,
				sort: true,
				empty: false,
				display: true,
				customBodyRender: (value) => {
					return (
						<>
							{moment(value).utc().format('MMM/DD/YYYY HH:mm:ss')}
						</>
					);
				},
			},
		},
		{
			name: 'reportType',
			label: 'Report Type',
			options: {
				filter: true,
				sort: true,
				empty: false,
				display: true,
				customBodyRender: (value) => {
					return (
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
													{value}
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
													{value}
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
													{value}
												</Typography>
											</Stack>
										</>
								}[value]
							}
						</>
					);
				},
			}
		},
		{
			name: 'vesselName',
			label: 'Vessel Name',
			options: {
				filter: false,
				sort: true,
				empty: false,
				display: true,
				customBodyRender: (value, tableMeta, updateValue) => {
					if (_.isEmpty(value)) {
						return;
					}
					return (
						<HyperLinkText
							id={`vessel-name-${tableMeta.rowIndex}`}
							text={value}
							onClickAction={() => {
								setSearchParams(prev => {
									prev.set("vessel_name", value);
									return prev;
								}, {replace: true});
								setCurrentVesselId(value);
								setModalStatus({reportDetailsModalOpen: false, vesselDetailsModalOpen: true});
							}}
						/>
					);
				},
			}
		},
		{
			name: 'imoNumber',
			label: 'IMO Number',
			options: {
				filter: false,
				sort: false,
				empty: false,
				display: true,
			}
		},
		{
			name: 'callSign',
			label: 'Call Sign',
			options: {
				filter: false,
				sort: false,
				empty: false,
				display: true,
			}
		},
		{
			name: 'attention',
			label: 'Attention',
			options: {
				filter: false,
				sort: true,
				empty: false,
				display: true,
			}
		},
		{
			name: 'position',
			label: 'Position',
			options: {
				filter: false,
				sort: false,
				empty: false,
				display: true,
				hint: 'lat/lon',
				customBodyRender: (value) => {
					if (_.isEmpty(value)) {
						return;
					}
					return (
						<>
							{value.latitude}, {value.longitude}
						</>
					);
				},
			},
		},
	];

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

	useEffect(() => {
		(async () => {
			setIsAppLoading(true);
			switch (props.api) {
				case 'Attention':
					await MessagesUtilityService.getAttentionMessages()
					.then((response: MessagesApiResponse) => {
						const messagesMap = response.messages.map(obj => {
							return obj;
						});
						setMessageUtilityList(messagesMap);
						setIsAppLoading(false);
						return messagesMap;
					})
					.catch((e: Error) => {
						setIsAppLoading(false);
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
						setIsAppLoading(false);
						return messagesMap;
					})
					.catch((e: Error) => {
						setIsAppLoading(false);
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
						setIsAppLoading(false);
						return messagesMap;
					})
					.catch((e: Error) => {
						setIsAppLoading(false);
						console.log(e);
					});
					break;
			}

		})();

		return () => {
			// this gets called when the component unmounts
		};
	}, []);

	useCallback(async () => {
		await getReportDetails(currentReportId);
	}, [currentReportId]);

	useMemo(async () => {
		if (_.isEmpty(messageId) === false) {
			await getReportDetails(messageId);
			setModalStatus({reportDetailsModalOpen: true, vesselDetailsModalOpen: false});
		}
	}, []);

	return (
		<>
			<ReportDetailsModal
				open={modalStatus.reportDetailsModalOpen}
				close={() => {
					setModalStatus({reportDetailsModalOpen: false, vesselDetailsModalOpen: false});
					if (searchParams.has('message_id')) {
						searchParams.delete('message_id');
						setSearchParams(searchParams);
					}
				}}
			/>
			<VesselDetailsModal
				open={modalStatus.vesselDetailsModalOpen}
				close={() => {
					setModalStatus({reportDetailsModalOpen: false, vesselDetailsModalOpen: false})
					if (searchParams.has('vessel_name')) {
						searchParams.delete('vessel_name');
						setSearchParams(searchParams);
					}
				}}
			/>
			<TableContainer id="data-table">
				<MUIDataTable
					data={messageUtilityList}
					columns={tableColumns}
					options={tableOptions}
				/>
			</TableContainer>
		</>
	);
}
