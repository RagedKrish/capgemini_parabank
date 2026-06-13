import { test } from '../../fixture/pagefixture';
import { expect } from '@playwright/test';
import { env } from '../../config/env';
import fs from 'fs';
import path from 'path';
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../test-data/user.json')));

test.describe('account creation tests', () => {
    test("Create New Savings Account", async({Accountservicepage,Openaccountpage,Homepage,page})=>{
        console.log(`Test: Create New Savings Account`);
        await page.goto(env.baseURL);
        await Homepage.login_user('john','demo');
        console.log(`Login successful.`);
        await Accountservicepage.openaccount.click();
        await Openaccountpage.openaccount('1',expect);
        await expect(Openaccountpage.accountopened_msg).toHaveText('Account Opened!');
        await expect(Openaccountpage.accountopened_msg).toBeVisible();
        await expect(Openaccountpage.newaccountnumber).toBeVisible();
        await page.screenshot({ path: `./screenshots/savings_account_created.png` });
        console.log(`Savings account created successfully.`);
    });
    test("Create New Checking Account", async({Accountservicepage,Openaccountpage,Homepage,page})=>{
        console.log(`Test: Create New Checking Account`);
        await page.goto(env.baseURL);
        await Homepage.login_user('john','demo');
        console.log(`Login successful.`);
        await Accountservicepage.openaccount.click();
        await Openaccountpage.openaccount('0',expect);
        await Openaccountpage.openNewAccount.click();
        await expect(Openaccountpage.accountopened_msg).toHaveText('Account Opened!');
        await expect(Openaccountpage.accountopened_msg).toBeVisible();
        await expect(Openaccountpage.newaccountnumber).toBeVisible();
        await page.screenshot({ path: `./screenshots/checking_account_created.png` });
        console.log(`Checking account created successfully.`);
    });
    test("New Account Appears in Overview", async({Accountservicepage,Openaccountpage,Homepage,Accountoverviewpage,page})=>{
        console.log(`Test: New Account Appears in Overview`);
        await page.goto(env.baseURL);
        await Homepage.login_user('john','demo');
        await Accountservicepage.openaccount.click();
        await Openaccountpage.openaccount('1',expect)
        await expect(Openaccountpage.accountopened_msg).toHaveText('Account Opened!');
        await expect(Openaccountpage.accountopened_msg).toBeVisible();
        await expect(Openaccountpage.newaccountnumber).toBeVisible();
        const newAccountNum = await Openaccountpage.newaccountnumber.textContent();
        console.log(`Created account: ${newAccountNum}. Navigating to overview.`);
        await Accountservicepage.accountoverview.click();
        let foundAccount=await Accountoverviewpage.account_present_or_not(Number(newAccountNum));
        await page.screenshot({ path: `./screenshots/account_overview_check.png` });
        expect(foundAccount).toBeTruthy();
        console.log(`Account ${newAccountNum} in overview found`);
    });
    test("Verify New Account Activity Page Opens Correctly", async({Accountservicepage,Openaccountpage,Homepage,page,Accountactivitypage})=>{
        console.log(`Test: Verify New Account Activity Page Opens Correctly`);
        await page.goto(env.baseURL);
        await Homepage.login_user('john','demo');
        await Accountservicepage.openaccount.click();
        await Openaccountpage.openaccount('1',expect);
        await expect(Openaccountpage.accountopened_msg).toHaveText('Account Opened!');
        await expect(Openaccountpage.accountopened_msg).toBeVisible();
        await expect(Openaccountpage.newaccountnumber).toBeVisible();
        const newAccountNum = await Openaccountpage.newaccountnumber.textContent();
        await Openaccountpage.newaccountnumber.click();
        await expect(Accountactivitypage.accountnumber).toHaveText(newAccountNum);
        await expect(Accountactivitypage.accoutnttype).toHaveText('SAVINGS');
        await expect(Accountactivitypage.balance).toBeVisible();
        await page.screenshot({ path: `./screenshots/account_activity_page.png` });
        console.log(`Activity page for account ${newAccountNum} verified correctly.`);
    });
});