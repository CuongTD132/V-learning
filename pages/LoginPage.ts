import { expect, Page, Locator } from "@playwright/test"
import { BASE_URL } from "../utils/utils";
export class LoginPage {
    readonly page: Page;
    readonly btnSignUp: Locator;
    readonly param: Locator;
    readonly phone: Locator;
    readonly username: Locator;
    readonly fullname: Locator;
    readonly email: Locator
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    constructor(page: Page) {
        this.page = page;
        this.btnSignUp = page.locator("#signUp");
        this.param = page.getByPlaceholder("Mã nhóm").nth(1);
        this.phone = page.getByPlaceholder("Số điện thoại").nth(1);
        this.email = page.getByPlaceholder("Email").nth(1);
        this.username = page.getByPlaceholder("Tài khoản").nth(1);
        this.fullname = page.getByPlaceholder("Họ tên").nth(1);
        this.password = page.getByPlaceholder("Mật khẩu").nth(1);
        this.loginButton = page.getByText("Đăng nhập").nth(1);
        this.errorMessage = page.locator(".swal-title")
    }

    async goto() {
        await this.page.goto(`${BASE_URL}/login`);
    }
    async enterSignUp(){
    await this.btnSignUp.click();
    }
    async editparam(param: string) {

    }
    async editphone(phone: string ){

    }
    async editemail(email: string) {

    }
    async editfullname(fullName: string) {

    }
    
    async editUsername(user: string) {
        await this.username.fill(user);
    }

    async editPassword(pass: string) {
        await this.password.fill(pass);
    }
    async clickLogin() {
        await this.loginButton.click();
    }
    async getErrorMessage(): Promise<string | null > {
        return await this.errorMessage.textContent();
    }
}