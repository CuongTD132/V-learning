import { Page, Locator, expect } from "@playwright/test"
import { BASE_URL } from "../utils/utils"
import { blogItemChildrenTypes, customType } from "../tests/tai/type/blogTypes";

export class BlogsPage {

    readonly page: Page;
    readonly blogCourse: Locator;
    readonly screenTitle: Locator;
    readonly headerTitle: Locator;
    readonly headerSubTitle: Locator;
    readonly blogCourseContainer: Locator;
    readonly blogItemLeft: Locator;
    readonly blogItemLeftPosts: Locator;
    readonly blogItemRight: Locator;
    readonly blogItemRightSuggestedCategories: Locator;
    readonly blogItemRightPopularPosts: Locator;


    constructor(page: Page) {
        this.page = page;
        this.blogCourse = page.locator(".blogCourse");
        this.screenTitle = page.locator(".titleCourse");
        this.headerTitle = this.screenTitle.locator("h3");
        this.headerSubTitle = this.screenTitle.locator("p");
        this.blogCourseContainer = page.locator(".blogCourseContainer");
        this.blogItemLeft = this.blogCourseContainer.locator(".blogItemLeft");
        this.blogItemRight = this.blogCourseContainer.locator(".blogItemRight");

        // Blog items left
        this.blogItemLeftPosts = this.blogItemLeft.locator(".cardBlog");
        
        // Blog items right
        this.blogItemRightSuggestedCategories = this.blogItemRight.locator(".blogRightBox li a");
        this.blogItemRightPopularPosts = this.blogItemRight.locator(".blogRightBox .postBlog");
    }

    async goToBlogsPage() {
        await this.page.goto(`${BASE_URL}/blog`, { waitUntil: 'domcontentloaded' });
    }

    async getChildrenCount(parent: Locator, children: string): Promise<number> {
        return await parent.locator(`:scope > ${children}`).count();
    }

    async childrenVisibleCheck(parent: Locator, childrenCount: number, ) {
        const children = parent.locator(':scope > *');

        for(let i = 0; i < childrenCount - 1; i++) {
            await expect(children.nth(i)).toBeVisible();
        }
    }

    async childrenItemVisible(parent: Locator, children: customType) {
        for(const [key, selector] of Object.entries(children)) {
            const childrenLocator = parent.locator(`${selector}`);

            switch (key) {
                case "thumbnail":
                    await this.expectImageLoaded(childrenLocator);
                    break;
                case "avatar":
                    await this.expectImageLoaded(childrenLocator);
                    break;
                default:
                    await expect(childrenLocator).toBeVisible();
                    break;
            }
            
        }
    }

    async expectImageLoaded(locator: Locator) {
        const width = await locator.evaluate((img: HTMLImageElement) => img.naturalWidth);
        await expect(width).toBeGreaterThan(0);
    }

}