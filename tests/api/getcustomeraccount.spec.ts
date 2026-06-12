import { test } from "../../fixture/pagefixture";
import { expect } from "@playwright/test";
import { env } from "../../config/env";

const customer_id=12212;
const invalid_customer_id=99999;
const account_id=13344;

test.describe("testing customer and account apis", () => {
    test("GET Accounts Returns HTTP 200", async ({ request }) => {
        console.log('GET Accounts Returns HTTP 200')
        let resp1 = await request.get(`${env.baseURL_Api}/customers/${customer_id}/accounts`, {
            headers: {
                Accept: 'application/json'
            }
        })
        let response1 = await resp1.json();
        await expect(resp1.status()).toBe(200);
        console.log(response1);
    });


    test("Validate Account Type in API Response",async({request})=>{
        console.log('Validating Account Type in API Response')
        let type=1
        let resp1=await request.post(`${env.baseURL_Api}/createAccount?customerId=${customer_id}&newAccountType=${type}&fromAccountId=${account_id}`,{
            headers:{
                Accept: 'application/json'
            }
        })
        let response1=await resp1.json();     
        let new_account_id=response1.id;
        let resp2 = await request.get(`${env.baseURL_Api}/customers/${customer_id}/accounts`, {
            headers: {
                Accept: 'application/json'
            }
        })
        let response2 = await resp2.json();
        let account_found:boolean=false;
        for(let account of response2){
            if(account.id===new_account_id){
                if(account.type==='SAVINGS'){
                    account_found=true;
                }
            }
        }
        await expect(account_found).toBeTruthy();
    });

    test('Validate All Account Fields in API',async({request})=>{
        console.log('Validating All Account Fields in API')
        let resp1 = await request.get(`${env.baseURL_Api}/customers/${customer_id}/accounts`, {
            headers: {
                Accept: 'application/json'
            }
        })
        let response1 = await resp1.json();
        let type_mismatch=false;

        for(let account of response1){
            if(typeof(account.id)!='number'){type_mismatch=true;break;}
            if(typeof(account.customerId)!='number'){type_mismatch=true;break;}
            if(typeof(account.type)!='string'){type_mismatch=true;break;}
            if(typeof(account.balance)!='number'){type_mismatch=true;break;}
        }
        await expect(type_mismatch).toBeFalsy()
    });

    test('GET Accounts — Invalid Customer ID',async({request})=>{
        console.log('GET Accounts — Invalid Customer ID')
        let resp1 = await request.get(`${env.baseURL_Api}/customers/${invalid_customer_id}/accounts`, {
            headers: {
                Accept: 'application/json'
            }
        })
        await expect(resp1.status()).toBe(400);
    });
});