import { Page, Locator } from "@playwright/test";
import { BASE_URL } from "../utils/utils";

export class CoursesPage {

    readonly page: Page;
    readonly pageNumber: Locator;
    readonly courses: Locator;
    readonly nextButton: Locator;
    readonly prevButton: Locator;
    readonly ellipsis: Locator;
    readonly lastPage: Locator;
    readonly currentPageLocator: Locator;
    readonly loader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageNumber = page.locator(".paginationPages li a");
        this.courses = page.locator('a.cardGlobal');
        this.nextButton = page.locator('//a[text()="Sau >"]');
        this.prevButton = page.locator('//a[text()="< Trước"]');
        this.ellipsis = page.locator('.paginationPages li', { hasText: "..." });
        this.lastPage = page.locator('.paginationPages li a').nth(-2);
        this.currentPageLocator = page.locator('.paginationPages li.active');
        this.loader = page.locator('#loader');
    }

    async goToCoursesPage(): Promise<void> {
        await this.page.goto(`${BASE_URL}/khoahoc`);
    }

    async getPageCount(): Promise<number> {
        return parseInt((await this.lastPage.textContent())?.trim() || '1', 10);
    }

    async getCourseCount(): Promise<number> {
        const count = await this.courses.count();
        return count;
    }

    async clickCourseByIndex(index: number): Promise<void> {
        await this.courses.nth(index).click();
    }

    async clickNextPage(): Promise<boolean> {
        try {
            // Nhấn nút "Sau"
            const isVisible = await this.nextButton.isVisible();
            const isEnabled = await this.nextButton.isEnabled();

            if (!isVisible || !isEnabled) {
                return false;
            }

            await this.nextButton.click();
            await this.page.waitForSelector('a.cardGlobal');

            return true;
        } catch (error) {
            console.error("Lỗi khi click nút 'Sau': ", error);
            return false;
        }
    }

    async clickPageNumber(pageNum: number): Promise<void> {
        const pageText = pageNum.toString();

        // Tìm số trang trên thanh phân trang
        const findPage = async () => this.pageNumber.filter({ hasText: pageText }).first();

        let matchedElement = await findPage();

        // Click "..." khi kh tìm thấy trang
        while (!(await matchedElement.isVisible())) {
            const dot = this.ellipsis.first();

            if (await dot.isVisible()) {
                await dot.click();
                matchedElement = this.pageNumber.filter({ hasText: pageText }).first();
            }
        }

        await matchedElement.click();
    }

    async goBackToPreviousPage(pageNum: number): Promise<void> {
        // Quay về trang trước
        await this.page.goBack();

        // Click lại số trang đã lưu
        await this.clickPageNumber(pageNum);
    }

    async getCurrentPageNumber(): Promise<number> {
        try {
            const currentPage = await this.currentPageLocator.textContent();
            const pageNum = parseInt(currentPage?.trim() || '1', 10);

            return isNaN(pageNum) ? 1 : pageNum;
        } catch (error) {
            throw new Error("Không thể lấy số trang hiện tại: " + error);
        }
    }

    // Pagination

    async clickPrevious(): Promise<void> {
        await this.prevButton.click();
    }

    async clickNext(): Promise<void> {
        await this.nextButton.click();
    }

    async goToLastPage(): Promise<void> {
        await this.lastPage.click();
    }

    async isPrevDisabled(): Promise<boolean> {
        return (await this.prevButton.getAttribute('aria-disabled')) === 'true';
    }

    async isNextDisabled(): Promise<boolean> {
        return (await this.nextButton.getAttribute('aria-disabled')) === 'true';
    }

    async isLoader(): Promise<boolean> {
        return this.loader.isVisible();
    }
}