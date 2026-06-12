import {test as base,Page, request} from "@playwright/test";
import homepage from "../pages/homepage";
import registerpage from "../pages/registerpage";
import accountservicepage from "../pages/accountservicepage";
import openaccountpage from "../pages/openaccountpage";
import accountoverviewpage from "../pages/accountoverviewpage";
import accountactivitypage from "../pages/accountactivitypage";
import fundtransferpage from "../pages/fundtransferpage";
import {env} from "../config/env";
import path from "path";
import fs from "fs";
const testData= JSON.parse(fs.readFileSync(path.join(__dirname,'../test-data/user.json')));

type MyFixtures={
    Homepage:homepage,
    Registerpage:registerpage,
    Accountservicepage:accountservicepage,
    Openaccountpage:openaccountpage,
    Accountoverviewpage:accountoverviewpage,
    Accountactivitypage:accountactivitypage,
    Fundtransferpage:fundtransferpage,
}

export const test=base.extend<MyFixtures>({
    Homepage:async({page},use)=>{
        await use(new homepage(page))
    },
    Registerpage:async({page},use)=>{
        await use(new registerpage(page));
    },
    Accountservicepage:async({page},use)=>{
        await use(new accountservicepage(page));
    },
    Openaccountpage:async({page},use)=>{
        await use(new openaccountpage(page));
    },
    Accountoverviewpage:async({page},use)=>{
        await use(new accountoverviewpage(page));
    },
    Accountactivitypage:async({page},use)=>{
        await use(new accountactivitypage(page));
    },
    Fundtransferpage:async({page},use)=>{
        await use(new fundtransferpage(page));
    }
})