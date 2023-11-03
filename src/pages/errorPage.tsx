import { Container } from '@mui/system';
import PageContainerComponent from '../../src/layouts/pageContainer';
import React from 'react';
import Typography from '@mui/material/Typography';

class ErrorPage extends React.Component {
	constructor(props: any) {
		super(props);
	}

	componentDidMount() {}

	render() {
		return (
			<PageContainerComponent>
				<Container
					sx={{
						backgroundColor: 'darkred',
						alignItems: 'center',
						display: 'grid',
					}}
					disableGutters
				>
					<Typography
						variant="h1"
						color="text.primary"
						sx={{
							textAlign: 'center',
						}}
					>
						Oops! <br />
						An error has occured.
					</Typography>
				</Container>
			</PageContainerComponent>
		);
	}
}

export default ErrorPage;
