import test, { expect } from "@playwright/test";
import { CoursesPage } from "../../pages/CoursesPage";
import { log } from "console";

test.describe("Courses Page", () => {

    let coursesPage: CoursesPage;

    test.setTimeout(300000); // Tăng thời gian chờ cho toàn bộ mô tả

    test.beforeEach(async ({ page }) => {
        coursesPage = new CoursesPage(page);
        await coursesPage.goToCoursesPage();
    });

    test("Kiểm tra chuyển trang khi click vào các Khóa học", async () => {
        let hasNextPage = true;
        let totalCoursesChecked = 0;
        let currentPageNum = await coursesPage.getCurrentPageNumber();

        while (hasNextPage) {
            console.log(`\n📄 Đang kiểm tra trang ${currentPageNum}`);

            // Lưu lại số trang hiện tại để quay về sau khi kiểm tra chi tiết khóa học
            const savedPageNum = await coursesPage.getCurrentPageNumber();

            // Lấy số lượng khóa học trong trang hiện tại
            const courseCount = await coursesPage.getCourseCount();
            console.log(`   Tìm thấy ${courseCount} khóa học`);

            // Kiểm tra khóa học
            for (let j = 0; j < courseCount; j++) {
                console.log(`   ✓ Kiểm tra khóa học ${j + 1}/${courseCount}`);

                await coursesPage.clickCourseByIndex(j);

                // Kiểm tra URL có chuyển đến trang chi tiết không
                await expect(coursesPage.page).toHaveURL(/.*\/chitiet/);

                const url = coursesPage.page.url();
                const courseId = url.split("/chitiet/")[1]?.split("/")[0];
                log(`      - ID khóa học: ${courseId}`);

                await coursesPage.goBackToCoursesAndReturnToPage(savedPageNum);

                totalCoursesChecked++;
            }

            // Chuyển sang trang tiếp theo
            console.log(`   Đang chuyển sang trang ${currentPageNum + 1}...`);
            hasNextPage = await coursesPage.clickNextPage();

            if (hasNextPage) {
                currentPageNum = await coursesPage.getCurrentPageNumber();
            } else {
                console.log(`\n✅ Đã kiểm tra xong tất cả ${currentPageNum} trang`);
                console.log(`📊 Tổng số khóa học đã kiểm tra: ${totalCoursesChecked}`);
            }
        }

        // Đảm bảo đã kiểm tra ít nhất 1 khóa học
        expect(totalCoursesChecked).toBeGreaterThan(0);
    });
});