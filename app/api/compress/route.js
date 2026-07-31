import { NextResponse } from "next/server";
import { writeFile, readFile, unlink } from "fs/promises";
import { exec } from "child_process";
import path from "path";
import os from "os";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");
    const level = Number(formData.get("level") || 60);

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());

    const tempDir = os.tmpdir();

    const inputPath = path.join(tempDir, `input-${Date.now()}.pdf`);
    const outputPath = path.join(tempDir, `output-${Date.now()}.pdf`);

    await writeFile(inputPath, bytes);

    // Map slider to Ghostscript quality
    let quality = "/ebook";

    if (level <= 30) quality = "/printer";
    else if (level <= 70) quality = "/ebook";
    else quality = "/screen";

    // Server Ghostscript path (for deployment)
    const gsPath = "gs";

    const command = `${gsPath} -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=${quality} -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}"`;

    await new Promise((resolve, reject) => {
      exec(command, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    const compressed = await readFile(outputPath);

    // Cleanup
    await unlink(inputPath).catch(() => {});
    await unlink(outputPath).catch(() => {});

    return new NextResponse(compressed, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          `attachment; filename="compressed.pdf"`,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Compression failed" },
      { status: 500 }
    );
  }
}