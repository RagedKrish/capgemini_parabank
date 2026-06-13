import { test } from "../../fixture/pagefixture";
import { expect } from "@playwright/test";

import { env } from "../../config/env";

const customer_id=12212;
test("Validate Account Type in API Response", async({request,Accountservicepage,Openaccountpage,Homepage,page})=>{
        console.log(`Test: Validate Account Type in API Response`);
        await page.goto(env.baseURL)
        await Homepage.login_user('john','demo');
        await Accountservicepage.openaccount.click();
        await Openaccountpage.openaccount('1',expect);
        await expect(Openaccountpage.newaccountnumber).toBeVisible()
        let accountid=Number(await Openaccountpage.newaccountnumber.textContent());
        console.log(`New Account ID from UI: ${accountid}`);
        await page.screenshot({ path: `./screenshots/e2e01_account_created.png` });
        console.log(`Calling API: GET /customers/${customer_id}/accounts`);
        let resp= await request.get(`${env.baseURL_Api}/customers/${customer_id}/accounts`, {
            headers: {
                Accept: 'application/json'
            }
        })
        let response = await resp.json();
        console.log(`API Response Status: ${resp.status()}`);
        console.log(`API Response Body:`+JSON.stringify(response));
        await expect(resp).toBeOK();
        let accountfound:boolean=false;
        for(let account of response){
            console.log(`account ID=${account.id} | Type=${account.type} | Balance=${account.balance}`);
            if(account.id===accountid){
                if(account.type==='SAVINGS'){
                console.log(`Accountid and Account type Matched`);
                accountfound=true;
                break;
            }}
        }
        await expect(accountfound).toBeTruthy();
    });