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
	test('while not logged in', async () => {
		const expectedSum = `
        Summa:
    
                                5,94 €
                        `;
		await page.click(productsSelectors.categorySelector);
		await page.click(productsSelectors.subCategorySelector);
		await page.click(productsSelectors.subCategorySelector2);

		await page.waitFor(productsSelectors.productSelector1);
		await page.click(productsSelectors.productSelector1);

		setTimeout(async () => {
			const productAddedMsgTest = await page.$eval(
				productsSelectors.productAddedMsg,
				el => el.innerHTML
			);
			expect(productAddedMsgTest).toEqual('Toode lisatud ostukorvi');

			const cartSumText = await page.$eval(
				productsSelectors.cartSumSelector,
				el => el.innerHTML
			);
			expect(cartSumText).toEqual(expectedSum);
		}, 1500);
	});
});
