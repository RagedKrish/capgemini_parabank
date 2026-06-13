import { test } from "../../fixture/pagefixture";
import { expect } from "@playwright/test";
import { env } from "../../config/env";

const customer_id=12212;
const invalid_customer_id=99999;
const account_id=13344;

test.describe("testing customer and account apis", () => {
    test("GET Accounts Returns HTTP 200", async ({ request }) => {
        console.log(`Test: GET /customers/${customer_id}/accounts`);
        let resp1 = await request.get(`${env.baseURL_Api}/customers/${customer_id}/accounts`, {
            headers: {
                Accept: 'application/json'
            }
        })
        let response1 = await resp1.json();
        console.log(` Response Status: ${resp1.status()}`);
        console.log(` Response Body:`, JSON.stringify(response1));
        console.log(` Total accounts returned: ${response1.length}`);
        await expect(resp1.status()).toBe(200);
        console.log(response1);
    });


    test("Validate Account Type in API Response",async({request})=>{
        console.log('Validating Account Type in API Response')
        let type=1
        console.log(`Test: Creating new SAVINGS account for customer ${customer_id} using fromAccountId=${account_id}`);
        let resp1=await request.post(`${env.baseURL_Api}/createAccount?customerId=${customer_id}&newAccountType=${type}&fromAccountId=${account_id}`,{
            headers:{
                Accept: 'application/json'
            }
        })
        let response1=await resp1.json(); 
        console.log(` Create Account Response Status: ${resp1.status()}`);
        console.log(` Created Account:`, JSON.stringify(response1));    
        let new_account_id=response1.id;
        console.log(` New Account ID: ${new_account_id}`);
        let resp2 = await request.get(`${env.baseURL_Api}/customers/${customer_id}/accounts`, {
            headers: {
                Accept: 'application/json'
            }
        })
        let response2 = await resp2.json();
        console.log(` GET Accounts Response Status: ${resp2.status()}`);
        console.log(` All Accounts:`, JSON.stringify(response2));
        let account_found:boolean=false;
        for(let account of response2){
            console.log(` Matching account: ID=${account.id}, Type=${account.type}, Balance=${account.balance}`);
            if(account.id===new_account_id){
                if(account.type==='SAVINGS'){
                    account_found=true;
                    console.log(` Account id and type is as expected.`);
                }
            }
        }
        await expect(account_found).toBeTruthy();
    });

    test('Validate All Account Fields in API',async({request})=>{
        console.log(`Test: Validating schema of all fields for customer ${customer_id}'s accounts`);
        let resp1 = await request.get(`${env.baseURL_Api}/customers/${customer_id}/accounts`, {
            headers: {
                Accept: 'application/json'
            }
        })
        let response1 = await resp1.json();
        console.log(` Response Status: ${resp1.status()}`);
        console.log(` Total accounts to validate: ${response1.length}`);
        let type_mismatch=false;

        for(let account of response1){
            console.log(` Validating account:`+JSON.stringify(account));
            if(typeof(account.id)!='number'){type_mismatch=true;break;}
            if(typeof(account.customerId)!='number'){type_mismatch=true;break;}
            if(typeof(account.type)!='string'){type_mismatch=true;break;}
            if(typeof(account.balance)!='number'){type_mismatch=true;break;}
            console.log(`Account ID=${account.id} passed all field type validations.`);
        }
        await expect(type_mismatch).toBeFalsy()
    });

    test('GET Accounts — Invalid Customer ID',async({request})=>{
        console.log(`Test: Testing invalid customer ID: ${invalid_customer_id}`);
        let resp1 = await request.get(`${env.baseURL_Api}/customers/${invalid_customer_id}/accounts`, {
            headers: {
                Accept: 'application/json'
            }
        })
        console.log(` Response Status: ${resp1.status()} (Expected: 400 Bad Request)`);
        await expect(resp1.status()).toBe(400);
    });
});