# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\fundtransfer.spec.ts >> fund transfer >> Transfer Funds with Insufficient Balance
- Location: tests\ui\fundtransfer.spec.ts:27:10

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
  7   |         console.log('Transfering Funds Between Valid Accounts')
  8   |         await page.goto(env.baseURL);
  9   |         await Homepage.login_user('john','demo');
  10  |         let accountbalance=100;
  11  |         await Accountservicepage.openaccount.click();
  12  |         await Openaccountpage.openaccount('1',expect);
  13  |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  14  |         const fromAccount = await Openaccountpage.newaccountnumber.textContent();
  15  |         await Accountservicepage.openaccount.click();
  16  |         await Openaccountpage.accountType.selectOption('1');
  17  |         await expect(Openaccountpage.fromAccount).not.toBeEmpty();
  18  |         await Openaccountpage.openNewAccount.click();
  19  |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  20  |         const toAccount = await Openaccountpage.newaccountnumber.textContent();
  21  |         await Accountservicepage.transferfunds.click();
  22  |         await expect(Fundtransferpage.fromAccount).toBeVisible();
  23  |         await Fundtransferpage.transfer_fund(fromAccount,toAccount,accountbalance)
  24  |         await expect(Fundtransferpage.transfersuccess_msg).toHaveText('Transfer Complete!');
  25  |     });
  26  | 
  27  |     test.fail('Transfer Funds with Insufficient Balance',async({Accountservicepage,Openaccountpage,Fundtransferpage,Homepage,page})=>{
  28  |         console.log('Transfering Funds with Insufficient Balance')
  29  |         await page.goto(env.baseURL);
  30  |         await Homepage.login_user('john','demo');
  31  |         let accountbalance=100;
  32  |         await Accountservicepage.openaccount.click();
  33  |         await Openaccountpage.openaccount('1',expect);
  34  |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  35  |         const fromAccount = await Openaccountpage.newaccountnumber.textContent();
  36  |         await Accountservicepage.openaccount.click();
  37  |         await Openaccountpage.accountType.selectOption('1');
  38  |         await expect(Openaccountpage.fromAccount).not.toBeEmpty();
  39  |         await Openaccountpage.openNewAccount.click();
  40  |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  41  |         const toAccount = await Openaccountpage.newaccountnumber.textContent();
  42  |         await Accountservicepage.transferfunds.click();
  43  |         await expect(Fundtransferpage.fromAccount).toBeVisible();
  44  |         await Fundtransferpage.transfer_fund(fromAccount,toAccount,accountbalance+1)
> 45  |         await expect(Fundtransferpage.transfersuccess_msg).not.toHaveText('Transfer Complete!');
      |                                                                ^ Error: expect(locator).not.toHaveText(expected) failed
  46  |     });
  47  |     test.fail('Transfer Zero Amount',async({Accountservicepage,Openaccountpage,Fundtransferpage,Homepage,page})=>{
  48  |         console.log('Transfering Zero Amount')
  49  |         await page.goto(env.baseURL);
  50  |         await Homepage.login_user('john','demo');
  51  |         await Accountservicepage.openaccount.click();
  52  |         await Openaccountpage.openaccount('1',expect);
  53  |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  54  |         const fromAccount = await Openaccountpage.newaccountnumber.textContent();
  55  |         await Accountservicepage.openaccount.click();
  56  |         await Openaccountpage.accountType.selectOption('1');
  57  |         await expect(Openaccountpage.fromAccount).not.toBeEmpty();
  58  |         await Openaccountpage.openNewAccount.click();
  59  |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  60  |         const toAccount = await Openaccountpage.newaccountnumber.textContent();
  61  |         await Accountservicepage.transferfunds.click();
  62  |         await expect(Fundtransferpage.fromAccount).toBeVisible();
  63  |         await Fundtransferpage.transfer_fund(fromAccount,toAccount,0)
  64  |         await expect(Fundtransferpage.transfersuccess_msg).not.toHaveText('Transfer Complete!');
  65  |     });
  66  | 
  67  |     test.fail('Transfer Negative Amount',async({Accountservicepage,Openaccountpage,Fundtransferpage,Homepage,page})=>{
  68  |         console.log('Transfering Negative Amount')
  69  |         await page.goto(env.baseURL);
  70  |         await Homepage.login_user('john','demo');
  71  |         await Accountservicepage.openaccount.click();
  72  |         await Openaccountpage.openaccount('1',expect);
  73  |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  74  |         const fromAccount = await Openaccountpage.newaccountnumber.textContent();
  75  |         await Accountservicepage.openaccount.click();
  76  |         await Openaccountpage.accountType.selectOption('1');
  77  |         await expect(Openaccountpage.fromAccount).not.toBeEmpty();
  78  |         await Openaccountpage.openNewAccount.click();
  79  |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  80  |         const toAccount = await Openaccountpage.newaccountnumber.textContent();
  81  |         await Accountservicepage.transferfunds.click();
  82  |         await expect(Fundtransferpage.fromAccount).toBeVisible();
  83  |         await Fundtransferpage.transfer_fund(fromAccount,toAccount,-10)
  84  |         await expect(Fundtransferpage.transfersuccess_msg).not.toHaveText('Transfer Complete!');
  85  |     });
  86  |     test.fail('Transfer to Same Account',async({Accountservicepage,Openaccountpage,Fundtransferpage,Homepage,page})=>{
  87  |         console.log('Transfering to Same Account')
  88  |         await page.goto(env.baseURL);
  89  |         await Homepage.login_user('john','demo');
  90  |         let accountbalance=100;
  91  |         await Accountservicepage.openaccount.click();
  92  |         await Openaccountpage.accountType.selectOption('1');
  93  |         await expect(Openaccountpage.fromAccount).not.toBeEmpty();
  94  |         await Openaccountpage.openNewAccount.click();
  95  |         await expect(Openaccountpage.newaccountnumber).toBeVisible();
  96  |         const fromAccount = await Openaccountpage.newaccountnumber.textContent();
  97  |         const toAccount = fromAccount;
  98  |         await Accountservicepage.transferfunds.click();
  99  |         await Fundtransferpage.transfer_fund(fromAccount,toAccount,accountbalance);
  100 |         await Fundtransferpage.transferButton.click();
  101 |         await expect(Fundtransferpage.transfersuccess_msg).not.toHaveText('Transfer Complete!');
  102 |     });
  103 | });
```