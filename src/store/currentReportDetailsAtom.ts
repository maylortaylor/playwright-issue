import { ReportMessageDetails, ReportMessageDetailsSchema } from '../types/apis/reportDetails';

import { atom } from 'jotai';
import getDefaults from '../../src/utils/zodDefaults';

const defaults = getDefaults(ReportMessageDetailsSchema);
const currentReportDetailsAtom = atom<ReportMessageDetails>(defaults as ReportMessageDetails);
currentReportDetailsAtom.debugLabel = 'CurrentReportDetails';

export default currentReportDetailsAtom;
