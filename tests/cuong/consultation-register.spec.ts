import {expect, Locator, test} from "@playwright/test";
import {LandingPage} from "../../pages/LandingPage";
import {registerData} from "./data/registerData";

test.describe("Register Consultation", () => {
    let landingPage: LandingPage;

    test.beforeEach(async ({page}) => {
        landingPage = new LandingPage(page);
        await landingPage.goToPage();
        const footer = page.locator(".row.textCardTitle")
        await footer.scrollIntoViewIfNeeded();
    });

    //General
    test.describe("General", () => {
        test("TC1: Register Form Accessibility", async () => {
            await landingPage.verifyFormTitle()
        });

        test("TC2.1: Verify Register Form Fields Are Visible", async () => {
            await landingPage.verifyRegisterFormFields();
        });

        test("TC2.2: Verify Required Mark (*) Is Displayed", async () => {
            await landingPage.verifyMandatoryFields()
        });
    });

    //Happy case
    test.describe("Happy Case", () => {
        test("TC3: Submit Register Form With Valid Data", async () => {
            await landingPage.submitForm(
                "Nguyễn Văn A",
                "0901234567",
                "nguyenvana@gmail.com",
                "LẬP TRÌNH FRONT-END",
                "Nếu tôi có thắc mắc về bài học thì có thể hỏi ai?"
            );
            await landingPage.verifySuccessMsg()
        });

        for (const c of registerData.happy) {
            test(`${c.id} - ${c.desc}`, async () => {
                await landingPage.submitForm(c.fullName, c.phone, c.email, c.course, c.content);
                await landingPage.verifySuccessMsg();
                if (c.checkReset) await landingPage.verifyFormReset();
            });
        }

        for (const c of registerData.mandatory) {
            test(`${c.id} - ${c.desc}`, async () => {
                await landingPage.submitForm(c.fullName, c.phone, c.email, c.course, c.content);
                await expect(landingPage.getErrorMessages()).toContainText(c.expectedMessage!);
            });
        }

        for (const c of registerData.format) {
            test(`${c.id} - ${c.desc}`, async () => {
                await landingPage.submitForm(c.fullName, c.phone, c.email, c.course, c.content);
                await expect(landingPage.getErrorMessages()).toContainText(c.expectedMessage!);
            });
        }

        for (const c of registerData.minMax) {
            test(`${c.id} - ${c.desc}`, async () => {
                await landingPage.submitForm(c.fullName, c.phone, c.email, c.course, c.content);
                await expect(landingPage.getErrorMessages()).toContainText(c.expectedMessage!);
            });
        }
    });
});
