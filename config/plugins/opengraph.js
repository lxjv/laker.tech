const fs = require('fs');
const sharp = require('sharp');
const { AssetCache } = require('@11ty/eleventy-fetch');
const { createCanvas } = require('canvas');

module.exports = (async (eleventyConfig) => {
	eleventyConfig.on('eleventy.after', async ({ dir, results }) => {
		return results.map(async (result) => {
			if (result.outputPath.endsWith('/index.html')) {
				const folder = dir.output + result.url;
				await fs.promises.mkdir(folder, { recursive: true });

				// the og image
				const ogPath = folder + 'og.png';
				const ogAsset = new AssetCache(ogPath, '_cache');
				let ogBuffer;
				if (ogAsset.isCacheValid('100y')) {
					ogBuffer = await ogAsset.getCachedValue();
				} else {
					ogBuffer = await createImage({ w: 1200, h: 630, transparent: false });
					ogAsset.save(ogBuffer, 'buffer');
				}
				await fs.promises.writeFile(ogPath, ogBuffer);

				// the hero image
				const heroPath = folder + 'hero.png';
				const heroAsset = new AssetCache(heroPath, '_cache');
				let heroBuffer;
				if (heroAsset.isCacheValid('100y')) {
					heroBuffer = await heroAsset.getCachedValue();
				} else {
					heroBuffer = await createImage({ w: 2400, h: 800, transparent: true });
					heroAsset.save(heroBuffer, 'buffer');
				}
				await fs.promises.writeFile(heroPath, heroBuffer);

			}

		});
	});
});

async function createImage(image) {
	const canvas = createCanvas(image.w, image.h);
	const ctx = canvas.getContext('2d');
	// --- draw some stuff here ---
	const buffer = canvas.toBuffer('image/png');
	return sharp(buffer).png({ quality: 90, compressionLevel: 9 }).toBuffer();
}