module.exports = {
	loginPageBtnSelector: `body > header > div > 
        div.HEADER-main.row.justify-content-between.align-items-center > 
        div.HEADER-actions.col-auto > ul > li:nth-child(1) > a`,
	loginPageHeaderSelector:
		'body > div.container-fluid > div > div.col-12.col-lg > h1',
	usernameSelector: '#login-email',
	passwordSelector: '#login-password',
	submitSelector:
		'body > div.container-fluid > div > div.col-12.col-lg > div > div > div.col-12.col-lg-5.order-lg-1 > form > button',
	profileSelector: '.HEADER-action-user-info > a > strong',
	errorSelector:
		'#errorsModal > div > div > div.modal-body > div > div > div > p',
	logoutSelector: '.HEADER-action > .HEADER-action-icon',
	loginPageBtnTextSelector: `body > header > div > 
		div.HEADER-main.row.justify-content-between.align-items-center > 
		div.HEADER-actions.col-auto > ul > li:nth-child(1) > div > a:nth-child(1) > strong`
};
