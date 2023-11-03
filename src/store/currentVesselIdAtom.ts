import { atom } from 'jotai';

const currentVesselIdAtom = atom('');
currentVesselIdAtom.debugLabel = 'CurrentVesselId';

export default currentVesselIdAtom;
