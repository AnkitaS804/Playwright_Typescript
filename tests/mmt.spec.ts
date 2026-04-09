import { test } from '@playwright/test';
import { MmtPage } from '../page/mmtPage';

test('test', async ({ page }) => {
  const mmt = new MmtPage(page);
  await mmt.goto();

  await mmt.closePopUp();
  await mmt.openFlightsTab();
  await mmt.selectRoundTrip();
  await mmt.verifyHomePage();

  await mmt.fillFrom('Kolkata');
  await mmt.fillTo('Pune');

  await mmt.selectDepartureDate('Thu Apr 16 2026');
  await mmt.clickNextMonth();
  await mmt.selectReturnDate('Sun May 03 2026');

  await mmt.configurePassengers();
  await mmt.searchFlights();
});

