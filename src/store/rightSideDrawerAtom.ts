import { atom } from 'jotai';

const isRightSideDrawerOpenAtom = atom(false);
isRightSideDrawerOpenAtom.debugLabel = 'IsRightSideDrawerOpen';

export default isRightSideDrawerOpenAtom;
