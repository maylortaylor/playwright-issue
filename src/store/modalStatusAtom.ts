import { atom } from 'jotai';

const modalStatusAtom = atom({reportDetailsModalOpen: false, vesselDetailsModalOpen: false});
modalStatusAtom.debugLabel = 'ModalStatus';

export default modalStatusAtom;
