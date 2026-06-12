import { test } from "../../fixture/pagefixture";
import { expect } from "@playwright/test";
import { env } from "../../config/env";

const customer_id = 12212;
const account_id = 13344;

test.describe('Account balance using api', async () => {

    test('Validate Source Balance Deducted', async ({ request }) => {
        let type = 1
        let createresp1 = await request.post(`${env.baseURL_Api}/createAccount?customerId=${customer_id}&newAccountType=${type}&fromAccountId=${account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        let  createresponse1= await createresp1.json();
        let from_account_id=createresponse1.id;
        let createresp2 = await request.post(`${env.baseURL_Api}/createAccount?customerId=${customer_id}&newAccountType=${type}&fromAccountId=${account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        let  createresponse2= await createresp2.json();
        let to_account_id = createresponse2.id;
        let resp1 = await request.get(`${env.baseURL_Api}/accounts/${from_account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        await expect(resp1.status()).toBe(200);
        let beforesource = await resp1.json();
        let beforesourcebalance = beforesource.balance;
        let amount = 100;
        let transfer_resp = await request.post(`${env.baseURL_Api}/transfer?fromAccountId=${from_account_id}&toAccountId=${to_account_id}&amount=${amount}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        await expect(transfer_resp.status()).toBe(200);
        let resp2 = await request.get(`${env.baseURL_Api}/accounts/${from_account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        await expect(resp2.status()).toBe(200);
        let aftersource = await resp2.json();
        let aftersourcebalance = aftersource.balance;
        await expect(aftersourcebalance).toBe(beforesourcebalance - amount);
    });

    test('Validate Destination Balance Credited', async ({ request }) => {
        let type = 1
        let createresp1 = await request.post(`${env.baseURL_Api}/createAccount?customerId=${customer_id}&newAccountType=${type}&fromAccountId=${account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        let  createresponse1= await createresp1.json();
        let from_account_id=createresponse1.id;
        let createresp2 = await request.post(`${env.baseURL_Api}/createAccount?customerId=${customer_id}&newAccountType=${type}&fromAccountId=${account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        let  createresponse2= await createresp2.json();
        let to_account_id = createresponse2.id;
        let resp1 = await request.get(`${env.baseURL_Api}/accounts/${to_account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        await expect(resp1.status()).toBe(200);
        let beforedestination = await resp1.json();
        let beforedestinationbalance = beforedestination.balance;
        let amount = 100;
        let transfer_resp = await request.post(`${env.baseURL_Api}/transfer?fromAccountId=${from_account_id}&toAccountId=${to_account_id}&amount=${amount}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        await expect(transfer_resp.status()).toBe(200);
        let resp2 = await request.get(`${env.baseURL_Api}/accounts/${to_account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        await expect(resp2.status()).toBe(200);
        let afterdestination = await resp2.json();
        let afterdestinationbalance = afterdestination.balance;
        await expect(afterdestinationbalance).toBe(beforedestinationbalance + amount);
    });

    test('Validate Total Balance Conservation',async({request})=>{
        let type = 1
        let createresp1 = await request.post(`${env.baseURL_Api}/createAccount?customerId=${customer_id}&newAccountType=${type}&fromAccountId=${account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        let  createresponse1= await createresp1.json();
        let from_account_id=createresponse1.id;
        let createresp2 = await request.post(`${env.baseURL_Api}/createAccount?customerId=${customer_id}&newAccountType=${type}&fromAccountId=${account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        let  createresponse2= await createresp2.json();
        let to_account_id = createresponse2.id;

        let resp1source = await request.get(`${env.baseURL_Api}/accounts/${from_account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        await expect(resp1source.status()).toBe(200);
        let beforesource = await resp1source.json();
        let beforesourcebalance = beforesource.balance;
        let resp1destination = await request.get(`${env.baseURL_Api}/accounts/${to_account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        await expect(resp1destination.status()).toBe(200);
        let beforedestination = await resp1destination.json();
        let beforedestinationbalance = beforedestination.balance;
        let amount = 100;
        let transfer_resp = await request.post(`${env.baseURL_Api}/transfer?fromAccountId=${from_account_id}&toAccountId=${to_account_id}&amount=${amount}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        await expect(transfer_resp.status()).toBe(200);
        let resp2source = await request.get(`${env.baseURL_Api}/accounts/${from_account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        await expect(resp2source.status()).toBe(200);
        let aftersource = await resp2source.json();
        let aftersourcebalance = aftersource.balance;
        let resp2destination = await request.get(`${env.baseURL_Api}/accounts/${to_account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        await expect(resp2destination.status()).toBe(200);
        let afterdestination = await resp2destination.json();
        let afterdestinationbalance = afterdestination.balance;
        await expect(aftersourcebalance+afterdestinationbalance).toBe(beforesourcebalance+beforedestinationbalance);
    });

});