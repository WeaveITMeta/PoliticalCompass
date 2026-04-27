import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const pub = (p) => resolve(root, 'public', p);

async function svgToPng(svgPath, outPath, width, height) {
  const svg = await readFile(svgPath);
  const buf = await sharp(svg, { density: 384 })
    .resize(width, height, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(outPath, buf);
  console.log(`✓ ${outPath} (${width}×${height}, ${buf.length} bytes)`);
}

async function main() {
  const favicon = pub('favicon.svg');
  const og = pub('og-image.svg');

  await svgToPng(favicon, pub('favicon-32.png'), 32, 32);
  await svgToPng(favicon, pub('favicon-192.png'), 192, 192);
  await svgToPng(favicon, pub('favicon-512.png'), 512, 512);
  await svgToPng(favicon, pub('apple-touch-icon.png'), 180, 180);

  // OG image at full social-card resolution
  await svgToPng(og, pub('og-image.png'), 1200, 630);
}

main().catch(err => { console.error(err); process.exit(1); });
