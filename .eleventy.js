// eleventy's config file
const { DateTime } = require("luxon");

const pluginRSS = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
	// passthrough
	eleventyConfig.addPassthroughCopy("assets/**/*");
	eleventyConfig.addPassthroughCopy({"assets/text/.well-known": ".well-known"});

	// FILTER TIME
	// /dev/urandom
	eleventyConfig.addFilter("randomItem", (arr) => {
		arr.sort(() => {
			return 0.5 - Math.random();
		});
		return arr.slice(0, 1);
	});

	// STOP! you've violated the law
	eleventyConfig.addFilter("limit", function (arr, limit) {
		return arr.slice(0, limit);
	});

	// Oct 16, 2005
	eleventyConfig.addFilter("datePretty", (dateObj) => {
		return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
	});

	// 2005-01-16T18:32:54.234+00:00
	eleventyConfig.addFilter("dateISO", (dateObj) => {
		return DateTime.fromJSDate(dateObj).toISO(dateObj);
	});

	// plugins
	eleventyConfig.addPlugin(pluginRSS);
	eleventyConfig.addPlugin(syntaxHighlight);

	// dev server stuff wahey
	eleventyConfig.setServerOptions({
		port: 3333,
		showVersion: true,
	});

	return {
		dir: { // directories for stuff woo
			input: 'src',
			output: 'public',
			includes: 'templates/components',
			layouts: 'templates/layouts'
		}
	};
}