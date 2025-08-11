#!/usr/bin/env node

/**
 * Figma Design Tokens to CSS Converter for B2B E-commerce
 * Converts Figma Design Tokens plugin export to CSS custom properties
 */

import fs from 'fs';
import path from 'path';

// Configure paths for your B2B e-commerce project
const EXPORT_FILE = './figma-variables-export.json';
const CSS_FILE = '../../src/app/(frontend)/[locale]/globals.css'; // Your actual globals.css location

console.log('🔧 Converting Figma design tokens to CSS for B2B E-commerce...');

try {
  const exportData = JSON.parse(fs.readFileSync(EXPORT_FILE, 'utf8'));
  
  let css = `/*
 * Design Tokens - Auto-generated from Figma
 * This file contains all design tokens for the B2B e-commerce platform
 */

`;

  // Process color primitives
  if (exportData['color primitives']) {
    css += `/* ===== COLOR PRIMITIVES ===== */\n:root {\n`;
    css += processColorCollection(exportData['color primitives']);
    css += `}\n\n`;
  }

  // Process semantic colors  
  if (exportData.color) {
    css += `/* ===== SEMANTIC COLORS ===== */\n:root {\n`;
    css += processColorCollection(exportData.color);
    css += `}\n\n`;
  }

  // Process size tokens
  if (exportData.size) {
    css += `/* ===== SIZE TOKENS ===== */\n:root {\n`;
    css += processSizeCollection(exportData.size);
    css += `}\n\n`;
  }

  // Process typography tokens
  if (exportData.font) {
    css += `/* ===== TYPOGRAPHY ===== */\n:root {\n`;
    css += processFontCollection(exportData.font);
    css += `}\n\n`;
  }

  // Process effects (shadows, etc.)
  if (exportData.effect) {
    css += `/* ===== EFFECTS ===== */\n:root {\n`;
    css += processEffectCollection(exportData.effect);
    css += `}\n\n`;
  }

  // Add utility classes for common e-commerce patterns
  css += generateUtilityClasses();

  // Write the final CSS
  fs.writeFileSync(CSS_FILE, css);
  console.log('✅ Generated design tokens CSS!');
  console.log(`📁 File location: ${CSS_FILE}`);
  console.log('🎨 Ready to use in your B2B e-commerce components!');

} catch (error) {
  console.error('❌ Error:', error.message);
  if (error.code === 'ENOENT') {
    console.log('💡 Make sure you have exported your Figma variables as "figma-variables-export.json"');
  }
}

function processColorCollection(collection) {
  let result = '';
  function traverse(obj, path = []) {
    for (const [key, value] of Object.entries(obj)) {
      if (value && typeof value === 'object') {
        if (value.type === 'color' && value.value) {
          // Use b2b-specific naming for e-commerce context
          const cssVar = `--b2b-color-${path.concat(key).join('-').replace(/\s+/g, '_')}`;
          let colorValue = value.value;
          
          // Clean up color values
          if (colorValue.endsWith('ff')) {
            colorValue = colorValue.slice(0, -2);
          }
          
          // Handle token references
          if (colorValue.startsWith('{') && colorValue.endsWith('}')) {
            const ref = colorValue.slice(1, -1).replace(/\./g, '-').replace(/\s+/g, '_');
            colorValue = `var(--b2b-color-${ref})`;
          }
          
          result += `  ${cssVar}: ${colorValue};\n`;
        } else {
          traverse(value, path.concat(key));
        }
      }
    }
  }
  traverse(collection);
  return result;
}

function processSizeCollection(collection) {
  let result = '';
  function traverse(obj, path = []) {
    for (const [key, value] of Object.entries(obj)) {
      if (value && typeof value === 'object') {
        if ((value.type === 'dimension' || value.type === 'number') && value.value !== undefined) {
          const cssVar = `--b2b-size-${path.concat(key).join('-').replace(/\s+/g, '_')}`;
          let sizeValue = value.value;
          
          // Convert to rem (divide by 16) for scalability
          if (typeof sizeValue === 'number') {
            sizeValue = `${sizeValue / 16}rem`;
          }
          
          result += `  ${cssVar}: ${sizeValue};\n`;
        } else {
          traverse(value, path.concat(key));
        }
      }
    }
  }
  traverse(collection);
  return result;
}

function processFontCollection(collection) {
  let result = '';
  for (const [key, value] of Object.entries(collection)) {
    if (value && value.type === 'custom-fontStyle' && value.value) {
      const fontData = value.value;
      const cssVar = `--b2b-font-${key.replace(/\s+/g, '-')}`;
      
      // Create CSS font shorthand
      const fontStyle = fontData.fontStyle || 'normal';
      const fontWeight = fontData.fontWeight || 400;
      const fontSize = fontData.fontSize ? `${fontData.fontSize}px` : '1rem';
      const lineHeight = fontData.lineHeight ? `${fontData.lineHeight}px` : 'normal';
      const fontFamily = `"${fontData.fontFamily || 'system-ui'}"`;
      
      const fontShorthand = `${fontStyle} ${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`;
      result += `  ${cssVar}: ${fontShorthand};\n`;
    }
  }
  return result;
}

function processEffectCollection(collection) {
  let result = '';
  function traverse(obj, path = []) {
    for (const [key, value] of Object.entries(obj)) {
      if (value && typeof value === 'object') {
        if (value.type === 'custom-shadow' && value.value) {
          const cssVar = `--b2b-shadow-${path.concat(key).join('-').replace(/\s+/g, '_')}`;
          const shadow = value.value;
          
          // Create CSS box-shadow value
          const x = shadow.offsetX || 0;
          const y = shadow.offsetY || 0;
          const blur = shadow.radius || 0;
          const spread = shadow.spread || 0;
          const color = shadow.color || '#000000';
          const type = shadow.shadowType === 'innerShadow' ? 'inset ' : '';
          
          const shadowValue = `${type}${x}px ${y}px ${blur}px ${spread}px ${color}`;
          result += `  ${cssVar}: ${shadowValue};\n`;
        } else {
          traverse(value, path.concat(key));
        }
      }
    }
  }
  traverse(collection);
  return result;
}

function generateUtilityClasses() {
  return `/* ===== B2B E-COMMERCE UTILITY CLASSES ===== */

/* Product Card Styles */
.product-card {
  background: var(--b2b-color-background-default-default, #ffffff);
  border: 1px solid var(--b2b-color-border-default-default, #e5e5e5);
  border-radius: var(--b2b-size-radius-200, 0.5rem);
  padding: var(--b2b-size-space-400, 1rem);
  box-shadow: var(--b2b-shadow-100, 0 1px 3px rgba(0, 0, 0, 0.1));
}

/* Button Variants */
.btn-primary {
  background: var(--b2b-color-background-brand-default, #0066cc);
  color: var(--b2b-color-text-brand-on_brand, #ffffff);
  font: var(--b2b-font-body-strong, 600 1rem/1.5 system-ui);
  padding: var(--b2b-size-space-300, 0.75rem) var(--b2b-size-space-600, 1.5rem);
  border-radius: var(--b2b-size-radius-200, 0.5rem);
  border: none;
  cursor: pointer;
}

.btn-secondary {
  background: var(--b2b-color-background-default-secondary, #f5f5f5);
  color: var(--b2b-color-text-default-default, #333333);
  font: var(--b2b-font-body-base, 400 1rem/1.5 system-ui);
  padding: var(--b2b-size-space-300, 0.75rem) var(--b2b-size-space-600, 1.5rem);
  border: 1px solid var(--b2b-color-border-default-default, #e5e5e5);
  border-radius: var(--b2b-size-radius-200, 0.5rem);
  cursor: pointer;
}

/* Typography Helpers */
.text-heading {
  font: var(--b2b-font-heading, 600 1.5rem/1.3 system-ui);
  color: var(--b2b-color-text-default-default, #333333);
}

.text-body {
  font: var(--b2b-font-body-base, 400 1rem/1.5 system-ui);
  color: var(--b2b-color-text-default-default, #333333);
}

.text-small {
  font: var(--b2b-font-body-small, 400 0.875rem/1.4 system-ui);
  color: var(--b2b-color-text-default-secondary, #666666);
}

/* Layout Helpers */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--b2b-size-space-400, 1rem);
}

.grid-products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--b2b-size-space-600, 1.5rem);
}

/* Status Indicators */
.status-success {
  background: var(--b2b-color-background-positive-tertiary, #f0f9f0);
  color: var(--b2b-color-text-positive-default, #2d7d2d);
  border: 1px solid var(--b2b-color-border-positive-default, #4caf50);
}

.status-warning {
  background: var(--b2b-color-background-warning-tertiary, #fff8e1);
  color: var(--b2b-color-text-warning-default, #f57c00);
  border: 1px solid var(--b2b-color-border-warning-default, #ff9800);
}

.status-error {
  background: var(--b2b-color-background-danger-tertiary, #fef2f2);
  color: var(--b2b-color-text-danger-default, #dc2626);
  border: 1px solid var(--b2b-color-border-danger-default, #ef4444);
}

`;
}
