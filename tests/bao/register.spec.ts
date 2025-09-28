import { test, expect } from "@playwright/test"
import { LoginPage } from "../../pages/LoginPage"
import { log } from "console";

test.describe("Register Tests", async () => {
    let loginPage: LoginPage;
    test.beforeEach(async ({ page })=>{
    loginPage = new LoginPage(page);
    await loginPage.goto();
    });
    test("TC-1 Đăng ký với đầy đủ thông tin hợp lệ ", async ({ page }) => {
        await loginPage.enterSignUp();
        await loginPage.editUsername("bao29");
        await loginPage.editfullname("Nguyễn Lý Bảo");
        await loginPage.editPassword("Bao290501");
        await loginPage.editemail("lybao29052001@gmail.com");
        await loginPage.editphone ("0585826722");
        await loginPage.editparam("GP01");
        await expect()("Đăng ký thành công");
        
    })
});

