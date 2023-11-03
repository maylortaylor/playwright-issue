import './hyperLinkText.scss';

import { Link, Typography } from '@mui/material';

import React from 'react';

interface HyperLinkTextProps {
	id: string;
	text: string;
	hrefUrl?: string;
	onClickAction?: () => void;
}
const HyperLinkText = (props: HyperLinkTextProps) => {
	return (
		<div id={props.id} data-test-id={props.id}>
			{
				props.hrefUrl != null ?
				<Link
					href={props.hrefUrl}
					underline="always"
					variant="body2"
					target="_blank"
					rel="noopener"
					onClick={props.onClickAction}
				>
					{props.text}
				</Link>
			:
				<Typography
					className="hyperlink"
					onClick={props.onClickAction}
				>
					{props.text}
				</Typography>
			}

		</div>
	);
};

export default HyperLinkText;
