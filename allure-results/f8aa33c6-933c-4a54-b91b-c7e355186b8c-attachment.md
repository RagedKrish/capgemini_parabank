# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\accountbalance.spec.ts >> Account balance using api >> Validate Total Balance Conservation
- Location: tests\api\accountbalance.spec.ts:94:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 429
```

# Test source

```ts
  16  |         })
  17  |         let  createresponse1= await createresp1.json();
  18  |         let from_account_id=createresponse1.id;
  19  |         let createresp2 = await request.post(`${env.baseURL_Api}/createAccount?customerId=${customer_id}&newAccountType=${type}&fromAccountId=${account_id}`, {
  20  |             headers: {
  21  |                 Accept: 'application/json'
  22  |             }
  23  |         })
  24  |         let  createresponse2= await createresp2.json();
  25  |         let to_account_id = createresponse2.id;
  26  |         let resp1 = await request.get(`${env.baseURL_Api}/accounts/${from_account_id}`, {
  27  |             headers: {
  28  |                 Accept: 'application/json'
  29  |             }
  30  |         })
  31  |         await expect(resp1.status()).toBe(200);
  32  |         let beforesource = await resp1.json();
  33  |         let beforesourcebalance = beforesource.balance;
  34  |         let amount = 100;
  35  |         let transfer_resp = await request.post(`${env.baseURL_Api}/transfer?fromAccountId=${from_account_id}&toAccountId=${to_account_id}&amount=${amount}`, {
  36  |             headers: {
  37  |                 Accept: 'application/json'
  38  |             }
  39  |         })
  40  |         await expect(transfer_resp.status()).toBe(200);
  41  |         let resp2 = await request.get(`${env.baseURL_Api}/accounts/${from_account_id}`, {
  42  |             headers: {
  43  |                 Accept: 'application/json'
  44  |             }
  45  |         })
  46  |         await expect(resp2.status()).toBe(200);
  47  |         let aftersource = await resp2.json();
  48  |         let aftersourcebalance = aftersource.balance;
  49  |         await expect(aftersourcebalance).toBe(beforesourcebalance - amount);
  50  |     });
  51  | 
  52  |     test('Validate Destination Balance Credited', async ({ request }) => {
  53  |         let type = 1
  54  |         let createresp1 = await request.post(`${env.baseURL_Api}/createAccount?customerId=${customer_id}&newAccountType=${type}&fromAccountId=${account_id}`, {
  55  |             headers: {
  56  |                 Accept: 'application/json'
  57  |             }
  58  |         })
  59  |         let  createresponse1= await createresp1.json();
  60  |         let from_account_id=createresponse1.id;
  61  |         let createresp2 = await request.post(`${env.baseURL_Api}/createAccount?customerId=${customer_id}&newAccountType=${type}&fromAccountId=${account_id}`, {
  62  |             headers: {
  63  |                 Accept: 'application/json'
  64  |             }
  65  |         })
  66  |         let  createresponse2= await createresp2.json();
  67  |         let to_account_id = createresponse2.id;
  68  |         let resp1 = await request.get(`${env.baseURL_Api}/accounts/${to_account_id}`, {
  69  |             headers: {
  70  |                 Accept: 'application/json'
  71  |             }
  72  |         })
  73  |         await expect(resp1.status()).toBe(200);
  74  |         let beforedestination = await resp1.json();
  75  |         let beforedestinationbalance = beforedestination.balance;
  76  |         let amount = 100;
  77  |         let transfer_resp = await request.post(`${env.baseURL_Api}/transfer?fromAccountId=${from_account_id}&toAccountId=${to_account_id}&amount=${amount}`, {
  78  |             headers: {
  79  |                 Accept: 'application/json'
  80  |             }
  81  |         })
  82  |         await expect(transfer_resp.status()).toBe(200);
  83  |         let resp2 = await request.get(`${env.baseURL_Api}/accounts/${to_account_id}`, {
  84  |             headers: {
  85  |                 Accept: 'application/json'
  86  |             }
  87  |         })
  88  |         await expect(resp2.status()).toBe(200);
  89  |         let afterdestination = await resp2.json();
  90  |         let afterdestinationbalance = afterdestination.balance;
  91  |         await expect(afterdestinationbalance).toBe(beforedestinationbalance + amount);
  92  |     });
  93  | 
  94  |     test('Validate Total Balance Conservation',async({request})=>{
  95  |         let type = 1
  96  |         let createresp1 = await request.post(`${env.baseURL_Api}/createAccount?customerId=${customer_id}&newAccountType=${type}&fromAccountId=${account_id}`, {
  97  |             headers: {
  98  |                 Accept: 'application/json'
  99  |             }
  100 |         })
  101 |         let  createresponse1= await createresp1.json();
  102 |         let from_account_id=createresponse1.id;
  103 |         let createresp2 = await request.post(`${env.baseURL_Api}/createAccount?customerId=${customer_id}&newAccountType=${type}&fromAccountId=${account_id}`, {
  104 |             headers: {
  105 |                 Accept: 'application/json'
  106 |             }
  107 |         })
  108 |         let  createresponse2= await createresp2.json();
  109 |         let to_account_id = createresponse2.id;
  110 | 
  111 |         let resp1source = await request.get(`${env.baseURL_Api}/accounts/${from_account_id}`, {
  112 |             headers: {
  113 |                 Accept: 'application/json'
  114 |             }
  115 |         })
> 116 |         await expect(resp1source.status()).toBe(200);
      |                                            ^ Error: expect(received).toBe(expected) // Object.is equality
  117 |         let beforesource = await resp1source.json();
  118 |         let beforesourcebalance = beforesource.balance;
  119 |         let resp1destination = await request.get(`${env.baseURL_Api}/accounts/${to_account_id}`, {
  120 |             headers: {
  121 |                 Accept: 'application/json'
  122 |             }
  123 |         })
  124 |         await expect(resp1destination.status()).toBe(200);
  125 |         let beforedestination = await resp1destination.json();
  126 |         let beforedestinationbalance = beforedestination.balance;
  127 |         let amount = 100;
  128 |         let transfer_resp = await request.post(`${env.baseURL_Api}/transfer?fromAccountId=${from_account_id}&toAccountId=${to_account_id}&amount=${amount}`, {
  129 |             headers: {
  130 |                 Accept: 'application/json'
  131 |             }
  132 |         })
  133 |         await expect(transfer_resp.status()).toBe(200);
  134 |         let resp2source = await request.get(`${env.baseURL_Api}/accounts/${from_account_id}`, {
  135 |             headers: {
  136 |                 Accept: 'application/json'
  137 |             }
  138 |         })
  139 |         await expect(resp2source.status()).toBe(200);
  140 |         let aftersource = await resp2source.json();
  141 |         let aftersourcebalance = aftersource.balance;
  142 |         let resp2destination = await request.get(`${env.baseURL_Api}/accounts/${to_account_id}`, {
  143 |             headers: {
  144 |                 Accept: 'application/json'
  145 |             }
  146 |         })
  147 |         await expect(resp2destination.status()).toBe(200);
  148 |         let afterdestination = await resp2destination.json();
  149 |         let afterdestinationbalance = afterdestination.balance;
  150 |         await expect(aftersourcebalance+afterdestinationbalance).toBe(beforesourcebalance+beforedestinationbalance);
  151 |     });
  152 | 
  153 | });
```