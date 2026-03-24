import { NextRequest, NextResponse } from "next/server";

const DEFAULT_BASE = "https://ientrance.fablims.com/api";

function getUpstreamBase(): string {
  return (process.env.IENTRANCE_API_URL || DEFAULT_BASE).replace(/\/$/, "");
}

async function proxy(request: NextRequest, params: Promise<{ path?: string[] }>) {
  const apiKey = process.env.IENTRANCE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Fablims API key is not configured (IENTRANCE_API_KEY)" },
      { status: 500 }
    );
  }

  const { path } = await params;
  const segments = path ?? [];
  const suffix = segments.length > 0 ? `/${segments.join("/")}` : "";
  const url = new URL(request.url);
  const targetUrl = `${getUpstreamBase()}${suffix}${url.search}`;

  const init: RequestInit = {
    method: request.method,
    headers: {
      "Content-Type": request.headers.get("content-type") || "application/json",
      Accept: request.headers.get("accept") || "application/json",
      "x-api-key": apiKey,
    },
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    const body = await request.arrayBuffer();
    if (body.byteLength > 0) {
      init.body = body;
    }
  }

  const upstream = await fetch(targetUrl, init);
  const responseBody = await upstream.arrayBuffer();
  const contentType =
    upstream.headers.get("content-type") || "application/json";

  return new NextResponse(responseBody, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: {
      "content-type": contentType,
    },
  });
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> }
) {
  return proxy(request, context.params);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> }
) {
  return proxy(request, context.params);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> }
) {
  return proxy(request, context.params);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> }
) {
  return proxy(request, context.params);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> }
) {
  return proxy(request, context.params);
}
