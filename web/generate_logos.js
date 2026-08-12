
const sharp = require('./node_modules/sharp');
const fs = require('fs');

const srcPath = '/Users/mayukhbhattacharyya/.gemini/antigravity-ide/brain/d25b8027-ffe1-4287-8c1e-2904bb1fbe21/media__1786534282469.png';

async function generateAssets() {
  const image = sharp(srcPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

  // Create a copy buffer where white background pixels are made transparent
  const transparentBuffer = Buffer.from(data);
  for (let i = 0; i < transparentBuffer.length; i += 4) {
    const r = transparentBuffer[i];
    const g = transparentBuffer[i + 1];
    const b = transparentBuffer[i + 2];

    // Calculate lightness / distance from white
    const brightness = (r + g + b) / 3;
    if (brightness > 245) {
      // Fade to transparent near white
      const alpha = Math.max(0, Math.min(255, Math.round((255 - brightness) * 25.5)));
      transparentBuffer[i + 3] = alpha;
    }
  }

  const transparentImg = sharp(transparentBuffer, {
    raw: { width: info.width, height: info.height, channels: 4 }
  });

  // Target directories
  const dir1 = '/Users/mayukhbhattacharyya/Desktop/creatorne/public';
  const dir2 = '/Users/mayukhbhattacharyya/Desktop/Project/CreatorNE/web/public';

  // 1. Full logo (Icon + Text) cropped with padding
  const fullExtract = { left: 200, top: 210, width: 610, height: 495 };

  // 2. Icon symbol only (square crop)
  const symbolExtract = { left: 320, top: 205, width: 350, height: 350 };

  for (const dir of [dir1, dir2]) {
    if (!fs.existsSync(dir)) continue;

    console.log(`Generating in ${dir}...`);

    // Full logo PNG (with solid white background)
    await image.clone().extract(fullExtract).png().toFile(`${dir}/logo-full.png`);
    // Full logo PNG (transparent)
    await transparentImg.clone().extract(fullExtract).png().toFile(`${dir}/logo.png`);
    // Full logo SVG or webp reference if needed
    await transparentImg.clone().extract(fullExtract).png().toFile(`${dir}/logo.svg.png`);

    // Icon symbol PNG (transparent)
    await transparentImg.clone().extract(symbolExtract).resize(512, 512).png().toFile(`${dir}/icon-512.png`);
    await transparentImg.clone().extract(symbolExtract).resize(192, 192).png().toFile(`${dir}/icon-192.png`);
    await transparentImg.clone().extract(symbolExtract).resize(192, 192).jpeg({ quality: 95 }).toFile(`${dir}/logo-192.jpg`);
    await transparentImg.clone().extract(symbolExtract).resize(180, 180).png().toFile(`${dir}/apple-touch-icon.png`);
    await transparentImg.clone().extract(symbolExtract).resize(64, 64).png().toFile(`${dir}/favicon.png`);
    await transparentImg.clone().extract(symbolExtract).resize(64, 64).jpeg({ quality: 95 }).toFile(`${dir}/favicon.jpg`);
    await transparentImg.clone().extract(symbolExtract).resize(32, 32).png().toFile(`${dir}/favicon.ico`);

    // Icon-only logo
    await transparentImg.clone().extract(symbolExtract).resize(256, 256).png().toFile(`${dir}/logo-icon.png`);
    await transparentImg.clone().extract(symbolExtract).resize(256, 256).png().toFile(`${dir}/logo-symbol.png`);

    // Social / OG Image
    await image.clone().extract(fullExtract).resize(1200, 630, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } }).png().toFile(`${dir}/og-image.png`);
  }

  console.log('Successfully generated all logo & favicon assets!');
}

generateAssets().catch(err => console.error(err));
