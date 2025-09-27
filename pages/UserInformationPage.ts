import { expect, Locator, Page } from "@playwright/test";
import { BASE_URL } from "../utils/utils";

export class UserInformationPage {
    readonly page: Page
    readonly btnUpdate: Locator
    readonly username: Locator
    readonly password: Locator
    readonly email: Locator
    readonly phoneNumber: Locator

    //Biến message/errorMessage các trường
    // readonly messageUsername: Locator
    // readonly messagePassword: Locator
    // readonly messageEmail: Locator
    // readonly messagePhoneNumber: Locator
    readonly errorMessageUsername: Locator
    readonly errorMessagePassword: Locator
    readonly errorMessageEmail: Locator
    readonly errorMessagePhoneNumber: Locator

    constructor (page: Page) {
        this.page = page
        this.btnUpdate = page.getByText("Cập nhật")
        this.username = page.getByPlaceholder("Họ tên")
        this.password = page.getByPlaceholder("Mật khẩu")
        this.email = page.getByPlaceholder("Email")
        this.phoneNumber = page.getByPlaceholder("Số điện thoại")
        
        //locator errorMessage
        // this.messageUsername = page.locator('//h6[normalize-space()="Họ và tên"]/following-sibling::input').first()
        // this.messagePassword = page.locator('//h6[normalize-space()="Mật khẩu"]/following-sibling::input').first()
        // this.messageEmail = page.locator('//h6[normalize-space()="Email"]/following-sibling::input').first()
        // this.messagePhoneNumber = page.locator('//h6[normalize-space()="Số điện thoại"]/following-sibling::input').first()
        this.errorMessageUsername = page.locator('//h6[text()="Họ và tên"]/following-sibling::*[2][contains(@class,"message") or contains(@class,"errorMessage")]')
        this.errorMessagePassword = page.locator('//h6[text()="Mật khẩu"]/following-sibling::*[2][contains(@class,"message") or contains(@class,"errorMessage")]')
        this.errorMessageEmail = page.locator('//h6[text()="Email"]/following-sibling::*[2][contains(@class,"message") or contains(@class,"errorMessage")]')
        this.errorMessagePhoneNumber = page.locator('//h6[text()="Số điện thoại"]/following-sibling::*[2][contains(@class,"message") or contains(@class,"errorMessage")]')
    }

    async gotoPage () {
        await this.page.goto(`${BASE_URL}/thongtincanhan` || "")
    }

    async clickBtnUpdate () {
        await expect(this.btnUpdate).toBeVisible({timeout: 5000})
        await this.btnUpdate.click()
    }

    //Hàm chỉnh sửa các fill
    async editUsername (username: string) {
        await this.username.fill(username)
    }
    async editPassword (password: string) {
        await this.password.fill(password)
    }
    async editEmail (email: string) {
        await this.email.fill(email)
    }
    async editPhoneNumber (phoneNumber: string) {
        await this.phoneNumber.fill(phoneNumber)
    }

    //hàm thông báo message/errorMessage
    // async getMessage() : Promise<string> {
    //     return this.messageUsername
    // }
    async getErrorMessageUsername() : Promise<string> {
        let errorMessage = await this.errorMessageUsername.textContent()
        return errorMessage?.trim() || ""
    }
}
