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

describe('adding products to cart', () => {
	jest.setTimeout(30000);
	test('while not logged in', async () => {
		jest.setTimeout(20000);
		const expectedSum = `
        Summa:

                                24,54 €
                        `;
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

		setTimeout(async () => {
			const cartSumText = await page.$eval(
				productsSelectors.cartSumSelector,
				el => el.innerHTML
			);
			expect(cartSumText).toEqual(expectedSum);
		}, 1500);
	});
});
