"use client";

import { useRef, useState } from "react";

export default function Home() {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [compression, setCompression] = useState(60);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const formatSize = (bytes) => {
    if (!bytes) return "0 KB";
    if (bytes < 1024 * 1024)
      return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  const estimatedSize = file
    ? file.size * (1 - compression / 100)
    : 0;

  async function handleCompress() {
    if (!file) {
      alert("Please upload a PDF");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("level", compression);

      const response = await fetch("/api/compress", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Compression failed");
      }

      const blob = await response.blob();

      setResult({
        blob,
        original: file.size,
        compressed: blob.size,
        saved: (
          ((file.size - blob.size) / file.size) * 100
        ).toFixed(1),
      });
    } catch (error) {
      alert("Compression failed");
      console.error(error);
    }

    setLoading(false);
  }

  function downloadFile() {
    if (!result) return;

    const url = URL.createObjectURL(result.blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = `compressed-${file.name}`;

    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-6">

      <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-center text-blue-600">
          Lumidoc
        </h1>

        <p className="text-center text-gray-700 mt-2 font-medium">
          PDF Compressor
        </p>


        {/* Upload */}

        <div className="mt-8 border-2 border-dashed border-blue-300 rounded-2xl p-8 text-center">

          <div className="text-5xl">📄</div>

          <h2 className="text-xl font-semibold mt-4">
            Upload your PDF
          </h2>


          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setResult(null);
            }}
          />


          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Choose PDF File
          </button>


          {file && (
            <div className="mt-5 text-sm text-gray-800 bg-gray-50 rounded-xl p-4">

              <p className="font-semibold text-gray-900">
                {file.name}
              </p>

              <p className="mt-1 font-medium">
                Original size: {formatSize(file.size)}
              </p>

            </div>
          )}

        </div>


        {/* Slider */}

        {file && (
          <>

            <div className="mt-8">

              <div className="flex justify-between text-sm text-gray-700 font-semibold">

                <span>Low</span>
                <span>High</span>

              </div>


              <input
                type="range"
                min="0"
                max="100"
                value={compression}
                onChange={(e) =>
                  setCompression(Number(e.target.value))
                }
                className="w-full mt-3 accent-blue-600"
              />


              <div className="text-center mt-3">

                <p className="text-blue-700 font-bold text-lg">
                  {compression}% Compression
                </p>


                <p className="text-gray-700 text-sm font-medium">
                  Estimated size: {formatSize(estimatedSize)}
                </p>

              </div>

            </div>


            <button
              onClick={handleCompress}
              disabled={loading}
              className="w-full mt-8 bg-blue-600 text-white py-4 rounded-2xl font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Compressing..." : "Compress PDF"}
            </button>

          </>
        )}



        {/* Result */}

        {result && (

          <div className="mt-8 bg-blue-100 border border-blue-300 rounded-2xl p-6">

            <h3 className="font-bold text-lg text-blue-700">
              Compression complete
            </h3>


            <div className="mt-4 space-y-2 text-sm text-gray-800">

              <p>
                Original: <b>{formatSize(result.original)}</b>
              </p>


              <p>
                Compressed: <b>{formatSize(result.compressed)}</b>
              </p>


              <p>
                Saved: <b>{result.saved}%</b>
              </p>

            </div>


            <button
              onClick={downloadFile}
              className="w-full mt-5 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700"
            >
              Download PDF
            </button>


          </div>

        )}

      </div>


      {/* Footer for AdSense trust pages */}

      <footer className="mt-8 text-center text-sm text-gray-600">

        <div className="flex justify-center gap-4 flex-wrap">

          <a href="/about" className="hover:text-blue-600">
            About
          </a>

          <a href="/privacy" className="hover:text-blue-600">
            Privacy Policy
          </a>

          <a href="/terms" className="hover:text-blue-600">
            Terms
          </a>

          <a href="/contact" className="hover:text-blue-600">
            Contact
          </a>

        </div>


        <p className="mt-2">
          © 2026 Lumidoc. All rights reserved.
        </p>

      </footer>


    </main>
  );
}