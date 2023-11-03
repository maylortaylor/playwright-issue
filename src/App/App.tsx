import '../utils/keyCommands';

import { Box, CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { StrictMode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { escapeKey, rightSquareBracket } from '../utils/keyCommands';
import { getDesignTokens, getThemedComponents } from '../theme';

import AdminPage from '../pages/adminPage';
import { DevTools } from 'jotai-devtools';
import ErrorPage from '../pages/errorPage';
import MainLayoutComponent from '../layouts/mainLayout';
import MapPage from '../pages/mapPage';
import MessagesUtilityListPage from '../pages/messagesUtilityList/messagesUtilityListPage';
import PortInformationPage from '../pages/portInformationPage';
import VesselInformationPage from '../pages/vesselInformationPage';
import { deepmerge } from '@mui/utils';
import themeModeAtomWithPersistence from '../store/themeModeAtom';
import { useAtom } from 'jotai';
import { useMemo } from 'react';

export default function AppComponent() {
	const [themeMode] = useAtom(themeModeAtomWithPersistence);

	// * keyboard shortcuts
	escapeKey();
	rightSquareBracket();

	const appTheme = useMemo(
		() =>
			createTheme(
				deepmerge(getDesignTokens(themeMode), getThemedComponents(themeMode)),
			),
		[themeMode],
	);

	return (
		<Box id="app-wrapper" data-test-id="app-wrapper">
			{/* <StrictMode> */}
			{/* <DevTools /> */}

			<BrowserRouter>
				<ThemeProvider theme={appTheme}>
					<CssBaseline />
					<Routes>
						<Route path="/amver-ui/" element={<MainLayoutComponent />}>
							<Route index element={<MapPage />} />
							<Route path="/amver-ui/map/" element={<MapPage />} />
							<Route
								index
								path="/amver-ui/messages/"
								element={<MessagesUtilityListPage />}
							/>
							<Route
								path="vessel-information/"
								element={<VesselInformationPage />}
							/>
							<Route
								path="/amver-ui/port-information/"
								element={<PortInformationPage />}
							/>
							<Route path="/amver-ui/admin/" element={<AdminPage />} />
							<Route path="*" element={<ErrorPage />} />
						</Route>
					</Routes>
				</ThemeProvider>
			</BrowserRouter>
			{/* </StrictMode> */}
		</Box>
	);
}
