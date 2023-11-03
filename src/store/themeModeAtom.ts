import { atom } from 'jotai';

const LOCAL_STORAGE_THEME_MODE = 'themeMode';
const themeModeDefault = typeof window != 'undefined' ? localStorage.getItem(LOCAL_STORAGE_THEME_MODE) : 'light';
const themeModeAtom = atom(themeModeDefault);
themeModeAtom.debugLabel = 'ThemeMode';

const themeModeAtomWithPersistence = atom(
  (get) => get(themeModeAtom),
  (get, set, newTheme: string) => {
    set(themeModeAtom, newTheme)
    localStorage.setItem(LOCAL_STORAGE_THEME_MODE, newTheme)
  }
)

export default themeModeAtomWithPersistence;
