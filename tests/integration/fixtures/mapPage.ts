import type { BrowserContext, Locator, Page } from '@playwright/test';

export class MapPage {
	readonly page: Page;
	readonly context: BrowserContext;
  private readonly MESSAGES_BUTTON: Locator;

	constructor(page: Page, context: BrowserContext) {
		this.page = page;
		this.context = context;
		this.MESSAGES_BUTTON = page.getByLabel('primary section').getByLabel('messages');
	}

  async goto() {
    await this.page.goto(`https://localhost:8080/amver-ui/`);
  }

  async clickMessagesPageButton() {
    await this.MESSAGES_BUTTON.click();
  }
}