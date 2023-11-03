import { atom } from 'jotai';

const clockAtom = atom('');
clockAtom.debugLabel = 'Clock';

export default clockAtom;