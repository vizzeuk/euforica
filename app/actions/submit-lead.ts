"use server";

import type { LeadFormData } from "@/lib/validations/lead-form";

const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ??
  process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ??
  "http://51.222.12.68:5678/webhook/c265c8ac-e6c0-4978-92dc-bf5da1532788";

export async function submitLead(data: LeadFormData) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    if (!N8N_WEBHOOK_URL) {
      throw new Error("N8N_WEBHOOK_URL no configurada");
    }

    // Enviar datos a n8n
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      signal: controller.signal,
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        source: "landing_page",
      }),
    });

    const responseBody = await response.text();

    if (!response.ok) {
      throw new Error(
        `Error al enviar a n8n: ${response.status} ${response.statusText} - ${responseBody}`,
      );
    }

    let parsedResult: unknown = responseBody;
    try {
      parsedResult = responseBody ? JSON.parse(responseBody) : null;
    } catch {
      // Algunos webhooks responden texto plano; no debe romper el flujo.
    }

    console.log("Lead enviado a n8n", {
      status: response.status,
      result: parsedResult,
    });

    return {
      success: true,
      message: "¡Gracias! Nos pondremos en contacto contigo pronto.",
    };
  } catch (error) {
    console.error("Error enviando lead a n8n:", error);

    // Retornar error pero sin romper la UX
    return {
      success: false,
      message: "Hubo un problema al enviar tu información. Por favor intenta de nuevo.",
    };
  } finally {
    clearTimeout(timeout);
  }
}
