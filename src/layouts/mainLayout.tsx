import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import React from 'react';
import TopNavigationComponent from '../layouts/topNavigation/topNavigation';

export default function MainLayoutComponent(props: any) {
	return (
		<Box id="main-layout-container">
			<TopNavigationComponent title="AMVER Header" subtitle="amver subtitle" />
			<Box id="outlet-wrapper">
				<Outlet />
			</Box>
		</Box>
	);
}
