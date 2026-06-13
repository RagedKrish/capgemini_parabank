import { test } from "../../fixture/pagefixture";
import { expect } from "@playwright/test";

import { env } from "../../config/env";
import accountoverviewpage from "../../pages/accountoverviewpage";

test("Login + Create Account + Verify in Overview and API", async ({ request, Accountservicepage, Openaccountpage, Homepage, page, Accountoverviewpage }) => {
    console.log(`Test: Login + Create Account + Verify in Overview and API`);
    await page.goto(env.baseURL);
    await Homepage.login_user('john', 'demo');
    await Accountservicepage.openaccount.click()
    console.log(`Login successful.`);
    await Openaccountpage.openaccount('1', expect);
    await expect(Openaccountpage.newaccountnumber).toBeVisible();
    let new_account = Number(await Openaccountpage.newaccountnumber.textContent())
    console.log(`New Account created via UI: ${new_account}`);
    await page.screenshot({ path: `./screenshots/e2e04_account_created_${new_account}.png` });
    await Accountservicepage.accountoverview.click();
    console.log(`Navigated to Accounts Overview. Checking for account ${new_account}`);
    let foundAccount = await Accountoverviewpage.account_present_or_not(new_account);
    expect(foundAccount).toBeTruthy();
    console.log(`Account ${new_account} in UI overview: Found`);
    console.log(`[API] Fetching account details for account ID ${new_account}`);
    let resp = await request.get(`${env.baseURL_Api}/accounts/${Number(new_account)}`, {
        headers: {
            Accept: 'application/json'
        }
    })
    console.log(`[API] GET /accounts/${new_account} -> Status: ${resp.status()}`);
    await expect(resp.status()).toBe(200);
    let customerid = (await resp.json()).customerId
    console.log(`Customer ID from API: ${customerid}`);

    console.log(`[API] Fetching all accounts for customer ${customerid}`);
    let resp1 = await request.get(`${env.baseURL_Api}/customers/${customerid}/accounts`, {
        headers: {
            Accept: 'application/json'
        }
    });
    await expect(resp1.status()).toBe(200);
    let accounts = await resp1.json();
    console.log(`[API] GET /customers/${customerid}/accounts -> Status: ${resp1.status()}`);
    console.log(`[API] All Customer Accounts:`, JSON.stringify(accounts));
    console.log(`Total accounts returned for customer: ${accounts.length}`);
    
    let foundaccount_api=false;
    for(let account of accounts){
        if(account.id===new_account){
            foundaccount_api=true;
            console.log(`Account ${new_account} found in API customer accounts list.`);
            break
        }
    }
    await expect(foundaccount_api).toBeTruthy
});