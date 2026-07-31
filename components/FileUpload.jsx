"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function FileUpload() {

  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const router = useRouter();


  function handleFile(selectedFile) {

    if (!selectedFile) return;


    if (selectedFile.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }


    setFile(selectedFile);

  }



  function handleDrop(e) {

    e.preventDefault();

    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];

    handleFile(droppedFile);

  }



  return (

    <div

      onDragOver={(e)=>{
        e.preventDefault();
        setDragActive(true);
      }}

      onDragLeave={()=>{
        setDragActive(false);
      }}

      onDrop={handleDrop}


      className={`mt-12 max-w-2xl mx-auto bg-white rounded-3xl p-12 shadow-lg border-2 border-dashed transition ${
        dragActive
        ? "border-blue-600 bg-blue-50"
        : "border-blue-300"
      }`}

    >


      {!file ? (

        <>

          <div className="text-6xl">
            📄
          </div>


          <h3 className="mt-5 text-2xl font-semibold">
            Drop your PDF here
          </h3>


          <p className="mt-2 text-slate-500">
            or select a file from your device
          </p>



          <label className="inline-block mt-8 bg-blue-600 text-white px-10 py-4 rounded-2xl cursor-pointer hover:bg-blue-700">

            Select File


            <input

              type="file"

              accept="application/pdf"

              hidden

              onChange={(e)=>
                handleFile(e.target.files[0])
              }

            />

          </label>



          <p className="mt-4 text-sm text-slate-400">
            PDF only • Secure processing
          </p>


        </>


      ) : (


        <>

          <div className="text-5xl">
            ✅
          </div>



          <h3 className="mt-5 text-xl font-bold">
            {file.name}
          </h3>



          <p className="text-slate-500 mt-2">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>



          <h4 className="mt-8 font-semibold text-lg">
            Choose an action
          </h4>



          <div className="grid gap-3 mt-5">


            <button

              onClick={()=>
                router.push("/compress-pdf")
              }

              className="bg-blue-600 text-white py-3 rounded-xl"

            >
              Compress PDF
            </button>



            <button

              onClick={()=>
                router.push("/pdf-to-jpg")
              }

              className="bg-slate-100 py-3 rounded-xl"

            >
              Convert to JPG
            </button>



            <button

              onClick={()=>
                router.push("/pdf-editor")
              }

              className="bg-slate-100 py-3 rounded-xl"

            >
              Edit PDF
            </button>


          </div>




          <button

            onClick={()=>
              setFile(null)
            }

            className="mt-6 text-red-500"

          >

            Remove File

          </button>


        </>

      )}



    </div>

  );
}