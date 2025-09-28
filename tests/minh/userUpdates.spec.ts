import { expect, test } from "@playwright/test";
import { UserInformationPage } from "../../pages/UserInformationPage";
import { LoginPage } from "../../pages/LoginPage";
import { BASE_URL } from "../../utils/utils";

test.describe("Kiểm thử 'cập nhật user'", () => {
  //Khai báo biến loginPage, userInformation global
  let loginPage: LoginPage;
  let userInformationPage: UserInformationPage;

  //Khai báo biến
  const errorUsernameLetters: string = "Chỉ nhập kí tự chữ";
  const errorUsernameNotEmpty: string = "Tên không được để trống";
  const errorPassword: string =
    "Mật khẩu phải ít nhất 8 tự gồm chữ, số, và kí tự đặc biệt";

  test.beforeEach(async ({ page }) => {
    //Khởi tạo loginPage, UserInformationPage
    loginPage = new LoginPage(page);
    userInformationPage = new UserInformationPage(page);

    //vào trang đăng nhập
    await loginPage.goto();
    await loginPage.editUsername("admin123321");
    await loginPage.editPassword("123456aZ@");
    await loginPage.clickLogin();

    //verify thành công đăng nhập
    await expect(page.getByRole("heading", { name: "Chào mừng" })).toBeVisible({
      timeout: 5000,
    });
    //Đi tới trang "Thông tin cá nhân"
    await userInformationPage.gotoPage();

    //verify thành công vào trang cá nhân
    await expect(
      page.locator("h3", { hasText: "Thông tin cá nhân" })
    ).toHaveText("Thông tin cá nhân");

    //click vào nút "cập nhật" -> hiển thị modal cập nhật
    await userInformationPage.clickBtnUpdate();
    await expect(
      page.locator("h5", { hasText: "Chỉnh sửa thông tin cá nhân" })
    ).toHaveText("Chỉnh sửa thông tin cá nhân");
  });

  test("TC-05: Nhập 'Họ và tên' đúng định dạng", async ({ page }) => {
    //test fill đúng định dạng
    const expected: string = "Minh";
    await userInformationPage.editUsername(expected);
    const actual = await userInformationPage.username.inputValue();
    expect(actual).toBe(expected);
    //test fill không hiện thông báo lỗi
    const expectedError: string = "";
    const actualError = await userInformationPage.getErrorMessageUsername();
    expect(actualError).toBe(expectedError);
  });

  test("TC-06: Nhập field 'Họ và tên' ít hơn 2 ký tự", async () => {
    await userInformationPage.editUsername("T");
    const expectedError: string = "Vui lòng nhập tên nhiều hơn 2 ký tự";
    const actualError = await userInformationPage.getErrorMessageUsername();
    expect(actualError).toBe(expectedError);
  });

  test("TC-07: Nhập field 'Họ và tên' nhiều hơn 32 ký tự", async () => {
    await userInformationPage.editUsername(
      "ndmnmknjknkjnajkndjksandjknasxzcxzczxcxzczczx"
    );
    const actual = await userInformationPage.username.inputValue();
    expect(actual.length).toBeLessThanOrEqual(32);
  });

  test("TC-08: Nhập field 'Họ và tên' với kí tự đặc biệt", async () => {
    await userInformationPage.editUsername("@MInh");
    await userInformationPage.username.blur();
    const expextedError: string = errorUsernameLetters;
    const actualError = await userInformationPage.getErrorMessageUsername();
    expect(actualError).toBe(expextedError);
  });

  test("TC-09: Nhập field 'Họ và tên' với kí tự số", async () => {
    await userInformationPage.editUsername("123514");
    await userInformationPage.username.blur();
    const expectedError: string = errorUsernameLetters;
    const actualError = await userInformationPage.getErrorMessageUsername();
    console.log(actualError);
    await expect(actualError).toBe(expectedError);
  });

  test("TC-10: Nhập field 'Họ và tên' với khoảng trống đầu tiên", async () => {
    await userInformationPage.editUsername(" ninub");
    const expected: string = "ninub";
    const actual = await userInformationPage.username.inputValue();
    expect(actual).toBe(expected);
  });

  test("TC-11: Để trống field 'Họ và tên'", async () => {
    await userInformationPage.editUsername("");
    await userInformationPage.username.blur();
    const expectedError: string = errorUsernameNotEmpty;
    const actualError = await userInformationPage.getErrorMessageUsername();
    expect(actualError).toBe(expectedError);
  });

  test("TC-12: Nhập field 'Mật khẩu' đúng định dạng", async () => {
    //test nhập đúng dữ liệu
    const expected = "0212354aZ@#";
    await userInformationPage.editPassword(expected);
    const actual = await userInformationPage.password.inputValue();
    expect(actual).toBe(expected);
    //test ẩn dữ liệu
    const expectedType = "password";
    const actualType = await userInformationPage.password.getAttribute("type");
    expect(actualType).toBe(expectedType);
  });

  test("TC-13: Nhập field 'Mật khẩu' không chứa chữ in hoa", async () => {
    await userInformationPage.editPassword("minh123@#");
    await userInformationPage.password.blur();
    const expectedError = errorPassword;
    const actualError = await userInformationPage.getErrorMessagePassword();
    expect(actualError).toBe(expectedError);
  });

  test("TC-14: Nhập field 'Mật khẩu' không chứa kí tự đặc biệt", async () => {
    await userInformationPage.editPassword("1234578asdAZ");
    await userInformationPage.password.blur();
    const expectedError = errorPassword;
    const actualError = await userInformationPage.getErrorMessagePassword();
    expect(actualError).toBe(expectedError);
  });

  test("TC-15: Nhập field 'Mật khẩu' ít hơn 8 kí tự", async () => {
    await userInformationPage.editPassword("1234qA@");
    await userInformationPage.password.blur();
    const expectedError = errorPassword;
    const actualError = await userInformationPage.getErrorMessagePassword();
    expect(actualError).toBe(expectedError);
  });
});
