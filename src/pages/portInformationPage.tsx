import { Container, Typography } from '@mui/material';

import DataTableComponent from '../components/common/dataTable/dataTableComponent';
import PageContainerComponent from '../../src/layouts/pageContainer';
import React from 'react';

class PortInformationPage extends React.Component {
	constructor(props: any) {
		super(props);
	}

	componentDidMount() {}

	render() {
		return (
			<PageContainerComponent>
				<Typography
					variant="h1"
					sx={{
						textAlign: 'center',
					}}
				>
					Port Information
				</Typography>
			</PageContainerComponent>
		);
	}
}

export default PortInformationPage;
