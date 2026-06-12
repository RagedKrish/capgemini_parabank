import {Page,Locator} from "@playwright/test";
class registerpage{
    page:Page;
    firstname:Locator;
    lastname:Locator;
    Address:Locator;
    city:Locator;
    state:Locator;
    zip_code:Locator;
    Phone:Locator;
    SSN:Locator;
    username:Locator;
    password:Locator;
    confirm:Locator;
    firstname_err:Locator;
    lastname_err:Locator;
    Address_err:Locator;
    city_err:Locator;
    state_err:Locator;
    zip_code_err:Locator;
    SSN_err:Locator;
    username_err:Locator;
    password_err:Locator;
    confirm_err:Locator;
    register_btn:Locator;
    account_created:Locator;
    constructor(page:Page){
        this.page=page;
        this.firstname=page.locator("[id='customer.firstName']");
        this.lastname=page.locator("[id='customer.lastName']");
        this.Address=page.locator("[id='customer.address.street']");
        this.city=page.locator("[id='customer.address.city']");
        this.state=page.locator("[id='customer.address.state']");
        this.zip_code=page.locator("[id='customer.address.zipCode']");
        this.Phone=page.locator("[id='customer.phoneNumber']");
        this.SSN=page.locator("[id='customer.ssn']");
        this.username=page.locator("[id='customer.username']");
        this.password=page.locator("[id='customer.password']");
        this.confirm=page.locator("[id='repeatedPassword']");
        this.firstname_err=page.locator("[id='customer.firstName.errors']");
        this.lastname_err=page.locator("[id='customer.lastName.errors']");
        this.Address_err=page.locator("[id='customer.address.street.errors']");
        this.city_err=page.locator("[id='customer.address.city.errors']");
        this.state_err=page.locator("[id='customer.address.state.errors']");
        this.zip_code_err=page.locator("[id='customer.address.zipCode.errors']");
        this.SSN_err=page.locator("[id='customer.ssn.errors']");
        this.username_err=page.locator("[id='customer.username.errors']");
        this.password_err=page.locator("[id='customer.password.errors']");
        this.confirm_err=page.locator("[id='repeatedPassword.errors']");
        this.register_btn=page.getByRole('button',{name:'Register'});
        this.account_created=page.locator('//div[@id="rightPanel"]/p');
    };

    async register_user(data:any,username:string){
        await this.confirm.waitFor({state:'visible'})
        await this.firstname.fill(data.firstname);
        await this.lastname.fill(data.lastname);
        await this.Address.fill(data.Address);
        await this.city.fill(data.city);
        await this.state.fill(data.state);
        await this.zip_code.fill(data.zipCode);
        await this.Phone.fill(data.phoneNumber);
        await this.SSN.fill(data.ssn);
        await this.username.fill(username);
        await this.password.fill(data.password);
        await this.confirm.fill(data.confirm);
        await this.register_btn.click();
    }
}

export default registerpage;