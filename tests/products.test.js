const puppeteer = require('puppeteer');
const credentials = require('../credentials');
const loginSelectors = require('../selectors/login.selectors');
const productsSelectors = require('../selectors/products.selectors');

let browser, page;

beforeEach(async () => {
	browser = await puppeteer.launch({
		headless: false,
		args: ['--start-maximized']
	});

	page = await browser.newPage();
	await page.setViewport({ width: 1366, height: 768 });

	await page.goto('https://officeday.ee');
});

afterEach(async () => {
	await browser.close();
});

const testAddingSearchProduct = async () => {
	const searchBoxHandle = await page.$(
		productsSelectors.searchBoxInputSelector
	);
	await searchBoxHandle.type('kohvioad lavazza');
	await searchBoxHandle.press('Enter');

	await page.waitFor(productsSelectors.searchProductSelector);
	await page.click(productsSelectors.searchProductSelector);

	await page.waitFor(productsSelectors.searchProductAddedMsgSelector);
	let productAddedMsgText = await page.$eval(
		productsSelectors.searchProductAddedMsgSelector,
		el => el.innerHTML
	);
	expect(productAddedMsgText).toEqual('Toode lisatud ostukorvi');
};

const testAddingCategoryProduct = async () => {
	await page.click(productsSelectors.category1Selector);
	await page.click(productsSelectors.category1SubSelector1);
	await page.click(productsSelectors.category1SubSelector2);

	await page.waitFor(productsSelectors.productSelector1);
	await page.click(productsSelectors.productSelector1);

	await page.waitFor(productsSelectors.product1AddedMsg);
	let productAddedMsgText = await page.$eval(
		productsSelectors.product1AddedMsg,
		el => el.innerHTML
	);
	expect(productAddedMsgText).toEqual('Toode lisatud ostukorvi');

	await page.click(productsSelectors.category2Selector);
	await page.click(productsSelectors.category2SubSelector1);
	await page.click(productsSelectors.category2SubSelector2);

	await page.waitFor(productsSelectors.productSelector2);
	await page.click(productsSelectors.productSelector2);

	await page.waitFor(productsSelectors.product2AddedMsg);
	productAddedMsgText = await page.$eval(
		productsSelectors.product2AddedMsg,
		el => el.innerHTML
	);
	expect(productAddedMsgText).toEqual('Toode lisatud ostukorvi');
};

describe('while not logged in', () => {
	jest.setTimeout(120000);
	test('adding products to cart with category navigation', async () => {
		await testAddingCategoryProduct();
	});

	test('adding products to cart with search', async () => {
		await testAddingSearchProduct();
	});
});

describe('while logged in', () => {
	jest.setTimeout(120000);

	beforeEach(async () => {
		await page.click(loginSelectors.loginPageBtnSelector);
		await page.waitFor(loginSelectors.loginPageHeaderSelector);

		await page.click(loginSelectors.usernameSelector);
		await page.keyboard.type(credentials.username);

		await page.click(loginSelectors.passwordSelector);
		await page.keyboard.type(credentials.password);
		await page.waitFor(loginSelectors.submitSelector);
		await page.click(loginSelectors.submitSelector);

		await page.waitFor(loginSelectors.profileSelector);
	});

	test('adding products to cart with category navigation', async () => {
		await testAddingCategoryProduct();
	});

	test('adding products to cart with search', async () => {
		await testAddingSearchProduct();
	});
});
