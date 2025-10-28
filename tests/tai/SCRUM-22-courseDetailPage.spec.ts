import { test, expect } from "@playwright/test"
import { CoursesDetailPage } from "../../pages/CoursesDetailPage"
import { SELECTED_COURSSE_ID } from '../../utils/courseDetailPageUtil'
import { fail } from "assert";
import { CourseSelectors, LabelData, SideBarDetailContentData } from "./data/courseDetailData";
import { specifyDataCheck } from "./type/courseDetailTypes";

test.describe("Course Detail Left Page Feature", async() => {
    let coursesDetailPage: CoursesDetailPage;
    
    test.beforeEach(async ({ page }) => {
        coursesDetailPage = new CoursesDetailPage(page);
        await coursesDetailPage.goToDetailPage(Number(SELECTED_COURSSE_ID));
    });

    test('TC01: GUI check - Hiển thị 3 section trên màn hình.', async() => {
        const childrenCount = await coursesDetailPage.getChildrenCount(coursesDetailPage.detailCoures, "*");
        const matchCount = 3;
        
        // Chỉ mong đợi hiển thị đúng 3 section trên màn hình
        if (childrenCount === matchCount)
            coursesDetailPage.childrenVisibleCheck(coursesDetailPage.detailCoures, childrenCount);
        else
            fail(`Course Detail hiển thị không đúng ${matchCount} section`);
    });

    test('TC02: GUI check - Label Header hiển thị "THÔNG TIN KHOÁ HỌC".', async() => {
        await coursesDetailPage.contentCheck(coursesDetailPage.headerTitle, LabelData.title);
    });

    test('TC03: GUI check - Label Header hiển thị "Tiến lên và không chần chừ".', async() => {
        await coursesDetailPage.contentCheck(coursesDetailPage.headerSubTitle, LabelData.subTitle);
    });

    test('TC04: GUI check - Hiển thị tên khoá học.', async() => {
        const checkData: specifyDataCheck = {
            id: SELECTED_COURSSE_ID as number,
            field: "title"
        }

        await coursesDetailPage.contentCheck(coursesDetailPage.courseName, null, checkData)
    });

    test('TC05: GUI check - Hiển thị thông tin giảng viên.', async() => {
        const checkData: specifyDataCheck = {
            id: SELECTED_COURSSE_ID as number,
            field: "lecturer"
        }

        await coursesDetailPage.contentCheck(coursesDetailPage.lecturerName, null, checkData)
    });

    test('TC06: GUI check - Hiển thị thông tin lĩnh vực của khoá học.', async() => {
        const checkData: specifyDataCheck = {
            id: SELECTED_COURSSE_ID as number,
            field: "domain"
        }

        await coursesDetailPage.contentCheck(coursesDetailPage.domainName, null, checkData)
    });

    test('TC07: GUI check - Hiển thị thông tin đánh giá của khoá học.', async() => {
        const checkData: specifyDataCheck = {
            id: SELECTED_COURSSE_ID as number,
            field: "reviewCount"
        }

        await coursesDetailPage.contentCheck(coursesDetailPage.reviewCount, null, checkData)
    });

    test('TC08: GUI check - Hiển thị thông tin mô tả khoá học.', async() => {
        const checkData: specifyDataCheck = {
            id: SELECTED_COURSSE_ID as number,
            field: "descriptionContent"
        }

        await coursesDetailPage.contentCheck(coursesDetailPage.descriptionContent, null, checkData)
    });

    test('TC09: GUI check - Hiển thị Label "Những gì bạn sẽ học".', async() => {
        await coursesDetailPage.contentCheck(coursesDetailPage.courseBenefitLabel, LabelData.courseBenefitLabel);
    });

    test('TC10: GUI check - Hiển thị thông tin kết quả đạt được sau khi học.', async() => {
        const checkData: specifyDataCheck = {
            id: SELECTED_COURSSE_ID as number,
            field: "courseBenefitContent"
        }
        
        await coursesDetailPage.contentCheck(coursesDetailPage.courseBenefitContent, null, checkData)
    });

    test('TC11: GUI check - Hiển thị Label "Nội dung khóa học".', async() => {
        await coursesDetailPage.contentCheck(coursesDetailPage.learningPathLabel, LabelData.learningPathLabel);
    });

    test('TC12: GUI check - Hiển thị tiêu đề các bài học thuộc bên trong khoá học.', async() => {
        const checkData: specifyDataCheck = {
            id: SELECTED_COURSSE_ID as number,
            field: "structure"
        }

        await coursesDetailPage.contentCheck(coursesDetailPage.courseDetailItem, null, checkData)
    });

    test('TC13: GUI check - Bảng thông tin tình trạng của khoá học nằm bên phải màn hình.', async() => {
        await expect(coursesDetailPage.sideBarCourseDetail).toBeVisible();
    });

    test('TC14: GUI check - Hiển thị nút nhấn "Đăng ký".', async() => {
        await expect(coursesDetailPage.enrollButton).toBeVisible();
    });

    test('TC15: GUI check - Hiển thị thông tin tình trạng khoá học.', async() => {
        const count = await coursesDetailPage.sideBarContent.count();

        for(let i = 0; i < count - 1; i++) {
            const checkItem = coursesDetailPage.sideBarContent.nth(i);
            const checkData =  SideBarDetailContentData[i];
            await coursesDetailPage.contentCheck(checkItem, checkData);
        }
    });

    test('TC16: GUI check - Hiển thị ô nhập mã khuyến mãi', async() => {
        await expect(coursesDetailPage.promotionInput).toBeVisible();
        await expect(coursesDetailPage.promotionInput).toHaveAttribute('placeholder', `${LabelData.promotionPlaceholder}`);
    });

    test('TC17: GUI check - Hiển thị Label "Khoá học tham khảo".', async() => {
        const childElementCount = await coursesDetailPage.relatedCourseLabel.evaluate(el => el.children.length);

        if(childElementCount === 0)
            await coursesDetailPage.contentCheck(coursesDetailPage.relatedCourseLabel, LabelData.relatedCourseLabel);
        else
            fail("Tiêu đề 'Khoá học tham khảo' chứa phần tử khác !!!");
    });

    test('TC18: GUI check - Hiển thị các khoá học liên quan đến khoá học hiện tại.', async() => {
        const count = await coursesDetailPage.relatedCourseItems.count();
        const matchCount = 4;

        // chỉ mong đợi xuất hiện 4 khoá học có liên quan
        if(count === matchCount) {
            for(let i = 0; i < count - 1; i++) {
                const relatedCourse = coursesDetailPage.relatedCourseItems.nth(i);
                await coursesDetailPage.childrenItemVisible(relatedCourse, CourseSelectors)
            }
        }
        else {
            fail(`Danh sách khoá học liên quan hiển thị không đúng ${matchCount} khoá học.`);
        }
    });
});

