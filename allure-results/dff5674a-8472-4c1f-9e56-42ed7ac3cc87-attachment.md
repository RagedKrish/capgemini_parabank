# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\fundtransfer.spec.ts >> fund transfer >> Transfer to Same Account
- Location: tests\ui\fundtransfer.spec.ts:82:9

# Error details

```
Error: expect(locator).not.toHaveText(expected) failed

Locator:  locator('//div[@id="showResult"]/h1')
Expected: not "Transfer Complete!"
Received: "Transfer Complete!"
Timeout:  5000ms

Call log:
  - Expect "not toHaveText" with timeout 5000ms
  - waiting for locator('//div[@id="showResult"]/h1')
    14 × locator resolved to <h1 class="title">Transfer Complete!</h1>
       - unexpected value "Transfer Complete!"

```

```yaml
- heading "Transfer Complete!" [level=1]
```

# Test source

```ts
  1  | import { env } from "../../config/env";
  2  | import {test} from "../../fixture/pagefixture";
  3  | import {expect} from "@playwright/test";
  4  | test.describe('fund transfer',()=>{
  5  | 
  6  |     test('Transfer Funds Between Valid Accounts',async({Accountservicepage,Openaccountpage,Fundtransferpage,Homepage,page})=>{
  7  |         await page.goto(env.baseURL);
  8  |         await Homepage.login_user('john','demo');
  9  |         let accountbalance=100;
  10 |         await Accountservicepage.openaccount.click();
  11 |         await Openaccountpage.openaccount('1',expect);
  12 |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  13 |         const fromAccount = await Openaccountpage.newaccountnumber.textContent();
  14 |         await Accountservicepage.openaccount.click();
  15 |         await Openaccountpage.accountType.selectOption('1');
  16 |         await expect(Openaccountpage.fromAccount).not.toBeEmpty();
  17 |         await Openaccountpage.openNewAccount.click();
  18 |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  19 |         const toAccount = await Openaccountpage.newaccountnumber.textContent();
  20 |         await Accountservicepage.transferfunds.click();
  21 |         await expect(Fundtransferpage.fromAccount).toBeVisible();
  22 |         await Fundtransferpage.transfer_fund(fromAccount,toAccount,accountbalance)
  23 |         await expect(Fundtransferpage.transfersuccess_msg).toHaveText('Transfer Complete!');
  24 |     });
  25 | 
  26 |     test('Transfer Funds with Insufficient Balance',async({Accountservicepage,Openaccountpage,Fundtransferpage,Homepage,page})=>{
  27 |         await page.goto(env.baseURL);
  28 |         await Homepage.login_user('john','demo');
  29 |         let accountbalance=100;
  30 |         await Accountservicepage.openaccount.click();
  31 |         await Openaccountpage.openaccount('1',expect);
  32 |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  33 |         const fromAccount = await Openaccountpage.newaccountnumber.textContent();
  34 |         await Accountservicepage.openaccount.click();
  35 |         await Openaccountpage.accountType.selectOption('1');
  36 |         await expect(Openaccountpage.fromAccount).not.toBeEmpty();
  37 |         await Openaccountpage.openNewAccount.click();
  38 |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  39 |         const toAccount = await Openaccountpage.newaccountnumber.textContent();
  40 |         await Accountservicepage.transferfunds.click();
  41 |         await expect(Fundtransferpage.fromAccount).toBeVisible();
  42 |         await Fundtransferpage.transfer_fund(fromAccount,toAccount,accountbalance+1)
  43 |         await expect(Fundtransferpage.transfersuccess_msg).not.toHaveText('Transfer Complete!');
  44 |     });
  45 |     test('Transfer Zero Amount',async({Accountservicepage,Openaccountpage,Fundtransferpage,Homepage,page})=>{
  46 |         await page.goto(env.baseURL);
  47 |         await Homepage.login_user('john','demo');
  48 |         await Accountservicepage.openaccount.click();
  49 |         await Openaccountpage.openaccount('1',expect);
  50 |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  51 |         const fromAccount = await Openaccountpage.newaccountnumber.textContent();
  52 |         await Accountservicepage.openaccount.click();
  53 |         await Openaccountpage.accountType.selectOption('1');
  54 |         await expect(Openaccountpage.fromAccount).not.toBeEmpty();
  55 |         await Openaccountpage.openNewAccount.click();
  56 |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  57 |         const toAccount = await Openaccountpage.newaccountnumber.textContent();
  58 |         await Accountservicepage.transferfunds.click();
  59 |         await expect(Fundtransferpage.fromAccount).toBeVisible();
  60 |         await Fundtransferpage.transfer_fund(fromAccount,toAccount,0)
  61 |         await expect(Fundtransferpage.transfersuccess_msg).not.toHaveText('Transfer Complete!');
  62 |     });
  63 | 
  64 |     test('Transfer Negative Amount',async({Accountservicepage,Openaccountpage,Fundtransferpage,Homepage,page})=>{
  65 |         await page.goto(env.baseURL);
  66 |         await Homepage.login_user('john','demo');
  67 |         await Accountservicepage.openaccount.click();
  68 |         await Openaccountpage.openaccount('1',expect);
  69 |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  70 |         const fromAccount = await Openaccountpage.newaccountnumber.textContent();
  71 |         await Accountservicepage.openaccount.click();
  72 |         await Openaccountpage.accountType.selectOption('1');
  73 |         await expect(Openaccountpage.fromAccount).not.toBeEmpty();
  74 |         await Openaccountpage.openNewAccount.click();
  75 |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  76 |         const toAccount = await Openaccountpage.newaccountnumber.textContent();
  77 |         await Accountservicepage.transferfunds.click();
  78 |         await expect(Fundtransferpage.fromAccount).toBeVisible();
  79 |         await Fundtransferpage.transfer_fund(fromAccount,toAccount,-10)
  80 |         await expect(Fundtransferpage.transfersuccess_msg).not.toHaveText('Transfer Complete!');
  81 |     });
  82 |     test('Transfer to Same Account',async({Accountservicepage,Openaccountpage,Fundtransferpage,Homepage,page})=>{
  83 |         await page.goto(env.baseURL);
  84 |         await Homepage.login_user('john','demo');
  85 |         let accountbalance=100;
  86 |         await Accountservicepage.openaccount.click();
  87 |         await Openaccountpage.accountType.selectOption('1');
  88 |         await expect(Openaccountpage.fromAccount).not.toBeEmpty();
  89 |         await Openaccountpage.openNewAccount.click();
  90 |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  91 |         const fromAccount = await Openaccountpage.newaccountnumber.textContent();
  92 |         const toAccount = fromAccount;
  93 |         await Accountservicepage.transferfunds.click();
  94 |         await Fundtransferpage.transfer_fund(fromAccount,toAccount,accountbalance);
  95 |         await Fundtransferpage.transferButton.click();
> 96 |         await expect(Fundtransferpage.transfersuccess_msg).not.toHaveText('Transfer Complete!');
     |                                                                ^ Error: expect(locator).not.toHaveText(expected) failed
  97 |     });
  98 | });
```