import './leftSideDrawer.scss';

import {
	Badge,
	CSSObject,
	ClickAwayListener,
	Container,
	Divider,
	IconButton,
	Link,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Stack,
	Theme,
	Typography,
	styled,
} from '@mui/material';
import { Brightness4, Brightness7, ChevronLeft } from '@mui/icons-material';

import MuiDrawer from '@mui/material/Drawer';
import React from 'react';
import { appDimensions } from '../../../src/theme';
import { createElement } from 'react';
import { isLeftSideDrawerOpenAtom } from '../../store/';
import { navigationConfig } from '../../configs/navigation';
import themeModeAtomWithPersistence from '../../store/themeModeAtom';
import { useAtom } from 'jotai';

const openedMixin = (theme: Theme): CSSObject => ({
	width: appDimensions.leftSideDrawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const StyledLeftSideDrawerComponent = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'isLeftSideDrawerOpen',
})(({ theme, open }) => ({
	width: appDimensions.leftSideDrawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

export default function LeftSideDrawerComponent() {
	const [isLeftSideDrawerOpen, setToggleLeftSideDrawer] = useAtom(
		isLeftSideDrawerOpenAtom,
	);
	const handleDrawerClose = () => setToggleLeftSideDrawer(false);
	const toggleLeftSideDrawer = (): void => {
		setToggleLeftSideDrawer((prevState) => !prevState);
	};

	const [themeMode, setTheme] = useAtom(themeModeAtomWithPersistence);

	return (
		<>
			<ClickAwayListener
				mouseEvent="onMouseDown"
				touchEvent="onTouchStart"
				onClickAway={() => isLeftSideDrawerOpen && handleDrawerClose()}
			>
				<StyledLeftSideDrawerComponent
					variant="permanent"
					open={isLeftSideDrawerOpen}
					onClose={(_, reason) => {
						if (reason === 'escapeKeyDown') {
							handleDrawerClose();
						}
					}}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
				>
					<Container id="layout-left-side-drawer-nav" disableGutters>
						{/* LEFT SIDE DRAWER HEADER */}
						<Stack
							direction="row"
							alignItems="center"
							justifyContent="space-around"
							spacing={2}
							sx={{ my: 2, opacity: isLeftSideDrawerOpen ? 1 : 0 }}
						>
							<Typography variant="h6" align="center" color="text.secondary">
								AMVER UI
							</Typography>
							<IconButton onClick={toggleLeftSideDrawer}>
								<ChevronLeft />
							</IconButton>
						</Stack>
						<Container
							id="left-side-drawer-nav-top"
							component="nav"
							aria-label="primary section"
							disableGutters
							sx={{ paddingLeft: 0, paddingRight: 0 }}
						>
							<Divider sx={{ opacity: isLeftSideDrawerOpen ? 1 : 0 }} />

							{/* TOP SECTION OF LEFT SIDE DRAWER */}

							<List>
								{navigationConfig.leftSideDrawerNav
									.filter((item: any) => item.bottom === false)
									.map((item) => (
										<ListItem
											key={item.title}
											disablePadding
											sx={{ display: 'block' }}
										>
											<ListItemButton
												id={`icon-button-${item.title}`}
												sx={{
													minHeight: 48,
													justifyContent: isLeftSideDrawerOpen
														? 'initial'
														: 'center',
													px: 2.5,
												}}
												component={Link}
												href={item.href}
											>
												<IconButton
													aria-label={item.ariaLabel}
													sx={{
														minWidth: 0,
														mr: isLeftSideDrawerOpen ? 3 : 'auto',
													}}
												>
													<Badge
														badgeContent={item.badgeCount}
														color={item.badgeColor as never}
													>
														{createElement(item.icon, { key: item.icon }, null)}
													</Badge>
												</IconButton>
												<ListItemText
													primary={item.title}
													sx={{
														opacity: isLeftSideDrawerOpen ? 1 : 0,
													}}
												/>
											</ListItemButton>
										</ListItem>
									))}
							</List>
						</Container>
						<Container
							id="left-side-drawer-nav-bottom"
							component="nav"
							aria-label="secondary section"
							disableGutters
						>
							<Divider />

							{/* BOTTOM SECTION OF LEFT SIDE DRAWER */}

							<List>
								{navigationConfig.leftSideDrawerNav
									.filter((item: any) => item.bottom === true)
									.map((item) => (
										<ListItem
											key={item.title}
											alignItems="flex-start"
											disablePadding
										>
											<ListItemButton component={Link} href={item.href}>
												<IconButton
													aria-label={item.ariaLabel}
													sx={{
														minWidth: 0,
														mr: isLeftSideDrawerOpen ? 3 : 'auto',
													}}
												>
													<Badge
														badgeContent={item.badgeCount}
														color={item.badgeColor as never}
													>
														{createElement(item.icon, { key: item.icon }, null)}
													</Badge>
												</IconButton>
												<ListItemText
													primary={item.title}
													sx={{
														opacity: isLeftSideDrawerOpen ? 1 : 0,
													}}
												/>
											</ListItemButton>
										</ListItem>
									))}

								<Divider />

								<ListItem
									key="toggleTheme"
									alignItems="flex-start"
									disablePadding
								>
									<ListItemButton>
										<IconButton
											onClick={(e) =>
												setTheme((themeMode === 'light' ? 'dark' : 'light'))
											}
											sx={{
												minWidth: 0,
												mr: isLeftSideDrawerOpen ? 3 : 'auto',
											}}
										>
											{themeMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
										</IconButton>
										<ListItemText
											primary="Toggle Theme"
											sx={{
												opacity: isLeftSideDrawerOpen ? 1 : 0,
											}}
											onClick={(e) =>
												setTheme((themeMode === 'light' ? 'dark' : 'light'))
											}
										/>
									</ListItemButton>
								</ListItem>
							</List>
						</Container>
					</Container>
				</StyledLeftSideDrawerComponent>
			</ClickAwayListener>
		</>
	);
}
