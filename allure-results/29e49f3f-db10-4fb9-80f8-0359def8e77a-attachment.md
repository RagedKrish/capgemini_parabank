# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\TC-E2E-02.spec.ts >> Transfer via UI and Validate Balances via API
- Location: tests\e2e\TC-E2E-02.spec.ts:6:5

# Error details

```
Error: locator.fill: Target page, context or browser has been closed
Call log:
  - waiting for locator('[name=\'username\']')

```

# Test source

```ts
  1  | import {Page,Locator} from "@playwright/test";
  2  | class homepage{
  3  |     page:Page;
  4  |     username:Locator;
  5  |     password:Locator;
  6  |     login_btn:Locator;
  7  |     register:Locator;
  8  |     errormsg:Locator;
  9  |     constructor(page:Page){
  10 |         this.page=page;
  11 |         this.username=page.locator("[name='username']");
  12 |         this.password=page.locator("[name='password']");
  13 |         this.login_btn=page.getByRole('button',{name:'Log In'});
  14 |         this.register=page.getByRole('link',{name:'Register'});
  15 |         this.errormsg=page.locator('.error');
  16 |     }
  17 |     async login_user(username:string,password:string){
> 18 |         await this.username.fill(username);
     |                             ^ Error: locator.fill: Target page, context or browser has been closed
  19 |         await this.password.fill(password);
  20 |         await this.login_btn.click();
  21 |     }
  22 | }
  23 | 
  24 | export default homepage;
```