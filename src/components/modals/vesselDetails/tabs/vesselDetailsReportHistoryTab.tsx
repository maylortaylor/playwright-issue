import { DateRange, DirectionsBoat } from "@mui/icons-material";
import { Divider, Grid, Tab, TableContainer, Tabs } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";

import { Last20DaysReport } from '../../../../types/apis/last20DaysReport';
import MUIDataTable from 'mui-datatables';
import TabPanel from "../../../../../src/components/common/tabs/tabPanel";
import { VoyageHistory } from "apis/voyageHistory";
import moment from "moment";
import tabProps from "../../../../../src/utils/tabUtils";
import { z } from "zod";

interface VesselDetailsReportsHistoryTabProps {
	vesselId: string;
}

interface Column {
	name: string;
	label: string;
	options?: unknown;
}

const last20DaysReportTestTableData: Array<Last20DaysReport> = [
	{
		id: "ba173ea2-32c1-404e-a472-03be9bb12926",
		reportType: "Position Report",
		dateReceived: new Date(),
		position: {
			latitude: 41.10755368140699,
			longitude: -61.58084626737959,
		},
		speed: "24.4 knots",
		destination: "Port Name 1",
		country: "USA"
	},
	{
		id: "ba173ea2-32c1-404e-a472-03be9bb12926",
		reportType: "Position Report",
		dateReceived: new Date(),
		position: {
			latitude: 41.10755368140699,
			longitude: -61.58084626737959,
		},
		speed: "24.4 knots",
		destination: "Port Name 3",
		country: "USA"
	},
	{
		id: "ba173ea2-32c1-404e-a472-03be9bb12926",
		reportType: "Position Report",
		dateReceived: new Date(),
		position: {
			latitude: 41.10755368140699,
			longitude: -61.58084626737959,
		},
		speed: "24.4 knots",
		destination: "Port Name 4",
		country: "USA"
	},
	{
		id: "ba173ea2-32c1-404e-a472-03be9bb12926",
		reportType: "Position Report",
		dateReceived: new Date(),
		position: {
			latitude: 41.10755368140699,
			longitude: -61.58084626737959,
		},
		speed: "24.4 knots",
		destination: "Port Name 2",
		country: "USA"
	},
	{
		id: "ba173ea2-32c1-404e-a472-03be9bb12926",
		reportType: "Position Report",
		dateReceived: new Date(),
		position: {
			latitude: 41.10755368140699,
			longitude: -61.58084626737959,
		},
		speed: "24.4 knots",
		destination: "Port Name 1",
		country: "USA"
	},
];

const voyageHistoryTestTableData: Array<VoyageHistory> = [
	{
		id: "ba173ea2-32c1-404e-a472-03be9bb12926",
		voyageNumber: "14141",
		departure: "Port Name 1",
		destination: "Port Name 2",
		etd: new Date(),
		calculatedEtd: new Date(),
	},
	{
		id: "ba173ea2-32c1-404e-a472-03be9bb12926",
		voyageNumber: "124114",
		departure: "Port Name 2",
		destination: "Port Name 1",
		etd: new Date(),
		calculatedEtd: new Date(),
	},
	{
		id: "ba173ea2-32c1-404e-a472-03be9bb12926",
		voyageNumber: "123124",
		departure: "Port Name 3",
		destination: "Port Name 4",
		etd: new Date(),
		calculatedEtd: new Date(),
	},
	{
		id: "ba173ea2-32c1-404e-a472-03be9bb12926",
		voyageNumber: "41241",
		departure: "Port Name 4",
		destination: "Port Name 3",
		etd: new Date(),
		calculatedEtd: new Date(),
	},
	{
		id: "ba173ea2-32c1-404e-a472-03be9bb12926",
		voyageNumber: "1231",
		departure: "Port Name 1",
		destination: "Port Name 2",
		etd: new Date(),
		calculatedEtd: new Date(),
	},
	{
		id: "ba173ea2-32c1-404e-a472-03be9bb12926",
		voyageNumber: "2344913",
		departure: "Port Name 5",
		destination: "Port Name 6",
		etd: new Date(),
		calculatedEtd: new Date(),
	},
];

const last20DaysReportTableOptions = {
	caseSensitive: false,
	download: true,
	downloadOptions: {filename: 'voyageHistory.csv', separator: ','},
	elevation: 8,
	filter: true,
	fixedHeader: true,
	filterType: 'checkbox',
	print: true,
	responsive: 'vertical',
	search: true,
	searchPlaceholder: 'Search Voyage History...',
	selectableRows: 'none',
	sort: true,
	viewColumns: true,
};

const votyageHistoryTableOptions = {
	caseSensitive: false,
	download: true,
	downloadOptions: {filename: 'voyageHistory.csv', separator: ','},
	elevation: 8,
	filter: true,
	fixedHeader: true,
	filterType: 'checkbox',
	print: true,
	responsive: 'vertical',
	search: true,
	searchPlaceholder: 'Search Voyage History...',
	selectableRows: 'none',
	sort: true,
	viewColumns: true,
};

export function VesselDetailsReportsHistoryTab(props: VesselDetailsReportsHistoryTabProps) {
	const [value, setValue] = useState(0);
	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const last20DaysReportTableColumns: Column[] = [
		{
			name: "id",
			label: "Id",
			options: {
				filter: false,
				sort: false,
				display: false
			}
		},
		{
			name: 'reportType',
			label: 'Report Type',
			options: {
				filter: true,
				sort: true,
				empty: false,
				display: true,
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
					return <>{moment(value).utc().format('DD/MMM/YY HH:mm:ss')}</>;
				},
			},
		},
		{
			name: 'position',
			label: 'Position',
			options: {
				filter: true,
				sort: true,
				empty: false,
				display: true,
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
		{
			name: 'speed',
			label: 'Speed',
			options: {
				filter: true,
				sort: true,
				empty: false,
				display: true,
			}
		},
		{
			name: 'destination',
			label: 'Destination',
			options: {
				filter: true,
				sort: true,
				empty: false,
				display: true,
			}
		},
		{
			name: 'country',
			label: 'Country',
			options: {
				filter: true,
				sort: true,
				empty: false,
				display: true,
			}
		},
	];

	const voyageHistorytableColumns: Column[] = [
		{
			name: "id",
			label: "Id",
			options: {
				filter: false,
				sort: false,
				display: false
			}
		},
		{
			name: 'voyageNumber',
			label: 'Voyage Number',
			options: {
				filter: true,
				sort: true,
				empty: false,
				display: true,
			},
		},
		{
			name: 'departure',
			label: 'Departure',
			options: {
				filter: true,
				sort: true,
				empty: false,
				display: true,
			},
		},
		{
			name: 'destination',
			label: 'Destination',
			options: {
				filter: true,
				sort: true,
				empty: false,
				display: true,
			},
		},
		{
			name: 'etd',
			label: 'ETD',
			options: {
				filter: false,
				sort: true,
				empty: false,
				display: true,
				customBodyRender: (value) => {
					return <>{moment(value).utc().format('DD/MMM/YY HH:mm:ss')}</>;
				},
			}
		},
		{
			name: 'calculatedEtd',
			label: 'Calculated ETD',
			options: {
				filter: false,
				sort: true,
				empty: false,
				display: true,
				customBodyRender: (value) => {
					return <>{moment(value).utc().format('DD/MMM/YY HH:mm:ss')}</>;
				},
			}
		},
	];

	return (
		<Grid
			id="vessel-details-report-history-tab"
			sx={{
				height: '70vh',
				overflow: 'auto'
			}}
			>

			<Tabs
				id="report-history-tabs"
				value={value}
				onChange={handleChange}
				textColor="secondary"
				// variant="fullWidth"
				indicatorColor="secondary"
				aria-label="Vessel Details Report History tabs"
			>
				<Tab
					icon={<DateRange />}
					label="Last 20 Days Report"
					aria-label="Last 20 Days Report"
					wrapped
					{...tabProps(0)}
				/>
				<Tab
					icon={<DirectionsBoat />}
					label="Voyage Report"
					aria-label="Voyage Report"
					wrapped
					{...tabProps(1)}
				/>
			</Tabs>

			<Divider flexItem/>

			{/* // * Last 20 Days Report */}
			<TabPanel index={0} value={value}>
				<TableContainer id="last-20-days-report-data-table">
					<MUIDataTable
						data={last20DaysReportTestTableData}
						columns={last20DaysReportTableColumns}
						options={last20DaysReportTableOptions}
					/>
				</TableContainer>
			</TabPanel>

			{/* // * Voyage Report */}
			<TabPanel index={1} value={value}>
			<TableContainer id="voyage-history-data-table">
					<MUIDataTable
						data={voyageHistoryTestTableData}
						columns={voyageHistorytableColumns}
						options={votyageHistoryTableOptions}
					/>
				</TableContainer>
			</TabPanel>

		</Grid>
	);
}
