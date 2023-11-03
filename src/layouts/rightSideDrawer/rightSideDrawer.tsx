import {
	Container,
	Divider,
	Drawer,
	FormControl,
	FormGroup,
	FormLabel,
	Typography,
} from '@mui/material';
import {
	imageryProviderAtom,
	isRightSideDrawerOpenAtom,
} from '../../../src/store/';

import MapImageryProviderCheckboxComponent from '../../components/mapImageryProviderCheckbox/mapImageryProviderCheckbox';
import React from 'react';
import { useAtom } from 'jotai';

export default function RightSideDrawerComponent() {
	const [isRightSideDrawerOpen, setToggleRightSideDrawer] = useAtom(
		isRightSideDrawerOpenAtom,
	);
	const handleDrawerClose = () => setToggleRightSideDrawer(false);

	return (
		<Drawer
			id="layout-right-side-drawer-nav"
			variant="temporary"
			anchor="right"
			open={isRightSideDrawerOpen}
			onClose={(_, reason) => {
				if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
					handleDrawerClose();
				}
			}}
			ModalProps={{
				keepMounted: true, // Better open performance on mobile.
			}}
			// hideBackdrop
		>
			<Container
				sx={{
					backgroundColor: 'background.paper',
					marginTop: '64px',
				}}
			>
				<FormControl component="fieldset">
					<FormLabel
						component="legend"
						id="imagery-layers-checkbox-group-label"
					>
						<Typography
							variant="h6"
							align="center"
							sx={{
								my: 1,
							}}
						>
							Image Layers
						</Typography>
					</FormLabel>

					<Divider />

					<FormGroup
						aria-labelledby="imagery-layers-checkbox-group-label"
						defaultValue="Infrared"
					>
						{imageryProviderAtom.layers.map((item) => (
							<MapImageryProviderCheckboxComponent
								key={item.name}
								atom={item.layer}
								imageryType={item.name}
							/>
						))}
					</FormGroup>
				</FormControl>
			</Container>
		</Drawer>
	);
}
