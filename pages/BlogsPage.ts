import { Page, Locator } from "@playwright/test"
import { BASE_URL } from "../utils/utils"

export class BlogsPage {

    readonly page: Page;
    readonly screenTitle: Locator;
    readonly blogCourseContainer: Locator;
    readonly blogItemLeft: Locator;
    readonly blogItemLeftPosts: Locator;
    readonly blogItemRight: Locator;
    readonly blogItemRightSuggestedCategories: Locator;
    readonly blogItemRightPopularPosts: Locator;


    constructor(page: Page) {
        this.page = page;
        this.screenTitle = page.locator(".titleCourse");
        this.blogCourseContainer = page.locator(".blogCourseContainer");
        this.blogItemLeft = this.blogCourseContainer.locator(".blogItemLeft");
        this.blogItemRight = this.blogCourseContainer.locator(".blogItemRight");

        // Blog items left
        this.blogItemLeftPosts = this.blogItemLeft.locator(".cardBlog");
        
        // Blog items right
        this.blogItemRightSuggestedCategories = this.blogItemRight.locator(".blogRightBox li a");
        this.blogItemRightPopularPosts = this.blogItemRight.locator(".blogRightBox .postBlog h6");
    }

    async goToBlogsPage() {
        await this.page.goto(`${BASE_URL}/blog`, { waitUntil: 'domcontentloaded' });
    }
}