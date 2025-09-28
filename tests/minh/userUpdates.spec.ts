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
        
        //vào trang đăng nhập
        await loginPage.gotoPage()
        await loginPage.loginPage("admin123321", "123456aZ@")

        //verify thành công đăng nhập
        await expect(page.getByRole("heading", {name: 'Chào mừng'})).toBeVisible({timeout: 5000})

        //Đi tới trang "Thông tin cá nhân"
        await userInformationPage.gotoPage()

        //verify thành công vào trang cá nhân
        await expect(page.locator("h3", {hasText: 'Thông tin cá nhân'})).toHaveText("Thông tin cá nhân", {timeout: 10000});

        //click vào nút "cập nhật" -> hiển thị modal cập nhật
        await userInformationPage.clickBtnUpdate()
        await expect(page.locator("h5", {hasText: "Chỉnh sửa thông tin cá nhân"})).toHaveText("Chỉnh sửa thông tin cá nhân")
    })  
    
    test("TC-05: Nhập 'Họ và tên' đúng định dạng", async ({page}) => {
        //test fill đúng định dạng
        const expected: string = "Minh"
        await userInformationPage.editUsername(expected)
        const actual = await userInformationPage.username.inputValue()
        expect(actual).toBe(expected)
        //test fill không hiện thông báo lỗi
        const expectedError: string = ""
        const actualError = await userInformationPage.getErrorMessageUsername()
        expect(actualError).toBe(expectedError)
    })

    test("TC-06: Nhập field 'Họ và tên' ít hơn 2 ký tự", async () => {
        await userInformationPage.editUsername("T")
        const expectedError: string = "Vui lòng nhập tên nhiều hơn 2 ký tự"
        const actualError = await userInformationPage.getErrorMessageUsername()
        expect(actualError).toBe(expectedError)
    })

    test("TC-07: Nhập field 'Họ và tên' nhiều hơn 32 ký tự", async () => {
        await userInformationPage.editUsername("ndmnmknjknkjnajkndjksandjknasxzcxzczxcxzczczx")
        const actual = await userInformationPage.username.inputValue()
        expect(actual.length).toBeLessThanOrEqual(32)
    }) 

    test("TC-08: Nhập field 'Họ và tên' với kí tự đặc biệt", async () => {
        await userInformationPage.editUsername("@MInh")
        await userInformationPage.username.blur()
        const expextedError: string = "Chỉ nhập kí tự chữ"
        const actualError = await userInformationPage.getErrorMessageUsername()
        expect(actualError).toBe(expextedError)
    })

    test("TC-09: Nhập field 'Họ và tên' với kí tự số", async () => {
        await userInformationPage.editUsername("123514")
        await userInformationPage.username.blur()
        const expectedError: string = "Chỉ nhập kí tự chữ"
        const actualError = await userInformationPage.getErrorMessageUsername()
        console.log(actualError)
        await expect(actualError).toBe(expectedError)    
    })
})