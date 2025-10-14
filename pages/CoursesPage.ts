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

    constructor(page: Page) {
        this.page = page;
        this.pageNumber = page.locator(".paginationPages li a");
        this.courses = page.locator('a.cardGlobal');
        this.nextButton = page.locator('//a[text()="Sau >"]');
        this.prevButton = page.locator('//a[text()="< Trước"]');
        this.ellipsis = page.locator('.paginationPages li', { hasText: "..." });
        this.lastPage = page.locator('.paginationPages li a').nth(-2);
        this.currentPageLocator = page.locator('.paginationPages li.active');
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

        // Trang 4,5 => click 1 lần dấu "..."
        // Trang 6,7,8,9 => click 2 lần dấu "..."
        // Do trang khi qua về thì load lại nên gán cố định số lần click 
        const dotsToClick = (pageNum >= 4 && pageNum <= 5) ? 1
            : (pageNum >= 6) ? 2
                : 0;

        for (let i = 0; i < dotsToClick; i++) {
            const dot = this.ellipsis.first();
            await dot.click();
        }

        // Tìm và click số trang
        const matchedElement = this.pageNumber.filter({ hasText: pageText }).first();

        if (!(await matchedElement.isVisible())) {
            throw new Error(`Không tìm thấy thẻ phân trang có số "${pageText}"`);
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

    async clickPageByText(text: string): Promise<void> {
        await this.page.locator("a.pageLinkPages ", { hasText: text }).click();
        await this.page.waitForLoadState("networkidle");
    }

    async isPrevDisabled(): Promise<boolean> {
        return (await this.prevButton.getAttribute("aria-disabled")) === "true";
    }

    async isNextDisabled(): Promise<boolean> {
        return (await this.nextButton.getAttribute("aria-disabled")) === "true";
    }

    async clickPrevious(): Promise<void> {
        await this.prevButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickNextUntilEnd(): Promise<void> {
        while (!(await this.isNextDisabled())) {
            await this.nextButton.click();
            await this.page.waitForLoadState("networkidle");
        }
    }

    async clickEllipsisIfVisible(): Promise<boolean> {
        if (await this.ellipsis.isVisible()) {
            await this.ellipsis.click();
            await this.page.waitForLoadState("networkidle");
            return true;
        }
        return false;
    }

    async clickEllipsis(): Promise<number> {
        const currentPage = await this.getCurrentPageNumber();
        await this.ellipsis.click();
        await this.page.waitForLoadState("networkidle");

        const newPage = await this.getCurrentPageNumber();
        console.log(`Nhấn "..." từ trang ${currentPage} → sang trang ${newPage}`);
        return newPage;
    }
}