# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\fundtransfer.spec.ts >> fund transfer >> Transfer Zero Amount
- Location: tests\ui\fundtransfer.spec.ts:57:10

# Error details

```
Error: expect(locator).not.toHaveText(expected) failed

Locator:  locator('//div[@id="showResult"]/h1')
Expected: not "Transfer Complete!"
Received: "Transfer Complete!"
Timeout:  10000ms

Call log:
  - Expect "not toHaveText" with timeout 10000ms
  - waiting for locator('//div[@id="showResult"]/h1')
    23 × locator resolved to <h1 class="title">Transfer Complete!</h1>
       - unexpected value "Transfer Complete!"

```

```yaml
- heading "Transfer Complete!" [level=1]
```

# Test source

```ts
  1   | import { env } from "../../config/env";
  2   | import {test} from "../../fixture/pagefixture";
  3   | import {expect} from "@playwright/test";
  4   | test.describe('fund transfer',()=>{
  5   | 
  6   |     test('Transfer Funds Between Valid Accounts',async({Accountservicepage,Openaccountpage,Fundtransferpage,Homepage,page})=>{
  7   |         console.log(`Test: Transfer Funds Between Valid Accounts`);
  8   |         await page.goto(env.baseURL);
  9   |         await Homepage.login_user('john','demo');
  10  |         let accountbalance=100;
  11  |         await Accountservicepage.openaccount.click();
  12  |         await Openaccountpage.openaccount('1',expect);
  13  |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  14  |         const fromAccount = await Openaccountpage.newaccountnumber.textContent();
  15  |         console.log(`FROM account created: ${fromAccount}`);
  16  |         await Accountservicepage.openaccount.click();
  17  |         await Openaccountpage.accountType.selectOption('1');
  18  |         await expect(Openaccountpage.fromAccount).not.toBeEmpty();
  19  |         await Openaccountpage.openNewAccount.click();
  20  |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  21  |         const toAccount = await Openaccountpage.newaccountnumber.textContent();
  22  |         console.log(`TO account created: ${toAccount}`);
  23  |         await Accountservicepage.transferfunds.click();
  24  |         await expect(Fundtransferpage.fromAccount).toBeVisible();
  25  |         console.log(`Submitting transfer: $${accountbalance} from ${fromAccount} -> ${toAccount}`);
  26  |         await Fundtransferpage.transfer_fund(fromAccount,toAccount,accountbalance)
  27  |         await expect(Fundtransferpage.transfersuccess_msg).toHaveText('Transfer Complete!');
  28  |          console.log(`Transfer completed successfully.`);
  29  |          await page.screenshot({ path: `./screenshots/transfer_success.png` });
  30  |     });
  31  | 
  32  |     test.fail('Transfer Funds with Insufficient Balance',async({Accountservicepage,Openaccountpage,Fundtransferpage,Homepage,page})=>{
  33  |         console.log(`Test: Transfer Funds with Insufficient Balance (expected to fail due to bug)`);
  34  |         await page.goto(env.baseURL);
  35  |         await Homepage.login_user('john','demo');
  36  |         let accountbalance=100;
  37  |         await Accountservicepage.openaccount.click();
  38  |         await Openaccountpage.openaccount('1',expect);
  39  |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  40  |         const fromAccount = await Openaccountpage.newaccountnumber.textContent();
  41  |         console.log(`FROM account: ${fromAccount} | Balance: $${accountbalance}`);
  42  |         await Accountservicepage.openaccount.click();
  43  |         await Openaccountpage.accountType.selectOption('1');
  44  |         await expect(Openaccountpage.fromAccount).not.toBeEmpty();
  45  |         await Openaccountpage.openNewAccount.click();
  46  |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  47  |         const toAccount = await Openaccountpage.newaccountnumber.textContent();
  48  |         console.log(`TO account: ${toAccount}`);
  49  |         await Accountservicepage.transferfunds.click();
  50  |         await expect(Fundtransferpage.fromAccount).toBeVisible();
  51  |         console.log(`Attempting transfer of $${accountbalance+1}`);
  52  |         await Fundtransferpage.transfer_fund(fromAccount,toAccount,accountbalance+1)
  53  |         console.log(`Transfer message: "${await Fundtransferpage.transfersuccess_msg.textContent()}" (should NOT be "Transfer Complete!")`);
  54  |         await page.screenshot({ path: `./screenshots/transfer_insufficient.png` });
  55  |         await expect(Fundtransferpage.transfersuccess_msg).not.toHaveText('Transfer Complete!');
  56  |     });
  57  |     test.fail('Transfer Zero Amount',async({Accountservicepage,Openaccountpage,Fundtransferpage,Homepage,page})=>{
  58  |         console.log(`Test: Transfer Zero Amount (expected to fail due to bug)`);
  59  |         await page.goto(env.baseURL);
  60  |         await Homepage.login_user('john','demo');
  61  |         await Accountservicepage.openaccount.click();
  62  |         await Openaccountpage.openaccount('1',expect);
  63  |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  64  |         const fromAccount = await Openaccountpage.newaccountnumber.textContent();
  65  |         console.log(`FROM account: ${fromAccount}`);
  66  |         await Accountservicepage.openaccount.click();
  67  |         await Openaccountpage.accountType.selectOption('1');
  68  |         await expect(Openaccountpage.fromAccount).not.toBeEmpty();
  69  |         await Openaccountpage.openNewAccount.click();
  70  |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  71  |         const toAccount = await Openaccountpage.newaccountnumber.textContent();
  72  |         console.log(`TO account: ${toAccount}`);
  73  |         await Accountservicepage.transferfunds.click();
  74  |         await expect(Fundtransferpage.fromAccount).toBeVisible();
  75  |         console.log(`Attempting transfer of $0`);
  76  |         await Fundtransferpage.transfer_fund(fromAccount,toAccount,0)
  77  |         console.log(`Transfer message: "${await Fundtransferpage.transfersuccess_msg.textContent()}" (should NOT be "Transfer Complete!")`);
  78  |         await page.screenshot({ path: `./screenshots/transfer_zero_amount.png` });
> 79  |         await expect(Fundtransferpage.transfersuccess_msg).not.toHaveText('Transfer Complete!');
      |                                                                ^ Error: expect(locator).not.toHaveText(expected) failed
  80  |     });
  81  | 
  82  |     test.fail('Transfer Negative Amount',async({Accountservicepage,Openaccountpage,Fundtransferpage,Homepage,page})=>{
  83  |         console.log(`Test: Transfer Negative Amount (expected to fail due to bug)`)
  84  |         await page.goto(env.baseURL);
  85  |         await Homepage.login_user('john','demo');
  86  |         await Accountservicepage.openaccount.click();
  87  |         await Openaccountpage.openaccount('1',expect);
  88  |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  89  |         const fromAccount = await Openaccountpage.newaccountnumber.textContent();
  90  |         console.log(`FROM account: ${fromAccount}`);
  91  |         await Accountservicepage.openaccount.click();
  92  |         await Openaccountpage.accountType.selectOption('1');
  93  |         await expect(Openaccountpage.fromAccount).not.toBeEmpty();
  94  |         await Openaccountpage.openNewAccount.click();
  95  |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  96  |         const toAccount = await Openaccountpage.newaccountnumber.textContent();
  97  |         console.log(`TO account: ${toAccount}`);
  98  |         await Accountservicepage.transferfunds.click();
  99  |         await expect(Fundtransferpage.fromAccount).toBeVisible();
  100 |         console.log(`Attempting transfer of $-10`);
  101 |         await Fundtransferpage.transfer_fund(fromAccount,toAccount,-10)
  102 |         console.log(`Transfer message: "${await Fundtransferpage.transfersuccess_msg.textContent()}" (should NOT be "Transfer Complete!")`);
  103 |         await page.screenshot({ path: `./screenshots/transfer_negative_amount.png` });
  104 |         await expect(Fundtransferpage.transfersuccess_msg).not.toHaveText('Transfer Complete!');
  105 |     });
  106 |     test.fail('Transfer to Same Account',async({Accountservicepage,Openaccountpage,Fundtransferpage,Homepage,page})=>{
  107 |         console.log(`Test: Transfer to Same Account (expected to fail due to bug)`);
  108 |         await page.goto(env.baseURL);
  109 |         await Homepage.login_user('john','demo');
  110 |         let accountbalance=100;
  111 |         await Accountservicepage.openaccount.click();
  112 |         await Openaccountpage.accountType.selectOption('1');
  113 |         await expect(Openaccountpage.fromAccount).not.toBeEmpty();
  114 |         await Openaccountpage.openNewAccount.click();
  115 |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  116 |         const fromAccount = await Openaccountpage.newaccountnumber.textContent();
  117 |         const toAccount = fromAccount;
  118 |         console.log(`FROM account = TO account = ${fromAccount} (same account transfer)`);
  119 |         await Accountservicepage.transferfunds.click();
  120 |         console.log(`Attempting $${accountbalance} transfer to same account.`);
  121 |         await Fundtransferpage.transfer_fund(fromAccount,toAccount,accountbalance);
  122 |         console.log(`Transfer message: "${await Fundtransferpage.transfersuccess_msg.textContent()}" (should NOT be "Transfer Complete!")`);
  123 |         await page.screenshot({ path: `./screenshots/transfer_same_account.png` });
  124 |         await expect(await Fundtransferpage.transfersuccess_msg).not.toHaveText('Transfer Complete!');
  125 |     });
  126 | });
```