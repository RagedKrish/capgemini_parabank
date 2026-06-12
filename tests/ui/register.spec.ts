import {test} from "../../fixture/pagefixture"
import {expect} from "@playwright/test";
import { env } from "../../config/env";
import fs from "fs";
import path from "path";

const data=JSON.parse(fs.readFileSync(path.join(__dirname,'../../test-data/user.json')));

test.describe('register user',()=>{
    test('register new user',async({page,Homepage,Registerpage})=>{
    console.log('Checking register new user')
    await page.goto(env.baseURL);
    await Homepage.register.click();
    await Registerpage.firstname.waitFor({state:'visible'});
    await Registerpage.register_user(data.users[0],`user${Date.now()}`);
    await expect(Registerpage.account_created).toHaveText('Your account was created successfully. You are now logged in.');
    //await page.screenshot({path:'./screenshots/register.png'});
    });

    test('register with empty fields',async({page,Homepage,Registerpage})=>{
        console.log('Checking register with empty fields')
        await page.goto(env.baseURL);
        await Homepage.register.click();
        await Registerpage.register_btn.click();
        await expect(Registerpage.firstname_err).toHaveText('First name is required.');
        await expect(Registerpage.lastname_err).toHaveText('Last name is required.');
        await expect(Registerpage.Address_err).toHaveText('Address is required.');
        await expect(Registerpage.city_err).toHaveText('City is required.');
        await expect(Registerpage.state_err).toHaveText('State is required.');
        await expect(Registerpage.zip_code_err).toHaveText('Zip Code is required.');
        await expect(Registerpage.SSN_err).toHaveText('Social Security Number is required.');
        await expect(Registerpage.username_err).toHaveText('Username is required.');
        await expect(Registerpage.password_err).toHaveText('Password is required.');
        await expect(Registerpage.confirm_err).toHaveText('Password confirmation is required.');
    });

    test('register with existing username',async({page,Homepage,Registerpage,Accountservicepage})=>{
        console.log('Checking register with existing username')
        await page.goto(env.baseURL);

        await Homepage.register.click();
        const username=`user${Date.now()}`;
        await Registerpage.register_user(data.users[0],username);
        await Accountservicepage.logout.click();
        await Homepage.register.click();
        await Registerpage.firstname.waitFor({state:'visible'});
        await Registerpage.register_user(data.users[0],username);
        await expect(Registerpage.username_err).toHaveText('This username already exists.');
    });

    test('register with mismatched passwords',async({page,Homepage,Registerpage})=>{
        console.log('Checking register with mismatched passwords')
        await page.goto(env.baseURL);
        await Homepage.register.click();
        await Registerpage.register_user(data.users[1],`user${Date.now()}`);
        await expect(Registerpage.confirm_err).toHaveText('Passwords did not match.');
    });
});