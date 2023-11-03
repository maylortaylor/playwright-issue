import { WritableAtom, atom } from 'jotai';

export function atomWithToggle(
	labelName: string,
	initialValue?: boolean,
): WritableAtom<boolean, unknown[], any> {
	const anAtom = atom(initialValue, (get, set, nextValue?: boolean) => {
		const update = nextValue ?? !get(anAtom);
		set(anAtom, update);
	});

	anAtom.debugLabel = labelName;
	return anAtom as WritableAtom<boolean, unknown[], any>;
}

export type ImageryProviderLayer = {
	name: string;
	checked: any;
};

type LayerType = {
	name: string;
	layer: any;
};

export type Layers = {
	layers: LayerType[];
};

const imageryProviderLayersInfraredAtom = atomWithToggle(
	'ImagerLayer_Infrared',
	false,
);
const imageryProviderLayersRadarAtom = atomWithToggle(
	'ImagerLayer_Radar',
	false,
);

export const imageryProviderAtom: Layers = {
	layers: [
		{ name: 'Infrared', layer: imageryProviderLayersInfraredAtom },
		{ name: 'Radar', layer: imageryProviderLayersRadarAtom },
	],
};
