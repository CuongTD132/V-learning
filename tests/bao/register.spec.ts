import { test, expect } from "@playwright/test"
import { LoginPage } from "../../pages/LoginPage"
import { log } from "console";

test.describe("Register Tests", async () => {
    let loginPage: LoginPage;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.enterSignUp();
    });
    test("TC-1 Đăng ký với đầy đủ thông tin hợp lệ ", async ({ page }) => {
        const randomUser = "bao" + Date.now().toString().slice(-4);
        const randomEmail = `baoly${Date.now().toString().slice(-4)}@gmail.com`;
        console.log("random Username", randomUser)
        console.log("RandomEmail", randomEmail)

        await loginPage.editUsername(randomUser);
        await loginPage.editemail(randomEmail);
        await loginPage.editfullname("Nguyễn Lý Bảo");
        await loginPage.editPassword("Bao29052001@");
        await loginPage.editphone("0585826711");
        await loginPage.editparam("GP01");

        await loginPage.clickregister();

        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain("Đăng kí thành công");
    })
    test("TC-2 Nhập field Tài khoản đúng định dạng ", async() =>{
        await loginPage.editUsername("Bao29");

        const errorMessageUserName = await loginPage.getErrorMessageUserName();
        expect(errorMessageUserName).toBe("");
    })
    test("TC-3 Bỏ trống trường tài khoản", async () => {
        await loginPage.editUsername("");
        await loginPage.usernamesignup.blur();
        
        const errorMessageUserName = await loginPage.getErrorMessageUserName();
        expect(errorMessageUserName).toBe("Tài khoản không được để trống");
    
    });
   test("TC-4 Nhập tài khoản có chứa ký tự đặc biệt", async () => {
    await loginPage.editUsername("Bao2905@#$")
    await loginPage.usernamesignup.blur();

    const errorMessageUserName = await loginPage.getErrorMessageUserName();
    expect(errorMessageUserName).toBe("Tài khoản không hợp lệ");
   })
   test("TC-5 Nhập tài khoản có khoảng trắng", async ()=> {
    await loginPage.editUsername("Bao  2905");
    await loginPage.usernamesignup.blur();

    const errorMessageUserName = await loginPage.getErrorMessageUserName();
    expect(errorMessageUserName).toBe("Tài khoản không hợp lệ");
   })
   test("TC-6 Nhập tài khoản ít hơn 2 ký tự ", async () => {
    await loginPage.editUsername("B")
    await loginPage.usernamesignup.blur();

    const errorMessageUserName = await loginPage.getErrorMessageUserName();
    expect(errorMessageUserName).toBe("Tài khoản quá ít kí tự");
   })
   test("TC-7 Nhập tài khoản nhiều hơn 16 kí tự ", async() => {
    await loginPage.editUsername("Baoooooooooooooooooooo");
    await loginPage.usernamesignup.blur();

    const errorMessageUserName = await loginPage.getErrorMessageUserName();
    expect(errorMessageUserName).toBe("Tài khoản quá 16 kí tự");
   })
   test("TC-8 Nhập tài khoản đã tồn tại", async() => {
    await loginPage.editUsername("Bao290501");
    await loginPage.usernamesignup.blur();

    const errorMessageUserName = await loginPage.getErrorMessageUserName();
    expect(errorMessageUserName).toBe("Tài khoản không hợp lệ");
   })
   test("TC-9 Nhập họ tên hợp lệ", async () => {
    await loginPage.editfullname("Nguyễn Lý Bảo");
    await loginPage.fullname.blur();

    const errorMessageFullname = await loginPage.getErrorMessageFullName();
    expect(errorMessageFullname).toBe("");
   })
   test ("TC-10 Bỏ trống trường họ tên ", async() => {
    await loginPage.editfullname("");
    await loginPage.fullname.blur();

    const errorMessageFullname = await loginPage.getErrorMessageFullName();
    expect(errorMessageFullname).toBe("Tên không được để trống");
   })
   test("TC-11 Nhập họ tên có chứa số ", async () => {
    await loginPage.editfullname("Nguyễn Lý Bảo23");
    await loginPage.clickregister();

    const errorMessageFullName = await loginPage.getErrorMessageFullName();
    expect(errorMessageFullName).toBe("Chỉ nhập kí tự chữ");
   })
   test("TC-13 Nhập field Họ và tên ít hơn 2 ký tự", async () => {
    await loginPage.editfullname("B");
    await loginPage.clickregister();

    const errorMessageFullname = await loginPage.getErrorMessageFullName();
    expect (errorMessageFullname).toBe("Vui lòng nhập tên nhiều hơn 2 ký tự");
   })
   test("TC-14 Nhập field Họ và tên nhiều hơn 32 ký tự", async () => {
    await loginPage.editfullname("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdasdasdasdas");
    await loginPage.fullname.blur();

    const errorMessageFullname = await loginPage.getErrorMessageFullName();
    expect (errorMessageFullname).toBe("")
   })
   test("TC-15 Nhập field Họ và tên với kí tự đặc biệt ", async () => {
    await loginPage.editfullname("Nguyễn Lý bảo@@");
    await loginPage.clickregister();

    const errorMessageFullName = await loginPage.getErrorMessageFullName();
    expect (errorMessageFullName).toBe("Chỉ nhập kí tự chữ");
   })
   test("TC-16 Nhập field Họ và tên với kí tự số ", async () => {
    await loginPage.editfullname("123456789");
    await loginPage.clickregister();

    const errorMessageFullName = await loginPage.getErrorMessageFullName();
    expect (errorMessageFullName).toBe("Chỉ nhập kí tự chữ");
   })
   test("TC-17 Nhập field Họ và tên với khoảng trống đầu tiên ", async () => {
    await loginPage.editfullname("  Bao");
    await loginPage.clickregister();

    const errorMessageFullName = await loginPage.getErrorMessageFullName();
    expect(errorMessageFullName).toBe("Không cho phép người dùng nhập khoảng cách khi chưa có kí tự nào");
   })
   test("TC-18 Nhập field Email đúng định dạng", async () => {
    await loginPage.editemail("lybao29052@gmail.com");
    await loginPage.clickregister();

    const errorMessageEmail = await loginPage.getErrorMessageEmail();
    expect (errorMessageEmail).toBe("");
   })
   test("TC-19 Để trống trường Email", async () => {
    await loginPage.editemail("");
    await loginPage.clickregister();

    const errorMessageEmail = await loginPage.getErrorMessageEmail();
    expect (errorMessageEmail).toBe("Email không được để trống");
   })
   test("TC-20 Field Email không có ký tự @", async () => {
    await loginPage.editemail("lybao29gmail.com");
    await loginPage.clickregister();

    const errorMessageEmail = await loginPage.getErrorMessageEmail();
    expect (errorMessageEmail).toBe("Email không hợp lệ");
   })
   test("Tc-21 Nhập field Email không có domain", async () => {
    await loginPage.editemail("lybao29@gmail");
    await loginPage.clickregister();

    const errorMessageEmail = await loginPage.getErrorMessageEmail();
    expect (errorMessageEmail).toBe("Email không hợp lệ")
   })
   test ("TC-22 Nhập field Email có ký tự đặc biệt", async () => {
    await loginPage.editemail("lybao!$%@gmail.com");
    await loginPage.clickregister();

    const errorMessageEmail = await loginPage.getErrorMessageEmail();
    expect (errorMessageEmail).toBe("Email không hợp lệ")
   })
   test("TC-23 Nhập field Email có khoảng trắng ", async () => {
    await loginPage.editemail("lybao @gmail.com");
    await loginPage.clickregister();

    const errorMessageEmail = await  loginPage.getErrorMessageEmail();
    expect (errorMessageEmail).toBe("Email không hợp lệ");
   })
   test ("TC-24 Nhập field Email với email đã tồn tại", async () => {
    await loginPage.editemail("lybao29@gmail.com");
    await loginPage.clickregister();

    const errorMessageEmail = await loginPage.getErrorMessageEmail();
    expect(errorMessageEmail).toBe("Email đã tồn tại")
   })
   test ("TC-25 Nhập field Số điện thoại bắt đầu bằng đầu số hợp lệ", async () => {
    await loginPage.editphone("0585826722");
    await loginPage.clickregister();

    const errorMessagePhone = await loginPage.getErrorMessagePhone();
    expect(errorMessagePhone).toBe("");
   })
   test("TC-26 Nhập field Số điện thoại bắt đầu bằng đầu số không hợp lệ ", async () => {
    await loginPage.editphone("158582672");
    await loginPage.clickregister();

    const errorMessagePhone = await loginPage.getErrorMessagePhone();
    expect (errorMessagePhone).toBe("Số điện thoại chưa đúng định đạng")
   })
   test("TC-27 Nhập field Số điện thoại có ký tự chữ ", async () => {
    await loginPage.editphone("05858asdqw");
    await loginPage.clickregister();

    const errorMessagePhone = await loginPage.getErrorMessagePhone();
    expect (errorMessagePhone).toBe("Số điện thoại chưa đúng định đạng")
   })
   test("TC-28 Nhập field Số điện thoại có ký tự đặc biệt ", async() => {
    await loginPage.editphone("058582@@#$");
    await loginPage.clickregister();

    const errorMessagePhone = await loginPage.getErrorMessagePhone();
    expect (errorMessagePhone).toBe("Số điện thoại chưa đúng định đạng")
   })
   test("TC-29 Nhập field Số điện thoại có khoảng trắng", async() => {
    await loginPage.editphone("058 5 826");
    await loginPage.clickregister();

    const errorMessagePhone = await loginPage.getErrorMessagePhone();
    expect (errorMessagePhone).toBe("Số điện thoại chưa đúng định đạng")
   })
   test("TC-30 Nhập field Số điện thoại nhiều hơn 10 ký tự", async() => {
    await loginPage.editphone("0345678911231");
    await loginPage.clickregister();

    const errorMessagePhone = await loginPage.getErrorMessagePhone();
    expect (errorMessagePhone).toBe("Số điện thoại chưa đúng định đạng")
   })
   test("TC- 31 Nhập field Số điện thoại ít hơn 10 ký tự ", async() => {
    await loginPage.editphone("05858");
    await loginPage.clickregister();

    const errorMessagePhone = await loginPage.getErrorMessagePhone();
    expect (errorMessagePhone).toBe("Số điện thoại chưa đúng định đạng")
   })
   test("TC-32 Nhập field Số điện thoại với số đầu tiên khác 0 ", async() => {
    await loginPage.editphone("1234567890");
    await loginPage.clickregister();

    const errorMessagePhone = await loginPage.getErrorMessagePhone();
    expect (errorMessagePhone).toBe("Số điện thoại chưa đúng định đạng");
   })
   test("TC-33 Để trống trường Mật khẩu", async() => {
    await loginPage.editPassword("");
    await loginPage.clickregister();

    const errorMessagePassWord = await loginPage.getErrorMessagePassWord();
    expect(errorMessagePassWord).toBe("Tài khoản không được để trống");
   })
   test("TC-34 Nhập field Mật Khẩu sai dịnh dạng ", async () => {
    await loginPage.editPassword("123456");
    await loginPage.clickregister();

    const errorMessagePassWord = await loginPage.getErrorMessagePassWord();
    expect(errorMessagePassWord).toBe("Mật khẩu phải ít nhất 8 tự gồm chữ, số, và kí tự đặc biệt");
   })
})