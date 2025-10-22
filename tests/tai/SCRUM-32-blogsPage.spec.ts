import { test, expect } from "@playwright/test"
import { BlogsPage } from "../../pages/BlogsPage"
import { RANDOM_BLOG_POST,
         RANDOM_FILTER_CATEGORY,
         RANDOM_SUGGESTED_POST
} from '../../utils/blogsPageUtil'

test.describe("Related Courses Feature", async() => {
    let blogsPage: BlogsPage;
    
    test.beforeEach(async ({ page }) => {
        blogsPage = new BlogsPage(page);
        await blogsPage.goToBlogsPage();
    });

    test('TC01: Feature check - Hover vào nút nhấn "Xem thêm" ở trên các Blog Item. ', async({page}) => {
        const count = await blogsPage.blogItemLeftPosts.count();
        for(let i = 0; i < count - 1; i++) {
            const post = blogsPage.blogItemLeftPosts.nth(i);
            const postPreviewButton = post.locator(".btnGlobal.btnCardBlog");

            // trước khi hover thì thuộc tính transform là none
            const transformBeforeHover = await postPreviewButton.evaluate(el => getComputedStyle(el).transform);
            
            await postPreviewButton.scrollIntoViewIfNeeded();
            await postPreviewButton.hover();
            // vì nút nhấn có transition nên cần đợi hết transition mới kiểm tra
            await page.waitForTimeout(600);
            // sau khi hover thì thuộc tính transform đã được gán giá trị
            const transformAfterHover = await postPreviewButton.evaluate(el => getComputedStyle(el).transform);

            // mong đợi kiểm tra 2 style css transform trước và sau hover sẽ khác nhau
            expect(transformBeforeHover).not.toBe(transformAfterHover);

            // Reset lại trạng thái hover cho vòng lặp kế tiếp
            await page.mouse.move(0, 0);
            await page.waitForTimeout(300);
        }
    });

    test('TC02: Feature check - Bấm nút "Xem thêm" ở trên các Blog Item.', async({page}) => {
        const currentUrl = await page.url();

        // tổng các khoá học có liên quan
        const count = await blogsPage.blogItemLeftPosts.count()
        const randomBlogPost = Number(RANDOM_BLOG_POST);

        // lựa ngẫu nhiên 1 khoá học để thực hiện bấm nút
        if(randomBlogPost <= count - 1) {
            const chosenBlogPost = blogsPage.blogItemLeftPosts.nth(randomBlogPost);
            // Scroll tới vị trí của khoá học liên quan trước khi bấm nút
            await chosenBlogPost.scrollIntoViewIfNeeded();
            

            const postPreviewButton = chosenBlogPost.locator(".btnGlobal.btnCardBlog");

            // bấm vào nút xem thêm của bài post được chọn
            await postPreviewButton.click();
            
            // lấy url sau khi bấm
            const urlAfterClick = await page.url();

            // mong url trước và sau khi sẽ khác nhau
            expect(currentUrl).not.toBe(urlAfterClick);
        }
    });

    test('TC03: Feature check - Bấm vào tên bài đăng trên các Blog Item.', async({page}) => {
        const currentUrl = await page.url();

        // tổng các khoá học có liên quan
        const count = await blogsPage.blogItemLeftPosts.count()
        const randomBlogPost = Number(RANDOM_BLOG_POST);

        // lựa ngẫu nhiên 1 khoá học để thực hiện bấm nút
        if(randomBlogPost <= count - 1) {
            const chosenBlogPost = blogsPage.blogItemLeftPosts.nth(randomBlogPost);
            // Scroll tới vị trí của khoá học liên quan trước khi bấm nút
            await chosenBlogPost.scrollIntoViewIfNeeded();
            

            const postTitle = chosenBlogPost.locator("h6");

            // bấm vào tiêu đề của bài post được chọn
            await postTitle.click();
            
            // lấy url sau khi bấm
            const urlAfterClick = await page.url();

            // mong url trước và sau khi bấm sẽ khác nhau
            expect(currentUrl).not.toBe(urlAfterClick);
        }
    });

    test('TC04: Feature check - Bấm vào Thumbnail bài đăng trên các Blog Item.', async({page}) => {
        const currentUrl = await page.url();

        // tổng các khoá học có liên quan
        const count = await blogsPage.blogItemLeftPosts.count()
        const randomBlogPost = Number(RANDOM_BLOG_POST);

        // lựa ngẫu nhiên 1 khoá học để thực hiện bấm nút
        if(randomBlogPost <= count - 1) {
            const chosenBlogPost = blogsPage.blogItemLeftPosts.nth(randomBlogPost);
            // Scroll tới vị trí của khoá học liên quan trước khi bấm nút
            await chosenBlogPost.scrollIntoViewIfNeeded();
            

            const postThumbnail = chosenBlogPost.locator(".imgCardBlog");

            // bấm vào thumbnail bài post được chọn
            await postThumbnail.click();
            
            // lấy url sau khi bấm 
            const urlAfterClick = await page.url();

            // mong url trước và sau khi bấm sẽ khác nhau
            expect(currentUrl).not.toBe(urlAfterClick);
        }
    });

    test('TC05: Feature check - Bấm vào các chủ đề được đề xuất.', async({page}) => {
        const currentUrl = await page.url();
        // tổng các category cho phép filter
        const count = await blogsPage.blogItemRight.locator('.blogRightBox li a').count();
        const randomFilterCategory = Number(RANDOM_FILTER_CATEGORY);

        if(randomFilterCategory <= count - 1) {
            const chosenCategory = blogsPage.blogItemRight.locator('.blogRightBox li a').nth(randomFilterCategory);
            
            // bấm vào category được chọn
            await chosenCategory.click();

            // lấy url sau khi bấm 
            const urlAfterClick = await page.url();

            // mong url trước và sau khi bấm sẽ khác nhau
            expect(currentUrl).not.toBe(urlAfterClick);
        }
    });

    test('TC06: Feature check - Bấm vào tên các bài đăng được đề xuất.', async({page}) => {
        const currentUrl = await page.url();
        // tổng các category cho phép filter
        const count = await blogsPage.blogItemRight.locator('.blogRightBox .postBlog').count();
        const randomSuggestedPost = Number(RANDOM_SUGGESTED_POST);

        if(randomSuggestedPost <= count - 1) {
            const chosenSuggestedPost = blogsPage.blogItemRight.locator('.blogRightBox .postBlog').nth(randomSuggestedPost);
            const chosenPostTitle = chosenSuggestedPost.locator('h6');

            // bấm vào bài viết đề xuất
            await chosenPostTitle.click();

            // lấy url sau khi bấm 
            const urlAfterClick = await page.url();

            // mong url trước và sau khi bấm sẽ khác nhau
            expect(currentUrl).not.toBe(urlAfterClick);
        }
    });
});