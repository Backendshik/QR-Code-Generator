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


1. Clone the repository
git clone https://github.com/your-username/QR-Code-Generator.git
2. Open the project folder
cd QR-Code-Generator
3. Install dependencies
npm install
4. Run the development server
npm run dev
5. Open the project in the browser

After running the command, Vite will show a local link such as:

http://localhost:5173/

Open that link in your browser.

How to Use
Enter a text or URL in the input field.
Choose the foreground color of the QR code.
Choose the background color.
Adjust the QR code size using the size slider.
Upload a logo image if needed.
Adjust the logo size.
Preview the QR code.
Click Download PNG to save the QR code.
