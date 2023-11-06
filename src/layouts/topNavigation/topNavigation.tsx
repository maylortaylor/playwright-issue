import {
	Box,
	Divider,
	LinearProgress,
	Link,
	OutlinedInput,
} from '@mui/material';
import { Layers, Menu, Search } from '@mui/icons-material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import React, { createElement } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { appColorPalette, appDimensions } from '../../../src/theme';
import {
	appLoadingAtom,
	isLeftSideDrawerOpenAtom,
	isRightSideDrawerOpenAtom,
	themeModeAtomWithPersistence,
} from '../../store/';

import AMVERLogo from '../../assets/images/amver.png';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import LeftSideDrawerComponent from '../../layouts/leftSideDrawer/leftSideDrawer';
import MenuItem from '@mui/material/MenuItem';
import RightSideDrawerComponent from '../../layouts/rightSideDrawer/rightSideDrawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { navigationConfig } from '../../configs/navigation';
import { useAtom } from 'jotai';

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const SearchBar = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(OutlinedInput)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));

const StyledAppBarComponent = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: appDimensions.leftSideDrawerWidth,
		width: `calc(100% - ${appDimensions.leftSideDrawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

export default function TopNavigationComponent(props: any) {
	const [isLeftSideDrawerOpen, setToggleLeftSideDrawer] = useAtom(
		isLeftSideDrawerOpenAtom,
	);
	const [isRightSideDrawerOpen, setOpenRightSideDrawer] = useAtom(
		isRightSideDrawerOpenAtom,
	);
	const toggleLeftSideDrawer = (): void => {
		setToggleLeftSideDrawer((prevState) => !prevState);
	};
	const toggleRightSideDrawer = (): void => {
		setOpenRightSideDrawer((prevState) => !prevState);
	};
	const [isAppLoading] = useAtom(appLoadingAtom);
	const [themeMode] = useAtom(themeModeAtomWithPersistence);

	return (
		<>
			<StyledAppBarComponent
				id="layout-top-nav"
				sx={{
					height: `${appDimensions.topNavigationHeight}px`,
				}}
				position="fixed"
				open={isLeftSideDrawerOpen}
			>
				<Toolbar
					disableGutters
					variant="dense"
					sx={{
						backgroundColor: themeMode === 'dark' ? appColorPalette.paperDark : appColorPalette.paperLight
					}}
				>
					<Link href="/amver-ui/">
						<Box
							component="img"
							sx={{
								height: 50,
								width: 50,
								maxHeight: { xs: 50, md: 50 },
								maxWidth: { xs: 50, md: 50 },
								marginRight: '20px',
								marginLeft: '10px',
							}}
							alt="AMVER logo"
							src={AMVERLogo}
						/>
					</Link>
					<IconButton
						sx={{
							mr: 5,
							...(isLeftSideDrawerOpen && { display: 'none' }),
						}}
						color="inherit"
						size="large"
						aria-label="open drawer"
						edge="start"
						onClick={toggleLeftSideDrawer}
					>
						<Menu />
					</IconButton>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'none', sm: 'block' },
						}}
					>
					</Box>

					<SearchBar>
						<SearchIconWrapper>
							<Search />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ 'aria-label': 'search' }}
						/>
					</SearchBar>

					{navigationConfig.topNav.map((item) => (
						<MenuItem key={item.title} component={Link} href={item.href}>
							<IconButton
								size="large"
								aria-label={item.ariaLabel}
								color="inherit"
							>
								<Badge
									badgeContent={item.badgeCount}
									color={item.badgeColor as never}
								>
									{createElement(item.icon, { key: item.icon }, null)}
								</Badge>
							</IconButton>
							{/* <Typography color="text.primary">{item.title}</Typography> */}
						</MenuItem>
					))}

					<Divider
						sx={{
							backgroundColor: 'background.default',
						}}
						orientation="vertical"
						flexItem
					/>

					<MenuItem key="Imagery Layers" onClick={toggleRightSideDrawer}>
						<IconButton
							size="large"
							aria-label="Imagery Layers"
							color="inherit"
						>
							<Badge badgeContent={1} color="info">
								<Layers />
							</Badge>
						</IconButton>
						<Typography color="text.primary">Layers</Typography>
					</MenuItem>
				</Toolbar>

				{/* app loading  */}
				{isAppLoading ? <LinearProgress color="secondary" /> : null}
			</StyledAppBarComponent>
			<LeftSideDrawerComponent />
			<RightSideDrawerComponent />
		</>
	);
}
