import { expect, Page, Locator } from "@playwright/test"
import { BASE_URL } from "../utils/utils";
export class LoginPage {
    readonly page: Page;
    readonly usernamesignup: Locator;
    readonly passwordsignup: Locator;
    readonly btnSignUp: Locator;
    readonly param: Locator;
    readonly phone: Locator;
    readonly username: Locator;
    readonly fullname: Locator;
    readonly email: Locator
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly registerButton: Locator;
    readonly errorMessage: Locator;
    readonly errorMessageFullName: Locator;
    readonly errorMessageUserName: Locator;
    readonly errorMessagePassWord: Locator;
    readonly errorMessageEmail: Locator;
    readonly errorMessagePhone: Locator;
    
    
    constructor(page: Page) {
        //Locator đăng nhập
        this.page = page;
        this.username = page.getByPlaceholder("Tài khoản").nth(1);
        this.password = page.getByPlaceholder("Mật khẩu").nth(1);
        this.loginButton = page.getByText("Đăng nhập").nth(1);
        this.errorMessage = page.locator(".swal-title")
        // Locator đăng kí
        this.errorMessageFullName = page.locator('//input[@name="hoTen"]/following-sibling::div[(contains(@class,"message") or contains(@class,"errorMessage")) and not(contains(@class,"hidden"))][1]')
        this.errorMessagePassWord = page.locator('//input[@name="matKhau"]/following-sibling::div[(contains(@class,"message") or contains(@class,"errorMessage")) and not(contains(@class,"hidden"))][1]')
        this.errorMessageUserName = page.locator('//input[@name="taiKhoan"]/following-sibling::div[(contains(@class,"message") or contains(@class,"errorMessage")) and not(contains(@class,"hidden"))][1]')
        this.errorMessageEmail = page.locator('//input[@name="email"]/following-sibling::div[(contains(@class,"message") or contains(@class,"errorMessage")) and not(contains(@class,"hidden"))][1]')
        this.errorMessagePhone = page.locator('//input[@name="soDT"]/following-sibling::div[(contains(@class,"message") or contains(@class,"errorMessage")) and not(contains(@class,"hidden"))][1]')
        this.btnSignUp = page.locator("#signUp");
        this.fullname = page.getByPlaceholder("Họ tên")
        this.param = page.getByPlaceholder("Mã nhóm")
        this.phone = page.getByPlaceholder("Số điện thoại")
        this.email = page.getByPlaceholder("Email")
        this.registerButton = page.getByText("Đăng ký").nth(1);
        this.usernamesignup = page.getByPlaceholder("Tài khoản").nth(0);
        this.passwordsignup = page.getByPlaceholder("Mật khẩu").nth(0);
    }

    async goto() {
        await this.page.goto(`${BASE_URL}/login`);
    }
    async enterSignUp() {
        await this.btnSignUp.click();
    }
    async editparam(param: string) {
       
    }
    async editphone(phone: string) {
        await this.phone.fill(phone);
    }
    async editemail(email: string) {
        await this.email.fill(email);
    }
    async editfullname(fullName: string) {
        await this.fullname.fill(fullName);
    }
    async editUsername(user: string) {
        await this.usernamesignup.fill(user);
    }
    async clickregister() {
        await this.registerButton.click();
    }
    async editPassword(pass: string) {
        await this.passwordsignup.fill(pass);
    }
    async clickLogin() {
        await this.loginButton.click();
    }
    async getErrorMessage(): Promise<string  > {
        let errorMessage = await this.errorMessage.textContent();
        return errorMessage?.trim() || "";
    }
    async getErrorMessageFullName(): Promise<string > {
        let errorMessage = await this.errorMessageFullName.textContent();
        return errorMessage?.trim() || "";
    }
    async getErrorMessageUserName(): Promise< string >{
        let errorMessage = await this.errorMessageUserName.textContent();
        return errorMessage?.trim() || "";
    }
    async getErrorMessagePassWord (): Promise< string >{
        let errorMessage = await this.errorMessagePassWord.textContent();
        return errorMessage?.trim() || "";
    }
    async getErrorMessageEmail(): Promise< string > {
        let errorMessage = await this.errorMessageEmail.textContent();
        return errorMessage?.trim() || "";
    }
    async getErrorMessagePhone(): Promise < string >{
        let errorMessage = await this.errorMessagePhone.textContent();
        return errorMessage?.trim() || "";
    }
}