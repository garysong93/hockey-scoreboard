#!/usr/bin/env node
/**
 * Post-build script to generate HTML files with proper SEO meta tags for each route.
 * This ensures search engines see the correct meta tags for each page.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');

// Route-specific meta data
const routes = {
  '/tutorial': {
    title: 'How to Use Hockey Scoreboard Online - Tutorial & Guide',
    description: 'Learn how to use our free online hockey scoreboard. Step-by-step guide for scoring, timer management, penalty tracking, power play indicators, and live sharing features.',
    canonical: 'https://www.hockeyscoreboardonline.com/tutorial',
  },
  '/rules': {
    title: 'Hockey Rules Guide - Ice Hockey Regulations & Penalties Explained',
    description: 'Complete guide to ice hockey rules: game structure, scoring, penalties (minor, major, misconduct), power plays, overtime, and shootouts. Perfect for players and fans.',
    canonical: 'https://www.hockeyscoreboardonline.com/rules',
  },
  '/faq': {
    title: 'FAQ - Hockey Scoreboard Online | Common Questions Answered',
    description: 'Find answers to frequently asked questions about Hockey Scoreboard Online. Learn about features, usage, sharing, streaming, privacy, and technical support.',
    canonical: 'https://www.hockeyscoreboardonline.com/faq',
  },
};

// Read the base index.html
const indexHtml = readFileSync(join(distDir, 'index.html'), 'utf-8');

// Generate HTML for each route
for (const [route, meta] of Object.entries(routes)) {
  const routeDir = join(distDir, route.slice(1)); // Remove leading slash

  // Create directory if it doesn't exist
  if (!existsSync(routeDir)) {
    mkdirSync(routeDir, { recursive: true });
  }

  // Replace meta tags
  let html = indexHtml
    .replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${meta.description}"`
    )
    .replace(
      /<link rel="canonical" href="[^"]*"/,
      `<link rel="canonical" href="${meta.canonical}"`
    )
    .replace(
      /<meta property="og:url" content="[^"]*"/,
      `<meta property="og:url" content="${meta.canonical}"`
    )
    .replace(
      /<meta property="og:title" content="[^"]*"/,
      `<meta property="og:title" content="${meta.title}"`
    )
    .replace(
      /<meta property="og:description" content="[^"]*"/,
      `<meta property="og:description" content="${meta.description}"`
    )
    .replace(
      /<meta name="twitter:url" content="[^"]*"/,
      `<meta name="twitter:url" content="${meta.canonical}"`
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*"/,
      `<meta name="twitter:title" content="${meta.title}"`
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*"/,
      `<meta name="twitter:description" content="${meta.description}"`
    );

  // Write the HTML file
  writeFileSync(join(routeDir, 'index.html'), html);
  console.log(`Generated: ${route}/index.html`);
}

console.log('Done! All route HTML files generated.');
