import { test, expect } from "@playwright/test"
import { BlogsPage } from "../../pages/BlogsPage"
import { blogItemChildrenSelectors, headerLabelData, suggestBlogItemChildrenSelectors } from "./data/blogData";
import { fail } from "assert";


test.describe("Related Courses Feature", async() => {
    let blogsPage: BlogsPage;
    
    test.beforeEach(async ({ page }) => {
        blogsPage = new BlogsPage(page);
        await blogsPage.goToBlogsPage();
    });

    test('TC01: GUI check - Hiển thị 2 section trên màn hình.', async() => {
        const childrenCount = await blogsPage.getChildrenCount(blogsPage.blogCourse, "*");

        // Chỉ mong đợi hiển thị đúng 2 section trên màn hình
        if (childrenCount === 2)
            blogsPage.getBlogCourseStructure(blogsPage.blogCourse, childrenCount);
        else
            fail(`Blog Page hiển thị không đúng ${childrenCount} section`);
    });

    test('TC02: GUI check - Label Header hiển thị "BLOG".', async() => {
        expect(blogsPage.headerTitle).toHaveText(headerLabelData.title);
    });

    test('TC03: GUI check - Label Header hiển thị "Tiến lên và không chần chừ".', async() => {
        expect(blogsPage.headerSubTitle).toHaveText(headerLabelData.subTitle);
    });

    test('TC04: GUI check - Hiển thị danh sách các bài Blog.', async() => {
        const childrenCount = await blogsPage.blogItemLeftPosts.count();

        // mong đợi chỉ hiển thị 8 bài viết trong blog page
        if (childrenCount === 8) {
            for(let i = 0; i < childrenCount - 1; i++) {
                await blogsPage.childrenItemVisible(blogsPage.blogItemLeftPosts.nth(i), blogItemChildrenSelectors);
            }
        } 
        else {
            fail(`Hiển thị không đúng ${childrenCount} bài blog trên 1 trang`);
        }
    });

    test('TC05: GUI check - Hiển thị các chủ đề được đề xuất.', async() => {
        const childrenCount = await blogsPage.blogItemRightSuggestedCategories.count();

        // mong đợi chỉ xuất hiện 7 chủ đề được đề xuất
        if(childrenCount === 7) {
            for(let i = 0; i < childrenCount - 1; i++)
                expect(blogsPage.blogItemRightSuggestedCategories.nth(i)).toBeVisible();
        }
        else {
            fail(`Hiển thị không đúng ${childrenCount} chủ đề được đề xuất`);
        }
    });

    test('TC06: Feature check - Bấm vào tên các bài đăng được đề xuất.', async() => {
        const childrenCount = await blogsPage.blogItemRightPopularPosts.count();

        // mong đợi chỉ xuất hiện 3 bài viết được đề xuất
        if(childrenCount === 3) {
            for(let i = 0; i < childrenCount - 1; i++)
                await blogsPage.childrenItemVisible(blogsPage.blogItemRightPopularPosts.nth(i), suggestBlogItemChildrenSelectors);
        }
        else {
            fail(`Hiển thị không đúng ${childrenCount} bài viết được đề xuất`);
        }
    });
});