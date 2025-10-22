import { Page, Locator } from '@playwright/test';
import { BASE_URL } from '../utils/utils';
import { LoginPage } from './LoginPage';

export class CoursesDetailPage {

    readonly page: Page;
    readonly titleCourse: Locator;
    readonly detailCoursesContent: Locator;
    readonly relatedCourses: Locator;
    readonly previewButtons: Locator;
    readonly enrollButton: Locator;
    readonly promotionInput: Locator;
    readonly relatedCourseItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleCourse = page.locator(".titleCourse");
        this.detailCoursesContent = page.locator(".detailCouresContent");
        this.relatedCourses = page.locator(".coursesRelated");

        // courses detail content
        this.previewButtons = this.detailCoursesContent.locator(".courseContent .courseDetailItem .btnGlobal.btnPreview");

        // enroll section
        this.enrollButton = this.detailCoursesContent.locator(".sideBarCourseDetail .btnGlobal.btnPreview");
        this.promotionInput = this.detailCoursesContent.locator(".sideBarCourseDetail input[placeholder='Nhập mã']");

        // related courses section
        this.relatedCourseItems = this.relatedCourses.locator(".cardGlobal");    
    }

    async goToDetailPage(courseId: number): Promise<void> {
        await this.page.goto(`${BASE_URL}/chitiet/${courseId}`);
        await this.page.waitForLoadState('networkidle');
    }

    async loginForTest(): Promise<string> {
        // tạo instance loginPage và login trước khi thực hiện test
        const loginPage = new LoginPage(this.page);
        await loginPage.goto();
        await this.page.waitForLoadState('networkidle');
        await loginPage.editLoginUsername("tai123");
        await loginPage.editLoginPassword("P@ssword1");
        await loginPage.clickLogin();

        await this.page.waitForURL(`${BASE_URL}/chitiet/**`);

        const credentials = await this.page.evaluate(() => localStorage.getItem('credentials'));

        return JSON.stringify(credentials);
    }

}