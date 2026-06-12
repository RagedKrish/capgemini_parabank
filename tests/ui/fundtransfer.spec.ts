import { env } from "../../config/env";
import {test} from "../../fixture/pagefixture";
import {expect} from "@playwright/test";
test.describe('fund transfer',()=>{

    test('Transfer Funds Between Valid Accounts',async({Accountservicepage,Openaccountpage,Fundtransferpage,Homepage,page})=>{
        console.log('Transfering Funds Between Valid Accounts')
        await page.goto(env.baseURL);
        await Homepage.login_user('john','demo');
        let accountbalance=100;
        await Accountservicepage.openaccount.click();
        await Openaccountpage.openaccount('1',expect);
        await expect(Openaccountpage.newaccountnumber).toBeVisible();
        const fromAccount = await Openaccountpage.newaccountnumber.textContent();
        await Accountservicepage.openaccount.click();
        await Openaccountpage.accountType.selectOption('1');
        await expect(Openaccountpage.fromAccount).not.toBeEmpty();
        await Openaccountpage.openNewAccount.click();
        await expect(Openaccountpage.newaccountnumber).toBeVisible();
        const toAccount = await Openaccountpage.newaccountnumber.textContent();
        await Accountservicepage.transferfunds.click();
        await expect(Fundtransferpage.fromAccount).toBeVisible();
        await Fundtransferpage.transfer_fund(fromAccount,toAccount,accountbalance)
        await expect(Fundtransferpage.transfersuccess_msg).toHaveText('Transfer Complete!');
    });

    test.fail('Transfer Funds with Insufficient Balance',async({Accountservicepage,Openaccountpage,Fundtransferpage,Homepage,page})=>{
        console.log('Transfering Funds with Insufficient Balance')
        await page.goto(env.baseURL);
        await Homepage.login_user('john','demo');
        let accountbalance=100;
        await Accountservicepage.openaccount.click();
        await Openaccountpage.openaccount('1',expect);
        await expect(Openaccountpage.newaccountnumber).toBeVisible();
        const fromAccount = await Openaccountpage.newaccountnumber.textContent();
        await Accountservicepage.openaccount.click();
        await Openaccountpage.accountType.selectOption('1');
        await expect(Openaccountpage.fromAccount).not.toBeEmpty();
        await Openaccountpage.openNewAccount.click();
        await expect(Openaccountpage.newaccountnumber).toBeVisible();
        const toAccount = await Openaccountpage.newaccountnumber.textContent();
        await Accountservicepage.transferfunds.click();
        await expect(Fundtransferpage.fromAccount).toBeVisible();
        await Fundtransferpage.transfer_fund(fromAccount,toAccount,accountbalance+1)
        await expect(Fundtransferpage.transfersuccess_msg).not.toHaveText('Transfer Complete!');
    });
    test.fail('Transfer Zero Amount',async({Accountservicepage,Openaccountpage,Fundtransferpage,Homepage,page})=>{
        console.log('Transfering Zero Amount')
        await page.goto(env.baseURL);
        await Homepage.login_user('john','demo');
        await Accountservicepage.openaccount.click();
        await Openaccountpage.openaccount('1',expect);
        await expect(Openaccountpage.newaccountnumber).toBeVisible();
        const fromAccount = await Openaccountpage.newaccountnumber.textContent();
        await Accountservicepage.openaccount.click();
        await Openaccountpage.accountType.selectOption('1');
        await expect(Openaccountpage.fromAccount).not.toBeEmpty();
        await Openaccountpage.openNewAccount.click();
        await expect(Openaccountpage.newaccountnumber).toBeVisible();
        const toAccount = await Openaccountpage.newaccountnumber.textContent();
        await Accountservicepage.transferfunds.click();
        await expect(Fundtransferpage.fromAccount).toBeVisible();
        await Fundtransferpage.transfer_fund(fromAccount,toAccount,0)
        await expect(Fundtransferpage.transfersuccess_msg).not.toHaveText('Transfer Complete!');
    });

    test.fail('Transfer Negative Amount',async({Accountservicepage,Openaccountpage,Fundtransferpage,Homepage,page})=>{
        console.log('Transfering Negative Amount')
        await page.goto(env.baseURL);
        await Homepage.login_user('john','demo');
        await Accountservicepage.openaccount.click();
        await Openaccountpage.openaccount('1',expect);
        await expect(Openaccountpage.newaccountnumber).toBeVisible();
        const fromAccount = await Openaccountpage.newaccountnumber.textContent();
        await Accountservicepage.openaccount.click();
        await Openaccountpage.accountType.selectOption('1');
        await expect(Openaccountpage.fromAccount).not.toBeEmpty();
        await Openaccountpage.openNewAccount.click();
        await expect(Openaccountpage.newaccountnumber).toBeVisible();
        const toAccount = await Openaccountpage.newaccountnumber.textContent();
        await Accountservicepage.transferfunds.click();
        await expect(Fundtransferpage.fromAccount).toBeVisible();
        await Fundtransferpage.transfer_fund(fromAccount,toAccount,-10)
        await expect(Fundtransferpage.transfersuccess_msg).not.toHaveText('Transfer Complete!');
    });
    test.fail('Transfer to Same Account',async({Accountservicepage,Openaccountpage,Fundtransferpage,Homepage,page})=>{
        console.log('Transfering to Same Account')
        await page.goto(env.baseURL);
        await Homepage.login_user('john','demo');
        let accountbalance=100;
        await Accountservicepage.openaccount.click();
        await Openaccountpage.accountType.selectOption('1');
        await expect(Openaccountpage.fromAccount).not.toBeEmpty();
        await Openaccountpage.openNewAccount.click();
        await expect(Openaccountpage.newaccountnumber).toBeVisible();
        const fromAccount = await Openaccountpage.newaccountnumber.textContent();
        const toAccount = fromAccount;
        await Accountservicepage.transferfunds.click();
        await Fundtransferpage.transfer_fund(fromAccount,toAccount,accountbalance);
        await Fundtransferpage.transferButton.click();
        await expect(Fundtransferpage.transfersuccess_msg).not.toHaveText('Transfer Complete!');
    });
});