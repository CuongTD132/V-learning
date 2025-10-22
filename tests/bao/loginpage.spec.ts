import {test , expect } from "@playwright/test"
import { LoginPage } from "../../pages/LoginPage"
import { off } from "process";

test.describe("Login Tests" , () => {
    let loginPage: LoginPage;
    test.beforeEach(async ({ page })=>{
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });
    test("TC-1 Login thành công", async ({ page }) => {
        await loginPage.editLoginUsername("lybao2905")
        await loginPage.editLoginPassword("bao29052001@")
        await loginPage.clickLogin();
    })
    test("TC- 2 trống trường mật khẩu", async ({ page }) => {
        await loginPage.editLoginUsername("lybao2905")
        await loginPage.editLoginPassword("")
        await loginPage.clickLogin();
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain("Tài khoản hoặc mật khẩu không đúng");
    })
    test("TC- 3 trống trường tài khoản", async ({ page }) =>{
        await loginPage.editLoginUsername("")
        await loginPage.editLoginPassword("bao29052001@")
        await loginPage.clickLogin();
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain("Tài khoản hoặc mật khẩu không đúng");
    })
    test("TC-4 nhập tên tài khoản dùng ký tự đặc biệt ", async ({ page }) => {
        await loginPage.editLoginUsername("lybao2905@#")
        await loginPage.editLoginPassword("bao29052001@")
        await loginPage.clickLogin();
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain("Tài khoản hoặc mật khẩu không đúng");
  })
  test("TC- 5 đăng nhập không thành công khi điền sai thông tin ", async ({ page }) => {
        await loginPage.editLoginUsername("lybao2905")
        await loginPage.editLoginPassword("bao29051")
        await loginPage.clickLogin();
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain("Tài khoản hoặc mật khẩu không đúng");
  })
    test("TC-6 nhập mật khẩu quá ngắn", async ({ page }) => {
        await loginPage.editLoginUsername("lybao2905")
        await loginPage.editLoginPassword("2905")
        await loginPage.clickLogin();
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain("Tài khoản hoặc mật khẩu không đúng");
  })
   test("TC-7  Nút đăng nhập bị disable khi cả 2 ô trống", async ({ page }) => {
        await loginPage.editLoginUsername("")
        await loginPage.editLoginPassword("")
        await loginPage.clickLogin();
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain("Tài khoản hoặc mật khẩu không đúng");
    })
});