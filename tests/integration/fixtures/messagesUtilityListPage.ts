import type { BrowserContext, Locator, Page } from '@playwright/test';

export class MessagesUtilityListPage {
	readonly page: Page;
	readonly context: BrowserContext;
	readonly itemIndex: string;
  private readonly VIEW_REPORT_BUTTON: Locator;

	constructor(page: Page, context: BrowserContext) {
		this.page = page;
		this.context = context;
		this.itemIndex = 'ba173ea2-32c1-404e-a472-03be9bb12926';
		this.VIEW_REPORT_BUTTON = page.locator(`#view-report-button-${this.itemIndex}`);
}

  async goto() {
    await this.page.goto(`https://localhost:8080/amver-ui/messages/?tab=All`);
  }

  async clickViewReportButton() {
    await this.VIEW_REPORT_BUTTON.click();
  }
}