import { expect, Locator, Page } from "@playwright/test";
import { BASE_URL_UIP } from "../utils/utils";

export class UserInformationPage {
    readonly page: Page

    constructor (page: Page) {
        this.page = page
    }

    async gotoPage () {
        await this.page.goto(BASE_URL_UIP || "")
    }


}
