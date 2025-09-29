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
    readonly searchInput: Locator
    readonly searchResultContainer: Locator

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
        this.searchInput = page.locator("input.searchForm")
        this.searchResultContainer = page.locator(".mt-3.courseSearchResult")
    }

    //khởi tạo trang
    async goToPage(): Promise<void> {
        await this.page.goto(BASE_URL || "");
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
        await this.fullName.type(fullName, {delay: 150});
        await this.email.type(email, {delay: 150});
        await this.phoneNumber.type(phoneNumber, {delay: 150});
        if (consultingContent)
            await this.consultingContent.fill(consultingContent);
        if (courseOfInterest)
            await this.courseOfInterest.fill(courseOfInterest);
        await this.registerButton.click();
    }

    //Tạo chuỗi cho ký tự
    generateString(char: string, length: number) {
        return char.repeat(length);
    }

    //Tìm kiếm khoá học
    async searchCourse(char: string, type: 0 | 1 | 2 | 3, filter?: {
        category?: ("Tất cả" | "Front End" | "Back End" | "HTML / CSS")[];
        level?: ("Tất cả" | "Mới bắt đầu" | "Trung cấp" | "Cao cấp")[],
        rating?: 1 | 2 | 3 | 4 | 5
    }) {
        await this.searchInput.type(char, {delay: 150});
        if (type === 1) {//có kết quả trả về
            await this.searchInput.press("Enter");
            if (filter) {
                await this.page.waitForTimeout(500);
                const resultBeforeFilter = await this.page.locator('.courseSearchResult .myCourseItem').count();
                // Khóa học
                if (filter.category) {
                    const categoryFilter = this.page.locator('.filterItem', {hasText: 'Khóa học'});
                    for (const category of filter.category) {
                        // await categoryFilter.locator(`label:has-text("${category}")`).first().click();
                        // Chỉ chọn label bên trong ul của Khóa học
                        await categoryFilter.locator('ul >> label', {hasText: category}).first().click();
                    }
                }
                // Cấp độ
                if (filter.level) {
                    const levelFilter = this.page.locator('.filterItem', {hasText: 'Cấp độ'});
                    for (const level of filter.level) {
                        // Chỉ chọn label bên trong ul của Cấp độ
                        await levelFilter.locator('ul >> label', {hasText: level}).first().click();
                    }
                }
                // Đánh giá
                if (filter.rating) {
                    const ratingFilter = this.page.getByRole("heading", {name: "Đánh giá"})
                        .locator("..") // đi lên wrapper
                        .getByRole("listitem");

                    // chọn listitem theo index (1 sao = 0, 2 sao = 1, ...)
                    await ratingFilter.nth(filter.rating - 1).click();
                }
                const resultAfterFilter = await this.page.locator('.courseSearchResult .myCourseItem').count();
                expect(resultBeforeFilter).toBeGreaterThan(resultAfterFilter)
            } else (
                await expect(this.searchResultContainer).toBeVisible()
            )
        } else if (type === 0) {//ko có kết quả
            await this.searchInput.press("Enter");
            await this.page.waitForTimeout(500);
            await expect(this.searchResultContainer).not.toBeVisible()
        } else if (type === 2) {//bấm nút search
            await this.page.locator(".searchButton").click();
            await expect(this.searchResultContainer).toBeVisible()
        } else if (type === 3) {//kiểm tra nội dung card
            await this.searchInput.press("Enter");
            await this.page.waitForTimeout(500);
            const courseCards = this.page.locator('.courseSearchResult .myCourseItem')
            const count = await courseCards.count();
            expect(count).toBeGreaterThan(0);
            //kiểm tra tất cả card đang có
            for (let i = 0; i < count; i++) {
                const card = courseCards.nth(i);
                // Ảnh đại diện
                await expect(card.locator('img.imgNet')).toBeVisible();
                // Tiêu đề
                await expect(card.locator('h6')).toHaveText(/.+/);
                // Mô tả ngắn gọn
                await expect(card.locator('p.colorCardTitle')).toBeVisible();
                // Rating (sao)
                await expect(card.locator('.iconStarNet i').first()).toBeVisible();
                // Nút "Xem chi tiết"
                await expect(card.locator('a', { hasText: 'Xem chi tiết' })).toBeVisible();
            }
        }
    }

}