import { Page, Locator, Expect } from "@playwright/test";

class openaccountpage{
    page:Page;
    accountType:Locator;
    fromAccount:Locator;
    openNewAccount:Locator;
    accountopened_msg:Locator;
    newaccountnumber:Locator;
    constructor(page:Page){
        this.page=page;
        this.accountType=page.locator('[id="type"]');
        this.fromAccount=page.locator('[id="fromAccountId"]');
        this.openNewAccount=page.getByRole('button',{name:'Open New Account'});
        this.accountopened_msg=page.locator('//div[@id="openAccountResult"]/h1');
        this.newaccountnumber=page.locator('[id="newAccountId"]');
    }
    async openaccount(type:string,expect:Expect){
        await this.accountType.selectOption(type);
        await expect(this.fromAccount).not.toBeEmpty();
        await this.openNewAccount.click();
    }
}

export default openaccountpage;
