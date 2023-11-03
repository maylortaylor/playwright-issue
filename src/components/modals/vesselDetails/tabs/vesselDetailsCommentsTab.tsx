import { Button, Grid, Stack, TableContainer } from "@mui/material";

import { AddComment } from "@mui/icons-material";
import MUIDataTable from 'mui-datatables';
import React from "react";
import { VesselDetailsCommentSchema } from "../../../../types/apis/vesselDetailsComment";
import moment from "moment";
import { z } from "zod";

interface VesselDetailsCommentsTabProps {
	vesselId: string;
}

interface Column {
	name: string;
	label: string;
	options?: unknown;
}

const vesselDetailsCommentsTestTableData: Array<z.infer<typeof VesselDetailsCommentSchema>> = [
	{
		id: "ba173ea2-32c1-404e-a472-03be9bb12926",
		dateCreated: new Date(),
		createdBy: "John Doe",
		commentBody: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five ce",
	},
	{
		id: "ba173ea2-32c1-404e-a472-03be9bb12926",
		dateCreated: new Date(),
		createdBy: "Jane Doe",
		commentBody: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five ce",
	},
	{
		id: "ba173ea2-32c1-404e-a472-03be9bb12926",
		dateCreated: new Date(),
		createdBy: "Marky Mark",
		commentBody: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five ce",
	},
	{
		id: "ba173ea2-32c1-404e-a472-03be9bb12926",
		dateCreated: new Date(),
		createdBy: "John Doe",
		commentBody: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five ce",
	},
	{
		id: "ba173ea2-32c1-404e-a472-03be9bb12926",
		dateCreated: new Date(),
		createdBy: "Jane Doe",
		commentBody: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five ce",
	},
	{
		id: "ba173ea2-32c1-404e-a472-03be9bb12926",
		dateCreated: new Date(),
		createdBy: "Jane Doe",
		commentBody: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five ce",
	},
	{
		id: "ba173ea2-32c1-404e-a472-03be9bb12926",
		dateCreated: new Date(),
		createdBy: "Jane Doe",
		commentBody: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five ce",
	},
	{
		id: "ba173ea2-32c1-404e-a472-03be9bb12926",
		dateCreated: new Date(),
		createdBy: "Marky Mark",
		commentBody: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five ce",
	},
];


const vesselDetailsCommentsTableOptions = {
	caseSensitive: false,
	download: true,
	downloadOptions: {filename: 'vesselDetailsComments.csv', separator: ','},
	elevation: 8,
	filter: true,
	fixedHeader: true,
	filterType: 'checkbox',
	print: true,
	responsive: 'vertical',
	search: true,
	searchPlaceholder: 'Search Comments...',
	selectableRows: 'none',
	sort: true,
	viewColumns: true,
};

export function VesselDetailsCommentsTab(props: VesselDetailsCommentsTabProps) {
  const vesselDetailsCommentsTableColumns: Column[] = [
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
			name: 'dateCreated',
			label: 'Date Created',
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
			name: 'createdBy',
			label: 'Created By',
			options: {
				filter: true,
				sort: true,
				empty: false,
				display: true,
			},
		},
		{
			name: 'commentBody',
			label: 'Comment',
			options: {
				filter: false,
				sort: false,
				empty: false,
				display: true,
			},
		},
	];

	return (
		<Grid
			id="vessel-details-comments-tab"
			sx={{
				height: '70vh',
				overflow: 'auto'
			}}
		>

			<Stack
				direction='row'
				justifyContent='flex-start'
			>
				<Button
					startIcon={<AddComment />}
					variant="contained"
					color="primary"
					aria-label="Add Vessel Details Comment"
				>
					Add Comment
				</Button>
			</Stack>


			<TableContainer id="vessel-details-comments-data-table">
				<MUIDataTable
					data={vesselDetailsCommentsTestTableData}
					columns={vesselDetailsCommentsTableColumns}
					options={vesselDetailsCommentsTableOptions}
				/>
			</TableContainer>

		</Grid>
	);
}
