import { Page, Locator } from '@playwright/test';
class accountoverviewpage {
    page: Page;
    Accounts: Locator;
    constructor(page: Page) {
        this.page = page;
        this.Accounts = page.locator('//table[@id="accountTable"]//a');
    }
    async account_present_or_not(account_id:number):Promise<boolean> {
        await this.Accounts.first().waitFor({ state: 'visible' });
        const accounts = await this.Accounts.all();
        console.log(accounts.length);
        let foundAccount: boolean = false;
        for (let account of accounts) {
            const accNum = await account.textContent();
            console.log(`Checking account ${accNum} against new account ${account_id}`);
            if (Number(accNum) === account_id) {
                foundAccount = true;
                console.log(`New account ${account_id} found in overview`);
                break;
            }
        }
        return foundAccount
    }
}

export default accountoverviewpage;