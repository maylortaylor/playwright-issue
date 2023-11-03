import { MapPage } from '../fixtures/mapPage';
import { MessagesUtilityListPage } from '../fixtures/messagesUtilityListPage';
import { test as baseTest } from '@playwright/test';

const test = baseTest.extend<{
	messagesUtilityListPage: MessagesUtilityListPage;
	mapPage: MapPage;
}>({
	messagesUtilityListPage: async ({ page, context }, use) => {
    await use(new MessagesUtilityListPage(page, context));
  },
	mapPage: async ({ page, context }, use) => {
		await use(new MapPage(page, context));
}
})

export default test;