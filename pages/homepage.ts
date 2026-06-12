import {Page,Locator} from "@playwright/test";
class homepage{
    page:Page;
    username:Locator;
    password:Locator;
    login_btn:Locator;
    register:Locator;
    errormsg:Locator;
    constructor(page:Page){
        this.page=page;
        this.username=page.locator("[name='username']");
        this.password=page.locator("[name='password']");
        this.login_btn=page.getByRole('button',{name:'Log In'});
        this.register=page.getByRole('link',{name:'Register'});
        this.errormsg=page.locator('.error');
    }
    async login_user(username:string,password:string){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.login_btn.click();
    }
}

export default homepage;