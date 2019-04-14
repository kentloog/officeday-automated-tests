module.exports = {
	categorySelector: '#MENU > div > ul > li:nth-child(3) > a',
	subCategorySelector:
		'#MENU > div > ul > li:nth-child(3) > div > ul > li:nth-child(7) > a',
	subCategorySelector2:
		'#MENU > div > ul > li:nth-child(3) > div > ul > li:nth-child(7) > div > ul > li:nth-child(1) > a',
	productSelector1: `#form_285f2a954ab3dd2b0d58bce0d70e280e > div > div > div.grid-buttons-extended > div.row.pt-0 > 
        div.col-12.col-lg-12.col-xl-5.pt-xl-2.pt-lg-5.p-xl-0.pt-1.grid-variants-select-button.grid-variants-select-button-c > a`,
	productAddedMsg: `#form_285f2a954ab3dd2b0d58bce0d70e280e > div > a > 
        div.card-img-top.product-background-image.grid-icons-parent.in-basket-border > 
        div.added-to-basket-message.text-center > h6`,
	cartSumSelector: `body > header > div > div.HEADER-main.row.justify-content-between.align-items-center > 
        div.HEADER-actions.col-auto > ul > li.HEADER-action.mini-basket-container > div > div > a > div.HEADER-action-txt > span`
};
