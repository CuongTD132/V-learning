import {expect, Locator, Page} from "@playwright/test";
import {BASE_URL} from "../utils/utils";

export class LandingPage {
    readonly page: Page
    readonly fullName: Locator
    readonly email: Locator
    readonly phoneNumber: Locator
    readonly registerButton: Locator
    readonly landingPageTitle: Locator
    readonly courseOfInterest: Locator
    readonly consultingContent: Locator
    readonly errorMessages: Locator

    constructor(page: Page) {
        this.page = page;
        this.fullName = page.getByPlaceholder("Họ và tên")
        this.email = page.getByPlaceholder("Email")
        this.phoneNumber = page.getByPlaceholder("Số điện thoại")
        this.consultingContent = page.getByPlaceholder("Nội dung tư vấn")
        this.courseOfInterest = page.getByPlaceholder("Khóa học quan tâm")
        this.registerButton = page.getByRole("button", {name: "Đăng kí"})
        this.landingPageTitle = page.getByText("Chào mừng")
        this.errorMessages = page.locator('.error, .text-danger')
    }

    //khởi tạo trang
    async goToPage(): Promise<void> {
        await this.page.goto(BASE_URL || "");
    }

    //kiểm tra xem có đang ở trang landing không
    async isAtLandingPage(): Promise<void> {
        await expect(this.landingPageTitle).toBeVisible()
    }

    //nhập form đăng ký tư vấn
    async fillRegisterForm(fullName: string, email: string, phoneNumber: string): Promise<void> {
        await this.fullName.fill(fullName);
        await this.email.fill(email);
        await this.phoneNumber.fill(phoneNumber);
    }

    //Kiểm tra form có đầy đủ field và button
    async verifyRegisterFormFields(): Promise<void> {
        await expect.soft(this.fullName).toBeVisible();
        await expect.soft(this.email).toBeVisible();
        await expect.soft(this.phoneNumber).toBeVisible();
        await expect.soft(this.courseOfInterest).toBeVisible();
        await expect.soft(this.consultingContent).toBeVisible();
        await expect.soft(this.registerButton).toBeVisible();
    }

    //Gửi form
    async submitForm(fullName: string, phoneNumber: string, email: string, courseOfInterest?: string, consultingContent?: string): Promise<void> {
        await this.fullName.fill(fullName);
        await this.email.fill(email);
        await this.phoneNumber.fill(phoneNumber);
        if (consultingContent)
            await this.consultingContent.fill(consultingContent);
        if (courseOfInterest)
            await this.courseOfInterest.fill(courseOfInterest);
        await this.registerButton.click();
    }

    //Tạo chuỗi cho ký tự
    generateString(char: string, lenght: number) {
        return char.repeat(lenght);
    }

}