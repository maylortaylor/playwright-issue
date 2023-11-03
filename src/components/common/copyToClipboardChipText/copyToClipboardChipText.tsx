import {
	Button,
	Chip,
	ChipOwnProps,
	ChipPropsSizeOverrides,
	ChipPropsVariantOverrides,
	ChipTypeMap,
	IconButton,
	Snackbar,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';

import { OverridableStringUnion } from '@mui/types';

interface CopyToClipboardTextProps {
	text: string;
	chipSize: OverridableStringUnion<'small' | 'medium', ChipPropsSizeOverrides>;
	chipVariant: OverridableStringUnion<
		'filled' | 'outlined',
		ChipPropsVariantOverrides
	>;
}
const CopyToClipboardChipText = (props: CopyToClipboardTextProps) => {
	const [open, setOpen] = useState(false);
	const handleClick = (event, textToCopy) => {
		setOpen(true);
		navigator.clipboard.writeText(textToCopy);
	};

	return (
		<>
			<Chip
				id={`copy-to-clipboard-chip-text-${props.text}`}
				data-test-id={`copy-to-clipboard-chip-text-${props.text}`}
				sx={{
					height: 'auto',
					'& .MuiChip-label': {
						display: 'block',
						whiteSpace: 'normal',
					},
				}}
				label={props.text}
				variant={props.chipVariant}
				size={props.chipSize}
				onClick={(event) => handleClick(event, props.text)}
			/>
			<Snackbar
				open={open}
				onClose={() => setOpen(false)}
				autoHideDuration={2000}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				message="Copied to clipboard"
			/>
		</>
	);
};

export default CopyToClipboardChipText;
