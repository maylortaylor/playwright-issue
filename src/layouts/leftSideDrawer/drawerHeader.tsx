import './drawerHeader.scss';

import { Container } from '@mui/material';
import React from 'react';

export default function DrawerHeaderComponent({ children }: any) {
	return (
		<Container
			id="layout-left-side-drawer-header"
			sx={(theme) => ({
				padding: theme.spacing(0, 1),
				...theme.mixins.toolbar,
			})}
			disableGutters
		>
			{children}
		</Container>
	);
}
