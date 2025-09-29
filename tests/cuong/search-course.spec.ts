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

    test("TC01: Searching Accessibility", async () => {
        // await expect(landingPage.page.getByPlaceholder("Tìm kiếm", {exact: true}).first()).toBeVisible()
        await expect(landingPage.page.locator('section.header input.searchForm')).toBeVisible();
    })

    test("TC02: Search with valid keywords", async () => {
        await landingPage.searchCourse("node js", 1)
    })

    test("TC03: Search with keywords not in system", async () => {
        await landingPage.searchCourse("khongcodulieu", 0)
    })

    test("TC04: Search with keyword without accent", async () => {
        await landingPage.searchCourse("lap trinh web", 1)
    })

    test("TC05: Search using the magnifying glass icon", async () => {
        await landingPage.searchCourse( "Front end", 2)
    })

    test("TC06: Search and filter courses by category: Back End", async () => {
        await landingPage.searchCourse("JavaScript", 1, {category: ["Back End"]})
    })

    test("TC07: Search and filter courses by level: Cao cấp", async () => {
        await landingPage.searchCourse("JavaScript", 1, {level: ["Cao cấp"]})
    })

    test("TC08: Search and filter courses by rating: 4 stars", async () => {
        await landingPage.searchCourse("JavaScript", 1, {rating: 4})
    })

    test("TC09: Search and filter courses with multiple filters applied", async () => {
        await landingPage.searchCourse("JavaScript", 1, {category: ["Back End"], level: ["Cao cấp"], rating: 4})
    })
    test("TC10: Verify each course card displays full information", async () => {
        await landingPage.searchCourse("node js", 3)
    })

    test.skip("TC11: Verify pagination after search", async () => {
        //TODO
    })

    test.skip("TC12: Verify search history suggestions", async () => {
        //TODO
    })
})