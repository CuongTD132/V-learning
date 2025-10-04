import {test} from "@playwright/test";
import {LandingPage} from "../../pages/LandingPage";
import {searchData} from "./data/searchData";

test.describe("Searching Course", () => {
    let landingPage: LandingPage;

    test.beforeEach(async ({page}) => {
        landingPage = new LandingPage(page);
        await landingPage.goToPage();
    })

    test("TC01 - Searching Accessibility", async () => {
        await landingPage.verifySearchBoxVisible()
    })

    for (const data of searchData.valid) {
        test(`${data.id} - ${data.description}`, async () => {
            await landingPage.searchCourse(data);
        })
    }

    for (const data of searchData.invalid) {
        test(`${data.id} - ${data.description}`, async () => {
            await landingPage.searchCourse(data);
        })
    }

    for (const data of searchData.cards) {
        test(`${data.id} - ${data.description}`, async () => {
            await landingPage.searchCourse(data);
        })
    }

    test.skip("TC11 - Verify pagination after search", async () => {
        //TODO
    })

    test.skip("TC12 - Verify search history suggestions", async () => {
        //TODO
    })
})