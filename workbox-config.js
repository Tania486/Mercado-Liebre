module.exports = {
	globDirectory: 'PWA/',
	globPatterns: [
		'**/*.{css,ico,jpg,jpeg,png,html,js,json}'
	],
	swDest: 'PWA/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};