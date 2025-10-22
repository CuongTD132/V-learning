import { test, expect } from "@playwright/test"
import { CoursesDetailPage } from "../../pages/CoursesDetailPage"
import { SELECTED_COURSSE_ID,
         PREVIEW_BUTTON_HOVER_BGCOLOR 
} from '../../utils/courseDetailPageUtil'

test.describe("Course Detail Left Page Feature", async() => {
    let coursesDetailPage: CoursesDetailPage;
    
    test.beforeEach(async ({ page }) => {
        coursesDetailPage = new CoursesDetailPage(page);
        await coursesDetailPage.goToDetailPage(Number(SELECTED_COURSSE_ID));
    });

    test('TC01: Feature check - Hiển thị nút nhấn "Xem trước".', async() => {
        const count = await coursesDetailPage.previewButtons.count();
        for(let i = 0; i < count - 1; i++) {
            const previewButton = coursesDetailPage.previewButtons.nth(i);
            await previewButton.scrollIntoViewIfNeeded();
            await previewButton.hover();

            const bg = await previewButton.evaluate(el => {
                const color = getComputedStyle(el).backgroundColor;
                // color có dạng "rgba(65, 178, 148, 0.094)"
                const [r, g, b] = color.match(/\d+/g)!.slice(0, 3);
                return `rgb(${r}, ${g}, ${b})`;
            });

            expect(bg).toBe(PREVIEW_BUTTON_HOVER_BGCOLOR);

        }
    });

    test('TC02: Feature check - Bấm nút "Xem trước" và hiển thị màn hình loading.', async({page}) => {
        for(let i = 0; i < await coursesDetailPage.previewButtons.count(); i++) {
            const previewButton = coursesDetailPage.previewButtons.nth(i);
            await previewButton.click();

            await expect(page.locator('#loading'), `Nút "XEM TRƯỚC" thứ ${i} chưa xử lý hành vi bấm nút`).toBeVisible();
        }
    });

    test.skip('TC03: Feature check - Bấm nút "Xem trước" và hiển thị popup chứa video xem trước.', async() => {
        // Test case bị blocked do chức năng chưa được thực hiện
    });

    test.skip('TC04: Feature check - Hiển thị giao diện popup.', async() => {
        // Test case bị blocked do chức năng chưa được thực hiện
    });

    test.skip('TC05: Feature check - Thao tác trên giao diện video xem trước.', async() => {
        // Test case bị blocked do chức năng chưa được thực hiện
    });

    test.skip('TC06: Feature check - Bấm nút "Đóng" để tắt popup.', async() => {
        // Test case bị blocked do chức năng chưa được thực hiện
    });
});