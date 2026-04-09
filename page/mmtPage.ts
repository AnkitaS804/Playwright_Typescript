import { expect, Locator, Page } from '@playwright/test';

export class MmtPage {
  readonly page: Page;
  readonly closeModalBtn: Locator;
  readonly flightMenu: Locator;
  readonly minimizeBtn: Locator;
  readonly roundTripBtn: Locator;
  readonly siteLogo: Locator;
  readonly fromInput: Locator;
  readonly toInput: Locator;
  readonly departureField: Locator;
  readonly passengersField: Locator;
  readonly adultsOption: Locator;
  readonly travelClassOption: Locator;
  readonly applyBtn: Locator;
  readonly searchBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.closeModalBtn = page.locator('span[data-cy="closeModal"]');
    this.flightMenu = page.locator('li[data-cy="menu_Flights"]');
    this.minimizeBtn = page.getByRole('img', { name: 'minimize' });
    this.roundTripBtn = page.locator('li[data-cy="roundTrip"]');
    this.siteLogo = page.locator('.mmtLogo.makeFlex');
    this.fromInput = page.getByLabel('From');
    this.toInput = page.getByLabel('To');
    this.departureField = page.locator('.lbl_input.appendBottom10', { hasText: 'Departure' });
    this.passengersField = page.locator('.lbl_input.appendBottom5');
    this.adultsOption = page.locator('li[data-cy="adults-2"]');
    this.travelClassOption = page.locator('li[data-cy="travelClass-2"]');
    this.applyBtn = page.locator('.primaryBtn.btnApply.pushRight');
    this.searchBtn = page.locator('.primaryBtn.font24.latoBold.widgetSearchBtn');
  }

  async goto() {
    await this.page.goto('https://www.makemytrip.com/');
  }

  async closePopUp() {
    await this.closeModalBtn.click();
  }

  async openFlightsTab() {
    await this.flightMenu.click();
  }

  async selectRoundTrip() {
    await this.minimizeBtn.click();
    await this.roundTripBtn.click();
  }

  async verifyHomePage() {
    await expect(this.siteLogo).toBeVisible();
  }

  async fillFrom(city: string) {
    await this.fromInput.click();
    const combo = this.page.locator('div[role="combobox"] input[type="text"]');
    await combo.fill(city);
    await this.page.getByRole('option', { name: `${city}, India` }).first().click();
  }

  async fillTo(city: string) {
    await this.toInput.click();
    const combo = this.page.locator('div[role="combobox"] input[type="text"]');
    await combo.fill(city);
    await this.page.getByRole('option', { name: `${city}, India` }).first().click();
  }

  async selectDepartureDate(ariaLabel: string) {
    await this.departureField.click();
    await this.page.locator(`div[aria-label="${ariaLabel}"]`).click();
  }

   async clickNextMonth() {
    await this.page.locator('[aria-label="Next Month"]').click();
  }

  async selectReturnDate(ariaLabel: string) {
    await this.page.locator(`div[aria-label="${ariaLabel}"]`).click();
  }

  async configurePassengers() {
    await this.passengersField.click();
    await this.adultsOption.click();
    await this.travelClassOption.click();
    await this.applyBtn.click();
  }

  async searchFlights() {
    await this.searchBtn.click();
  }
}
