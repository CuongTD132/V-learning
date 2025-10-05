import { test, expect } from "@playwright/test"
import { CoursesDetailPage } from "../../pages/CoursesDetailPage"
import { SELECTED_COURSSE_ID, 
         TIMEOUT, 
         PREVIEW_BUTTON_HOVER_BGCOLOR,
         LOGIN_URL,
         SAMPLE_PROMOTION_CODE
} from '../../utils/SCRUM-24-Util'
import { access } from "fs";

test.describe("Course Detail Right Page Feature", async() => {
    let coursesDetailPage: CoursesDetailPage;
    
    test.beforeEach(async ({ page }) => {
        coursesDetailPage = new CoursesDetailPage(page);
        await coursesDetailPage.goToDetailPage(Number(SELECTED_COURSSE_ID));
    });

    test('TC01: Feature check - Hover nút nhấn "Đăng ký".', async({page}) => {

        await coursesDetailPage.enrollButton.hover();
        await page.waitForTimeout(Number(TIMEOUT));

        const bg = await coursesDetailPage.enrollButton.evaluate(el => getComputedStyle(el).backgroundColor);

        expect(bg).toBe(PREVIEW_BUTTON_HOVER_BGCOLOR);
    });

    test('TC02: Feature check - Bấm nút nhấn "Đăng ký" khi chưa đăng nhập', async({page}) => {
        // Đọc localStorage để lấy key credentials
        const credentials = await page.evaluate(() => 
            localStorage.getItem('credentials'), 
        {timeout: Number(TIMEOUT)});

        // thực hiện click nút "ĐĂNG KÝ"
        await coursesDetailPage.enrollButton.click();

        // kiểm tra nếu không có credentials thì redirect về login page
        if(!credentials) {
            await expect(page).toHaveURL(`${LOGIN_URL}`, {timeout: Number(TIMEOUT)});
        }

    });

    test('TC03: Feature check - Bấm nút nhấn "Đăng ký" khi đăng nhập thành công', async({page}) => {
        const credentials = await coursesDetailPage.loginForTest();
        await coursesDetailPage.goToDetailPage(Number(SELECTED_COURSSE_ID));

        // thực hiện click nút "ĐĂNG KÝ"
            await coursesDetailPage.enrollButton.click();

        // kiểm tra nếu không có credentials thì redirect về login page
        if(credentials) {
            const modal = page.locator(".swal-overlay");

            await expect(modal).toBeVisible({timeout: Number(TIMEOUT)});
        }

    });

    test('TC04: Feature check - Disable ô nhập mã khi chưa đăng nhập.', async({page}) => {
        // Đọc localStorage để lấy key credentials
        const credentials = await page.evaluate(() => 
            localStorage.getItem('credentials'), 
        {timeout: Number(TIMEOUT)});

        // nếu không credentials thì mong đợi disabled ô nhập mã giảm giá
        if(!credentials) {
            await expect(coursesDetailPage.promotionInput).toBeDisabled();
        }
    });

    test('TC05: Feature check - Nhập mã và thực thi', async({page}) => {
        const credentials = await coursesDetailPage.loginForTest();
        await coursesDetailPage.goToDetailPage(Number(SELECTED_COURSSE_ID));

        // kiểm tra nếu có credentials thì thực thi mã giảm giá
        if(credentials) {
            // thực hiện nhập mã giảm giá
            await coursesDetailPage.promotionInput.fill(SAMPLE_PROMOTION_CODE);
            await page.waitForTimeout(Number(TIMEOUT));

            // thực hiện nhấn Enter để thực thi mã giảm giá
            await coursesDetailPage.promotionInput.press('Enter');
            await page.waitForTimeout(Number(TIMEOUT));

            // mong đợi xuất hiện thông báo giảm giá thành công hoặc thất bại
            await expect(page.locator("#loading-promotion")).toBeVisible({timeout: Number(TIMEOUT)});
        }

    });
});