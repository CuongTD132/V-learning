import { expect, test } from "@playwright/test";
import { UserInformationPage } from "../../pages/UserInformationPage";
import { LoginPage } from "../../pages/LoginPage";

test.describe("Kiểm thử 'cập nhật user'", () => {
  //Khai báo biến loginPage, userInformation global
  let loginPage: LoginPage;
  let userInformationPage: UserInformationPage;

  //Khai báo biến errorMessgae global
  const errorUsernameLetters: string = "Chỉ nhập kí tự chữ";
  const errorUsernameNotEmpty: string = "Tên không được để trống";
  const errorPassword: string =
    "Mật khẩu phải ít nhất 8 tự gồm chữ, số, và kí tự đặc biệt";
  const errorPasswordNotEmpty: string = "Mật khẩu không được để trống";
  const errorEmailNotEmpty: string = "Email không được để trống";
  const errorEmailNotValid: string = "Email không hợp lệ";
  const errorPhoneNumberNotValid: string = "Số điện thoại chưa đúng định dạng";
  const errorPhoneNumberNotEmpty: string = "Số điện thoại không được để trống";

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

  test("TC-16: Để trống field 'Mật khẩu'", async () => {
    await userInformationPage.editPassword("");
    await userInformationPage.password.blur();
    const expectedError = errorPasswordNotEmpty;
    const actualError = await userInformationPage.getErrorMessagePassword();
    expect(actualError).toBe(expectedError);
  });

  test("TC-17: Nhập field 'Email' đúng định dạng", async () => {
    //test password hiển thị đúng định dạng
    const expected = "minh1234@gmail.com";
    await userInformationPage.editEmail(expected);
    const actual = await userInformationPage.email.inputValue();
    expect(actual).toBe(expected);
    //test không hiển thị thông báo lỗi
    const expectedError = "";
    const actualError = await userInformationPage.getErrorMessageEmail();
    expect(actualError).toBe(expectedError);
  });

  test("TC-18: Để trống trường 'Email'", async () => {
    await userInformationPage.editEmail("");
    await userInformationPage.email.blur();
    const expectedError = errorEmailNotEmpty;
    const actualError = await userInformationPage.getErrorMessageEmail();
    expect(actualError).toBe(expectedError);
  });

  test("TC-19: Field 'Email' không có ký tự @", async () => {
    await userInformationPage.editEmail("minh123.com");
    await userInformationPage.email.blur();
    const expectedError = errorEmailNotValid;
    const actualError = await userInformationPage.getErrorMessageEmail();
    expect(actualError).toBe(expectedError);
  });

  test("TC-20: Nhập field 'Email' không có domain", async () => {
    await userInformationPage.editEmail("minh@gmail");
    await userInformationPage.email.blur();
    const expectedError = errorEmailNotValid;
    const actualError = await userInformationPage.getErrorMessageEmail();
    expect(actualError).toBe(expectedError);
  });

  test("TC-21: Nhập field 'Email' có ký tự đặc biệt", async () => {
    await userInformationPage.editEmail("minh#@gmail.com");
    await userInformationPage.email.blur();
    const expectedError = errorEmailNotValid;
    const actualError = await userInformationPage.getErrorMessageEmail();
    expect(actualError).toBe(expectedError);
  });

  test("TC-22: Nhập field 'Email' có khoảng trắng", async () => {
    await userInformationPage.editEmail("minh @gmail.com");
    await userInformationPage.email.blur();
    const expectedError = errorEmailNotValid;
    const actualError = await userInformationPage.getErrorMessageEmail();
    expect(actualError).toBe(expectedError);
  });

  test("TC-23: Nhập field 'Số điện thoại' bắt đầu bằng đầu số hợp lệ", async () => {
    const datas = [
      "0345678912",
      "0545678912",
      "0745678912",
      "0845678912",
      "0945678912",
    ];
    for (const data of datas) {
      //test nhập đúng dữ liệu từng data
      const expected = data;
      await userInformationPage.editPhoneNumber(data);
      const actual = await userInformationPage.phoneNumber.inputValue();
      expect(actual).toBe(expected);
      //test không hiển thị thông báo lỗi từng data
      await userInformationPage.phoneNumber.blur();
      const expectedError = "";
      const actualError =
        await userInformationPage.getErrorMessagePhoneNumber();
      expect(actualError).toBe(expectedError);
    }
  });

  test("TC-24: Nhập field 'Số điện thoại' bắt đầu bằng đầu số không hợp lệ", async () => {
    const datas = ["0145678912", "0245678912", "0445678912", "0645678912"];
    for (const data of datas) {
      await userInformationPage.editPhoneNumber(data);
      await userInformationPage.phoneNumber.blur();
      const expectedError = errorPhoneNumberNotValid;
      const actualError =
        await userInformationPage.getErrorMessagePhoneNumber();
      expect(actualError).toBe(expectedError);
    }
  });

  test("TC-25: Nhập field 'Số điện thoại' có ký tự chữ", async () => {
    const datas = ["034567891m", "03sd15164a"];
    for (const data of datas) {
      await userInformationPage.editPhoneNumber(data);
      await userInformationPage.phoneNumber.blur();
      const expectedError = errorEmailNotValid;
      const actualError =
        await userInformationPage.getErrorMessagePhoneNumber();
      expect(actualError).toBe(expectedError);
    }
  });

  test("TC-26: Nhập field 'Số điện thoại' có ký tự đặc biệt", async () => {
    const datas = ["03=8284121", "03@456487", "035464_132", "0356,78,456"];
    for (const data of datas) {
      await userInformationPage.editPhoneNumber(data);
      await userInformationPage.phoneNumber.blur();
      const expectedError = errorEmailNotValid;
      const actualError =
        await userInformationPage.getErrorMessagePhoneNumber();
      expect(actualError).toBe(expectedError);
    }
  });

  test("TC-27: Nhập field 'Số điện thoại' có khoảng trắng", async () => {
    const datas = ["0356 456 456", "0356 45 45"];
    for (const data of datas) {
      await userInformationPage.editPhoneNumber(data);
      await userInformationPage.phoneNumber.blur();
      const expectedError = errorPhoneNumberNotValid;
      const actualError =
        await userInformationPage.getErrorMessagePhoneNumber();
      expect(actualError).toBe(expectedError);
    }
  });

  test("TC-28: Để trống field 'Số điện thoại'", async () => {
    await userInformationPage.editPhoneNumber("");
    await userInformationPage.phoneNumber.blur();
    const expectedError = errorPhoneNumberNotEmpty;
    const actualError = await userInformationPage.getErrorMessagePhoneNumber();
    expect(actualError).toBe(expectedError);
  });

  test("TC-29: Nhập field 'Số điện thoại' nhiều hơn 10 ký tự", async () => {
    const datas = ["0345678911231", "034654987451"];
    for (const data of datas) {
      await userInformationPage.editPhoneNumber(data);
      await userInformationPage.phoneNumber.blur();
      const expectedError = errorPhoneNumberNotValid;
      const actualError =
        await userInformationPage.getErrorMessagePhoneNumber();
      expect(actualError).toBe(expectedError);
    }
  });

  test("TC-30: Nhập field 'Số điện thoại' ít hơn 10 ký tự", async () => {
    const datas = ["03456", "035611312"];
    for (const data of datas) {
      await userInformationPage.editPhoneNumber(data);
      await userInformationPage.phoneNumber.blur();
      const expectedError = errorPhoneNumberNotValid;
      const actualError =
        await userInformationPage.getErrorMessagePhoneNumber();
      expect(actualError).toBe(expectedError);
    }
  });

  test("TC-31: Nhập field 'Số điện thoại' với số đầu tiên khác 0", async () => {
    const datas = ["1234567890", "9123456078"];
    for (const data of datas) {
      await userInformationPage.editPhoneNumber(data);
      await userInformationPage.phoneNumber.blur();
      const expectedError = errorPhoneNumberNotValid;
      const actualError =
        await userInformationPage.getErrorMessagePhoneNumber();
      expect(expectedError).toBe(actualError);
    }
  });
});
