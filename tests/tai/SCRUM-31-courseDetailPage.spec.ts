import { test, expect } from "@playwright/test"
import { CoursesDetailPage } from "../../pages/CoursesDetailPage"
import { SELECTED_COURSSE_ID, 
         TIMEOUT, 
         PREVIEW_BUTTON_HOVER_BGCOLOR,
         RANDOM_RELATED_COURSE
} from '../../utils/SCRUM-31-Util'

test.describe("Related Courses Feature", async() => {
    let coursesDetailPage: CoursesDetailPage;
    
    test.beforeEach(async ({ page }) => {
        coursesDetailPage = new CoursesDetailPage(page);
        await coursesDetailPage.goToDetailPage(Number(SELECTED_COURSSE_ID));
    });

    test('TC01: Feature check - Bấm vào các khoá học liên quan.', async({page}) => {
        // tổng các khoá học có liên quan
        const count = await coursesDetailPage.relatedCourseItems.count()
        const randomRelatedCourse = Number(RANDOM_RELATED_COURSE);

        // lựa ngẫu nhiên 1 khoá học để thực hiện bấm nút
        if(randomRelatedCourse <= count) {
            const chosenRelatedCourse = coursesDetailPage.relatedCourseItems.nth(randomRelatedCourse);
            const href = await chosenRelatedCourse.getAttribute('href');

            // bấm vào khoá học có liên quan và đợi load trang
            await chosenRelatedCourse.click();
            await page.waitForLoadState('networkidle');

            const currentUrl = page.url();
            expect(currentUrl).toContain(href);
        }
    });

    test('TC02: Feature check - Bấm vào các khoá học liên quan và quay về đầu trang.', async({page}) => {
        // tổng các khoá học có liên quan
        const count = await coursesDetailPage.relatedCourseItems.count()
        const randomRelatedCourse = Number(RANDOM_RELATED_COURSE);

        // lựa ngẫu nhiên 1 khoá học để thực hiện bấm nút
        if(randomRelatedCourse <= count) {
            const chosenRelatedCourse = coursesDetailPage.relatedCourseItems.nth(randomRelatedCourse);
            // Scroll tới vị trí của khoá học liên quan trước khi bấm nút
            await chosenRelatedCourse.scrollIntoViewIfNeeded();
            await page.waitForTimeout(Number(TIMEOUT));

            // bấm vào khoá học có liên quan và đợi load trang
            await chosenRelatedCourse.click();
            await page.waitForLoadState('networkidle');
        }

        const scrollTop = await page.evaluate(() => window.scrollY);
        expect(scrollTop).toBe(0);
    });

    test('TC03: Feature check - Hover vào các item khoá học liên quan.', async({page}) => {
        for(let i = 0; i < await coursesDetailPage.relatedCourseItems.count(); i++) {
            const relatedItem = coursesDetailPage.relatedCourseItems.nth(i);
            await relatedItem.hover();

            await expect(relatedItem.locator(".subCard")).toBeVisible({timeout: Number(TIMEOUT)});
        }
    });

    test('TC04: Feature check - Popover hiển thị dạng text.', async({page}) => {
        const previousUrl = await page.url();

        for(let i = 0; i < await coursesDetailPage.relatedCourseItems.count(); i++) {
            const relatedItem = coursesDetailPage.relatedCourseItems.nth(i);
            await relatedItem.hover();

            const popOver = relatedItem.locator(".subCard");
            await popOver.click();

            const currentUrl = await page.url()

            // mong đợi trang web hiện tại và trang web trước khi click vào popover không thay đổi
            await expect(previousUrl).toBe(currentUrl);
        }
    });

    test('TC05: Feature check - Hover vào nút nhấn "Xem Chi Tiết" trên popover.', async({page}) => {
        for(let i = 0; i < await coursesDetailPage.relatedCourseItems.count(); i++) {
            const relatedItem = coursesDetailPage.relatedCourseItems.nth(i);
            await relatedItem.hover();

            const popOver = relatedItem.locator(".subCard");
            const previewCourseButton = popOver.locator('.btnGlobal.btnSubCard');

            // trước khi hover thì thuộc tính transform là none
            const transformBeforeHover = await previewCourseButton.evaluate(el => getComputedStyle(el).transform);

            await previewCourseButton.hover();
            
            // sau khi hover thì thuộc tính transform đã được gán giá trị
            const transformAfterHover = await previewCourseButton.evaluate(el => getComputedStyle(el).transform);

            // mong đợi kiểm tra 2 style css transform trước và sau hover sẽ khác nhau
            expect(transformBeforeHover).not.toBe(transformAfterHover);
        }
    });

    test('TC06: Feature check - Bấm vào nút nhấn "Xem Chi Tiết" trên popover.', async({page}) => {
        const currentUrl = await page.url();

        for(let i = 0; i < await coursesDetailPage.relatedCourseItems.count(); i++) {
            const relatedItem = coursesDetailPage.relatedCourseItems.nth(i);
            await relatedItem.hover();

            const popOver = relatedItem.locator(".subCard");
            const previewCourseButton = popOver.locator('.btnGlobal.btnSubCard');

            // click nút xem chi tiết
            await previewCourseButton.click();
            await page.waitForLoadState('networkidle');

            const currentUrlAfterClick = await page.url();

            // mong đợi url trước và sau khi click nút xem chi tiết sẽ khác nhau
            expect(currentUrl).not.toBe(currentUrlAfterClick);
        }
    });
});