import { test } from "../../fixture/pagefixture";
import { expect } from "@playwright/test";
import { env } from "../../config/env";

const customer_id = 12212;
const account_id = 13344;

test.describe('Account balance using api', async () => {

    test('Validate Source Balance Deducted', async ({ request }) => {
        console.log('Test: Validating Source Balance Deducted')
        console.log(`Creating FROM account for customer ${customer_id}`);
        let type = 1
        let createresp1 = await request.post(`${env.baseURL_Api}/createAccount?customerId=${customer_id}&newAccountType=${type}&fromAccountId=${account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        let  createresponse1= await createresp1.json();
        let from_account_id=createresponse1.id;
        console.log(`FROM Account Created: ID=${from_account_id}, Status=${createresp1.status()}`);
        console.log(`Create Account 1 Response:`, JSON.stringify(createresponse1));
        console.log(`Creating TO account for customer ${customer_id}`);
        let createresp2 = await request.post(`${env.baseURL_Api}/createAccount?customerId=${customer_id}&newAccountType=${type}&fromAccountId=${account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        let  createresponse2= await createresp2.json();
        let to_account_id = createresponse2.id;
        console.log(`TO Account Created: ID=${to_account_id}, Status=${createresp2.status()}`);
        console.log(`Create Account 2 Response:`, JSON.stringify(createresponse2));
        let resp1 = await request.get(`${env.baseURL_Api}/accounts/${from_account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        await expect(resp1.status()).toBe(200);
        let beforesource = await resp1.json();
        let beforesourcebalance = beforesource.balance;
        console.log(`PRE-TRANSFER | FROM Account ${from_account_id} Balance: $${beforesourcebalance}`);
        console.log(`FROM Account Pre-Transfer:`, JSON.stringify(beforesource));
        let amount = 100;
        console.log(`Initiating transfer of $${amount} from ${from_account_id} -> ${to_account_id}`);
        let transfer_resp = await request.post(`${env.baseURL_Api}/transfer?fromAccountId=${from_account_id}&toAccountId=${to_account_id}&amount=${amount}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        console.log(`Transfer Response Status: ${transfer_resp.status()}`);
        await expect(transfer_resp.status()).toBe(200);
        let resp2 = await request.get(`${env.baseURL_Api}/accounts/${from_account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        await expect(resp2.status()).toBe(200);
        let aftersource = await resp2.json();
        let aftersourcebalance = aftersource.balance;
        console.log(`POST-TRANSFER | FROM Account ${from_account_id} Balance: $${aftersourcebalance}`);
        console.log(`Expected: $${beforesourcebalance - amount} | Actual: $${aftersourcebalance}`);
        await expect(aftersourcebalance).toBe(beforesourcebalance - amount);
    });

    test('Validate Destination Balance Credited', async ({ request }) => {
        console.log('Test: Validating Destination Balance Credited')
        let type = 1
        console.log(`Creating FROM account for customer ${customer_id}`);
        let createresp1 = await request.post(`${env.baseURL_Api}/createAccount?customerId=${customer_id}&newAccountType=${type}&fromAccountId=${account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        let  createresponse1= await createresp1.json();
        let from_account_id=createresponse1.id;
        console.log(`FROM Account Created: ID=${from_account_id}`);
        console.log(`Creating TO account for customer ${customer_id}`);
        let createresp2 = await request.post(`${env.baseURL_Api}/createAccount?customerId=${customer_id}&newAccountType=${type}&fromAccountId=${account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        let  createresponse2= await createresp2.json();
        let to_account_id = createresponse2.id;
        console.log(`TO Account Created: ID=${to_account_id}`);
        let resp1 = await request.get(`${env.baseURL_Api}/accounts/${to_account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        await expect(resp1.status()).toBe(200);
        let beforedestination = await resp1.json();
        let beforedestinationbalance = beforedestination.balance;
        console.log(`PRE-TRANSFER | TO Account ${to_account_id} Balance: $${beforedestinationbalance}`);
        console.log(`TO Account Pre-Transfer:`, JSON.stringify(beforedestination));
        let amount = 100;
        console.log(`Initiating transfer of $${amount} from ${from_account_id} -> ${to_account_id}`);
        let transfer_resp = await request.post(`${env.baseURL_Api}/transfer?fromAccountId=${from_account_id}&toAccountId=${to_account_id}&amount=${amount}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        console.log(`Transfer Response Status: ${transfer_resp.status()}`);
        await expect(transfer_resp.status()).toBe(200);
        let resp2 = await request.get(`${env.baseURL_Api}/accounts/${to_account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        await expect(resp2.status()).toBe(200);
        let afterdestination = await resp2.json();
        let afterdestinationbalance = afterdestination.balance;
        console.log(`POST-TRANSFER | TO Account ${to_account_id} Balance: $${afterdestinationbalance}`);
        console.log(`Expected: $${beforedestinationbalance + amount} | Actual: $${afterdestinationbalance}`);
        await expect(afterdestinationbalance).toBe(beforedestinationbalance + amount);
    });

    test('Validate Total Balance Conservation',async({request})=>{
        console.log('Test: Validating Total Balance Conservation')
        let type = 1
        console.log(`Creating FROM account for customer ${customer_id}`);
        let createresp1 = await request.post(`${env.baseURL_Api}/createAccount?customerId=${customer_id}&newAccountType=${type}&fromAccountId=${account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        let  createresponse1= await createresp1.json();
        let from_account_id=createresponse1.id;
        console.log(`FROM Account Created: ID=${from_account_id}`);
        console.log(`Creating TO account for customer ${customer_id}`);
        let createresp2 = await request.post(`${env.baseURL_Api}/createAccount?customerId=${customer_id}&newAccountType=${type}&fromAccountId=${account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        let  createresponse2= await createresp2.json();
        let to_account_id = createresponse2.id;
        console.log(`TO Account Created: ID=${to_account_id}`);

        let resp1source = await request.get(`${env.baseURL_Api}/accounts/${from_account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        await expect(resp1source.status()).toBe(200);
        let beforesource = await resp1source.json();
        let beforesourcebalance = beforesource.balance;
        console.log(`PRE-TRANSFER | FROM Account ${from_account_id} Balance: $${beforesourcebalance}`);
        let resp1destination = await request.get(`${env.baseURL_Api}/accounts/${to_account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        await expect(resp1destination.status()).toBe(200);
        let beforedestination = await resp1destination.json();
        let beforedestinationbalance = beforedestination.balance;
        console.log(`PRE-TRANSFER | TO Account ${to_account_id} Balance: $${beforedestinationbalance}`);
        console.log(`PRE-TRANSFER | Combined Total: $${beforesourcebalance + beforedestinationbalance}`);
        let amount = 100;
        console.log(`Initiating transfer of $${amount} from ${from_account_id} -> ${to_account_id}`);
        let transfer_resp = await request.post(`${env.baseURL_Api}/transfer?fromAccountId=${from_account_id}&toAccountId=${to_account_id}&amount=${amount}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        console.log(`Transfer Response Status: ${transfer_resp.status()}`);
        await expect(transfer_resp.status()).toBe(200);
        let resp2source = await request.get(`${env.baseURL_Api}/accounts/${from_account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        await expect(resp2source.status()).toBe(200);
        let aftersource = await resp2source.json();
        let aftersourcebalance = aftersource.balance;
        console.log(`POST-TRANSFER | FROM Account ${from_account_id} Balance: $${aftersourcebalance}`);
        let resp2destination = await request.get(`${env.baseURL_Api}/accounts/${to_account_id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        await expect(resp2destination.status()).toBe(200);
        let afterdestination = await resp2destination.json();
        let afterdestinationbalance = afterdestination.balance;
        console.log(`POST-TRANSFER | TO Account ${to_account_id} Balance: $${afterdestinationbalance}`);
        console.log(`POST-TRANSFER | Combined Total: $${aftersourcebalance + afterdestinationbalance}`);
        console.log(`Pre-transfer total: $${beforesourcebalance + beforedestinationbalance} | Post-transfer total: $${aftersourcebalance + afterdestinationbalance}`);
        await expect(aftersourcebalance+afterdestinationbalance).toBe(beforesourcebalance+beforedestinationbalance);
    });

});