module.exports = {
	category1Selector: '#MENU > div > ul > li:nth-child(3) > a',
	category1SubSelector1:
		'#MENU > div > ul > li:nth-child(3) > div > ul > li:nth-child(7) > a',
	category1SubSelector2:
		'#MENU > div > ul > li:nth-child(3) > div > ul > li:nth-child(7) > div > ul > li:nth-child(1) > a',

	category2Selector: '#MENU > div > ul > li:nth-child(4) > a',
	category2SubSelector1:
		'#MENU > div > ul > li:nth-child(4) > div > ul > li:nth-child(1) > a',
	category2SubSelector2:
		'#MENU > div > ul > li:nth-child(4) > div > ul > li:nth-child(1) > div > ul > li:nth-child(1) > a',

	productSelector1: `#form_285f2a954ab3dd2b0d58bce0d70e280e > div > div > div.grid-buttons-extended > div.row.pt-0 > 
        div.col-12.col-lg-12.col-xl-5.pt-xl-2.pt-lg-5.p-xl-0.pt-1.grid-variants-select-button.grid-variants-select-button-c > a`,
	productSelector2: `#form_284017d78ec3868a75ed9108c8d2a3b8 > div > div > div.grid-buttons-extended > div.row.pt-0 > 
        div.col-12.col-lg-12.col-xl-5.pt-xl-2.pt-lg-5.p-xl-0.pt-1.grid-variants-select-button.grid-variants-select-button-c > a`,
	product1AddedMsg: `#form_285f2a954ab3dd2b0d58bce0d70e280e > div > a > 
        div.card-img-top.product-background-image.grid-icons-parent.in-basket-border > 
        div.added-to-basket-message.text-center > h6`,
	product2AddedMsg: `#form_284017d78ec3868a75ed9108c8d2a3b8 > div > a > 
        div.card-img-top.product-background-image.grid-icons-parent.in-basket-border > 
        div.added-to-basket-message.text-center > h6`,
	cartSumSelector: `body > header > div > div.HEADER-main.row.justify-content-between.align-items-center > 
        div.HEADER-actions.col-auto > ul > li.HEADER-action.mini-basket-container > div > div > a > div.HEADER-action-txt > span`,
	searchBoxInputSelector: '#product-autocomplete',
	searchProductSelector: `#form_284017d78ec3868a75ed9108c8d2a3b8 > div > div > div.grid-buttons-extended > 
        div.row.pt-0 > div.col-12.col-lg-12.col-xl-5.pt-xl-2.pt-lg-5.p-xl-0.pt-1.grid-variants-select-button.grid-variants-select-button-c > a`,
	searchProductAddedMsgSelector: `#form_284017d78ec3868a75ed9108c8d2a3b8 > div > a > 
        div.card-img-top.product-background-image.grid-icons-parent.in-basket-border > 
	div.added-to-basket-message.text-center > h6`,
	cleanBasketSelector:
		'#deleteAll > div.col-12.col-lg-5.pt-3 > div > div:nth-child(2) > a',
	basketSumSelector: `#cartContent > div > div.row.justify-content-end > div > table > tbody > tr:nth-child(5) > td:nth-child(2)`,
	basketIsEmptySelector: `#cartHeader > div.whiteBoxInner > div.whiteBoxInner2.clearme.form > div`
};
