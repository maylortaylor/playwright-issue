import { expect, test } from '@playwright/experimental-ct-react';

// import test from '../../integration/lib/baseTest';
// import MessagesUtilityListPage from '../../../src/pages/messagesUtilityList/messagesUtilityListPage'
import React from 'react';

const MyComponent: React.FC<{name: string}> = ({name}) => <div>Hello {name}</div>;

test.describe('@Smoke MessagesUtilityListPage', () => {
	test('should work', async ({ mount }) => {
		const component = await mount(<MyComponent name="World" />);
		// the component should mount
		await expect(1).toBe(1);
	});
  // test.skip('1', async ({mount}) => {
  //   // expect(1 + 1).toEqual(2);
	// 	const clicked = false;

	// 	// Mount a component. Returns locator pointing to the component.
	// 	const component = await mount(
	// 		<MessagesUtilityListPage />
	// 	);

	// 	// As with any Playwright test, assert locator text.
	// 	await expect(component).toContainText('Submit');

	// 	// Perform locator click. This will trigger the event.
	// 	await component.click();

	// 	// Assert that respective events have been fired.
	// 	expect(clicked).toBeTruthy();
  // });
});

// test('@Smoke 1', () => {
  // const component = renderer.create(
  //   <MessagesUtilityListPage />
  // );
  // let tree = component.toJSON();
  // expect(tree).toMatchSnapshot();

  // // manually trigger the callback
  // renderer.act(() => {
  //   tree.props.onMouseEnter();
  // });
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();

  // // manually trigger the callback
  // renderer.act(() => {
  //   tree.props.onMouseLeave();
  // });
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
// });

// test(`@Smoke ClickOn View Report Button`, async () => {
// 	const tree = renderer.create(<MessagesUtilityListPage />).toJSON();
// 	expect(tree).toMatchSnapshot();
// });

// test(`@Smoke 2`, async () => {
// 	expect(1).toBe(1)
// });

	// let component;
	// act(() => {
	// 	component = create(
	// 		<MessagesUtilityListPage />
	// 	);
	// })
	// const instance = component.root;
	// const button = instance.findByType("button");
	// act(() => button.props.onClick());
	// expect(button.props.children).toBe("PROCEED TO CHECKOUT");
	// component.handleTabChange(null, 0);
	// expect(component.state.tabValue).toBe(0);


	// await messagesUtilityListPage.page.route('/v1/messages?*', async (route) =>
	// 	await route.fulfill({
	// 		status: 200,
	// 		contentType: 'application/json',
	// 		// path: '../../mockData/messagesSmall.mockData.json'
	// 		body: JSON.stringify({
	// 			"messages": [
	// 					{
	// 							"messageId": "test-ba173ea2-32c1-404e-a472-03be9bb12926",
	// 							"dateReceived": "2022-11-04T12:22:03.000Z",
	// 							"reportType": "Position Report",
	// 							"vesselName": "TEST",
	// 							"imoNumber": null,
	// 							"callSign": "LAEC8",
	// 							"position": null,
	// 							"status": 3,
	// 							"attention": null,
	// 							"keywords": []
	// 					},
	// 					{
	// 							"messageId": "d6ac2e80-725f-49aa-a7d4-f9de55788dac",
	// 							"dateReceived": "2022-11-03T18:12:03.000Z",
	// 							"reportType": "Position Report",
	// 							"vesselName": "SEAWAYS ATHENS",
	// 							"imoNumber": null,
	// 							"callSign": "V7WR9",
	// 							"position": null,
	// 							"status": 3,
	// 							"attention": null,
	// 							"keywords": []
	// 					}
	// 			]
	// 		})
	// 	})
	// );
	// await messagesUtilityListPage.goto();
	// await messagesUtilityListPage.clickViewReportButton();
	// await expect(messagesUtilityListPage.page).toHaveURL(`/message_id=/${messagesUtilityListPage.itemIndex}`);

