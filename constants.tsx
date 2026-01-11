
import React from 'react';
import { Tool } from './types';

// Lazy loading tools would be ideal, but for this demo we'll import them
// Tool components will be created in separate files

export const TOOLS_DATA: Partial<Tool>[] = [
  {
    id: 'qr-gen',
    name: 'QR Code Generator',
    slug: 'qr-code-generator',
    category: 'Utility',
    icon: 'fa-qrcode',
    description: 'Generate customizable QR codes for URLs, text, and more.',
    seoTitle: 'Free Online QR Code Generator | Toolly.online',
    seoDescription: 'Create high-quality QR codes instantly. Download as PNG or share.',
    keywords: ['qr code', 'generator', 'free', 'online']
  },
  {
    id: 'ai-img',
    name: 'AI Image Generator',
    slug: 'ai-image-generator',
    category: 'AI',
    icon: 'fa-wand-magic-sparkles',
    description: 'Transform text into stunning images using advanced AI.',
    seoTitle: 'AI Text-to-Image Generator | Toolly.online',
    seoDescription: 'Generate professional images from text prompts using Google Gemini AI.',
    keywords: ['ai image', 'text to image', 'stable diffusion', 'gemini']
  },
  {
    id: 'url-short',
    name: 'URL Shortener',
    slug: 'url-shortener',
    category: 'Utility',
    icon: 'fa-link',
    description: 'Shorten long URLs into manageable links.',
    seoTitle: 'Free URL Shortener | Toolly.online',
    seoDescription: 'Simple and fast URL shortening service.',
    keywords: ['url', 'shortener', 'link', 'tinyurl']
  },
  {
    id: 'json-format',
    name: 'JSON Formatter',
    slug: 'json-formatter',
    category: 'Developer',
    icon: 'fa-code',
    description: 'Beautify, validate, and minify JSON data.',
    seoTitle: 'Online JSON Formatter & Validator | Toolly.online',
    seoDescription: 'Clean up your JSON code with one click. Error detection included.',
    keywords: ['json', 'formatter', 'beautifier', 'validator']
  },
  {
    id: 'pw-gen',
    name: 'Password Generator',
    slug: 'password-generator',
    category: 'Utility',
    icon: 'fa-key',
    description: 'Create strong, secure, and customizable passwords.',
    seoTitle: 'Secure Password Generator | Toolly.online',
    seoDescription: 'Generate unhackable passwords with custom length and character sets.',
    keywords: ['password', 'security', 'generator', 'safe']
  },
  {
    id: 'img-comp',
    name: 'Image Compressor',
    slug: 'image-compressor',
    category: 'Media',
    icon: 'fa-file-image',
    description: 'Reduce image file size without losing quality.',
    seoTitle: 'Online Image Compressor | Optimize JPG & PNG',
    seoDescription: 'Fast, client-side image compression for web optimization.',
    keywords: ['image', 'compress', 'optimize', 'png', 'jpg']
  },
  {
    id: 'txt-speech',
    name: 'Text to Speech',
    slug: 'text-to-speech',
    category: 'AI',
    icon: 'fa-volume-high',
    description: 'Convert any text into natural-sounding audio.',
    seoTitle: 'Natural Text-to-Speech Converter | Toolly.online',
    seoDescription: 'Generate AI voiceovers from text using high-quality voices.',
    keywords: ['tts', 'text to speech', 'audio', 'voiceover']
  },
  {
    id: 'word-count',
    name: 'Word Counter',
    slug: 'word-counter',
    category: 'Text',
    icon: 'fa-list-ol',
    description: 'Count words, characters, and reading time of your text.',
    seoTitle: 'Free Word & Character Counter | Toolly.online',
    seoDescription: 'Detailed text analysis including word count, characters, and density.',
    keywords: ['word count', 'character count', 'analyzer', 'text']
  }
];

export const CATEGORIES = ['All', 'AI', 'Media', 'Developer', 'Utility', 'Text', 'Social'] as const;
