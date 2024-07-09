const { DateTime } = require("luxon");

const pluginRSS = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output");

const eleventyGenerateHeroes = require("./config/plugins/opengraph.js");

module.exports = function(eleventyConfig) {
	// passthrough
	eleventyConfig.addPassthroughCopy({ assets: "cdn" });
	eleventyConfig.addPassthroughCopy({
		"assets/text/.well-known": ".well-known",
	});
	eleventyConfig.addPassthroughCopy({
		"assets/text/keys/pgp/la@laker.gay.asc": ".well-known/pgp",
	});
	eleventyConfig.addPassthroughCopy({ "./assets/image/icons": "/" });
	eleventyConfig.addPassthroughCopy({
		"./assets/text/keys/pgp/": "/pgp/verified/",
	});
	eleventyConfig.addWatchTarget("./assets/style/*");

	// FILTER TIME
	// /dev/urandom
	eleventyConfig.addFilter("randomItem", (arr) => {
		arr.sort(() => {
			return 0.5 - Math.random();
		});
		return arr.slice(0, 1);
	});

	// STOP! you've violated the law
	eleventyConfig.addFilter("limit", function(arr, limit) {
		return arr.slice(0, limit);
	});

	eleventyConfig.addFilter("arrayRemove", function(array, remove) {
		const itemToRemove = remove;

		// Find the index of the item to remove
		const index = array.indexOf(itemToRemove);

		if (index !== -1) {
			// Remove the item using splice
			array.splice(index, 1);
		}

		return array;
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
	eleventyConfig.addPlugin(eleventyGenerateHeroes);
	eleventyConfig.addPlugin(syntaxHighlight, {
		init: function({ Prism }) { },
	});

	// markdown time
	let markdownIt = require("markdown-it");
	let markdownItFootnote = require("markdown-it-footnote");

	let options = {
		html: true, // Enable HTML tags in source
		breaks: true, // Convert '\n' in paragraphs into <br>
		linkify: true, // Autoconvert URL-like text to links
	};

	// configure the library with options
	let markdownLib = markdownIt(options)
		.use(markdownItFootnote)
		.use(require("markdown-it-github-alerts"));
	// set the library to process markdown files
	eleventyConfig.setLibrary("md", markdownLib);

	// DRAFTS
	eleventyConfig.addGlobalData("eleventyComputed.permalink", function() {
		return (data) => {
			// Always skip during non-watch/serve builds
			if (data.draft && !process.env.BUILD_DRAFTS) {
				return false;
			}

			return data.permalink;
		};
	});

	// When `eleventyExcludeFromCollections` is true, the file is not included in any collections
	eleventyConfig.addGlobalData(
		"eleventyComputed.eleventyExcludeFromCollections",
		function() {
			return (data) => {
				// Always exclude from non-watch/serve builds
				if (data.draft && !process.env.BUILD_DRAFTS) {
					return true;
				}

				return data.eleventyExcludeFromCollections;
			};
		},
	);

	eleventyConfig.on("eleventy.before", ({ runMode }) => {
		// Set the environment variable
		if (runMode === "serve" || runMode === "watch") {
			process.env.BUILD_DRAFTS = true;
		}
	});

	eleventyConfig.setQuietMode(true);
	eleventyConfig.addPlugin(directoryOutputPlugin);

	// dev server stuff wahey
	eleventyConfig.setServerOptions({
		port: 3333,
		showVersion: true,
	});

	return {
		dir: {
			// directories for stuff woo
			input: "src",
			output: "public",
			includes: "templates/components",
			layouts: "templates/layouts",
		},
	};
};