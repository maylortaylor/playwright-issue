import { Checkbox, FormControlLabel } from '@mui/material';
import { PrimitiveAtom, useAtom } from 'jotai';

import { ImageryProviderLayer } from '../../store/imageryProviderLayersAtom';
import React from 'react';

interface MapImageryProviderCheckboxProps {
	atom: PrimitiveAtom<ImageryProviderLayer>;
	imageryType: string;
}

export default function MapImageryProviderCheckboxComponent({
	atom,
	imageryType,
}: MapImageryProviderCheckboxProps) {
	const [item, toggleItem] = useAtom(atom);
	// const toggleChecked = () =>
	// toggleItem((props: any) => ({ ...props, checked: !props.checked }));
	// toggleItem((item) => (item.checked = !item.checked));

	return (
		<FormControlLabel
			key={imageryType}
			label={imageryType}
			labelPlacement="end"
			value={imageryType}
			sx={{
				color: 'text.secondary',
			}}
			control={
				<Checkbox
					key={imageryType}
					aria-label={imageryType}
					checked={item.checked}
					color="info"
					onChange={() => toggleItem(item.checked)}
				/>
			}
		/>
	);
}
