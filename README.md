# QR Forge - Customizable QR Code Generator

QR Forge is a customizable QR code generator web application built with React, Vite, TypeScript, and Tailwind CSS. It allows users to create QR codes from text or URLs, customize the QR code colors, adjust the size, upload a logo, and download the final QR code as a PNG image.

## Features

- Generate QR codes from text or URLs
- Customize foreground color
- Customize background color
- Adjust QR code size from 128px to 1024px
- Upload a logo image to place in the center of the QR code
- Change logo size
- Remove QR code modules behind the logo using the excavate option
- Live QR code preview
- Download QR code as a PNG image
- Clean and responsive user interface

## Technologies Used

- React
- Vite
- TypeScript
- Tailwind CSS
- qrcode.react
- Lucide React Icons

## Project Structure

```text
customizable-qr-code-generator/
│
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
│
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    │
    └── utils/
        └── cn.ts
