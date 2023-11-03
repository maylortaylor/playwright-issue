import BGWavesDark from '../assets/images/wave_background_dark.png';
import BGWavesLight from '../assets/images/wave_background_light.png';
import { Container } from '@mui/material';
import React from 'react';
import themeModeAtomWithPersistence from '../../src/store/themeModeAtom';
import { useAtom } from 'jotai';

export default function PageContainerComponent(props: any) {
	const [themeMode] = useAtom(themeModeAtomWithPersistence);
	return (
		<Container
			id="page-container"
			sx={{
				backgroundImage:
					themeMode === 'dark' ? `url(${BGWavesDark})` : `url(${BGWavesLight})`,
				maxWidth: {
					xs: '84%',
					sm: '86%',
					md: '90%',
					lg: '93%',
				},
				marginRight: {
					xs: '15px',
				},
			}}
			disableGutters
		>
			{props.children}
		</Container>
	);
}
