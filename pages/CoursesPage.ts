import { Page, Locator } from "@playwright/test";
import { BASE_URL } from "../utils/utils";

export class CoursesPage {

    readonly page: Page;
    readonly pageNumber: Locator;
    readonly courses: Locator;
    readonly nextButton: Locator;
    readonly prevButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageNumber = page.locator(".paginationPages li");
        this.courses = page.locator('a.cardGlobal');
        this.nextButton = page.locator('//a[text()="Sau >"]');
        this.prevButton = page.locator('//a[text()="< Trước"]');
    }

    async goToCoursesPage(): Promise<void> {
        await this.page.goto(`${BASE_URL}/khoahoc`);
        await this.page.waitForLoadState('networkidle');
    }

    async getCourseCount(): Promise<number> {
        const count = await this.courses.count();

        if (count === 0) {
            console.log("⚠️ Không có khóa học nào trên trang này");
            return 0;
        }

        await this.courses.first().waitFor({
            state: 'visible',
            timeout: 10000
        });

        return count;
    }

    async clickCourseByIndex(index: number): Promise<void> {
        await this.courses.nth(index).waitFor({ state: 'visible' });
        await this.courses.nth(index).click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickNextPage(): Promise<boolean> {
        try {
            // Kiểm tra nếu nút không visible hoặc không enabled => không click được
            const isVisible = await this.nextButton.isVisible();
            const isEnabled = await this.nextButton.isEnabled();

            if (!isVisible || !isEnabled) {
                console.log("⚠️ Nút 'Sau' không khả dụng để click");
                return false;
            }

            // Bấm nút "Sau"
            await this.nextButton.scrollIntoViewIfNeeded();
            await this.nextButton.click();
            await this.page.waitForLoadState('networkidle');

            // Chờ thẻ khóa học render lại
            await this.page.waitForSelector('a.cardGlobal', {
                state: 'visible',
                timeout: 10000
            });

            return true;

        } catch (error) {
            console.error("❌ Lỗi khi click nút 'Sau':", error);
            return false;
        }
    }

    async clickPageNumber(pageNum: number): Promise<void> {
        const pageText = pageNum.toString();

        // ➤ PAGE 4-5: yêu cầu 1 lần click “...”
        // ➤ PAGE 6-7: yêu cầu 2 lần click “...”
        const dotsToClick = (pageNum === 4 || pageNum === 5) ? 1
            : (pageNum === 6 || pageNum === 7) ? 2
                : 0;

        // 👉 Bước 1: Click vào dấu "..." theo số lần yêu cầu
        for (let i = 0; i < dotsToClick; i++) {
            const ellipsis = this.page.locator('.paginationPages li', { hasText: "..." });
            const dotCounts = await ellipsis.count();

            if (dotCounts === 0) {
                console.log(`⚠️ Không tìm thấy dấu "..." thứ ${i + 1}, bỏ qua`);
                break;
            }

            const dot = ellipsis.first();

            try {
                if (await dot.isVisible()) {
                    await dot.click();
                    console.log(`🟡 Đã click dấu "..." thứ ${i + 1}`);
                    await this.page.waitForLoadState('networkidle');
                    await this.page.waitForTimeout(300); // Cho UI cập nhật
                }
            } catch (e) {
                console.warn(`⚠️ Lỗi khi click dấu "..." (lần ${i + 1}):`, e);
            }
        }

        // 👉 Bước 2: Tìm trang số pageNum sau khi mở "..."
        const allPages = this.page.locator('.paginationPages li a');
        const count = await allPages.count();
        let matchedElement: Locator | null = null;

        for (let i = 0; i < count; i++) {
            const el = allPages.nth(i);
            const text = (await el.innerText()).trim();
            if (text === pageText) {
                matchedElement = el;
                break;
            }
        }

        if (!matchedElement) {
            throw new Error(`❌ Không tìm thấy thẻ phân trang có text chính xác là "${pageText}" sau khi mở dấu "..."`);
        }

        // 👇 Bước 3: Click trang đã tìm được
        await matchedElement.scrollIntoViewIfNeeded();

        const isVisible = await matchedElement.isVisible();
        const isEnabled = await matchedElement.isEnabled();

        if (!isVisible || !isEnabled) {
            throw new Error(`❌ Trang số ${pageNum} không khả dụng hoặc không hiển thị.`);
        }

        await matchedElement.click();
        await this.page.waitForLoadState('networkidle');

        await this.page.waitForSelector('a.cardGlobal', {
            state: 'visible',
            timeout: 10000,
        });

        console.log(`✅ Đã click vào trang ${pageNum} thành công`);
    }

    async goBackToCoursesAndReturnToPage(pageNum: number): Promise<void> {
        await this.page.goBack();
        await this.page.waitForLoadState('networkidle');

        // Đợi thanh phân trang có mặt
        await this.page.waitForSelector('.paginationPages li a', {
            state: 'visible',
            timeout: 10000,
        });
        await this.clickPageNumber(pageNum);
    }

    async getCurrentPageNumber(): Promise<number> {
        try {
            const currentPageLocator = this.page.locator('.paginationPages li.active, .paginationPages li.current');
            await currentPageLocator.waitFor({ state: 'visible', timeout: 5000 });

            const currentPage = await currentPageLocator.textContent();
            const pageNum = parseInt(currentPage?.trim() || '1', 10);

            return isNaN(pageNum) ? 1 : pageNum;
        } catch (error) {
            throw new Error("❌ Không thể lấy số trang hiện tại: " + error);
        }
    }
}