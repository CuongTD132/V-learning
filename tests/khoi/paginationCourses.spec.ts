import test, { expect } from "@playwright/test";
import { CoursesPage } from "../../pages/CoursesPage";

test.describe("Pagination in Courses Page", () => {

    let coursesPage: CoursesPage;

    test.beforeEach(async ({ page }) => {
        coursesPage = new CoursesPage(page);
        await coursesPage.goToCoursesPage();
    });

    test("Hiển thị thanh phân trang", async () => {
        const pageCount = await coursesPage.getPaginationCount();
        test.info().annotations.push({
            type: "Số trang tìm thấy",
            description: `${pageCount}`
        });

        expect(pageCount).toBeGreaterThan(0);
    });

    test("Kiểm tra nút '< Trước'", async () => {
        // chuyển sang trang 2
        await coursesPage.clickPageByText("2");
        await expect(coursesPage.page).toHaveURL(/page=2/);

        // kiểm tra nút Trước enable
        const isDisabled = await coursesPage.isPrevDisabled();
        expect(isDisabled).toBeFalsy();

        // click nút Trước → quay về trang 1
        await coursesPage.clickPrevious();
        await expect(coursesPage.page).toHaveURL(/page=1/);
    });

    test("Kiểm tra nút 'Sau >'", async () => {
        await coursesPage.clickNextUntilEnd();
        expect(await coursesPage.isNextDisabled()).toBeTruthy();
    });

    test("Kiểm tra hiển thị của '...'", async () => {
        const before = await coursesPage.getPaginationCount();
        const clicked = await coursesPage.clickEllipsisIfVisible();

        if (clicked) {
            const after = await coursesPage.getPaginationCount();
            expect(after).toBeGreaterThan(before);
        } else {
            test.skip(true, "Không có nút '...' trên trang này");
        }
    });

});