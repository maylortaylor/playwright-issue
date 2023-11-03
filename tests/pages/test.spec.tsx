import { expect, test } from '@playwright/experimental-ct-react';
import renderer, { ReactTestRendererJSON, create } from 'react-test-renderer';

import AppComponent from '../../src/App/App';
import MessagesUtilityListPage from '../../src/pages/messagesUtilityList/messagesUtilityListPage';
import React from 'react';

// test('@Smoke renders correctly', () => {
// 	const tree = TestRenderer.create(<MessagesUtilityListPage />).toJSON();
// 	expect(tree).toMatchSnapshot();
// });

test('@Smoke 2', () => {
	const tree = create(<AppComponent />).toJSON() as ReactTestRendererJSON;
	console.log(tree);
	tree.forEach((node) => {
		expect(node.children?.length).toBe(1);
	});
	// expect(testInstance.findByType(SubComponent).props.foo).toBe('bar');
	// expect(testInstance.findByProps({className: "sub"}).children).toEqual(['Sub']);
});
