import { atom } from 'jotai';

const appLoadingAtom = atom(false);
appLoadingAtom.debugLabel = 'AppLoading';

export default appLoadingAtom;
