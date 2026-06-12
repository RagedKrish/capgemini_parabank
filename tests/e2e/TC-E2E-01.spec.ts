import { test } from "../../fixture/pagefixture";
import { expect } from "@playwright/test";

import { env } from "../../config/env";

const customer_id=12212;
test("Validate Account Type in API Response", async({request,Accountservicepage,Openaccountpage,Homepage,page})=>{
        await page.goto(env.baseURL)
        await Homepage.login_user('john','demo');
        await Accountservicepage.openaccount.click();
        await Openaccountpage.openaccount('1',expect);
        await expect(Openaccountpage.newaccountnumber).toBeVisible()
        let accountid=Number(await Openaccountpage.newaccountnumber.textContent());
        let resp= await request.get(`${env.baseURL_Api}/customers/${customer_id}/accounts`, {
            headers: {
                Accept: 'application/json'
            }
        })
        let response = await resp.json();
        await expect(resp).toBeOK();
        let accountfound:boolean=false;
        for(let account of response){
            if(account.id===accountid){
                if(account.type==='SAVINGS'){
                accountfound=true;
                break;
            }}
        }
        await expect(accountfound).toBeTruthy();
    });