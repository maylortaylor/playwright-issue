import { VesselDetails, VesselDetailsSchema } from '../types/apis/vesselDetails';

import { atom } from 'jotai';
import getDefaults from '../../src/utils/zodDefaults';

const defaults = getDefaults(VesselDetailsSchema);
const currentVesselDetailsAtom = atom<VesselDetails>(defaults as VesselDetails);
currentVesselDetailsAtom.debugLabel = 'CurrentVesselDetails';

export default currentVesselDetailsAtom;
