/* eslint-disable react-hooks/rules-of-hooks */
import { isLeftSideDrawerOpenAtom, themeModeAtomWithPersistence } from '../store/';

import { useAtom } from 'jotai';
import { useHotkeys } from 'react-hotkeys-hook';

function logKeyCommand(key) {
	console.log(`keyCommand: ${key}`);
}

export function escapeKey() {
	const [, setToggleLeftSideDrawer] = useAtom(isLeftSideDrawerOpenAtom);
	const esc = useHotkeys('Escape', () => {
		logKeyCommand('Escape');

		setToggleLeftSideDrawer((prevState) => !prevState);
	});
	return esc;
}

export function rightSquareBracket() {
	const [themeMode, setTheme] = useAtom(themeModeAtomWithPersistence);
	const esc = useHotkeys(']', () => {
		logKeyCommand(']');
		setTheme((themeMode === 'light' ? 'dark' : 'light'));
		console.log('DARK MODE', themeMode);
	});
	return esc;
}
