import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

const DOC_FILES = {
  "privacy-policy": "privacy-policy.docx",
  "terms-and-conditions": "terms-and-conditions.docx",
} as const;

type DocName = keyof typeof DOC_FILES;

function isDocName(value: string): value is DocName {
  return value in DOC_FILES;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ doc: string }> }
) {
  const { doc } = await params;
  if (!isDocName(doc)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const filename = DOC_FILES[doc];
  const path = join(process.cwd(), "public", filename);
  try {
    const buffer = await readFile(path);
    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "public, max-age=3600",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }
}
