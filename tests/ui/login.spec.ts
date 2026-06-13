import {test} from"../../fixture/pagefixture"
import {expect} from "@playwright/test";
import {env} from "../../config/env";
import fs from "fs";
import path from "path";

const data=JSON.parse(fs.readFileSync(path.join(__dirname,'../../test-data/user.json')));

test.describe('login tests',()=>{
    test("login with valid credentials",async({page,Homepage,Registerpage,Accountservicepage})=>{
        console.log(`Test: Login with valid credentials`);
        await page.goto(env.baseURL);
        await Homepage.register.click();
        await Registerpage.firstname.waitFor({state:'visible'});
        const username=`user${Date.now()}`;
        console.log(`Registering new user: "${username}"`);
        await Registerpage.register_user(data.users[0],username);
        await Accountservicepage.logout.click();
        console.log(`Attempting login with valid credentials for "${username}"`);
        await Homepage.login_user(username,data.users[0].password)
        await expect(page.url()).toContain('overview.htm');
        console.log('Redirected to overview — login successful.');
        await page.screenshot({ path: `./screenshots/login_valid.png` });
    });

    test("login with invalid password",async({page,Homepage,Registerpage,Accountservicepage})=>{
        console.log(`Test: Login with invalid password`);
        await page.goto(env.baseURL);
        await Homepage.register.click();
        await Registerpage.firstname.waitFor({state:'visible'});
        const username=`user${Date.now()}`;
        await Registerpage.register_user(data.users[0],username);
        await Accountservicepage.logout.click();
        console.log(`Attempting login with wrong password for "${username}". Password used: "${data.users[0].password+'123'}"`);
        await Homepage.login_user(username,data.users[0].password+'123')
        await expect(Homepage.errormsg).toHaveText('The username and password could not be verified.');
        console.log('Error message shown');
        await page.screenshot({ path: `./screenshots/login_invalid_password.png` });
    });

    test("login with invalid username",async({page,Homepage,Registerpage,Accountservicepage})=>{
        console.log(`Test: Login with invalid username`);
        await page.goto(env.baseURL);
        await Homepage.register.click();
        await Registerpage.firstname.waitFor({state:'visible'});
        const username=`user${Date.now()}`;
        await Registerpage.register_user(data.users[0],username);
        await Accountservicepage.logout.click();
        console.log(`Attempting login with wrong username: "${username+'123'}"`);
        await Homepage.login_user(username+'123',data.users[0].password)
        await expect(Homepage.errormsg).toHaveText('The username and password could not be verified.');
        console.log('Error message shown');
        await page.screenshot({ path: `./screenshots/login_invalid_username.png` });
    });

    test("login with blank fields",async({page,Homepage})=>{
        console.log(`Test: Login with blank fields`);
        await page.goto(env.baseURL);
        console.log(`Clicking Login button with no credentials entered.`);
        await Homepage.login_btn.click();
        await expect(Homepage.errormsg).toHaveText('Please enter a username and password.');
        console.log('Error message shown');
        await page.screenshot({ path: `./screenshots/login_blank_fields.png` });
    });
});