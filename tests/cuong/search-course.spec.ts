import {expect, Locator, test} from "@playwright/test";
import {LandingPage} from "../../pages/LandingPage";

test.describe("Searching Course", () => {
    let landingPage: LandingPage;
    let searchTitle: Locator;

    test.beforeEach(async ({page}) => {
        landingPage = new LandingPage(page);
        await landingPage.goToPage();
        searchTitle = page.getByPlaceholder("Tìm kiếm");
    })

    test("Searching Accessibility", async () => {
        // await expect(landingPage.page.getByPlaceholder("Tìm kiếm", {exact: true}).first()).toBeVisible()
        await expect(landingPage.page.locator('section.header input.searchForm')).toBeVisible();
    })

})