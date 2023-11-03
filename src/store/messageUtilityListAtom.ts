import { ReportMessageSchema } from 'apis/reportMessage';
import { atom } from 'jotai';
import { z } from 'zod';

const messageUtilityListAtom = atom<Array<z.infer<typeof ReportMessageSchema>>>([]);
messageUtilityListAtom.debugLabel = 'MessageUtilityList';

export default messageUtilityListAtom;
