import puppeteer from "puppeteer";
import *  as chromeLauncher from "chrome-launcher";
import fs from 'fs';
import { app, dialog } from 'electron';



const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

let userDocument = '';
let filename = '';
let nameProxyList = '';

let proxyData = {
    examType: 'Reading',
    oneForma: '',
    gpt: ''
};

let countryValue = [
    { name: "Abkhazia", value: "1" },
    { name: "Afghanistan", value: "2" },
    { name: "Albania", value: "3" },
    { name: "Algeria", value: "4" },
    { name: "American Samoa", value: "5" },
    { name: "Andorra", value: "6" },
    { name: "Angola", value: "7" },
    { name: "Anguilla", value: "8" },
    { name: "Antigua & Barbuda", value: "9" },
    { name: "Argentina", value: "10" },
    { name: "Armenia", value: "11" },
    { name: "Aruba", value: "12" },
    { name: "Australia", value: "13" },
    { name: "Austria", value: "14" },
    { name: "Azerbaijan", value: "15" },
    { name: "Bahamas", value: "16" },
    { name: "Bahrain", value: "17" },
    { name: "Bangladesh", value: "18" },
    { name: "Barbados", value: "19" },
    { name: "Belarus", value: "20" },
    { name: "Belgium", value: "21" },
    { name: "Belize", value: "22" },
    { name: "Benin", value: "23" },
    { name: "Bermuda", value: "24" },
    { name: "Bhutan", value: "25" },
    { name: "Bolivia", value: "26" },
    { name: "Bonaire", value: "27" },
    { name: "Bosnia & Herzegovina", value: "28" },
    { name: "Botswana", value: "29" },
    { name: "Brazil", value: "30" },
    { name: "Brunei", value: "32" },
    { name: "Bulgaria", value: "33" },
    { name: "Burkina Faso", value: "34" },
    { name: "Burundi", value: "35" },
    { name: "Cambodia", value: "36" },
    { name: "Cameroon", value: "37" },
    { name: "Canada", value: "38" },
    { name: "Cape Verde", value: "39" },
    { name: "Cayman Islands", value: "40" },
    { name: "Central African Republic", value: "41" },
    { name: "Chad", value: "42" },
    { name: "Chile", value: "44" },
    { name: "China", value: "45" },
    { name: "Colombia", value: "48" },
    { name: "Congo", value: "50" },
    { name: "Costa Rica", value: "52" },
    { name: "Cote D'Ivoire", value: "53" },
    { name: "Croatia", value: "54" },
    { name: "Cuba", value: "55" },
    { name: "Cyprus", value: "57" },
    { name: "Czech Republic", value: "58" },
    { name: "Denmark", value: "59" },
    { name: "Djibouti", value: "60" },
    { name: "Dominica", value: "61" },
    { name: "Dominican Republic", value: "62" },
    { name: "East Timor", value: "63" },
    { name: "Ecuador", value: "64" },
    { name: "Egypt", value: "65" },
    { name: "El Salvador", value: "66" },
    { name: "Equatorial Guinea", value: "67" },
    { name: "Eritrea", value: "68" },
    { name: "Estonia", value: "69" },
    { name: "Ethiopia", value: "70" },
    { name: "Fiji", value: "73" },
    { name: "Finland", value: "74" },
    { name: "France", value: "75" },
    { name: "French Guiana", value: "76" },
    { name: "French Polynesia", value: "77" },
    { name: "Gabon", value: "79" },
    { name: "Gambia", value: "80" },
    { name: "Georgia", value: "81" },
    { name: "Germany", value: "82" },
    { name: "Ghana", value: "83" },
    { name: "Gibraltar", value: "84" },
    { name: "Greece", value: "85" },
    { name: "Grenada", value: "87" },
    { name: "Guadeloupe", value: "88" },
    { name: "Guam", value: "89" },
    { name: "Guatemala", value: "90" },
    { name: "Guinea", value: "91" },
    { name: "Guyana", value: "92" },
    { name: "Haiti", value: "93" },
    { name: "Honduras", value: "94" },
    { name: "Hong Kong", value: "95" },
    { name: "Hungary", value: "96" },
    { name: "Iceland", value: "97" },
    { name: "India", value: "98" },
    { name: "Indonesia", value: "99" },
    { name: "Iran", value: "100" },
    { name: "Iraq", value: "101" },
    { name: "Ireland", value: "102" },
    { name: "Israel", value: "103" },
    { name: "Italy", value: "104" },
    { name: "Jamaica", value: "105" },
    { name: "Japan", value: "106" },
    { name: "Jordan", value: "107" },
    { name: "Kazakhstan", value: "108" },
    { name: "Kenya", value: "109" },
    { name: "Kiribati", value: "110" },
    { name: "Korea North", value: "111" },
    { name: "Korea South", value: "112" },
    { name: "Kuwait", value: "113" },
    { name: "Kyrgyzstan", value: "114" },
    { name: "Laos", value: "115" },
    { name: "Latvia", value: "116" },
    { name: "Lebanon", value: "117" },
    { name: "Lesotho", value: "118" },
    { name: "Liberia", value: "119" },
    { name: "Libya", value: "120" },
    { name: "Liechtenstein", value: "121" },
    { name: "Lithuania", value: "122" },
    { name: "Luxembourg", value: "123" },
    { name: "Macau", value: "124" },
    { name: "Macedonia", value: "125" },
    { name: "Madagascar", value: "126" },
    { name: "Malawi", value: "127" },
    { name: "Malaysia", value: "128" },
    { name: "Maldives", value: "129" },
    { name: "Mali", value: "130" },
    { name: "Malta", value: "131" },
    { name: "Martinique", value: "133" },
    { name: "Mauritania", value: "134" },
    { name: "Mauritius", value: "135" },
    { name: "Mexico", value: "137" },
    { name: "Moldova", value: "139" },
    { name: "Monaco", value: "140" },
    { name: "Mongolia", value: "141" },
    { name: "Morocco", value: "142" },
    { name: "Mozambique", value: "143" },
    { name: "Myanmar", value: "144" },
    { name: "Namibia", value: "145" },
    { name: "Nepal", value: "147" },
    { name: "The Netherlands", value: "149" },
    { name: "New Caledonia", value: "150" },
    { name: "New Zealand", value: "151" },
    { name: "Nicaragua", value: "152" },
    { name: "Niger", value: "153" },
    { name: "Nigeria", value: "154" },
    { name: "Norway", value: "157" },
    { name: "Oman", value: "158" },
    { name: "Pakistan", value: "159" },
    { name: "Palestine", value: "161" },
    { name: "Panama", value: "162" },
    { name: "Papua New Guinea", value: "163" },
    { name: "Paraguay", value: "164" },
    { name: "Peru", value: "165" },
    { name: "Philippines", value: "166" },
    { name: "Poland", value: "168" },
    { name: "Portugal", value: "169" },
    { name: "Puerto Rico", value: "170" },
    { name: "Qatar", value: "171" },
    { name: "Montenegro", value: "172" },
    { name: "Republic of Serbia", value: "173" },
    { name: "Reunion", value: "174" },
    { name: "Romania", value: "175" },
    { name: "Russia", value: "176" },
    { name: "Rwanda", value: "177" },
    { name: "Saint Lucia", value: "178" },
    { name: "Saipan", value: "179" },
    { name: "San Marino", value: "182" },
    { name: "Sao Tome & Principe", value: "183" },
    { name: "Saudi Arabia", value: "184" },
    { name: "Senegal", value: "185" },
    { name: "Serbia", value: "186" },
    { name: "Seychelles", value: "187" },
    { name: "Sierra Leone", value: "188" },
    { name: "Singapore", value: "189" },
    { name: "Slovakia", value: "190" },
    { name: "Slovenia", value: "191" },
    { name: "Solomon Islands", value: "192" },
    { name: "Somalia", value: "193" },
    { name: "South Africa", value: "194" },
    { name: "Spain", value: "195" },
    { name: "Sri Lanka", value: "196" },
    { name: "St Kitts-Nevis", value: "200" },
    { name: "St Vincent & Grenadines", value: "204" },
    { name: "Sudan", value: "205" },
    { name: "Suriname", value: "206" },
    { name: "Swaziland", value: "207" },
    { name: "Sweden", value: "208" },
    { name: "Switzerland", value: "209" },
    { name: "Syria", value: "210" },
    { name: "Taiwan", value: "212" },
    { name: "Tajikistan", value: "213" },
    { name: "Tanzania", value: "214" },
    { name: "Thailand", value: "215" },
    { name: "Togo", value: "216" },
    { name: "Tonga", value: "218" },
    { name: "Trinidad & Tobago", value: "219" },
    { name: "Tunisia", value: "220" },
    { name: "Turkey", value: "221" },
    { name: "Turkmenistan", value: "222" },
    { name: "Turks & Caicos Is", value: "223" },
    { name: "Tuvalu", value: "224" },
    { name: "Uganda", value: "225" },
    { name: "Ukraine", value: "226" },
    { name: "United Arab Emirates", value: "227" },
    { name: "United Kingdom", value: "228" },
    { name: "United States of America", value: "229" },
    { name: "Uruguay", value: "230" },
    { name: "Uzbekistan", value: "231" },
    { name: "Vanuatu", value: "232" },
    { name: "Vatican City State", value: "233" },
    { name: "Venezuela", value: "234" },
    { name: "Vietnam", value: "235" },
    { name: "Virgin Islands (Brit)", value: "236" },
    { name: "Virgin Islands (USA)", value: "237" },
    { name: "Yemen", value: "240" },
    { name: "Zambia", value: "242" },
    { name: "Zimbabwe", value: "243" },
    { name: "Sint Maarten", value: "244" },
    { name: "Curacao", value: "245" },
    { name: "North Macedonia", value: "248" },
    { name: "Viet Nam", value: "250" },
    { name: "Taiwan (Province of China)", value: "251" },
    { name: "Russian Federation", value: "252" },
    { name: "Netherlands", value: "253" },
    { name: "Venezuela (Bolivarian Republic of)", value: "254" },
    { name: "Tanzania, United Republic of", value: "255" },
    { name: "Saint Vincent and The Grenadines", value: "256" },
    { name: "Comoros", value: "257" },
    { name: "Congo, Democratic Republic of the", value: "258" },
    { name: "Guinea-Bissau", value: "259" },
    { name: "Marshall Islands", value: "260" },
    { name: "Micronesia, Federated States of", value: "261" },
    { name: "Nauru", value: "262" },
    { name: "Palau", value: "263" },
    { name: "Saint Kitts and Nevis", value: "264" },
    { name: "South Sudan", value: "265" },
    { name: "Western Sahara", value: "266" },
    { name: "Montserrat", value: "267" },
    { name: "Kosovo", value: "268" }];


async function createNewEmail(registerData, gotNewData, sendReconnect) {
    const chrome = await chromeLauncher.launch({
        ignoreDefaultFlags: true,
        chromeFlags: ["--no-first-run", "--silent-debugger-extension-api", "--enable-extension", "--load-extension=" + userDocument + '/extension', '--proxy-server=geo.iproyal.com:12321']
    });
    const browserURL = `http://localhost:${chrome.port}`;
    proxyData.oneForma = browserURL;
    const browser = await puppeteer.connect({ browserURL, defaultViewport: null });

    const pages = await browser.pages();
    const page = pages[pages.length - 1];
    let index = 0;


    await page.authenticate({
        username: registerData[index].proxyUsername,
        password: registerData[index].proxyPassword

    });

    await page.goto('https://signup.mail.com/#.7518-header-signup1-1', {
        timeout: 0,
        waitUntil: 'networkidle2'
    });

    let currentPage = page.url();
    console.log('currentPage', currentPage)
    console.log('user', registerData[index])


    async function changeProxy() {
        if (index < registerData.length) {
            index += 1;
        }
        console.log('user', registerData[index])

        await page.authenticate({
            username: registerData[index].proxyUsername,
            password: registerData[index].proxyPassword
        });

        // console.log(registerData[index])
        await page.goto('https://signup.mail.com/#.7518-header-signup1-1', {
            timeout: 0,
            waitUntil: 'networkidle2'
        });

        console.log('currentPage', page.url())

        return page.url();
    }

    while (currentPage.includes('support')) {

        currentPage = await changeProxy();
    };

    let currentTabs = pages.length;

    console.log('emails', registerData.length, 'tabs', currentTabs)


    while (currentTabs < registerData.length) {
        let newTab = await browser.newPage()
        await newTab.goto('https://signup.mail.com/#.7518-header-signup1-1', {
            timeout: 0,
            waitUntil: 'networkidle2'
        });
        await newTab.evaluate((registerData) => {
            console.log(registerData)
        }, registerData)
        currentTabs = (await browser.pages()).length;
    }

    await sleep(3000);

    let newNo = 0
    let allPages = await browser.pages();

    while (newNo < allPages.length) {
        await allPages[newNo].bringToFront();

        await task(allPages[newNo], registerData[newNo]);

        await sleep(10000)

        newNo += 1
        // console.log(newNo)
    }

    async function task(page, userData) {
        let genderSelect = userData.gender;

        console.log(userData)

        let lastName;
        if (userData?.lastname == undefined) {
            lastName = userData.lastName;
        } else {
            lastName = userData.lastname;
        }


        let firstName;
        if (userData?.firstname == undefined) {
            firstName = userData.firstName;
        } else {
            firstName = userData.firstname;
        }

        let year = Math.floor(Math.random() * (1999 - 1989) + 1989);
        let month = Math.floor(Math.random() * (12 - 1) + 1);
        let day = Math.floor(Math.random() * (28 - 1) + 1);

        async function getRegisteredEmail() {
            if (page.url().includes('interception-lxa.mail.com')) {
                await page.waitForSelector('#registeredEmail', { timeout: 0 });
                return await page.$eval('#registeredEmail', el => {
                    return el.innerText;
                })
                // return registeredEmail;
            } else {
                return false;
            }

        }

        const stateList = [
            "AL",
            "AK",
            "AZ",
            "AR",
            "CA",
            "CO",
            "CT",
            "DE",
            "DC",
            "FL",
            "GA",
            "HI",
            "ID",
            "IL",
            "IN",
            "IA",
            "KS",
            "KY",
            "LA",
            "ME",
            "MD",
            "MA",
            "MI",
            "MN",
            "MS",
            "MO",
            "MT",
            "NE",
            "NV",
            "NH",
            "NJ",
            "NM",
            "NY",
            "NC",
            "ND",
            "OH",
            "OK",
            "OR",
            "PA",
            "RI",
            "SC",
            "SD",
            "TN",
            "TX",
            "UT",
            "VT",
            "VA",
            "WA",
            "WV",
            "WI",
            "WY",
        ];


        async function removeDiacritics(str) {
            const defaultDiacriticsRemovalMap = [
                { base: 'A', letters: /[\u00C0-\u00C5]/g },
                { base: 'a', letters: /[\u00E0-\u00E5]/g },
                { base: 'C', letters: /[\u00C7]/g },
                { base: 'c', letters: /[\u00E7]/g },
                { base: 'E', letters: /[\u00C8-\u00CB]/g },
                { base: 'e', letters: /[\u00E8-\u00EB]/g },
                { base: 'I', letters: /[\u00CC-\u00CF]/g },
                { base: 'i', letters: /[\u00EC-\u00EF]/g },
                { base: 'N', letters: /[\u00D1]/g },
                { base: 'n', letters: /[\u00F1]/g },
                { base: 'O', letters: /[\u00D2-\u00D6\u00D8]/g },
                { base: 'o', letters: /[\u00F2-\u00F6\u00F8]/g },
                { base: 'S', letters: /[\u00DF]/g },
                { base: 'U', letters: /[\u00D9-\u00DC]/g },
                { base: 'u', letters: /[\u00F9-\u00FC]/g },
                { base: 'Y', letters: /[\u00DD]/g },
                { base: 'y', letters: /[\u00FD\u00FF]/g }
            ];

            for (let i = 0; i < defaultDiacriticsRemovalMap.length; i++) {
                str = str.replace(defaultDiacriticsRemovalMap[i].letters, defaultDiacriticsRemovalMap[i].base);
            }
            return str;
        };

        continueForm();

        async function continueForm() {
            let randomNumber = Math.floor(Math.random() * (999999 - 100000 + 1));
            if (randomNumber.toString().length != 6) {
                randomNumber = Number(randomNumber.toString() + Math.floor(Math.random() * (9 - 1)).toString());
            }

            if (genderSelect == 'female') {
                await page.click("body > onereg-app > div > onereg-form > div > div > form > section > section.form__panel--personal-info > onereg-progress-meter > div.onereg-progress-meter__grow-container > onereg-personal-info > fieldset > div.l-flex.l-horizontal.l-wrap.a-mb-space-1 > div > onereg-radio-wrapper:nth-child(1) > pos-input-radio > label > input");
            } else if (genderSelect == 'male') {
                await page.click("body > onereg-app > div > onereg-form > div > div > form > section > section.form__panel--personal-info > onereg-progress-meter > div.onereg-progress-meter__grow-container > onereg-personal-info > fieldset > div > div > onereg-radio-wrapper:nth-child(2) > pos-input-radio > label > input");
            }

            await sleep(1000);

            await page.type(
                "body > onereg-app > div > onereg-form > div > div > form > section > section.form__panel--personal-info > onereg-progress-meter > div.onereg-progress-meter__grow-container > onereg-personal-info > fieldset > onereg-form-row:nth-child(4) > div > div:nth-child(3) > pos-input > input",
                firstName
            );
            await page.type(
                "body > onereg-app > div > onereg-form > div > div > form > section > section.form__panel--personal-info > onereg-progress-meter > div.onereg-progress-meter__grow-container > onereg-personal-info > fieldset > onereg-form-row:nth-child(5) > div > div:nth-child(3) > pos-input > input",
                lastName
            );
            await page.type(
                "body > onereg-app > div > onereg-form > div > div > form > section > section.form__panel--personal-info > onereg-progress-meter > div.onereg-progress-meter__grow-container > onereg-personal-info > fieldset > onereg-form-row:nth-child(7) > div > div > div > onereg-dob-wrapper > pos-input-dob > pos-input:nth-child(1) > input",
                month.toString().length == 1 ? "0" + month.toString() : month.toString()
            );
            await page.type(
                "body > onereg-app > div > onereg-form > div > div > form > section > section.form__panel--personal-info > onereg-progress-meter > div.onereg-progress-meter__grow-container > onereg-personal-info > fieldset > onereg-form-row:nth-child(7) > div > div > div > onereg-dob-wrapper > pos-input-dob > pos-input:nth-child(2) > input",
                day.toString().length == 1 ? "0" + day.toString() : day.toString()
            );
            await page.type(
                "body > onereg-app > div > onereg-form > div > div > form > section > section.form__panel--personal-info > onereg-progress-meter > div.onereg-progress-meter__grow-container > onereg-personal-info > fieldset > onereg-form-row:nth-child(7) > div > div > div > onereg-dob-wrapper > pos-input-dob > pos-input:nth-child(3) > input",
                year.toString()
            );
            await page.type(
                "body > onereg-app > div > onereg-form > div > div > form > section > section.form__panel--password > onereg-password > fieldset > onereg-progress-meter > div.onereg-progress-meter__grow-container > onereg-form-row:nth-child(4) > div > div > pos-input > input",
                "stupidmoneyBsf@"
            );
            await page.type(
                "body > onereg-app > div > onereg-form > div > div > form > section > section.form__panel--password > onereg-password > fieldset > onereg-progress-meter > div.onereg-progress-meter__grow-container > onereg-form-row:nth-child(6) > div > div > pos-input > input",
                "stupidmoneyBsf@"
            );
            await page.type(
                "body > onereg-app > div > onereg-form > div > div > form > section > section.form__panel--password-recovery > onereg-password-recovery > fieldset > onereg-progress-meter > div.onereg-progress-meter__grow-container > onereg-form-row:nth-child(4) > div > div > div > pos-input.pos-input.l-flex-1 > input",
                "2015" + randomNumber.toString()
            );
            await page.select(
                "body > onereg-app > div > onereg-form > div > div > form > section > section.form__panel--personal-info > onereg-progress-meter > div.onereg-progress-meter__grow-container > onereg-personal-info > fieldset > fieldset > onereg-form-row > div > div > pos-input > select",
                "US"
            );
            await page.select(
                "body > onereg-app > div > onereg-form > div > div > form > section > section.form__panel--personal-info > onereg-progress-meter > div.onereg-progress-meter__grow-container > onereg-personal-info > fieldset > fieldset > onereg-form-row:nth-child(2) > div > div > pos-input > select",
                stateList[Math.floor(Math.random() * stateList.length)]
            );
            await page.select(
                "body > onereg-app > div > onereg-form > div > div > form > section > section.form__panel--password-recovery > onereg-password-recovery > fieldset > onereg-progress-meter > div.onereg-progress-meter__grow-container > onereg-form-row:nth-child(4) > div > div > div > pos-input:nth-child(1) > select",
                "27: Object"
            );

            await page.type(
                "body > onereg-app > div > onereg-form > div > div > form > section > section.form__panel--email-alias > onereg-alias > fieldset > onereg-progress-meter > div.onereg-progress-meter__grow-container > div > div.pos-form-wrapper > div > pos-input.pos-input.email-alias-input__alias-input-wrapper.l-flex-1 > input",
                await removeDiacritics(firstName.toLowerCase() + lastName.toLowerCase())
            );
            await page.click(
                "body > onereg-app > div > onereg-form > div > div > form > section > section.form__panel--email-alias > onereg-alias > fieldset > onereg-progress-meter > div.onereg-progress-meter__grow-container > div > div.pos-form-wrapper > div > button > span"
            );

            let waitToGetEmail = await getRegisteredEmail();

            console.log('waitToGetEmail111', waitToGetEmail);
            while (!waitToGetEmail) {
                await sleep(2000);
                waitToGetEmail = await getRegisteredEmail();
            };

            let registedUser = {
                proxyUsername: userData.proxyUsername,
                proxyPassword: userData.proxyPassword,
                proxyCountry: userData.proxyCountry,
                proxyState: userData.proxyState,
                gender: userData.gender,
                // profile: userData.profile,
                firstname: firstName,
                lastname: lastName,
                password: 'stupidmoneyBsf@',
                emailAddress: waitToGetEmail
            };


            function modifyJsonFile(filename, newData) {
                fs.readFile(filename, 'utf8', (err, data) => {
                    if (err) {
                        console.error('Error reading file:', err);
                        return;
                    }

                    let jsonData = JSON.parse(data);
                    jsonData.push(newData);

                    fs.writeFile(filename, JSON.stringify(jsonData, null, 2), async (err) => {
                        if (err) {
                            console.error('Error writing file:', err);
                        } else {
                            console.log(newData, ' added successfully!');
                            removeNewlyAddedData(newData);
                            // gotNewData('done');
                        }
                    });
                });
            }

            async function removeNewlyAddedData(userToRemove) {

                fs.readFile(nameProxyList, 'utf8', (err, data) => {
                    if (err) {
                        console.error('Error reading file:', err);
                        return;
                    }
                    let jsonData = JSON.parse(data);

                    for (let i = 0; i < jsonData.length; i++) {
                        if (jsonData[i].firstname == userToRemove.firstname && jsonData[i].lastname == userToRemove.lastname) {
                            jsonData.splice(i, 1);

                            fs.writeFile(nameProxyList, JSON.stringify(jsonData, null, 2), async (err) => {
                                if (err) {
                                    console.error('Error writing file:', err);
                                } else {
                                    console.log(userToRemove, ' removed successfully!');
                                    gotNewData('done');
                                }
                            });
                        }
                    }
                });

            }

            modifyJsonFile(filename, registedUser);

            createOneFormaNormally(registedUser, gotNewData, sendReconnect)

            // continueOneForma(oneFormaPage, registedUser, gotNewData);



        }
        // return (newNo + 1);
    }
}

async function continueOneForma(page, userDetails, gotNewData) {

    await page.type("#firstname", userDetails?.firstname);
    await page.type("#lastname", userDetails?.lastname);
    await page.type("#username", userDetails?.firstname + userDetails?.lastname);
    await page.type("#email", userDetails?.emailAddress);
    await page.type("#passwordbox", userDetails?.password);
    await page.type("#confirmpasswordbox", userDetails?.password);
    await page.type("#city_of_residence", userDetails?.proxyState);
    await sleep(2000);

    await page.click("#select2-country-container")
    // await page.waitForSelector('#select2-country-results')
    let countryCount = await page.evaluate((userDetails) => {
        let el = document.querySelector('#select2-country-results');
        for (let i = 0; i < el.children.length; i++) {
            // const element = array[index];
            if (el.children[i].innerText.toLowerCase() == userDetails?.proxyCountry?.toLowerCase()) {
                return i
            }

        }
    }, userDetails);


    await sleep(1000);

    if (!isNaN(Number(countryCount + 1))) {
        await page.click(`ul > li:nth-child(${countryCount + 1})`);

        sleep(1000);
        await page.click("#next-btn");
    } else {
        await page.keyboard.type(userDetails?.proxyCountry.toLowerCase());

        await page.keyboard.press('Enter');
        sleep(1000);
        await page.click("#next-btn");
    };


    async function getRegisteredEmail() {
        if (page.url().includes('Account/email_activation')) {
            function saveDataToNew(registedUser) {
                function modifyJsonFile(filename, newData) {
                    fs.readFile(filename, 'utf8', (err, data) => {
                        if (err) {
                            console.error('Error reading file:', err);
                            return;
                        }

                        let jsonData = JSON.parse(data);
                        jsonData.push(newData);

                        fs.writeFile(filename, JSON.stringify(jsonData, null, 2), async (err) => {
                            if (err) {
                                console.error('Error writing file:', err);
                            } else {
                                console.log(newData, ' added successfully!');
                                removeNewlyAddedData(newData);
                            }
                        });
                    });
                }

                const nameProxyList = userDocument + '/name-proxy-email.json';
                const filename = userDocument + '/oneformaCredentials.json';

                modifyJsonFile(filename, registedUser);

                async function removeNewlyAddedData(userToRemove) {

                    fs.readFile(nameProxyList, 'utf8', (err, data) => {
                        if (err) {
                            console.error('Error reading file:', err);
                            return;
                        }
                        let jsonData = JSON.parse(data);

                        for (let i = 0; i < jsonData.length; i++) {
                            if (jsonData[i].firstname == userToRemove.firstname && jsonData[i].lastname == userToRemove.lastname) {
                                jsonData.splice(i, 1);

                                fs.writeFile(nameProxyList, JSON.stringify(jsonData, null, 2), (err) => {
                                    if (err) {
                                        console.error('Error writing file:', err);
                                    } else {
                                        console.log(userToRemove, ' removed successfully!');
                                        gotNewData('done');
                                    }
                                });
                            }
                        }
                    });

                }
            }
            saveDataToNew(userDetails);
            return true
        } else {
            return false;
        }

    }

    let waitToGetEmail = await getRegisteredEmail();

    while (!waitToGetEmail) {
        await sleep(2000);
        waitToGetEmail = await getRegisteredEmail();
    };

    await sleep(2000);
    await page.goto("https://www.mail.com/#.7518-header-navlogin2-1", {
        waitUntil: "networkidle2",
        timeout: 0
    });
    let pageUrl = page.url();
    while (!pageUrl.includes('https://www.mail.com/#.7518-header-navlogin2-1')) {
        await page.goto("https://www.mail.com/#.7518-header-navlogin2-1", {
            waitUntil: "networkidle2",
            timeout: 0
        });
        pageUrl = page.url();
    }
    await page.type('#login-email', userDetails?.emailAddress);
    await page.type('#login-password', userDetails?.password);

    await sleep(1000);
    await page.click('#header-login-box > form > button');

}

async function createOneFormaNormally(userDetails, gotNewData, sendReconnect) {
    const chrome = await chromeLauncher.launch({
        ignoreDefaultFlags: true,
        chromeFlags: ["--no-first-run", "--silent-debugger-extension-api", "--enable-extension", "--load-extension=" + userDocument + '/extension', '--proxy-server=geo.iproyal.com:12321']
    });
    const browserURL = `http://localhost:${chrome.port}`;
    proxyData.oneForma = browserURL;
    // sendReconnect(proxyData);
    const browser = await puppeteer.connect({ browserURL, defaultViewport: null });

    const pages = await browser.pages();
    const page = pages[pages.length - 1];

    function getUrlVars(url) {
        var hash;
        var myJson = {};
        var hashes = url.split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            myJson[hash[0]] = hash[1];
        }
        return myJson;
    };

    let form_random_token = '';

    await page.setRequestInterception(true);
    page.on('request', interceptedRequest => {

        if (interceptedRequest.url().includes('login_action.php') && interceptedRequest.method() === 'POST') {
            let posttt = interceptedRequest.postData();
            var params = getUrlVars(posttt);
            form_random_token = params?.form_random_token_1;
      
            interceptedRequest.continue({
              postData: posttt
            });
          } else if (interceptedRequest.url().includes('ipqualityscore')) {
            interceptedRequest.abort()
          } else if (interceptedRequest.url().includes('ApplyToJobTrans.php') && interceptedRequest.method() === 'POST') {
            let posttt = interceptedRequest.postData();
            console.log(posttt)
            var params = getUrlVars(posttt);
            if (!isNaN(params.proxy) > 0 || !isNaN(proxy.fraudChance) > 0 || !isNaN(params.vpn) > 0) {

                params.proxy = 0;
                params.fraudChance = 0;
                params.vpn = 0;


                if (isNaN(params.deviceId[0])) {
                    params.deviceId = 'y' + params.deviceId.slice(1);
                } else {
                    params.deviceId = 1 + params.deviceId.slice(1);
                }

                console.log(params)

                var hashes = JSON.stringify(params).replaceAll(/:/g, "=").replaceAll(/,/g, "&").replaceAll(/"/g, "").replaceAll(/{/g, "").replaceAll(/}/g, "");

                interceptedRequest.continue({
                    postData: hashes
                });
            }
        } else {
            interceptedRequest.continue();
        }
    });

    browser.on('targetcreated', async target => {
        const newPage = await target.page();
        if (newPage) {
            await newPage.setRequestInterception(true);
            newPage.on('request', interceptedRequest => {
                if (interceptedRequest.url().includes('login_action.php') && interceptedRequest.method() === 'POST') {
                    let posttt = interceptedRequest.postData();
                    var params = getUrlVars(posttt);
                    form_random_token = params?.form_random_token_1;
              
                    interceptedRequest.continue({
                      postData: posttt
                    });
                  } else if (interceptedRequest.url().includes('ipqualityscore')) {
                    interceptedRequest.abort()
                  } else if (interceptedRequest.url().includes('ApplyToJobTrans.php') && interceptedRequest.method() === 'POST') {
                    let posttt = interceptedRequest.postData();
                    console.log(posttt)
                    var params = getUrlVars(posttt);
                    if (!isNaN(params.proxy) > 0 || !isNaN(proxy.fraudChance) > 0 || !isNaN(params.vpn) > 0) {

                        params.proxy = 0;
                        params.fraudChance = 0;
                        params.vpn = 0;


                        if (isNaN(params.deviceId[0])) {
                            params.deviceId = 'y' + params.deviceId.slice(1);
                        } else {
                            params.deviceId = 1 + params.deviceId.slice(1);
                        }

                        console.log(params)

                        var hashes = JSON.stringify(params).replaceAll(/:/g, "=").replaceAll(/,/g, "&").replaceAll(/"/g, "").replaceAll(/{/g, "").replaceAll(/}/g, "");

                        interceptedRequest.continue({
                            postData: hashes
                        });
                    }
                } else {
                    interceptedRequest.continue();
                }
            });

            if (newPage.url().includes('deref-mail.com')) {
                await sleep(4000);

                let redirectResult = newPage.url();

                while (!redirectResult.includes('emailactivated=1')) {
                    await sleep(2000);
                    redirectResult = newPage.url();
                };

                initGpt(sendReconnect);

                await newPage.waitForSelector('#form-email', { timeout: 0 });
                await newPage.type("#form-email", userDetails?.emailAddress);
                await newPage.type("#form-password", userDetails?.password);
                await sleep(4000);
                await newPage.click("#login_btn");

                // dialog.showErrorBox(`go`, `1`);

                while (redirectResult.includes('emailactivated=1')) {
                    await sleep(4000);
                    await newPage.click("#login_btn");
                    await sleep(3000);
                    redirectResult = newPage.url();
                };

                // dialog.showErrorBox(`go`, `2`);
                
                let cookies = await newPage.cookies();

                await sleep(2000);

                // dialog.showErrorBox(`go`, `3`);

                await newPage.goto('https://my.oneforma.com/UserPortal/profile#about_me', {
                    timeout: 0,
                    waitUntil: 'networkidle2'
                });

                await newPage.waitForSelector('#select2-country-container');

                async function getBasedCountry() {
                    return await newPage.evaluate(() => {
                        return document.querySelector('#select2-country-container')?.innerText;
                    });
                }

                let basedCountry = await getBasedCountry();

                let basedCountryValue = '';

                await newPage.evaluate((cookies, form_random_token) => {
                    fetch('https://my.oneforma.com/UserPortal/Global/SaveUserInfo.php', {
                        method: 'POST',
                        headers: {
                            'Host': 'my.oneforma.com',
                            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:133.0) Gecko/20100101 Firefox/133.0',
                            'Accept': 'text/plain, */*; q=0.01',
                            'Accept-Language': 'en-US,en;q=0.5',
                            'Accept-Encoding': 'gzip, deflate, br',
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                            'X-Requested-With': 'XMLHttpRequest',
                            'Content-Length': '62',
                            'Origin': 'https://my.oneforma.com',
                            'Referer': 'https://my.oneforma.com/UserPortal/profile',
                            'Sec-Fetch-Dest': 'empty',
                            'Sec-Fetch-Mode': 'cors',
                            'Sec-Fetch-Site': 'same-origin',
                            'Priority': 'u=0',
                            'Te': 'trailers',
                            'Cookie': cookies
                        },
                        body: new URLSearchParams({
                            'field': 'country',
                            'newdata': '45',
                            'form_random_token_1': form_random_token
                        })
                    });

                }, cookies, form_random_token);

                await sleep(2000);

                await newPage.click('#sidebar-wrapper > div > div > a:nth-child(3)');

                countryValue.forEach(countryObj => {
                    if (countryObj?.name.toLowerCase() == basedCountry.toLowerCase()) {
                        basedCountryValue = countryObj?.value;
                    };
                });


                await sleep(120000);

                await newPage.evaluate((cookies, form_random_token, basedCountryValue) => {
                    fetch('https://my.oneforma.com/UserPortal/Global/SaveUserInfo.php', {
                        method: 'POST',
                        headers: {
                            'Host': 'my.oneforma.com',
                            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:133.0) Gecko/20100101 Firefox/133.0',
                            'Accept': 'text/plain, */*; q=0.01',
                            'Accept-Language': 'en-US,en;q=0.5',
                            'Accept-Encoding': 'gzip, deflate, br',
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                            'X-Requested-With': 'XMLHttpRequest',
                            'Content-Length': '62',
                            'Origin': 'https://my.oneforma.com',
                            'Referer': 'https://my.oneforma.com/UserPortal/profile',
                            'Sec-Fetch-Dest': 'empty',
                            'Sec-Fetch-Mode': 'cors',
                            'Sec-Fetch-Site': 'same-origin',
                            'Priority': 'u=0',
                            'Te': 'trailers',
                            'Cookie': cookies
                        },
                        body: new URLSearchParams({
                            'field': 'country',
                            'newdata': basedCountryValue,
                            'form_random_token_1': form_random_token
                        })
                    });

                }, cookies, form_random_token, basedCountryValue);

            }
        }
    });


    await page.authenticate({
        username: userDetails?.proxyUsername,
        password: userDetails?.proxyPassword

    });

    await page.goto("chrome-extension://ncbknoohfjmcfneopnfkapmkblaenokb/popup.html", {
        timeout: 0,
        waitUntil: 'networkidle2'
    });

    await page.goto("https://example.com", {
        timeout: 0,
        waitUntil: 'networkidle2'
    });


    await page.goto('https://my.oneforma.com/Account/register', {
        timeout: 0,
        waitUntil: 'networkidle2'
    });

    continueOneForma(page, userDetails, gotNewData)
};

async function initGpt(sendReconnect) {
    let chromeDir = '/Gemini';
    let chromeProfile = 'Person 2';
    const chrome = await chromeLauncher.launch({
        ignoreDefaultFlags: true,
        chromeFlags: ["--no-first-run", "--disable-gpu", "--profile-directory=" + chromeProfile, "--user-data-dir=" + userDocument + chromeDir],
    });
    const browserURL = `http://localhost:${chrome.port}`;
    proxyData.gpt = browserURL;
    sendReconnect(proxyData);
    const browserGpt = await puppeteer.connect({ browserURL, defaultViewport: null });
    let pageGemini = await browserGpt.pages();
    let pageChatGpt = pageGemini[pageGemini.length - 1];

    await pageChatGpt.goto("https://chatgpt.com", {
        waitUntil: "networkidle2",
        timeout: 0
    });
}

export default async function extension1(userDetailsArray, createEmail, gotNewData, userDocumentSent, sendReconnect) {

    // dialog.showErrorBox(`go`, `1`);
    dialog.showErrorBox('extension', `error unpacking`)
    userDocument = userDocumentSent;
    filename = userDocument + '/name-proxy-email.json';
    nameProxyList = userDocument + '/name-proxy.json';

    if (createEmail) {
        createNewEmail(userDetailsArray, gotNewData, sendReconnect);
    } else {
        for (let i = 0; i < userDetailsArray.length; i++) {
            createOneFormaNormally(userDetailsArray[i], gotNewData);
        }

    };

};
