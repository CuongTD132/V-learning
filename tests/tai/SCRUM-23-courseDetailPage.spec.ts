import { test, expect } from "@playwright/test"
import { CoursesDetailPage } from "../../pages/CoursesDetailPage"
import { SELECTED_COURSSE_ID, 
         TIMEOUT, 
         PREVIEW_BUTTON_HOVER_BGCOLOR 
} from '../../utils/SCRUM-23-Util'

test.describe("Course Detail Left Page Feature", async() => {
    let coursesDetailPage: CoursesDetailPage;
    
    test.beforeEach(async ({ page }) => {
        coursesDetailPage = new CoursesDetailPage(page);
        await coursesDetailPage.goToDetailPage(Number(SELECTED_COURSSE_ID));
    });

    test('TC01: Feature check - Hiển thị nút nhấn "Xem trước".', async({page}) => {
        for(let i = 0; i < await coursesDetailPage.previewButtons.count(); i++) {
            const previewButton = coursesDetailPage.previewButtons.nth(i);
            await previewButton.hover();
            await page.waitForTimeout(Number(TIMEOUT));

            const bg = await previewButton.evaluate(el => getComputedStyle(el).backgroundColor);

            expect(bg).toBe(PREVIEW_BUTTON_HOVER_BGCOLOR);
        }
    });

    test('TC02: Feature check - Bấm nút "Xem trước" và hiển thị màn hình loading.', async({page}) => {
        for(let i = 0; i < await coursesDetailPage.previewButtons.count(); i++) {
            const previewButton = coursesDetailPage.previewButtons.nth(i);
            await previewButton.click();

            await expect(page.locator('#loading'), `Nút "XEM TRƯỚC" thứ ${i} chưa xử lý hành vi bấm nút`).toBeVisible({timeout: Number(TIMEOUT)});
        }
    });
});