import {Page,Locator} from "@playwright/test";

class accountactivitypage{
    page:Page;
    accountnumber:Locator;
    accoutnttype:Locator;
    balance:Locator;

    constructor(page:Page){
        this.page=page;
        this.accountnumber=page.locator('[id="accountId"]');
        this.accoutnttype=page.locator('[id="accountType"]');
        this.balance=page.locator('[id="balance"]');
    }
}

export default accountactivitypage;