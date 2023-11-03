import { BrowserContext, Page } from '@playwright/test';

export class WebActions {
	readonly page: Page;
	readonly context: BrowserContext;

	constructor(page: Page, context: BrowserContext) {
			this.page = page;
			this.context = context;
	}

	async delay(time: number): Promise<void> {
			return new Promise(function (resolve) {
					setTimeout(resolve, time);
			});
	}

	async clickByText(text: string): Promise<void> {
			await this.page.getByText(text, { exact: true }).click();  //Matches locator with exact text and clicks
	}

	async clickElementJS(locator: string): Promise<void> {
			await this.page.$eval(locator, (element: HTMLElement) => element.click());
	}
}