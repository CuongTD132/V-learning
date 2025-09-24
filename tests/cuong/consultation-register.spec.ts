// import { expect, Locator, test } from "@playwright/test";
// import { LandingPage } from "../pages/LandingPage";
//
// test.describe("Register Consultation", () => {
//     let landingPage: LandingPage;
//     let formTitle: Locator;
//
//     test.beforeEach(async ({ page }) => {
//         landingPage = new LandingPage(page);
//         await landingPage.goToPage();
//         formTitle = page.getByText("Đăng kí tư vấn");
//         await formTitle.scrollIntoViewIfNeeded();
//     });
//
//     //General
//     test.describe("General", () => {
//         test("TC1: Register Form Accessibility", async () => {
//             await expect(formTitle).toBeVisible();
//         });
//
//         test("TC2.1: Verify Register Form Fields Are Visible", async () => {
//             await landingPage.verifyRegisterFormFields();
//         });
//
//         test("TC2.2: Verify Required Mark (*) Is Displayed", async () => {
//             await expect.soft(
//                 landingPage.page.locator('label:has-text("Họ và tên *")')
//             ).toBeVisible();
//             await expect.soft(
//                 landingPage.page.locator('label:has-text("Email *")')
//             ).toBeVisible();
//             await expect.soft(
//                 landingPage.page.locator('label:has-text("Số điện thoại *")')
//             ).toBeVisible();
//         });
//     });
//
//     //Happy case
//     test.describe("Happy Case", () => {
//         test("TC3: Submit Register Form With Valid Data", async () => {
//             await landingPage.submitForm(
//                 "Nguyễn Văn A",
//                 "0901234567",
//                 "nguyenvana@gmail.com",
//                 "LẬP TRÌNH FRONT-END",
//                 "Nếu tôi có thắc mắc về bài học thì có thể hỏi ai?"
//             );
//             await expect(
//                 landingPage.page.getByText("Yêu cầu tư vấn của bạn đã được gửi thành công")
//             ).toBeVisible();
//         });
//
//         test("TC9: Submit Register Form When Leaving Optional Fields Blank", async () => {
//             await landingPage.submitForm("Nguyễn Văn A", "0901234567", "nguyenvana@gmail.com");
//             await expect(
//                 landingPage.page.getByText("Yêu cầu tư vấn của bạn đã được gửi thành công")
//             ).toBeVisible();
//         });
//
//         test("TC10: Verify Form Reset After Submit", async () => {
//             await landingPage.submitForm("Nguyễn Văn A", "0901234567", "nguyenvana@gmail.com");
//             await expect(
//                 landingPage.page.getByText("Yêu cầu tư vấn của bạn đã được gửi thành công")
//             ).toBeVisible();
//
//             // Kiểm tra form reset
//             await expect(landingPage.fullName).toHaveValue("");
//             await expect(landingPage.email).toHaveValue("");
//             await expect(landingPage.phoneNumber).toHaveValue("");
//             await expect(landingPage.consultingContent).toHaveValue("");
//             await expect(landingPage.courseOfInterest).toHaveValue("");
//
//             // Check input không bị disable
//             await expect(landingPage.fullName).not.toBeDisabled();
//             await expect(landingPage.email).not.toBeDisabled();
//             await expect(landingPage.phoneNumber).not.toBeDisabled();
//             await expect(landingPage.consultingContent).not.toBeDisabled();
//             await expect(landingPage.courseOfInterest).not.toBeDisabled();
//         });
//     });
//
//     //Để trống trường bắt buộc
//     test.describe("Mandatory Fields - Empty", () => {
//         test("TC4: Empty FullName", async () => {
//             await landingPage.submitForm("", "0901234567", "nguyenvana@gmail.com");
//             await expect(landingPage.errorMessages).toContainText(
//                 "Vui lòng nhập Họ và tên của bạn"
//             );
//         });
//
//         test("TC5: Empty Phone Number", async () => {
//             await landingPage.submitForm("Nguyễn Văn A", "", "nguyenvana@gmail.com");
//             await expect(landingPage.errorMessages).toContainText(
//                 "Vui lòng nhập Số điện thoại của bạn."
//             );
//         });
//
//         test("TC6: Empty Email", async () => {
//             await landingPage.submitForm("Nguyễn Văn A", "0901234567", "");
//             await expect(landingPage.errorMessages).toContainText(
//                 "Vui lòng nhập Email của bạn"
//             );
//         });
//     });
//
//     //Validation - Format
//     test.describe("Validation - Format", () => {
//         test("TC7: Wrong Format Phone Number", async () => {
//             await landingPage.submitForm("Nguyễn Văn A", "09123456ab", "nguyenvana@gmail.com");
//             await expect(landingPage.errorMessages).toContainText(
//                 "Số điện thoại không hợp lệ"
//             );
//         });
//
//         test("TC8: Wrong Format Email", async () => {
//             await landingPage.submitForm("Nguyễn Văn A", "0901234567", "nguyen_van_a.com");
//             await expect(landingPage.errorMessages).toContainText(
//                 "Email không hợp lệ"
//             );
//         });
//
//         test("TC16: Valid Email With Special Characters", async () => {
//             await landingPage.submitForm(
//                 "Nguyễn Văn A",
//                 "0901234567",
//                 "user.name+alias@sub.domain.com"
//             );
//             await expect(
//                 landingPage.page.getByText("Yêu cầu tư vấn của bạn đã được gửi thành công")
//             ).toBeVisible();
//         });
//
//         test("TC17: Phone Number With Spacing", async () => {
//             await landingPage.submitForm("Nguyễn Văn A", "090 123 4567", "nguyenvana@gmail.com");
//             await expect(landingPage.errorMessages).toContainText(
//                 "Số điện thoại không hợp lệ"
//             );
//         });
//
//         test("TC18: Phone Number with Special Characters", async () => {
//             await landingPage.submitForm("Nguyễn Văn A", "090!@#4567", "nguyenvana@gmail.com");
//             await expect(landingPage.errorMessages).toContainText(
//                 "Số điện thoại không hợp lệ"
//             );
//         });
//     });
//
//     //Kiểm tra độ dài tối đa/tối thiểu
//     test.describe("Validation - Min/Max Length", () => {
//         test("TC11.1: FullName Under Minimum Length", async () => {
//             await landingPage.submitForm(
//                 landingPage.generateString("A", 4),
//                 "0901234567",
//                 "nguyenvana@gmail.com"
//             );
//             await expect(landingPage.errorMessages).toContainText("tối thiểu 5 ký tự");
//         });
//
//         test("TC11.2: FullName Over Maximum Length", async () => {
//             await landingPage.submitForm(
//                 landingPage.generateString("A", 101),
//                 "0901234567",
//                 "nguyenvana@gmail.com"
//             );
//             await expect(landingPage.errorMessages).toContainText("tối đa 100 ký tự");
//         });
//
//         test("TC12.1: Phone Number Under Minimum Length", async () => {
//             await landingPage.submitForm("Nguyễn Văn A", "09012", "nguyenvana@gmail.com");
//             await expect(landingPage.errorMessages).toContainText("Số điện thoại không hợp lệ");
//         });
//
//         test("TC12.2: Phone Over Maximum Length", async () => {
//             await landingPage.submitForm("Nguyễn Văn A", "090123456789", "nguyenvana@gmail.com");
//             await expect(landingPage.errorMessages).toContainText("Số điện thoại không hợp lệ");
//         });
//
//         test("TC12.3: Phone Number With Format +84", async () => {
//             await landingPage.submitForm("Nguyễn Văn A", "+84901234567", "nguyenvana@gmail.com");
//             await expect(landingPage.errorMessages).toContainText("Số điện thoại không hợp lệ");
//         });
//
//         test("TC13.1: Email Under Minimum Length", async () => {
//             await landingPage.submitForm("Nguyễn Văn A", "0901234567", "a@b.c");
//             await expect(landingPage.errorMessages).toContainText("Email tối thiểu 6 ký tự");
//         });
//
//         test("TC13.2: Email Over Maximum Length", async () => {
//             await landingPage.submitForm(
//                 "Nguyễn Văn A",
//                 "0901234567",
//                 landingPage.generateString("a", 101) + "@gmail.com"
//             );
//             await expect(landingPage.errorMessages).toContainText("Email tối đa 100 ký tự");
//         });
//
//         test("TC14.1: Khóa học quan tâm Under Minimum Length", async () => {
//             await landingPage.submitForm(
//                 "Nguyễn Văn A",
//                 "0901234567",
//                 "nguyenvana@gmail.com",
//                 "AI"
//             );
//             await expect(landingPage.errorMessages).toContainText("Tối thiểu 3 ký tự");
//         });
//
//         test("TC14.2: Khóa học quan tâm Over Maximum Length", async () => {
//             await landingPage.submitForm(
//                 "Nguyễn Văn A",
//                 "0901234567",
//                 "nguyenvana@gmail.com",
//                 landingPage.generateString("A", 51)
//             );
//             await expect(landingPage.errorMessages).toContainText("Tối đa 50 ký tự");
//         });
//
//         test("TC15.1: Nội dung tư vấn Under Minimum Length", async () => {
//             await landingPage.submitForm(
//                 "Nguyễn Văn A",
//                 "0901234567",
//                 "nguyenvana@gmail.com",
//                 "LẬP TRÌNH FRONT-END",
//                 "abc"
//             );
//             await expect(landingPage.errorMessages).toContainText("Tối thiểu 10 ký tự");
//         });
//
//         test("TC15.2: Nội dung tư vấn Over Maximum Length", async () => {
//             await landingPage.submitForm(
//                 "Nguyễn Văn A",
//                 "0901234567",
//                 "nguyenvana@gmail.com",
//                 "LẬP TRÌNH FRONT-END",
//                 landingPage.generateString("A", 101)
//             );
//             await expect(landingPage.errorMessages).toContainText("Tối đa 100 ký tự");
//         });
//     });
// });
