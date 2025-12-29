#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const appDir = path.join(root, 'src', 'app');

function readFiles(dir, exts = ['.tsx', '.ts', '.jsx', '.js']) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...readFiles(abs, exts));
    } else if (exts.includes(path.extname(entry.name))) {
      files.push(abs);
    }
  }
  return files;
}

function extractHrefs(fileContent) {
  const hrefs = [];
  const regex = /href\s*=\s*{?\s*["']([^"'\n{}]+)["']\s*}?/gi;
  let m;
  while ((m = regex.exec(fileContent))) {
    hrefs.push(m[1]);
  }
  return hrefs;
}

function routeExists(href) {
  if (href === '/' || href === '') return true;
  // ignore external URLs and mailto/tel
  if (/^https?:\/\//.test(href) || /^mailto:/.test(href) || /^tel:/.test(href)) return true;
  if (href.startsWith('#')) return true; // fragment

  // Normalize (remove trailing slash)
  let normalized = href.replace(/\/?$/, '');
  if (normalized === '') normalized = '/';

  const parts = normalized.split('/').filter(Boolean);
  const candidateDir = path.join(appDir, ...parts);

  const pageFiles = ['page.tsx', 'page.ts', 'page.jsx', 'page.js'];

  for (const file of pageFiles) {
    if (fs.existsSync(path.join(candidateDir, file))) return true;
  }

  // If path points to root-level page (e.g., '/blog' -> src/app/blog/page.tsx)
  // Also allow files in public/ (e.g., /resume.pdf)
  const publicPath = path.join(root, 'public', normalized.replace(/^\//, ''));
  if (fs.existsSync(publicPath)) return true;

  return false;
}

function main() {
  const files = readFiles(path.join(root, 'src'));
  const broken = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const hrefs = extractHrefs(content);
    for (const href of hrefs) {
      if (href.startsWith('/')) {
        if (!routeExists(href)) {
          broken.push({ file: path.relative(root, file), href });
        }
      }
    }
  }

  if (broken.length) {
    console.error('\nFound broken internal links:');
    for (const b of broken) {
      console.error(` - ${b.file}: ${b.href}`);
    }
    console.error('\nFix the links or add corresponding pages under src/app to resolve.');
    process.exit(1);
  }

  console.log('All internal Link hrefs resolved to existing routes.');
}

main();
