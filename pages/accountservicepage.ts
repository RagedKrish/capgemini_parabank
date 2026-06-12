import { Page,Locator } from "@playwright/test";
class accountservicepage{
    page:Page;
    openaccount:Locator;
    accountoverview:Locator;
    transferfunds:Locator;
    billpay:Locator;
    findtransactions:Locator;
    updatecontact:Locator;
    requestloan:Locator;
    logout:Locator;
    constructor(page:Page){
        this.page=page;
        this.openaccount=page.getByRole('link',{name:'Open New Account'});
        this.accountoverview=page.getByRole('link',{name:'Accounts Overview'});
        this.transferfunds=page.getByRole('link',{name:'Transfer Funds'});
        this.billpay=page.getByRole('link',{name:'Bill Pay'});
        this.findtransactions=page.getByRole('link',{name:'Find Transactions'});
        this.updatecontact=page.getByRole('link',{name:'Update Contact Info'});
        this.requestloan=page.getByRole('link',{name:'Request Loan'});
        this.logout=page.getByRole('link',{name:'Log Out'});
    }
}

export default accountservicepage;