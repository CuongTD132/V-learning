import { test, expect, Locator, Page } from '@playwright/test';
import { CoursesDetailPage } from '../../pages/CoursesDetailPage';
import { SELECTED_COURSSE_ID, TIMEOUT, COURSE_NAME } from '../../utils/SCRUM-22-Util';

test.describe('UI Check Course Detail Page', () => {
    let coursesDetailPage: CoursesDetailPage;

    test.beforeEach(async ({ page }) => {
        coursesDetailPage = new CoursesDetailPage(page);
        await coursesDetailPage.goToDetailPage(SELECTED_COURSSE_ID as number);
    });

    // Test case: TC01
    test('TC01: GUI check - Hiển thị 3 section trên màn hình.', async () => {
        // danh sách các phần tử cần kiểm tra hiển thị
        let layoutElements: Locator[] = [
            coursesDetailPage.titleCourse,
            coursesDetailPage.detailCoursesContent,
            coursesDetailPage.relatedCourses,
        ];

        // duyệt qua từng phần tử và kiểm tra đã hiển thị hay chưa
        for (const element of layoutElements) {
            await expect(element).toBeVisible({ timeout: TIMEOUT as number});
        }
    });

    // Test case: TC02
    test('TC02: GUI check - Label Header hiển thị "THÔNG TIN KHOÁ HỌC".', async() => {
       const titleCourseHeader = coursesDetailPage.titleCourse.locator("h3");
    
       // kiểm tra hiển thị và có text hay không
       await expect(titleCourseHeader).toBeVisible({timeout: TIMEOUT as number});
       await expect(titleCourseHeader).toHaveText("THÔNG TIN KHOÁ HỌC");
    });

    // Test case: TC03
    test('TC03: GUI check - Label Header hiển thị "Tiến lên và không chần chừ".', async() => {
       const titleCourseSubHeader = coursesDetailPage.titleCourse.locator("p");
    
       // kiểm tra hiển thị và có text hay không
       await expect(titleCourseSubHeader).toBeVisible({timeout: TIMEOUT as number});
       await expect(titleCourseSubHeader).toHaveText("Tiến lên và không chần chừ");
    });

    // Test case: TC04
    test('TC04: GUI check - Hiển thị tên khoá học.', async() => {
        const courseName = coursesDetailPage.detailCoursesContent.locator('.titleDetailCourse');

        // kiểm tra hiển thị và có text hay không
       await expect(courseName).toBeVisible({timeout: TIMEOUT as number});
       await expect(courseName).toHaveText(COURSE_NAME);
    });
});