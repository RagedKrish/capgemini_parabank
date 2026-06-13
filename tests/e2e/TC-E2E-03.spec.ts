import { test } from "../../fixture/pagefixture";
import { expect } from "@playwright/test";

import { env } from "../../config/env";
import fs from "fs"
import path from "path"

let data=JSON.parse(fs.readFileSync(path.join(__dirname,"../../test-data/user.json")));

test("Full User Lifecycle E2E", async({request,Accountservicepage,Openaccountpage,Homepage,page,Fundtransferpage,Registerpage})=>{
    console.log(`Test: Full User Lifecycle E2E`);
    await page.goto(env.baseURL);
    await Homepage.register.click();
    let username=`user${Date.now()}`;
    console.log(`Registering new user: "${username}"`);
    await Registerpage.register_user(data.users[0],username)
    console.log(`Registration complete. Logging out.`);
    await Accountservicepage.logout.click();
    console.log(`Logged out. Logging back in as "${username}".`);
    await Homepage.login_user(username,data.users[0].password);
    console.log(`Login successful.`);
    await Accountservicepage.openaccount.click()
    await Openaccountpage.openaccount('1',expect);
    await expect(Openaccountpage.newaccountnumber).toBeVisible();
    let from_account=Number(await Openaccountpage.newaccountnumber.textContent())
    console.log(`FROM Account created: ${from_account}`);
    await Accountservicepage.openaccount.click()
    await Openaccountpage.openaccount('1',expect);
    await expect(Openaccountpage.newaccountnumber).toBeVisible();


    let to_account=Number(await Openaccountpage.newaccountnumber.textContent())
    console.log(`TO Account created: ${to_account}`);
    let from_account_resp=await request.get(`${env.baseURL_Api}/accounts/${from_account}`,{
        headers:{Accept:'application/json'}
    });
    await expect(from_account_resp.status()).toBe(200);
    let pre_transfer_from_balance=(await from_account_resp.json()).balance
    console.log(`[API] PRE-TRANSFER | FROM Account ${from_account} Balance: $${pre_transfer_from_balance}`);
    let to_account_resp=await request.get(`${env.baseURL_Api}/accounts/${to_account}`,{
        headers:{Accept:'application/json'}
    });
    await expect(to_account_resp.status()).toBe(200);
    let pre_transfer_to_balance=(await to_account_resp.json()).balance
    console.log(`[API] PRE-TRANSFER | TO Account ${to_account} Balance: $${pre_transfer_to_balance}`);


    await Accountservicepage.transferfunds.click();
    let amount=100
    console.log(`Performing UI transfer of $${amount} from ${from_account} -> ${to_account}`);
    await Fundtransferpage.transfer_fund(from_account.toString(),to_account.toString(),amount);
    await expect(Fundtransferpage.transfersuccess_msg).toHaveText('Transfer Complete!');
    await Fundtransferpage.transfersuccess_msg.waitFor({state:'visible'})
    console.log(`Transfer Complete! message confirmed.`);
    await page.screenshot({ path: `./screenshots/e2e03_transfer_complete.png` });

    
    let from_account_resp2=await request.get(`${env.baseURL_Api}/accounts/${from_account}`,{
        headers:{Accept:'application/json'}
    });
    await expect(from_account_resp2.status()).toBe(200);
    let post_transfer_from_balance=(await from_account_resp2.json()).balance
    console.log(`[API] POST-TRANSFER | FROM Account ${from_account} Balance: $${post_transfer_from_balance} (Expected: $${pre_transfer_from_balance - amount})`);
    let to_account_resp2=await request.get(`${env.baseURL_Api}/accounts/${to_account}`,{
        headers:{Accept:'application/json'}
    });
    await expect(to_account_resp2.status()).toBe(200);
    let post_transfer_to_balance=(await to_account_resp2.json()).balance
    console.log(`[API] POST-TRANSFER | TO Account ${to_account} Balance: $${post_transfer_to_balance} (Expected: $${pre_transfer_to_balance + amount})`);
    await expect(post_transfer_from_balance).toBe(pre_transfer_from_balance-amount);
    await expect(post_transfer_to_balance).toBe(pre_transfer_to_balance+amount);
});