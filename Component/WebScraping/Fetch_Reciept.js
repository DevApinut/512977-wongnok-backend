const puppeteer = require('puppeteer')
const url = require('url');


exports.Web_fetch = async(req, res) => {
    try {

        const {urllink} = req.body

        // res.json({res:urllink})
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        // Navigate the page to a URL.
        await page.goto(urllink);
        
        
        var TJ_Number = await page.waitForSelector("#menu-top-secondary > div:nth-child(1) > h5 > span.text-black-50")
        var TJ_Number_val = await page.evaluate(element => element.textContent, TJ_Number)
        
        var Book_ref = await page.waitForSelector("#eemx-approval-view > div.col-12.col-xl-8 > div > form > div:nth-child(1) > input")
        var Book_ref_val = await page.evaluate(element => element.value, Book_ref)
        
        var Work_Continue = await page.waitForSelector("#eemx-approval-view > div.col-12.col-xl-8 > div > form > div:nth-child(2) > div > div:nth-child(2) > input")
        var Work_Continue_val = await page.evaluate(element => element.checked, Work_Continue)
        
        var Date_Start = await page.waitForSelector("#eemx-approval-view > div.col-12.col-xl-8 > div > form > div:nth-child(3) > div:nth-child(1) > input")
        var Date_Start_val = await page.evaluate(element => element.value, Date_Start)
        
        var Date_End = await page.waitForSelector("#eemx-approval-view > div.col-12.col-xl-8 > div > form > div:nth-child(3) > div:nth-child(2) > input")
        var Date_End_val = await page.evaluate(element => element.value, Date_End)
        
        var objective = await page.waitForSelector("#eemx-approval-view > div.col-12.col-xl-8 > div > form > div:nth-child(4) > pre")
        var objective_val = await page.evaluate(element => element.textContent, objective)
        
        var Location = await page.waitForSelector("#eemx-approval-view > div.col-12.col-xl-8 > div > form > div:nth-child(7) > input")
        var Location_val = await page.evaluate(element => element.value, Location)
        
        var Name_Car = await page.waitForSelector("#eemx-approval-view > div.col-12.col-xl-8 > div > form > div:nth-child(10) > div:nth-child(1) > input")
        var Name_Car_val = await page.evaluate(element => element.value, Name_Car)
        
        var Name_Person_Car = await page.waitForSelector("#eemx-approval-view > div.col-12.col-xl-8 > div > form > div:nth-child(10) > div:nth-child(2) > input")
        var Name_Person_Car_val = await page.evaluate(element => element.value, Name_Person_Car)
        
        var last_child = await page.waitForSelector("#eemx-approval-view > div.col-12.col-xl-8 > div > form > div:nth-child(11) > div > div > table > tbody > tr:last-child > td:nth-child(1)")
        var last_child_val = await page.evaluate(element => element.textContent, last_child)

        var Data_person=[]     
        
        for(i = 1; i <= last_child_val; i++){
            var Number_person = await page.waitForSelector("#eemx-approval-view > div.col-12.col-xl-8 > div > form > div:nth-child(11) > div > div > table > tbody > tr:nth-child(" + i + ") > td:nth-child(2)")
            var Name_person = await page.waitForSelector("#eemx-approval-view > div.col-12.col-xl-8 > div > form > div:nth-child(11) > div > div > table > tbody > tr:nth-child(" + i + ") > td:nth-child(3)")
            var Position_person = await page.waitForSelector("#eemx-approval-view > div.col-12.col-xl-8 > div > form > div:nth-child(11) > div > div > table > tbody > tr:nth-child(" + i + ") > td:nth-child(4)")
            var Affialation = await page.waitForSelector("#eemx-approval-view > div.col-12.col-xl-8 > div > form > div:nth-child(11) > div > div > table > tbody > tr:nth-child(" + i + ") > td:nth-child(5)")
            
            var Number_person_val = await page.evaluate(element => element.textContent, Number_person)            
            var Name_person_val = await page.evaluate(element => element.textContent, Name_person)            
            var Position_person_val = await page.evaluate(element => element.textContent, Position_person)            
            var Affialation_val = await page.evaluate(element => element.textContent, Affialation)  
            
            Data_person = [...Data_person,[Number_person_val,Name_person_val,Position_person_val,Affialation_val]]
            // Data_person = {...Data_person,[`Number_person${i}`]:Number_person_val,[`Name_person${i}`]:Name_person_val,[`Position_person${i}`]:Position_person_val,[`Affialation_val${i}`]:Affialation_val}
            
        }

        var personel_permit = await page.waitForSelector("#eemx-approval-view > div.col-12.col-xl-4.pl-xl-0 > div > div:last-child > div.d-flex.flex-column.justify-content-start.pl-3.flex-grow-1 > div.d-flex > div.font-weight-bold")
        var personel_permit_val = await page.evaluate(element => element.textContent, personel_permit)

        var date_personel_permit = await page.waitForSelector("#eemx-approval-view > div.col-12.col-xl-4.pl-xl-0 > div > div:last-child > div.d-flex.flex-column.justify-content-start.pl-3.flex-grow-1 > div.d-flex > div.text-muted.ml-auto")
        var date_personel_permit_val = await page.evaluate(element => element.textContent, date_personel_permit)
           
        res.json({TJ_Number_val,Book_ref_val,Work_Continue_val,
            Date_Start_val,Date_End_val,objective_val,
            Location_val,Name_Car_val,Name_Person_Car_val,
            last_child_val,Data_person,personel_permit_val,date_personel_permit_val
        })

        browser.close
    } catch (err) {
        res.json(err)
    }
}

