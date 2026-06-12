import {Page,Locator} from "@playwright/test";

class fundtransferpage{
    page:Page;
    fromAccount:Locator;
    toAccount:Locator;
    amount:Locator;
    transferButton:Locator;
    transfersuccess_msg:Locator;

    constructor(page:Page){
        this.page=page;
        this.fromAccount=page.locator('[id="fromAccountId"]');
        this.toAccount=page.locator('[id="toAccountId"]');
        this.amount=page.locator('[id="amount"]');
        this.transferButton=page.getByRole('button',{name:'Transfer'});
        this.transfersuccess_msg=page.locator('//div[@id="showResult"]/h1');
    }

    async transfer_fund(fromAccount:string,toAccount:string,amount:number){
        await this.fromAccount.selectOption(fromAccount?.trim());
        await this.toAccount.selectOption(toAccount?.trim());
        await this.amount.fill(amount.toString());
        await this.transferButton.click();
    }
}

export default fundtransferpage;