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
	page.on('dialog', dialog => {
		dialog.accept();
	});

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

const validateBasketData = async sum => {
	await page.goto('https://www.officeday.ee/index.php?cl=basket');
	await page.waitFor(productsSelectors.basketSumSelector);

	const basketSum = await page.$eval(
		productsSelectors.basketSumSelector,
		el => el.innerHTML
	);
	expect(basketSum).toEqual(sum);
};

const removeAllProducts = async () => {
	await page.goto('https://www.officeday.ee/index.php?cl=basket');
	await page.waitFor(productsSelectors.basketSumSelector);

	await page.waitFor(productsSelectors.cleanBasketSelector);
	await page.click(productsSelectors.cleanBasketSelector);

	await page.waitFor(productsSelectors.basketIsEmptySelector);
	const basketIsEmptyText = await page.$eval(
		productsSelectors.basketIsEmptySelector,
		el => el.innerHTML
	);
	expect(basketIsEmptyText).toEqual('Ostukorv on tühi');
};

describe('while not logged in', () => {
	jest.setTimeout(320000);
	test('adding products to cart with category navigation', async () => {
		await testAddingCategoryProduct();
		await validateBasketData('24,54&nbsp;€');
	});

	test('adding products to cart with search', async () => {
		await testAddingSearchProduct();
	});
});

describe('while logged in', () => {
	jest.setTimeout(220000);

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
		await removeAllProducts();
	});

	test('adding products to cart with search', async () => {
		await testAddingSearchProduct();
		await removeAllProducts();
	});
});
