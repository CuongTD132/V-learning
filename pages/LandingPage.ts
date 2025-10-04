import {expect, Locator, Page} from "@playwright/test";
import {BASE_URL} from "../utils/utils";
import {SearchCase, SearchFilter} from "../tests/cuong/type/searchTypes";

export class LandingPage {
    private page: Page
    private fullName: Locator
    private email: Locator
    private phoneNumber: Locator
    private registerButton: Locator
    private courseOfInterest: Locator
    private consultingContent: Locator
    private searchInput: Locator
    private searchResultContainer: Locator
    private searchButton: Locator
    private requireFullName: Locator
    private requireEmail: Locator
    private requirePhone: Locator
    private errorMessages: Locator
    private formTitle: Locator
    private successMessage: Locator



    constructor(page: Page) {
        this.page = page;
        this.fullName = page.getByPlaceholder("Họ và tên")
        this.email = page.getByPlaceholder("Email")
        this.phoneNumber = page.getByPlaceholder("Số điện thoại")
        this.consultingContent = page.getByPlaceholder("Nội dung tư vấn")
        this.courseOfInterest = page.getByPlaceholder("Khóa học quan tâm")
        this.registerButton = page.getByRole("button", {name: "Đăng kí"})
        this.searchInput = page.locator("input.searchForm")
        this.searchResultContainer = page.locator(".mt-3.courseSearchResult")
        this.errorMessages = page.locator(".error, .text-danger")
        this.searchButton = page.locator(".searchButton")
        this.requireFullName = page.locator('label:has-text("Họ và tên *")')
        this.requireEmail = page.locator('label:has-text("Email *")')
        this.requirePhone = page.locator('label:has-text("Số điện thoại *")')
        this.formTitle = page.getByText("Đăng kí tư vấn")
        this.successMessage = page.getByText("Yêu cầu tư vấn của bạn đã được gửi thành công")
    }

    //Khởi tạo trang
    async goToPage(): Promise<void> {
        await this.page.goto(BASE_URL || "");
    }

    //Kiểm tra title của form
    async  verifyFormTitle(): Promise<void> {
        await expect(this.formTitle).toBeVisible()
    }

    async verifySuccessMsg(): Promise<void> {
        await expect(this.successMessage).toBeVisible()
    }

    getErrorMessages(): Locator {
        return this.errorMessages;
    }

    //Kiểm tra field cần điền
    async verifyMandatoryFields(): Promise<void> {
        await expect.soft(this.requireFullName).toBeVisible()
        await expect.soft(this.requireEmail).toBeVisible()
        await expect.soft(this.requirePhone).toBeVisible()
    }

    //Kiểm tra form có đc reset chưa
    async verifyFormReset(): Promise<void> {
        await expect(this.fullName).toHaveValue("");
        await expect(this.email).toHaveValue("");
        await expect(this.phoneNumber).toHaveValue("");
        await expect(this.courseOfInterest).toHaveValue("");
        await expect(this.consultingContent).toHaveValue("");
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

    //Kiểm tra ô tìm kiếm
    async verifySearchBoxVisible(): Promise<void> {
        // await expect(this.page.getByPlaceholder("Tìm kiếm", {exact: true}).first()).toBeVisible()
        await expect(this.page.locator('section.header input.searchForm')).toBeVisible();
    }

    //Tìm kiếm khoá học
    async searchCourse(data: SearchCase) {
        const {keyword, expectedType, filter, id} = data;
        await this.searchInput.type(keyword, {delay: 150});
        switch (expectedType) {
            case "hasResult":
                await this.searchInput.press("Enter");
                await expect(this.searchResultContainer).toBeVisible()
                break;

            case "noResult":
                await this.searchInput.press("Enter");
                await this.page.waitForTimeout(500);
                await expect(this.searchResultContainer).not.toBeVisible()
                break;

            case "useButton":
                if (await this.searchButton.count() === 0) {
                    console.warn(`Search button does not exist at ${id}`);
                } else {
                    await this.searchButton.click();
                    await expect(this.searchResultContainer).toBeVisible()
                }
                break;

            case "withFilter":
                await this.searchInput.press("Enter");
                await this.applyFilter(filter);
                break;

            case "verifyCards":
                await this.searchInput.press("Enter");
                await this.page.waitForTimeout(500);
                await this.verifyCourseCards();
                break;
        }
    }

    //Sử dụng filter
    async applyFilter(filter?: SearchFilter) {
        if (!filter) return
        //Khóa học
        if (filter.category) {
            const categoryFilter = this.page.locator('.filterItem', {hasText: 'Khóa học'});
            for (const category of filter.category) {
                // await categoryFilter.locator(`label:has-text("${category}")`).first().click();
                // Chỉ chọn label bên trong ul của Khóa học
                await categoryFilter.locator('ul >> label', {hasText: category}).first().click();
            }
        }
        //Cấp độ
        if (filter.level) {
            const levelFilter = this.page.locator('.filterItem', {hasText: 'Cấp độ'});
            for (const level of filter.level) {
                // Chỉ chọn label bên trong ul của Cấp độ
                await levelFilter.locator('ul >> label', {hasText: level}).first().click();
            }
        }
        //Đánh giá
        if (filter.rating) {
            const ratingFilter = this.page.getByRole("heading", {name: "Đánh giá"})
                .locator("..") // đi lên wrapper
                .getByRole("listitem");
            //Chọn listitem theo index (1 sao = 0, 2 sao = 1, ...)
            await ratingFilter.nth(filter.rating - 1).click();
        }
    }

    //Kiểm tra tất cả card đang có
    async verifyCourseCards() {
        const courseCards = this.page.locator('.courseSearchResult .myCourseItem')
        const count = await courseCards.count();
        expect(count).toBeGreaterThan(0);
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
            await expect(card.locator('a', {hasText: 'Xem chi tiết'})).toBeVisible();
        }
    }

}