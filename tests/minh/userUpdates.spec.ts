import { expect, test } from "@playwright/test";
import { UserInformationPage } from "../../pages/UserInformationPage";
import { LoginPage } from "../../pages/LoginPage";

test.describe("Kiểm thử 'cập nhật user'", () => {
    //Khai báo biến loginPage, userInformation global
    let loginPage: LoginPage
    let userInformationPage: UserInformationPage
    
    test.beforeEach(async ({page}) => {
        //Khởi tạo loginPage, UserInformationPage
        loginPage = new LoginPage(page)
        userInformationPage = new UserInformationPage(page)
        
        //vào trang đăng nhập -> vào trang
        await loginPage.gotoPage()
        await loginPage.loginPage("admin123321", "123456aZ@")
        await expect(page.getByRole('heading', {name: 'Chào mừng'})).toBeVisible()
        //Đi tới trang "Thông tin cá nhân"
        await userInformationPage.gotoPage()
    })
    
    test("TC-05: Nhập 'Họ và tên' đúng định dạng", async ({page}) => {
        // await expect(page.locator("heading")).toHaveText("Thông tin cá nhân");
        await expect(page.getByRole('heading', {name: 'Thông tin cá nhân'})).toBeVisible()
    })
})