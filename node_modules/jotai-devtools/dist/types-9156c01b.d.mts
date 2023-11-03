import { useStore } from 'jotai/react';
import { createStore, Atom } from 'jotai/vanilla';

type Store = ReturnType<typeof createStore>;
type Options = Parameters<typeof useStore>[0];
type AnyAtomValue = unknown;
type AnyAtom = Atom<AnyAtomValue>;
type AtomsValues = Map<AnyAtom, AnyAtomValue>;
type AtomsDependents = Map<AnyAtom, Set<AnyAtom>>;
type AtomsSnapshot = Readonly<{
    values: AtomsValues;
    dependents: AtomsDependents;
}>;

export { AtomsSnapshot as A, Options as O, Store as S };
