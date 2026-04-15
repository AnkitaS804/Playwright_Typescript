import { test } from '@playwright/test';
import { MmtPage } from '../page/mmtPage';
import testData from '../testdata/flightdata.json';

testData.forEach((data) => {
  test(`Flight search from ${data.fromCity} to ${data.toCity}`, async ({ page }) => {
    const mmt = new MmtPage(page);
    await mmt.goto();

    await mmt.closePopUp();
    await mmt.openFlightsTab();
    await mmt.selectRoundTrip();
    await mmt.verifyHomePage();

    await mmt.fillFrom(data.fromCity);
    await mmt.fillTo(data.toCity);

    await mmt.selectDepartureDate(data.departureDate);
    await mmt.clickNextMonth();
    await mmt.selectReturnDate(data.returnDate);

    await mmt.configurePassengers();
    await mmt.searchFlights();
  });
});

