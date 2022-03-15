const { createCursor } = require("ghost-cursor");
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const credentials = JSON.parse(fs.readFileSync('./configs.json', 'utf-8'));
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin())
const chromePaths = require('chrome-paths');
var colors = require('colors');
const readlineSync = require('readline-sync');
const select = require ('puppeteer-select');
const cron = require('node-cron');
let {
    getEdgeBetaPath,
    getEdgeCanaryPath,
    getEdgeDevPath,
    getEdgePath,
    getAnyEdgeStable,
    getAnyEdgeLatest,
  } = require("edge-paths")

console.clear();
console.log();
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }  
console.log('Welcome! Make sure your account info is set in configs.json. This includes your MemberID and password. Also make sure you have the latest version of microsoft edge installed. To run this software, simply type in npm i into the console. You only need to do npm i once. Then once you do that, you can type npm start. This will then greet you with the CLI. After this, you can keep using NPM start to launch.'.yellow);
sleep(5000);
console.clear();
console.log();
console.log('Welcome to GameTime'.red)
const options = ["Safe".yellow,"Fast".yellow]
let selected = readlineSync.keyInSelect(options, 'Select a Task')

if(selected >= 0) {
    if(selected == 0) {
        Safe()
    }
    else if(selected == 1) {
        Fast()
    }
  }

async function Fast(){

const memberid = credentials.memberid
const password = credentials.password

for (let i = 0; i < memberid.length ; i++){

console.log('Serverside Activated...Waiting'.magenta);

cron.schedule('0 44 7 * * *', function() {

const main_url = 'https://members.bellevueclub.com/group/pages/tennis-court-reservations';

async function givePage(){
    const browser = await puppeteer.launch({headless: true, executablePath: getEdgePath(), args: [`--window-size=500,900`], defaultViewport: null})
    var [page] = await browser.pages();
    return {page, browser};
    }
    
async function gen(page, browser){
    console.clear();
    await page.goto(main_url);
    console.log('Parsing Login...'.yellow);
    await page.waitForTimeout(500);
    await page.waitForSelector("input[class='field login-field']");
    await page.click("input[class='field login-field']", elem => elem.click());
    await page.type("input[class='field login-field']", memberid[i], {delay: 50});
    await page.waitForTimeout(25);
    await page.click("input[class='field password-field']", elem => elem.click());
    await page.type("input[class='field password-field']", password[i], {delay: 50});
    await page.waitForTimeout(25);
    await page.click("button[class='btn btn-sign-in btn-primary']", elem => elem.click());
    console.log('Successfully Logged In!'.cyan);
    await page.waitForTimeout(200);
}

async function monitor(page, browser){
    const cursor = createCursor(page, browser);
    await page.waitForTimeout(5000);
    await page.waitForSelector("span[class='ui-calendar form-control radius-none']");
    await page.click("span[class='ui-calendar form-control radius-none']", elem => elem.click());
    let selector = 'a';
    await page.$$eval(selector, anchors => {
        anchors.map(anchor => {
            const d1 = new Date().getDate();
            const d2 = d1 + 7;
            if(anchor.textContent == d2) {
                anchor.click();
                anchor.click();
                return
            }
            else{
                console.log('Invalid Date'.red)
            }
        })
    });
    await page.waitForTimeout(4500);
if (await page.$("div[class='advance-booking-overlay-container']") !== null){
    console.log('Waiting for Monitor Ping'.yellow);
    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
    await page.waitForTimeout(4500);
    return monitor(page,browser);
    }
else{
    console.log('Reserving Court'.magenta);
    await page.waitForSelector("div[id='t1c0']");
    await page.waitForTimeout(1000);
    if (await page.$("div[id='t1c0']") !== null){
        const six = "div[id='t1c0']";
        await cursor.move(six)
        await cursor.click()
        console.clear();
        await page.waitForTimeout(2000);
        if (await page.$("button[id='_activities_WAR_northstarprimefacesportlet_:activityForm:j_idt1727']") !== null){
            console.log('In Stock'.green);
            await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-area-btn ui-area-btn-success radius-none margin-right-5px btn-save']", elem => elem.click());
            await page.waitForTimeout(1000);
            console.log('Successfully Reserved'.bold .green)
            await page.waitForTimeout(2000);
            await browser.close();
        }
        else{
            console.log('Out of Stock...Retrying'.red);
            if (await page.$("div[id='t1c1']") !== null){
                const six = "div[id='t1c1']";
                await cursor.move(six)
                await cursor.click()
                console.clear();
                await page.waitForTimeout(2000);
                if (await page.$("button[id='_activities_WAR_northstarprimefacesportlet_:activityForm:j_idt1727']") !== null){
                    console.log('In Stock'.green);
                    await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-area-btn ui-area-btn-success radius-none margin-right-5px btn-save']", elem => elem.click());
                    await page.waitForTimeout(1000);
                    console.log('Successfully Reserved'.bold .green)
                    await page.waitForTimeout(2000);
                    await browser.close();
                }
                else{
                    console.log('Out of Stock...Retrying'.red);
                    if (await page.$("div[id='t1c2']") !== null){
                        const six = "div[id='t1c2']";
                        await cursor.move(six)
                        await cursor.click()
                        console.clear();
                        await page.waitForTimeout(2000);
                        if (await page.$("button[id='_activities_WAR_northstarprimefacesportlet_:activityForm:j_idt1727']") !== null){
                            console.log('In Stock'.green);
                            await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-area-btn ui-area-btn-success radius-none margin-right-5px btn-save']", elem => elem.click());
                            await page.waitForTimeout(1000);
                            console.log('Successfully Reserved'.bold .green)
                            await page.waitForTimeout(2000);
                            await browser.close();
                        }
                        else{
                            console.log('Out of Stock...Retrying'.red);
                            if (await page.$("div[id='t1c3']") !== null){
                                const six = "div[id='t1c3']";
                                await cursor.move(six)
                                await cursor.click()
                                console.clear();
                                await page.waitForTimeout(2000);
                                if (await page.$("button[id='_activities_WAR_northstarprimefacesportlet_:activityForm:j_idt1727']") !== null){
                                    console.log('In Stock'.green);
                                    await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-area-btn ui-area-btn-success radius-none margin-right-5px btn-save']", elem => elem.click());
                                    await page.waitForTimeout(1000);
                                    console.log('Successfully Reserved'.bold .green)
                                    await page.waitForTimeout(2000);
                                    await browser.close();
                                }
                                else{
                                    console.log('Out of Stock...Retrying'.red);
                                    if (await page.$("div[id='t1c3']") !== null){
                                        const six = "div[id='t1c3']";
                                        await cursor.move(six)
                                        await cursor.click()
                                        console.clear();
                                        await page.waitForTimeout(2000);
                                        if (await page.$("button[id='_activities_WAR_northstarprimefacesportlet_:activityForm:j_idt1727']") !== null){
                                            console.log('In Stock'.green);
                                            await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-area-btn ui-area-btn-success radius-none margin-right-5px btn-save']", elem => elem.click());
                                            await page.waitForTimeout(1000);
                                            console.log('Successfully Reserved'.bold .green)
                                            await page.waitForTimeout(2000);
                                            await browser.close();
                                        }
                                        else{
                                            console.log('All 6:30 Courts Out of Stock'.red);
                                            console.log('Trying for 8:00 Courts'.magenta);
                                            if (await page.$("div[id='t2c0']") !== null){
                                                const six = "div[id='t2c0']";
                                                await cursor.move(six)
                                                await cursor.click()
                                                console.clear();
                                                await page.waitForTimeout(2000);
                                                if (await page.$("button[id='_activities_WAR_northstarprimefacesportlet_:activityForm:j_idt1727']") !== null){
                                                    console.log('In Stock'.green);
                                                    await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-area-btn ui-area-btn-success radius-none margin-right-5px btn-save']", elem => elem.click());
                                                    await page.waitForTimeout(1000);
                                                    console.log('Successfully Reserved'.bold .green)
                                                    await page.waitForTimeout(2000);
                                                    await browser.close();
                                                }
                                                else{
                                                    console.log('Out of Stock...Retrying'.red);
                                                    if (await page.$("div[id='t2c1']") !== null){
                                                        const six = "div[id='t2c1']";
                                                        await cursor.move(six)
                                                        await cursor.click()
                                                        console.clear();
                                                        await page.waitForTimeout(2000);
                                                        if (await page.$("button[id='_activities_WAR_northstarprimefacesportlet_:activityForm:j_idt1727']") !== null){
                                                            console.log('In Stock'.green);
                                                            await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-area-btn ui-area-btn-success radius-none margin-right-5px btn-save']", elem => elem.click());
                                                            await page.waitForTimeout(1000);
                                                            console.log('Successfully Reserved'.bold .green)
                                                            await page.waitForTimeout(2000);
                                                            await browser.close();
                                                        }
                                                        else{
                                                            console.log('Out of Stock...Retrying'.red);
                                                            if (await page.$("div[id='t2c2']") !== null){
                                                                const six = "div[id='t2c2']";
                                                                await cursor.move(six)
                                                                await cursor.click()
                                                                console.clear();
                                                                await page.waitForTimeout(2000);
                                                                if (await page.$("button[id='_activities_WAR_northstarprimefacesportlet_:activityForm:j_idt1727']") !== null){
                                                                    console.log('In Stock'.green);
                                                                    await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-area-btn ui-area-btn-success radius-none margin-right-5px btn-save']", elem => elem.click());
                                                                    await page.waitForTimeout(1000);
                                                                    console.log('Successfully Reserved'.bold .green)
                                                                    await page.waitForTimeout(2000); 
                                                                    await browser.close();
                                                                }
                                                                else{
                                                                    console.log('Out of Stock...Retrying'.red);
                                                                    if (await page.$("div[id='t2c3']") !== null){
                                                                        const six = "div[id='t2c3']";
                                                                        await cursor.move(six)
                                                                        await cursor.click()
                                                                        console.clear();
                                                                        await page.waitForTimeout(2000);
                                                                        if (await page.$("button[id='_activities_WAR_northstarprimefacesportlet_:activityForm:j_idt1727']") !== null){
                                                                            console.log('In Stock'.green);
                                                                            await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-area-btn ui-area-btn-success radius-none margin-right-5px btn-save']", elem => elem.click());
                                                                            await page.waitForTimeout(1000);
                                                                            console.log('Successfully Reserved'.bold .green)
                                                                            await page.waitForTimeout(2000);
                                                                            await browser.close();
                                                                        }
                                                                        else{
                                                                            console.log('All 8:00 Courts Out Of Stock'.red);
                                                                            console.log('Trying for 9:15 Courts'.magenta);
                                                                            if (await page.$("div[id='t3c0']") !== null){
                                                                                const six = "div[id='t3c0']";
                                                                                await cursor.move(six)
                                                                                await cursor.click()
                                                                                console.clear();
                                                                                await page.waitForTimeout(2000);
                                                                                if (await page.$("button[id='_activities_WAR_northstarprimefacesportlet_:activityForm:j_idt1727']") !== null){
                                                                                    console.log('In Stock'.green);
                                                                                    await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-area-btn ui-area-btn-success radius-none margin-right-5px btn-save']", elem => elem.click());
                                                                                    await page.waitForTimeout(1000);
                                                                                    console.log('Successfully Reserved'.bold .green)
                                                                                    await page.waitForTimeout(2000);
                                                                                    await browser.close();
                                                                                }
                                                                                else{
                                                                                    console.log('Out of Stock...Retrying'.red);
                                                                                    if (await page.$("div[id='t3c1']") !== null){
                                                                                        const six = "div[id='t3c1']";
                                                                                        await cursor.move(six)
                                                                                        await cursor.click()
                                                                                        console.clear();
                                                                                        await page.waitForTimeout(2000);
                                                                                        if (await page.$("button[id='_activities_WAR_northstarprimefacesportlet_:activityForm:j_idt1727']") !== null){
                                                                                            console.log('In Stock'.green);
                                                                                            await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-area-btn ui-area-btn-success radius-none margin-right-5px btn-save']", elem => elem.click());
                                                                                            await page.waitForTimeout(1000);
                                                                                            console.log('Successfully Reserved'.bold .green)
                                                                                            await page.waitForTimeout(2000);
                                                                                            await browser.close();
                                                                                        }
                                                                                        else{
                                                                                            console.log('Out of Stock...Retrying'.red);
                                                                                            if (await page.$("div[id='t3c2']") !== null){
                                                                                                const six = "div[id='t3c2']";
                                                                                                await cursor.move(six)
                                                                                                await cursor.click()
                                                                                                console.clear();
                                                                                                await page.waitForTimeout(2000);
                                                                                                if (await page.$("button[id='_activities_WAR_northstarprimefacesportlet_:activityForm:j_idt1727']") !== null){
                                                                                                    console.log('In Stock'.green);
                                                                                                    await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-area-btn ui-area-btn-success radius-none margin-right-5px btn-save']", elem => elem.click());
                                                                                                    await page.waitForTimeout(1000);
                                                                                                    console.log('Successfully Reserved'.bold .green)
                                                                                                    await page.waitForTimeout(2000);
                                                                                                    await browser.close();
                                                                                                }
                                                                                                else{
                                                                                                    console.log('Out of Stock...Retrying'.red);
                                                                                                    if (await page.$("div[id='t3c3']") !== null){
                                                                                                        const six = "div[id='t3c3']";
                                                                                                        await cursor.move(six)
                                                                                                        await cursor.click()
                                                                                                        console.clear();
                                                                                                        await page.waitForTimeout(2000);
                                                                                                        if (await page.$("button[id='_activities_WAR_northstarprimefacesportlet_:activityForm:j_idt1727']") !== null){
                                                                                                            console.log('In Stock'.green);
                                                                                                            await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-area-btn ui-area-btn-success radius-none margin-right-5px btn-save']", elem => elem.click());
                                                                                                            await page.waitForTimeout(1000);
                                                                                                            console.log('Successfully Reserved'.bold .green)
                                                                                                            await page.waitForTimeout(2000);
                                                                                                            await browser.close();
                                                                                                        }
                                                                                                        else{
                                                                                                            console.log('All Courts Out of Stock, Better Luck Next Time ):'.red);
                                                                                                            await browser.close();
                                                                                                        }
                                                                                                
                                                                                                    }
                                                                                                }
                                                                                        
                                                                                            }
                                                                                        }
                                                                                
                                                                                    }
                                                                                }
                                                                        
                                                                            }
                                                                        }
                                                                
                                                                    }
                                                                }
                                                        
                                                            }
                                                        }
                                                
                                                    }
                                                }
                                        
                                            }
                                            
                                        }
                                
                                    }
                                    
                                }
                        
                            }
                            
                        }
                
                    }
                    
                }
        
            }
            
        }

    }

}}

async function checkout(){
    var {page, browser} = await givePage();
    await gen(page, browser);
    await monitor(page, browser);
  }
   
  checkout();

}, null, true, 'America/Los_Angeles');
  
}

}






async function Safe(){

const memberid = credentials.memberid
const password = credentials.password

for (let i = 0; i < memberid.length ; i++){

console.log('Serverside Activated...Waiting'.magenta);

cron.schedule('0 44 7 * * *', function() {


    const main_url = 'https://members.bellevueclub.com/group/pages/tennis-court-reservations';
    
    async function givePage(){
        const browser = await puppeteer.launch({headless: false, executablePath: getEdgePath(), args: [`--window-size=500,900`], defaultViewport: null})
        var [page] = await browser.pages();
        return {page, browser};
        }
        
    async function gen(page, browser){
        console.clear();
        await page.goto(main_url);
        console.log('Parsing Login...'.yellow);
        await page.waitForTimeout(500);
        await page.waitForSelector("input[class='field login-field']");
        await page.click("input[class='field login-field']", elem => elem.click());
        await page.type("input[class='field login-field']", memberid[i], {delay: 50});
        await page.waitForTimeout(25);
        await page.click("input[class='field password-field']", elem => elem.click());
        await page.type("input[class='field password-field']", password[i], {delay: 50});
        await page.waitForTimeout(25);
        await page.click("button[class='btn btn-sign-in btn-primary']", elem => elem.click());
        console.log('Successfully Logged In!'.cyan);
        await page.waitForTimeout(200);
    }
    
    async function monitor(page, browser){
        const cursor = createCursor(page, browser);
        await page.waitForTimeout(5000);
        await page.waitForSelector("span[class='ui-calendar form-control radius-none']");
        await page.click("span[class='ui-calendar form-control radius-none']", elem => elem.click());
        let selector = 'a';
        await page.$$eval(selector, anchors => {
            anchors.map(anchor => {
                const d1 = new Date().getDate();
                const d2 = d1;
                if(anchor.textContent == d1 + 7) {
                    anchor.click();
                    anchor.click();
                    return
                }
                else{
                    console.log('Invalid Date'.red)
                }
            })
        });
        await page.waitForTimeout(4500);
    if (await page.$("div[class='advance-booking-overlay-container']") !== null){
        console.log('Waiting for Monitor Ping'.yellow);
        await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
        await page.waitForTimeout(4500);
        return monitor(page,browser);
        }
    else{
        console.log('Reserving Court'.magenta);
        await page.waitForSelector("div[id='t1c0']");
        await page.waitForTimeout(1000);
        if (await page.$("div[id='t1c0']") !== null){
            const six = "div[id='t1c0']";
            await cursor.move(six)
            await cursor.click()
            console.clear();
            await page.waitForTimeout(2000);
            if (await page.$("button[id='_activities_WAR_northstarprimefacesportlet_:activityForm:j_idt1727']") !== null){
                console.log('In Stock'.green);
                await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-area-btn ui-area-btn-success radius-none margin-right-5px btn-save']", elem => elem.click());
                await page.waitForTimeout(1000);
                console.log('Successfully Reserved'.bold .green)
                await page.waitForTimeout(2000);
                await browser.close();
            }
            else{
                console.log('Out of Stock...Retrying'.red);
                if (await page.$("div[id='t1c1']") !== null){
                    const six = "div[id='t1c1']";
                    await cursor.move(six)
                    await cursor.click()
                    console.clear();
                    await page.waitForTimeout(2000);
                    if (await page.$("button[id='_activities_WAR_northstarprimefacesportlet_:activityForm:j_idt1727']") !== null){
                        console.log('In Stock'.green);
                        await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-area-btn ui-area-btn-success radius-none margin-right-5px btn-save']", elem => elem.click());
                        await page.waitForTimeout(1000);
                        console.log('Successfully Reserved'.bold .green)
                        await page.waitForTimeout(2000);
                        await browser.close();
                    }
                    else{
                        console.log('Out of Stock...Retrying'.red);
                        if (await page.$("div[id='t1c2']") !== null){
                            const six = "div[id='t1c2']";
                            await cursor.move(six)
                            await cursor.click()
                            console.clear();
                            await page.waitForTimeout(2000);
                            if (await page.$("button[id='_activities_WAR_northstarprimefacesportlet_:activityForm:j_idt1727']") !== null){
                                console.log('In Stock'.green);
                                await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-area-btn ui-area-btn-success radius-none margin-right-5px btn-save']", elem => elem.click());
                                await page.waitForTimeout(1000);
                                console.log('Successfully Reserved'.bold .green)
                                await page.waitForTimeout(2000);
                                await browser.close();
                            }
                            else{
                                console.log('Out of Stock...Retrying'.red);
                                if (await page.$("div[id='t1c3']") !== null){
                                    const six = "div[id='t1c3']";
                                    await cursor.move(six)
                                    await cursor.click()
                                    console.clear();
                                    await page.waitForTimeout(2000);
                                    if (await page.$("button[id='_activities_WAR_northstarprimefacesportlet_:activityForm:j_idt1727']") !== null){
                                        console.log('In Stock'.green);
                                        await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-area-btn ui-area-btn-success radius-none margin-right-5px btn-save']", elem => elem.click());
                                        await page.waitForTimeout(1000);
                                        console.log('Successfully Reserved'.bold .green)
                                        await page.waitForTimeout(2000);
                                        await browser.close();
                                    }
                                    else{
                                        console.log('Out of Stock...Retrying'.red);
                                        if (await page.$("div[id='t1c3']") !== null){
                                            const six = "div[id='t1c3']";
                                            await cursor.move(six)
                                            await cursor.click()
                                            console.clear();
                                            await page.waitForTimeout(2000);
                                            if (await page.$("button[id='_activities_WAR_northstarprimefacesportlet_:activityForm:j_idt1727']") !== null){
                                                console.log('In Stock'.green);
                                                await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-area-btn ui-area-btn-success radius-none margin-right-5px btn-save']", elem => elem.click());
                                                await page.waitForTimeout(1000);
                                                console.log('Successfully Reserved'.bold .green)
                                                await page.waitForTimeout(2000);
                                                await browser.close();
                                            }
                                            else{
                                                console.log('All 6:30 Courts Out of Stock'.red);
                                                console.log('Trying for 8:00 Courts'.magenta);
                                                if (await page.$("div[id='t2c0']") !== null){
                                                    const six = "div[id='t2c0']";
                                                    await cursor.move(six)
                                                    await cursor.click()
                                                    console.clear();
                                                    await page.waitForTimeout(2000);
                                                    if (await page.$("button[id='_activities_WAR_northstarprimefacesportlet_:activityForm:j_idt1727']") !== null){
                                                        console.log('In Stock'.green);
                                                        await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-area-btn ui-area-btn-success radius-none margin-right-5px btn-save']", elem => elem.click());
                                                        await page.waitForTimeout(1000);
                                                        console.log('Successfully Reserved'.bold .green)
                                                        await page.waitForTimeout(2000);
                                                        await browser.close();
                                                    }
                                                    else{
                                                        console.log('Out of Stock...Retrying'.red);
                                                        if (await page.$("div[id='t2c1']") !== null){
                                                            const six = "div[id='t2c1']";
                                                            await cursor.move(six)
                                                            await cursor.click()
                                                            console.clear();
                                                            await page.waitForTimeout(2000);
                                                            if (await page.$("button[id='_activities_WAR_northstarprimefacesportlet_:activityForm:j_idt1727']") !== null){
                                                                console.log('In Stock'.green);
                                                                await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-area-btn ui-area-btn-success radius-none margin-right-5px btn-save']", elem => elem.click());
                                                                await page.waitForTimeout(1000);
                                                                console.log('Successfully Reserved'.bold .green)
                                                                await page.waitForTimeout(2000);
                                                                await browser.close();
                                                            }
                                                            else{
                                                                console.log('Out of Stock...Retrying'.red);
                                                                if (await page.$("div[id='t2c2']") !== null){
                                                                    const six = "div[id='t2c2']";
                                                                    await cursor.move(six)
                                                                    await cursor.click()
                                                                    console.clear();
                                                                    await page.waitForTimeout(2000);
                                                                    if (await page.$("button[id='_activities_WAR_northstarprimefacesportlet_:activityForm:j_idt1727']") !== null){
                                                                        console.log('In Stock'.green);
                                                                        await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-area-btn ui-area-btn-success radius-none margin-right-5px btn-save']", elem => elem.click());
                                                                        await page.waitForTimeout(1000);
                                                                        console.log('Successfully Reserved'.bold .green)
                                                                        await page.waitForTimeout(2000); 
                                                                        await browser.close();
                                                                    }
                                                                    else{
                                                                        console.log('Out of Stock...Retrying'.red);
                                                                        if (await page.$("div[id='t2c3']") !== null){
                                                                            const six = "div[id='t2c3']";
                                                                            await cursor.move(six)
                                                                            await cursor.click()
                                                                            console.clear();
                                                                            await page.waitForTimeout(2000);
                                                                            if (await page.$("button[id='_activities_WAR_northstarprimefacesportlet_:activityForm:j_idt1727']") !== null){
                                                                                console.log('In Stock'.green);
                                                                                await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-area-btn ui-area-btn-success radius-none margin-right-5px btn-save']", elem => elem.click());
                                                                                await page.waitForTimeout(1000);
                                                                                console.log('Successfully Reserved'.bold .green)
                                                                                await page.waitForTimeout(2000);
                                                                                await browser.close();
                                                                            }
                                                                            else{
                                                                                console.log('All 8:00 Courts Out Of Stock'.red);
                                                                                console.log('Trying for 9:15 Courts'.magenta);
                                                                                if (await page.$("div[id='t3c0']") !== null){
                                                                                    const six = "div[id='t3c0']";
                                                                                    await cursor.move(six)
                                                                                    await cursor.click()
                                                                                    console.clear();
                                                                                    await page.waitForTimeout(2000);
                                                                                    if (await page.$("button[id='_activities_WAR_northstarprimefacesportlet_:activityForm:j_idt1727']") !== null){
                                                                                        console.log('In Stock'.green);
                                                                                        await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-area-btn ui-area-btn-success radius-none margin-right-5px btn-save']", elem => elem.click());
                                                                                        await page.waitForTimeout(1000);
                                                                                        console.log('Successfully Reserved'.bold .green)
                                                                                        await page.waitForTimeout(2000);
                                                                                        await browser.close();
                                                                                    }
                                                                                    else{
                                                                                        console.log('Out of Stock...Retrying'.red);
                                                                                        if (await page.$("div[id='t3c1']") !== null){
                                                                                            const six = "div[id='t3c1']";
                                                                                            await cursor.move(six)
                                                                                            await cursor.click()
                                                                                            console.clear();
                                                                                            await page.waitForTimeout(2000);
                                                                                            if (await page.$("button[id='_activities_WAR_northstarprimefacesportlet_:activityForm:j_idt1727']") !== null){
                                                                                                console.log('In Stock'.green);
                                                                                                await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-area-btn ui-area-btn-success radius-none margin-right-5px btn-save']", elem => elem.click());
                                                                                                await page.waitForTimeout(1000);
                                                                                                console.log('Successfully Reserved'.bold .green)
                                                                                                await page.waitForTimeout(2000);
                                                                                                await browser.close();
                                                                                            }
                                                                                            else{
                                                                                                console.log('Out of Stock...Retrying'.red);
                                                                                                if (await page.$("div[id='t3c2']") !== null){
                                                                                                    const six = "div[id='t3c2']";
                                                                                                    await cursor.move(six)
                                                                                                    await cursor.click()
                                                                                                    console.clear();
                                                                                                    await page.waitForTimeout(2000);
                                                                                                    if (await page.$("button[id='_activities_WAR_northstarprimefacesportlet_:activityForm:j_idt1727']") !== null){
                                                                                                        console.log('In Stock'.green);
                                                                                                        await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-area-btn ui-area-btn-success radius-none margin-right-5px btn-save']", elem => elem.click());
                                                                                                        await page.waitForTimeout(1000);
                                                                                                        console.log('Successfully Reserved'.bold .green)
                                                                                                        await page.waitForTimeout(2000);
                                                                                                        await browser.close();
                                                                                                    }
                                                                                                    else{
                                                                                                        console.log('Out of Stock...Retrying'.red);
                                                                                                        if (await page.$("div[id='t3c3']") !== null){
                                                                                                            const six = "div[id='t3c3']";
                                                                                                            await cursor.move(six)
                                                                                                            await cursor.click()
                                                                                                            console.clear();
                                                                                                            await page.waitForTimeout(2000);
                                                                                                            if (await page.$("button[id='_activities_WAR_northstarprimefacesportlet_:activityForm:j_idt1727']") !== null){
                                                                                                                console.log('In Stock'.green);
                                                                                                                await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-area-btn ui-area-btn-success radius-none margin-right-5px btn-save']", elem => elem.click());
                                                                                                                await page.waitForTimeout(1000);
                                                                                                                console.log('Successfully Reserved'.bold .green)
                                                                                                                await page.waitForTimeout(2000);
                                                                                                                await browser.close();
                                                                                                            }
                                                                                                            else{
                                                                                                                console.log('All Courts Out of Stock, Better Luck Next Time ):'.red);
                                                                                                                await browser.close();
                                                                                                            }
                                                                                                    
                                                                                                        }
                                                                                                    }
                                                                                            
                                                                                                }
                                                                                            }
                                                                                    
                                                                                        }
                                                                                    }
                                                                            
                                                                                }
                                                                            }
                                                                    
                                                                        }
                                                                    }
                                                            
                                                                }
                                                            }
                                                    
                                                        }
                                                    }
                                            
                                                }
                                                
                                            }
                                    
                                        }
                                        
                                    }
                            
                                }
                                
                            }
                    
                        }
                        
                    }
            
                }
                
            }
    
        }
    
    }}
    
    async function checkout(){
        var {page, browser} = await givePage();
        await gen(page, browser);
        await monitor(page, browser);
      }
       
      checkout();

    }, null, true, 'America/Los_Angeles');
      
}
    }
    
