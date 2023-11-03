import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from '@mui/material';

import { ExpandMore } from '@mui/icons-material';
import React from 'react';

interface DevCodeProps {
	itemToDisplay: any;
}

export default function DevCode(props: DevCodeProps) {
	if (process.env.EXPERIMENTAL === 'false') {
		return null;
	}

	return (
		<Container
			id="dev-code"
			data-test-id="dev-code"
			disableGutters

			sx={{
				flexGrow: 1,
				overflow: 'auto',
			}}
		>
			<Accordion
				sx={{
					border: 'dashed red',
					backgroundColor: 'darkgray',
				}}>
				<AccordionSummary
					expandIcon={<ExpandMore />}
				>
					<Typography variant='h6' color='error'>Dev Code</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography component='pre'>
							{JSON.stringify(props.itemToDisplay, null, 2)}
					</Typography>
				</AccordionDetails>
			</Accordion>
		</Container>
	);
}
