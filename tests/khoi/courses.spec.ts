import test, { expect } from "@playwright/test";
import { CoursesPage } from "../../pages/CoursesPage";

test.describe("Courses Page", () => {

    let coursesPage: CoursesPage;

    test.setTimeout(3000000);

    test.beforeEach(async ({ page }) => {
        coursesPage = new CoursesPage(page);
        await coursesPage.goToCoursesPage();
    });

    test("Kiểm tra chuyển trang khi click vào các Khóa học", async () => {
        let totalPages = await coursesPage.getPageCount();
        let totalCoursesChecked = 0;
        let currentPageNum = await coursesPage.getCurrentPageNumber();

        console.log(`Tổng số trang: ${totalPages}`);
        for(let i = 1; i <= totalPages; i++){
            console.log(`\nĐang kiểm tra trang ${currentPageNum}`);
            
            // Dùng để lưu trang
            let savedPageNum = await coursesPage.getCurrentPageNumber();

            // Đếm số khóa học
            const courseCount = await coursesPage.getCourseCount();

            // Click từng khóa học
            for (let j = 0; j < courseCount; j++) {
                await coursesPage.clickCourseByIndex(j);
                await expect(coursesPage.page).toHaveURL(/.*\/chitiet/);

                const url = coursesPage.page.url();
                const courseId = url.split("/chitiet/")[1]?.split("/")[0];
                console.log(`Khóa học ${j + 1} -> ID: ${courseId}`);
                
                // Quay lại trang Khóa học và trở về đúng trang đã lưu
                await coursesPage.goBackToPreviousPage(savedPageNum);
                
                // Đếm số khóa học
                totalCoursesChecked++;
            }
            // Chuyển sang trang tiếp theo
            let clickNextPage = await coursesPage.clickNextPage();

            if(clickNextPage) {
                currentPageNum = await coursesPage.getCurrentPageNumber();
            } else {
                console.log("Tổng số khóa học: " + totalCoursesChecked);
                break;
            }
        }
        
    });

});