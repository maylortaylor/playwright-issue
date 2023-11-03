import './footer.scss';

import { Box, CSSObject, styled } from '@mui/material';

import ClockComponent from '../../components/common/clock/clock';
import React from 'react';
import { isLeftSideDrawerOpenAtom } from '../../../src/store';
import { useAtom } from 'jotai';

const footerWidth = '100%';

const openedMixin = (theme: any): CSSObject => ({
	width: footerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: any): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: footerWidth,
});

export default function FooterComponent(props: any) {
	const [isLeftSideDrawerOpen] = useAtom(isLeftSideDrawerOpenAtom);

	const StyledFooterComponent = styled(Box, { label: 'footer' })(
		({ theme }) => ({
			width: footerWidth,
			flexShrink: 0,
			whiteSpace: 'nowrap',
			boxSizing: 'border-box',
			...(isLeftSideDrawerOpen && {
				...openedMixin(theme),
				'& .MuiDrawer-paper': openedMixin(theme),
			}),
			...(!isLeftSideDrawerOpen && {
				...closedMixin(theme),
				'& .MuiDrawer-paper': closedMixin(theme),
			}),
		}),
	);

	return (
		<StyledFooterComponent
			id="layout-footer"
			sx={{
				backgroundColor: 'background.paper',
				color: 'text.secondary',
			}}
			// component="footer"s
		>
			<ClockComponent format={'MMMM DD, y, HH:mm:ss'} />
			{/* <Typography
				variant='h6'
				sx={{
					display: { xs: 'none', sm: 'block' },
				}}
			>
				Footer
			</Typography>
			<Typography
				variant='subtitle1'
				sx={{
					display: { xs: 'none', sm: 'block' },
				}}
			>
				sub footer
			</Typography> */}
		</StyledFooterComponent>
	);
}
