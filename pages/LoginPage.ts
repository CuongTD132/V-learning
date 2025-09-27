import { expect, Page, Locator } from "@playwright/test";
import { BASE_URL} from "../utils/utils";

export class LoginPage {
    //Thuộc tính
    readonly page: Page
    readonly username: Locator
    readonly password: Locator
    readonly btnSubmit: Locator

    //Khai báo constructor & bắt locator
    constructor (page: Page) {
        this.page = page
        this.username = page.getByPlaceholder("Tài khoản").nth(1)
        this.password = page.getByPlaceholder("Mật khẩu").nth(1)
        this.btnSubmit = page.locator('//button[text()="Đăng nhập"]').first()
    }

    //Các phương thức
    async gotoPage () {
        await this.page.goto(`${BASE_URL}/login` || "" )
    }

    async loginPage (username: string, password: string) {
        await this.username.fill(username)
        await this.password.fill(password)
        await this.btnSubmit.click()
    }
}
