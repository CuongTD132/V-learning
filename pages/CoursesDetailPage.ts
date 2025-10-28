import { Page, Locator, expect } from '@playwright/test';
import { BASE_URL } from '../utils/utils';
import { LOGIN_TEST_USERNAME, LOGIN_TEST_PASSWORD} from "../utils/courseDetailPageUtil"
import { LoginPage } from './LoginPage';
import { AllCourseDetailData, LabelData } from '../tests/tai/data/courseDetailData';
import { CourseSelectTypes, specifyDataCheck } from '../tests/tai/type/courseDetailTypes';
import { fail } from 'assert';

export class CoursesDetailPage {

    readonly page: Page;
    readonly detailCoures: Locator;
    readonly titleCourse: Locator;
    readonly headerTitle: Locator;
    readonly headerSubTitle: Locator;
    readonly detailCoursesContent: Locator;
    readonly courseName: Locator;
    readonly lecturerName: Locator;
    readonly domainName: Locator;
    readonly reviewCount: Locator;
    readonly descriptionContent: Locator;
    readonly courseBenefitLabel: Locator;
    readonly courseBenefitContent: Locator;
    readonly learningPathLabel: Locator;
    readonly courseDetailItem: Locator;
    readonly courseChapter: Locator;
    readonly previewButtons: Locator;
    readonly sideBarCourseDetail: Locator;
    readonly sideBarContent: Locator;
    readonly enrollButton: Locator;
    readonly promotionInput: Locator;
    readonly relatedCourses: Locator;
    readonly relatedCourseLabel: Locator;
    readonly relatedCourseItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.detailCoures = page.locator(".detailCoures");
        this.titleCourse = page.locator(".titleCourse");
        this.headerTitle = this.titleCourse.locator("h3");
        this.headerSubTitle = this.titleCourse.locator("p");
        this.detailCoursesContent = page.locator(".detailCouresContent");
        this.relatedCourses = page.locator(".coursesRelated");

        // courses detail content
        this.courseName = this.detailCoursesContent.locator(".titleDetailCourse");
        this.lecturerName = this.detailCoursesContent.locator(".instrutorTitle").nth(0).locator("p").nth(1);
        this.domainName = this.detailCoursesContent.locator(".instrutorTitle").nth(1).locator("p").nth(1);
        this.reviewCount = this.detailCoursesContent.locator(".reviewDetail p");
        this.descriptionContent = this.detailCoursesContent.locator(".textDiscripts");
        this.courseBenefitLabel = this.detailCoursesContent.locator(".boxCourseLearn h6");
        this.courseBenefitContent = this.detailCoursesContent.locator(".boxCourseLearn li p");
        this.learningPathLabel = this.detailCoursesContent.locator(".courseContent h6");
        this.courseDetailItem = this.detailCoursesContent.locator(".courseDetailItem");
        this.courseChapter = this.detailCoursesContent.locator(".courseContent .courseDetailItem .sectionCourse span"); 
        this.previewButtons = this.detailCoursesContent.locator(".courseContent .courseDetailItem .btnGlobal.btnPreview");

        // enroll section
        this.sideBarCourseDetail = this.detailCoursesContent.locator(".sideBarCourseDetail");
        this.sideBarContent = this.detailCoursesContent.locator(".sideBarDetailContent li p span");
        this.enrollButton = this.detailCoursesContent.locator(".sideBarCourseDetail .btnGlobal.btnPreview");
        this.promotionInput = this.detailCoursesContent.locator(`.sideBarCourseDetail input[placeholder='${LabelData.promotionPlaceholder}']`);

        // related courses section
        this.relatedCourseLabel = this.relatedCourses.locator("h6").nth(0);
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
        await loginPage.editLoginUsername(LOGIN_TEST_USERNAME);
        await loginPage.editLoginPassword(LOGIN_TEST_PASSWORD);
        await loginPage.clickLogin();

        await this.page.waitForURL(`${BASE_URL}/chitiet/**`);

        const credentials = await this.page.evaluate(() => localStorage.getItem('credentials'));

        return JSON.stringify(credentials);
    }

    async getChildrenCount(parent: Locator, children: string): Promise<number> {
        return await parent.locator(`:scope > ${children}`).count();
    }

    async childrenVisibleCheck(parent: Locator, childrenCount: number ) {
        const children = parent.locator(':scope > *');

        for(let i = 0; i < childrenCount - 1; i++) {
            await expect(children.nth(i)).toBeVisible();
        }
    }

    async contentCheck(locator: Locator, data?: any, specifyCourse?: specifyDataCheck) {
        let checkData = data;
        if(specifyCourse) {
            const course = AllCourseDetailData[specifyCourse.id];
            checkData = course[specifyCourse.field];
            if(specifyCourse.field === "courseBenefitContent") {
                await this.multipleDataCheck(locator, checkData);
                return;
            }

            if(specifyCourse.field === "structure") {
                await this.structureDataCheck(locator, checkData);
                return;
            }
        }

        if (checkData) {
            const textContent = await locator.textContent();
            await expect(textContent?.trim()).toBe(checkData);
        }
        else {
            fail("Dữ liệu không hợp lệ");
        }
    }

    async multipleDataCheck(locator: Locator, data: any) {
        const count = await locator.count();

        if(count > 0) 
            for(let i = 0; i < count - 1; i++) {
                const textContent = await locator.nth(i).textContent()
                await expect(textContent).toBe(data[i]);
            }
        else
            fail("Không tìm thấy element");
    }

    async structureDataCheck(locator: Locator, data: any) {
        const count = await locator.count();

        for(let i = 0; i < count - 1; i++) {
            const chapter = locator.nth(i);
            const chapterName = await chapter.locator(".sectionCourse span").textContent();

            if(chapterName !== null && data[chapterName]) {
                const previewButton = chapter.locator(".btnGlobal.btnPreview");
                const lessonLabel = chapter.locator("p");
                const checkLessonTitle = data[chapterName].title;
                const lessonLocator = chapter.locator(".lessonContainer .lessonContent span:nth-of-type(1)");
                
                await expect(previewButton).toBeVisible();
                await this.contentCheck(lessonLabel, LabelData.lessonLabel);
                await this.multipleDataCheck(lessonLocator,checkLessonTitle);
            }
            else {
                fail("Mục/chương không trùng khớp");
            }
            
        }
    }

    async expectImageLoaded(locator: Locator) {
        const width = await locator.evaluate((img: HTMLImageElement) => img.naturalWidth);
        await expect(width).toBeGreaterThan(0);
    }

    async childrenItemVisible(parent: Locator, children: CourseSelectTypes) {
        for(const [key, selector] of Object.entries(children)) {
            const childrenLocator = parent.locator(`${selector}`);

            switch (key) {
                case "thumbnail":
                    await this.expectImageLoaded(childrenLocator);
                    break;
                default:
                    await expect(childrenLocator).toBeVisible();
                    break;
            }
        }
    }

}