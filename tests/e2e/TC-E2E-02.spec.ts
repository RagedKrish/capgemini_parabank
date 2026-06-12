import { test } from "../../fixture/pagefixture";
import { expect } from "@playwright/test";

import { env } from "../../config/env";

test("Transfer via UI and Validate Balances via API", async({request,Accountservicepage,Openaccountpage,Homepage,page,Fundtransferpage})=>{
    await page.goto(env.baseURL);
    await Homepage.login_user('john','demo');
    await Accountservicepage.openaccount.click()
    await Openaccountpage.openaccount('1',expect);
    await expect(Openaccountpage.newaccountnumber).toBeVisible();
    let from_account=Number(await Openaccountpage.newaccountnumber.textContent())
    await Accountservicepage.openaccount.click()
    await Openaccountpage.openaccount('1',expect);
    await expect(Openaccountpage.newaccountnumber).toBeVisible();


    let to_account=Number(await Openaccountpage.newaccountnumber.textContent())
    let from_account_resp=await request.get(`${env.baseURL_Api}/accounts/${from_account}`,{
        headers:{Accept:'application/json'}
    });
    await expect(from_account_resp.status()).toBe(200);
    let pre_transfer_from_balance=(await from_account_resp.json()).balance
    let to_account_resp=await request.get(`${env.baseURL_Api}/accounts/${to_account}`,{
        headers:{Accept:'application/json'}
    });
    await expect(to_account_resp.status()).toBe(200);
    let pre_transfer_to_balance=(await to_account_resp.json()).balance


    await Accountservicepage.transferfunds.click();
    let amount=100
    await Fundtransferpage.transfer_fund(from_account.toString(),to_account.toString(),amount);
    await expect(Fundtransferpage.transfersuccess_msg).toHaveText('Transfer Complete!');

    
    let from_account_resp2=await request.get(`${env.baseURL_Api}/accounts/${from_account}`,{
        headers:{Accept:'application/json'}
    });
    await expect(from_account_resp2.status()).toBe(200);
    let post_transfer_from_balance=(await from_account_resp2.json()).balance
    let to_account_resp2=await request.get(`${env.baseURL_Api}/accounts/${to_account}`,{
        headers:{Accept:'application/json'}
    });
    await expect(to_account_resp2.status()).toBe(200);
    let post_transfer_to_balance=(await to_account_resp2.json()).balance
    await expect(post_transfer_from_balance).toBe(pre_transfer_from_balance-amount);
    await expect(post_transfer_to_balance).toBe(pre_transfer_to_balance+amount);
});