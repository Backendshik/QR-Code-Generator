import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Settings2, Download, Image as ImageIcon, Link2, Type, PaintBucket, Maximize2, X } from 'lucide-react';

function App() {
  const [value, setValue] = useState('https://example.com');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [logoSrc, setLogoSrc] = useState('');
  const [logoSize, setLogoSize] = useState(20); // percentage of QR size
  const [logoExcavate, setLogoExcavate] = useState(true);
  
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;
    
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          setLogoSrc(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoSrc('');
  };

  const logoAbsoluteSize = Math.floor(size * (logoSize / 100));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Settings2 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              QR Forge
            </h1>
          </div>
          <button
            onClick={handleDownload}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm shadow-indigo-200"
          >
            <Download className="w-4 h-4" />
            Download PNG
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Section */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            
            {/* Content Input */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800">
                <Type className="w-5 h-5 text-indigo-500" />
                Content
              </h2>
              <div>
                <label htmlFor="qr-content" className="block text-sm font-medium text-slate-700 mb-2">
                  Text or URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Link2 className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    id="qr-content"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow bg-slate-50 focus:bg-white"
                    placeholder="Enter URL, text, or data..."
                  />
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Colors */}
              <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800">
                  <PaintBucket className="w-5 h-5 text-indigo-500" />
                  Colors
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Foreground Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="h-10 w-10 rounded cursor-pointer border-0 p-0 shadow-sm"
                      />
                      <input
                        type="text"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="flex-1 block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Background Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="h-10 w-10 rounded cursor-pointer border-0 p-0 shadow-sm"
                      />
                      <input
                        type="text"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="flex-1 block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Sizing */}
              <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800">
                  <Maximize2 className="w-5 h-5 text-indigo-500" />
                  Size & Quality
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-slate-700">QR Code Size</label>
                      <span className="text-sm text-slate-500">{size}x{size} px</span>
                    </div>
                    <input
                      type="range"
                      min="128"
                      max="1024"
                      step="32"
                      value={size}
                      onChange={(e) => setSize(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Logo Customization */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800">
                <ImageIcon className="w-5 h-5 text-indigo-500" />
                Logo Overlay
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Upload Logo Image
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex-1 flex justify-center w-full px-4 py-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-colors cursor-pointer group">
                      <div className="flex flex-col items-center">
                        <ImageIcon className="h-6 w-6 text-slate-400 group-hover:text-indigo-500 mb-2" />
                        <span className="text-sm text-slate-500 group-hover:text-indigo-600 font-medium">Click to upload</span>
                      </div>
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/svg+xml"
                        className="hidden"
                        onChange={handleLogoUpload}
                      />
                    </label>
                    
                    {logoSrc && (
                      <div className="relative w-20 h-20 rounded-xl border border-slate-200 p-2 flex items-center justify-center bg-slate-50">
                        <img src={logoSrc} alt="Logo preview" className="max-w-full max-h-full object-contain" />
                        <button
                          onClick={removeLogo}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-sm"
                          title="Remove logo"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-slate-500">Supported formats: PNG, JPG, SVG.</p>
                </div>

                {logoSrc && (
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-slate-700">Logo Size</label>
                        <span className="text-sm text-slate-500">{logoSize}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="40"
                        step="1"
                        value={logoSize}
                        onChange={(e) => setLogoSize(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                      <p className="mt-2 text-xs text-slate-500">Larger logos may make the QR code unreadable.</p>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="excavate"
                        type="checkbox"
                        checked={logoExcavate}
                        onChange={(e) => setLogoExcavate(e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                      />
                      <label htmlFor="excavate" className="ml-2 block text-sm text-slate-700">
                        Remove QR code modules behind the logo (Excavate)
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
              <h2 className="text-lg font-semibold mb-6 flex items-center justify-center gap-2 text-slate-800 border-b border-slate-100 pb-4">
                Preview
              </h2>
              
              <div className="flex flex-col items-center">
                <div 
                  className="bg-slate-100 rounded-2xl p-6 mb-6 flex items-center justify-center w-full aspect-square border border-slate-200 overflow-hidden"
                  style={{ backgroundColor: bgColor }}
                >
                  <div className="shadow-sm bg-white rounded-xl transition-all duration-300 hover:shadow-md overflow-hidden flex items-center justify-center">
                    <QRCodeCanvas
                      value={value || 'https://example.com'}
                      size={Math.min(size, 280)} // Cap preview size, but actual canvas will still download at requested size if we generated it separately. 
                      // Wait, if we use canvas.toDataURL, it grabs the preview canvas size.
                      // Let's make a hidden canvas for actual size download, or just render the actual size and scale it with CSS for preview.
                      // Using style width: 100% and height auto can scale it.
                      bgColor={bgColor}
                      fgColor={fgColor}
                      level={logoSrc ? 'H' : 'M'}
                      includeMargin={true}
                      imageSettings={logoSrc ? {
                        src: logoSrc,
                        height: Math.floor(Math.min(size, 280) * (logoSize / 100)),
                        width: Math.floor(Math.min(size, 280) * (logoSize / 100)),
                        excavate: logoExcavate,
                      } : undefined}
                      style={{ width: '100%', height: 'auto', maxWidth: '280px' }}
                    />
                  </div>
                </div>

                <div className="w-full space-y-3">
                  <button
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium shadow-sm shadow-indigo-200"
                  >
                    <Download className="w-5 h-5" />
                    Download PNG
                  </button>
                  <p className="text-center text-xs text-slate-500">
                    Downloads at {size}x{size} pixels
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </main>
      
      {/* Hidden container for full size download rendering */}
      <div className="hidden">
        <div ref={qrRef}>
          <QRCodeCanvas
            value={value || 'https://example.com'}
            size={size}
            bgColor={bgColor}
            fgColor={fgColor}
            level={logoSrc ? 'H' : 'M'}
            includeMargin={true}
            imageSettings={logoSrc ? {
              src: logoSrc,
              height: logoAbsoluteSize,
              width: logoAbsoluteSize,
              excavate: logoExcavate,
            } : undefined}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
