import { test } from '../../fixture/pagefixture';
import { expect } from '@playwright/test';
import { env } from '../../config/env';
import fs from 'fs';
import path from 'path';
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../test-data/user.json')));

test.describe('account creation tests', () => {
    test("Create New Savings Account", async({Accountservicepage,Openaccountpage,Homepage,page})=>{
        console.log('Creating New Savings Account');
        await page.goto(env.baseURL);
        await Homepage.login_user('john','demo');
        await Accountservicepage.openaccount.click();
        await Openaccountpage.openaccount('1',expect);
        await expect(Openaccountpage.accountopened_msg).toHaveText('Account Opened!');
        await expect(Openaccountpage.accountopened_msg).toBeVisible();
        await expect(Openaccountpage.newaccountnumber).toBeVisible();
    });
    test("Create New Checking Account", async({Accountservicepage,Openaccountpage,Homepage,page})=>{
        console.log('Creating New Checking Account');
        await page.goto(env.baseURL);
        await Homepage.login_user('john','demo');
        await Accountservicepage.openaccount.click();
        await Openaccountpage.openaccount('0',expect);
        await Openaccountpage.openNewAccount.click();
        await expect(Openaccountpage.accountopened_msg).toHaveText('Account Opened!');
        await expect(Openaccountpage.accountopened_msg).toBeVisible();
        await expect(Openaccountpage.newaccountnumber).toBeVisible();
    });
    test("New Account Appears in Overview", async({Accountservicepage,Openaccountpage,Homepage,Accountoverviewpage,page})=>{
        console.log('Checking New Account Appears in Overview');
        await page.goto(env.baseURL);
        await Homepage.login_user('john','demo');
        await Accountservicepage.openaccount.click();
        await Openaccountpage.openaccount('1',expect)
        await expect(Openaccountpage.accountopened_msg).toHaveText('Account Opened!');
        await expect(Openaccountpage.accountopened_msg).toBeVisible();
        await expect(Openaccountpage.newaccountnumber).toBeVisible();
        const newAccountNum = await Openaccountpage.newaccountnumber.textContent();
        await Accountservicepage.accountoverview.click();
        let foundAccount=await Accountoverviewpage.account_present_or_not(Number(newAccountNum));
        expect(foundAccount).toBeTruthy();

    });
    test("Verify New Account Activity Page Opens Correctly", async({Accountservicepage,Openaccountpage,Homepage,page,Accountactivitypage})=>{
        console.log('Verifying New Account Activity Page Opens Correctly');
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
    });
});