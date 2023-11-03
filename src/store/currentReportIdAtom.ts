import { atom } from 'jotai';

const currentReportIdAtom = atom('');
currentReportIdAtom.debugLabel = 'CurrentReportId';

export default currentReportIdAtom;
