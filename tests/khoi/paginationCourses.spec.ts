import test, { expect } from "@playwright/test";
import { CoursesPage } from "../../pages/CoursesPage";

test.describe("Pagination in Courses Page", () => {

    let coursesPage: CoursesPage;

    test.beforeEach(async ({ page }) => {
        coursesPage = new CoursesPage(page);
        await coursesPage.goToCoursesPage();
    });
    
    test('TC6 - Hiển thị loader khi chuyển trang', async () => {
        await coursesPage.clickNext();
        expect(await coursesPage.isLoader()).toBeTruthy();
    });

    test('TC9.1 - Trang đầu: nút "Trước" không có tác dụng', async () => {
        const currentPage = await coursesPage.getCurrentPageNumber();

        // Đang ở trang đầu
        expect(currentPage).toBe(1);

        // Nút "Trước" disabled
        expect(coursesPage.isPrevDisabled).toBeTruthy();
    });

    test('TC9.2 - Trang cuối: nút "Sau" không có tác dụng', async () => {

        await coursesPage.goToLastPage();

        // Nút "Sau" disabled
        expect(coursesPage.isNextDisabled).toBeTruthy();
    });

    test('TC9.3 - Nút "Trước" và "Sau" hoạt động', async () => {
        await coursesPage.clickNext();
        expect(await coursesPage.getCurrentPageNumber()).toBe(2);

        await coursesPage.clickPrevious(); 
        expect(await coursesPage.getCurrentPageNumber()).toBe(1);
    });

});