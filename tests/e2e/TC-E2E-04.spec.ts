import { test } from "../../fixture/pagefixture";
import { expect } from "@playwright/test";

import { env } from "../../config/env";
import accountoverviewpage from "../../pages/accountoverviewpage";

test("Login + Create Account + Verify in Overview and API", async ({ request, Accountservicepage, Openaccountpage, Homepage, page, Accountoverviewpage }) => {
    console.log('Doing Login + Create Account + Verify in Overview and API')
    await page.goto(env.baseURL);
    await Homepage.login_user('john', 'demo');
    await Accountservicepage.openaccount.click()
    await Openaccountpage.openaccount('1', expect);
    await expect(Openaccountpage.newaccountnumber).toBeVisible();
    let new_account = Number(await Openaccountpage.newaccountnumber.textContent())
    await Accountservicepage.accountoverview.click();
    let foundAccount = await Accountoverviewpage.account_present_or_not(new_account);
    expect(foundAccount).toBeTruthy();
    let resp = await request.get(`${env.baseURL_Api}/accounts/${Number(new_account)}`, {
        headers: {
            Accept: 'application/json'
        }
    })
    await expect(resp.status()).toBe(200);
    let customerid = (await resp.json()).customerId

    let resp1 = await request.get(`${env.baseURL_Api}/customers/${customerid}/accounts`, {
        headers: {
            Accept: 'application/json'
        }
    });
    await expect(resp1.status()).toBe(200);
    let accounts = await resp1.json();
    
    let foundaccount_api=false;
    for(let account of accounts){
        if(account.id===new_account){
            foundaccount_api=true;
            break
        }
    }
    await expect(foundaccount_api).toBeTruthy
});