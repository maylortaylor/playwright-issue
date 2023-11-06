import { Box, CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { StrictMode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getDesignTokens, getThemedComponents } from '../theme';

import { DevTools } from 'jotai-devtools';
import MainLayoutComponent from '../layouts/mainLayout';
import MessagesUtilityListPage from '../pages/messagesUtilityList/messagesUtilityListPage';
import { deepmerge } from '@mui/utils';
import themeModeAtomWithPersistence from '../store/themeModeAtom';
import { useAtom } from 'jotai';
import { useMemo } from 'react';

export default function AppComponent() {
	const [themeMode] = useAtom(themeModeAtomWithPersistence);

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
							<Route index element={<MessagesUtilityListPage />} />
							<Route
								index
								path="/amver-ui/messages/"
								element={<MessagesUtilityListPage />}
							/>
						</Route>
					</Routes>
				</ThemeProvider>
			</BrowserRouter>
			{/* </StrictMode> */}
		</Box>
	);
}
