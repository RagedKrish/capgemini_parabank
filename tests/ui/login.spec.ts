import {test} from"../../fixture/pagefixture"
import {expect} from "@playwright/test";
import {env} from "../../config/env";
import fs from "fs";
import path from "path";

const data=JSON.parse(fs.readFileSync(path.join(__dirname,'../../test-data/user.json')));

test.describe('login tests',()=>{
    test("login with valid credentials",async({page,Homepage,Registerpage,Accountservicepage})=>{
        await page.goto(env.baseURL);
        await Homepage.register.click();
        await Registerpage.firstname.waitFor({state:'visible'});
        const username=`user${Date.now()}`;
        await Registerpage.register_user(data.users[0],username);
        await Accountservicepage.logout.click();
        await Homepage.login_user(username,data.users[0].password)
        await expect(page.url()).toContain('overview.htm');
    });

    test("login with invalid password",async({page,Homepage,Registerpage,Accountservicepage})=>{
        await page.goto(env.baseURL);
        await Homepage.register.click();
        await Registerpage.firstname.waitFor({state:'visible'});
        const username=`user${Date.now()}`;
        await Registerpage.register_user(data.users[0],username);
        await Accountservicepage.logout.click();
        await Homepage.login_user(username,data.users[0].password+'123')
        await expect(Homepage.errormsg).toHaveText('The username and password could not be verified.');
    });

    test("login with invalid username",async({page,Homepage,Registerpage,Accountservicepage})=>{
        await page.goto(env.baseURL);
        await Homepage.register.click();
        await Registerpage.firstname.waitFor({state:'visible'});
        const username=`user${Date.now()}`;
        await Registerpage.register_user(data.users[0],username);
        await Accountservicepage.logout.click();
        await Homepage.login_user(username+'123',data.users[0].password)
        await expect(Homepage.errormsg).toHaveText('The username and password could not be verified.');
    });

    test("login with blank fields",async({page,Homepage})=>{
        await page.goto(env.baseURL);
        await Homepage.login_btn.click();
        await expect(Homepage.errormsg).toHaveText('Please enter a username and password.');
    });
});