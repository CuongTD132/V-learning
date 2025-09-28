import { test, expect } from "@playwright/test"
import { LoginPage } from "../../pages/LoginPage"
import { log } from "console";

test.describe("Register Tests", async () => {
    let loginPage: LoginPage;
    test.beforeEach(async ({ page })=>{
    loginPage = new LoginPage(page);
    await loginPage.goto();
    });
        test("Chuyển sang trang đăng ký", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.clickRegister();
        await expect(page).toHaveURL(/.*register/);
        await expect(page.locator("form")).toBeVisible();
});
    test("TC-1 Đăng ký với đầy đủ thông tin hợp lệ ", async ({ page }) => {
        await loginPage.enterUsername("bao29 ");
        await loginPage.enterfullname("Nguyễn Lý Bảo");
        await loginPage.enterPassword("Bao290501");
        await loginPage.enteremail("lybao29052001@gmail.com");
        await loginPage.enterphone ("0585826722");
        await loginPage.clickRegister();
    })
});

