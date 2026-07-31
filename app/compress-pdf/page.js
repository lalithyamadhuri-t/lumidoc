"use client";

import { useState } from "react";

export default function CompressPDF() {

  const [file, setFile] = useState(null);


  function handleUpload(event) {

    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    }

  }


  return (

    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">


      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-xl text-center">


        <h1 className="text-4xl font-bold">
          Compress PDF
        </h1>


        <p className="text-gray-500 mt-3">
          Upload your PDF and reduce the file size.
        </p>



        {/* Upload Area */}

        <div className="mt-8 border-2 border-dashed border-blue-500 rounded-2xl p-10">


          <div className="text-6xl">
            📄
          </div>


          <h2 className="text-xl font-semibold mt-4">
            Upload PDF File
          </h2>



          <input

            type="file"

            accept=".pdf"

            onChange={handleUpload}

            className="mt-6 mx-auto block"

          />



          {file && (

            <div className="mt-5 text-green-600">

              <p>
                File Selected:
              </p>

              <p className="font-semibold">
                {file.name}
              </p>


              <p>
                Size:
                {" "}
                {(file.size / 1024 / 1024).toFixed(2)}
                MB
              </p>


            </div>

          )}



        </div>





        <button

          className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl"

        >

          Compress PDF

        </button>



      </div>


    </main>

  );

}