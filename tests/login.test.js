const puppeteer = require('puppeteer');
const credentials = require('../credentials');
const selectors = require('../selectors/login.selectors');

let browser, page;

beforeEach(async () => {
	browser = await puppeteer.launch({
		headless: false,
		args: [
			'--start-maximized' // you can also use '--start-fullscreen'
		]
	});
	page = await browser.newPage();
	await page.setViewport({ width: 1366, height: 768 });
	await page.goto('https://officeday.ee');
});

afterEach(async () => {
	await browser.close();
});

test('navigate to login page', async () => {
	jest.setTimeout(10000);
	await page.click(selectors.loginPageBtnSelector);
	await page.waitFor(selectors.loginPageHeaderSelector);

	const headerText = await page.$eval(
		selectors.loginPageHeaderSelector,
		el => el.innerHTML
	);
	expect(headerText).toEqual('Kasutaja sisselogimine');
});

describe('logging in and out', () => {
	jest.setTimeout(60000);
	beforeEach(async () => {
		await page.click(selectors.loginPageBtnSelector);
		await page.waitFor(selectors.loginPageHeaderSelector);
	});

	test('when entering correct username and password, login is succesful', async () => {
		jest.setTimeout(30000);
		await page.click(selectors.usernameSelector);
		await page.keyboard.type(credentials.username);

		await page.click(selectors.passwordSelector);
		await page.keyboard.type(credentials.password);
		await page.waitFor(selectors.submitSelector);
		await page.click(selectors.submitSelector);

		await page.waitFor(selectors.profileSelector);
		const profileText = await page.$eval(
			selectors.profileSelector,
			el => el.innerHTML
		);
		expect(profileText).toEqual('Eesnimi1 Perenimi1');

		// logout
		await page.click(selectors.logoutSelector);
		await page.waitFor(selectors.loginPageBtnSelector);
		const loginText = await page.$eval(
			selectors.loginPageBtnTextSelector,
			el => el.innerHTML
		);
		expect(loginText).toEqual('Logi sisse');
	});

	test('when entering invalid password, error message is shown', async () => {
		await page.click(selectors.usernameSelector);
		await page.keyboard.type('randomusername');

		await page.click(selectors.passwordSelector);
		await page.keyboard.type('randompassword');

		await page.waitFor(selectors.submitSelector);
		await page.click(selectors.submitSelector);

		await page.waitFor(3000);
		const errorText = await page.$eval(
			selectors.errorSelector,
			el => el.innerHTML
		);
		expect(errorText).toEqual('Vale ePost või salasõna');
	});
});
