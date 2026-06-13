import { env } from "../../config/env";
import {test} from "../../fixture/pagefixture";
import {expect} from "@playwright/test";
test.describe('fund transfer',()=>{

    test('Transfer Funds Between Valid Accounts',async({Accountservicepage,Openaccountpage,Fundtransferpage,Homepage,page})=>{
        console.log(`Test: Transfer Funds Between Valid Accounts`);
        await page.goto(env.baseURL);
        await Homepage.login_user('john','demo');
        let accountbalance=100;
        await Accountservicepage.openaccount.click();
        await Openaccountpage.openaccount('1',expect);
        await expect(Openaccountpage.newaccountnumber).toBeVisible();
        const fromAccount = await Openaccountpage.newaccountnumber.textContent();
        console.log(`FROM account created: ${fromAccount}`);
        await Accountservicepage.openaccount.click();
        await Openaccountpage.accountType.selectOption('1');
        await expect(Openaccountpage.fromAccount).not.toBeEmpty();
        await Openaccountpage.openNewAccount.click();
        await expect(Openaccountpage.newaccountnumber).toBeVisible();
        const toAccount = await Openaccountpage.newaccountnumber.textContent();
        console.log(`TO account created: ${toAccount}`);
        await Accountservicepage.transferfunds.click();
        await expect(Fundtransferpage.fromAccount).toBeVisible();
        console.log(`Submitting transfer: $${accountbalance} from ${fromAccount} -> ${toAccount}`);
        await Fundtransferpage.transfer_fund(fromAccount,toAccount,accountbalance)
        await expect(Fundtransferpage.transfersuccess_msg).toHaveText('Transfer Complete!');
        console.log(`Transfer completed successfully.`);
        await Fundtransferpage.transfersuccess_msg.waitFor({state:'visible'})
        await page.screenshot({ path: `./screenshots/transfer_success.png` });
    });

    test.fail('Transfer Funds with Insufficient Balance',async({Accountservicepage,Openaccountpage,Fundtransferpage,Homepage,page})=>{
        console.log(`Test: Transfer Funds with Insufficient Balance (expected to fail due to bug)`);
        await page.goto(env.baseURL);
        await Homepage.login_user('john','demo');
        let accountbalance=100;
        await Accountservicepage.openaccount.click();
        await Openaccountpage.openaccount('1',expect);
        await expect(Openaccountpage.newaccountnumber).toBeVisible();
        const fromAccount = await Openaccountpage.newaccountnumber.textContent();
        console.log(`FROM account: ${fromAccount} | Balance: $${accountbalance}`);
        await Accountservicepage.openaccount.click();
        await Openaccountpage.accountType.selectOption('1');
        await expect(Openaccountpage.fromAccount).not.toBeEmpty();
        await Openaccountpage.openNewAccount.click();
        await expect(Openaccountpage.newaccountnumber).toBeVisible();
        const toAccount = await Openaccountpage.newaccountnumber.textContent();
        console.log(`TO account: ${toAccount}`);
        await Accountservicepage.transferfunds.click();
        await expect(Fundtransferpage.fromAccount).toBeVisible();
        console.log(`Attempting transfer of $${accountbalance+1}`);
        await Fundtransferpage.transfer_fund(fromAccount,toAccount,accountbalance+1)
        console.log(`Transfer message: "${await Fundtransferpage.transfersuccess_msg.textContent()}" (should NOT be "Transfer Complete!")`);
        await Fundtransferpage.transfersuccess_msg.waitFor({state:'visible'})
        await page.screenshot({ path: `./screenshots/transfer_insufficient.png` });
        await expect(Fundtransferpage.transfersuccess_msg).not.toHaveText('Transfer Complete!');
    });
    test.fail('Transfer Zero Amount',async({Accountservicepage,Openaccountpage,Fundtransferpage,Homepage,page})=>{
        console.log(`Test: Transfer Zero Amount (expected to fail due to bug)`);
        await page.goto(env.baseURL);
        await Homepage.login_user('john','demo');
        await Accountservicepage.openaccount.click();
        await Openaccountpage.openaccount('1',expect);
        await expect(Openaccountpage.newaccountnumber).toBeVisible();
        const fromAccount = await Openaccountpage.newaccountnumber.textContent();
        console.log(`FROM account: ${fromAccount}`);
        await Accountservicepage.openaccount.click();
        await Openaccountpage.accountType.selectOption('1');
        await expect(Openaccountpage.fromAccount).not.toBeEmpty();
        await Openaccountpage.openNewAccount.click();
        await expect(Openaccountpage.newaccountnumber).toBeVisible();
        const toAccount = await Openaccountpage.newaccountnumber.textContent();
        console.log(`TO account: ${toAccount}`);
        await Accountservicepage.transferfunds.click();
        await expect(Fundtransferpage.fromAccount).toBeVisible();
        console.log(`Attempting transfer of $0`);
        await Fundtransferpage.transfer_fund(fromAccount,toAccount,0)
        console.log(`Transfer message: "${await Fundtransferpage.transfersuccess_msg.textContent()}" (should NOT be "Transfer Complete!")`);
        await Fundtransferpage.transfersuccess_msg.waitFor({state:'visible'})
        await page.screenshot({ path: `./screenshots/transfer_zero_amount.png` });
        await expect(Fundtransferpage.transfersuccess_msg).not.toHaveText('Transfer Complete!');
    });

    test.fail('Transfer Negative Amount',async({Accountservicepage,Openaccountpage,Fundtransferpage,Homepage,page})=>{
        console.log(`Test: Transfer Negative Amount (expected to fail due to bug)`)
        await page.goto(env.baseURL);
        await Homepage.login_user('john','demo');
        await Accountservicepage.openaccount.click();
        await Openaccountpage.openaccount('1',expect);
        await expect(Openaccountpage.newaccountnumber).toBeVisible();
        const fromAccount = await Openaccountpage.newaccountnumber.textContent();
        console.log(`FROM account: ${fromAccount}`);
        await Accountservicepage.openaccount.click();
        await Openaccountpage.accountType.selectOption('1');
        await expect(Openaccountpage.fromAccount).not.toBeEmpty();
        await Openaccountpage.openNewAccount.click();
        await expect(Openaccountpage.newaccountnumber).toBeVisible();
        const toAccount = await Openaccountpage.newaccountnumber.textContent();
        console.log(`TO account: ${toAccount}`);
        await Accountservicepage.transferfunds.click();
        await expect(Fundtransferpage.fromAccount).toBeVisible();
        console.log(`Attempting transfer of $-10`);
        await Fundtransferpage.transfer_fund(fromAccount,toAccount,-10)
        console.log(`Transfer message: "${await Fundtransferpage.transfersuccess_msg.textContent()}" (should NOT be "Transfer Complete!")`);
        await Fundtransferpage.transfersuccess_msg.waitFor({state:'visible'})
        await page.screenshot({ path: `./screenshots/transfer_negative_amount.png` });
        await expect(Fundtransferpage.transfersuccess_msg).not.toHaveText('Transfer Complete!');
    });
    test.fail('Transfer to Same Account',async({Accountservicepage,Openaccountpage,Fundtransferpage,Homepage,page})=>{
        console.log(`Test: Transfer to Same Account (expected to fail due to bug)`);
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
        console.log(`FROM account = TO account = ${fromAccount} (same account transfer)`);
        await Accountservicepage.transferfunds.click();
        console.log(`Attempting $${accountbalance} transfer to same account.`);
        await Fundtransferpage.transfer_fund(fromAccount,toAccount,accountbalance);
        console.log(`Transfer message: "${await Fundtransferpage.transfersuccess_msg.textContent()}" (should NOT be "Transfer Complete!")`);
        await Fundtransferpage.transfersuccess_msg.waitFor({state:'visible'})
        await page.screenshot({ path: `./screenshots/transfer_same_account.png` });
        await expect(await Fundtransferpage.transfersuccess_msg).not.toHaveText('Transfer Complete!');
    });
});