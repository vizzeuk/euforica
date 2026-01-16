"use server";

import type { LeadFormData } from "@/lib/validations/lead-form";

const N8N_WEBHOOK_URL = "https://euforica.app.n8n.cloud/webhook-test/c265c8ac-e6c0-4978-92dc-bf5da1532788";

export async function submitLead(data: LeadFormData) {
  try {
    // Enviar datos a n8n
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        source: "landing_page"
      }),
    });

    if (!response.ok) {
      throw new Error(`Error al enviar a n8n: ${response.status}`);
    }

    const result = await response.json();
    console.log("✅ Lead enviado a n8n:", result);

    return {
      success: true,
      message: "¡Gracias! Nos pondremos en contacto contigo pronto.",
    };
  } catch (error) {
    console.error("❌ Error enviando lead a n8n:", error);
    
    // Retornar error pero sin romper la UX
    return {
      success: false,
      message: "Hubo un problema al enviar tu información. Por favor intenta de nuevo.",
    };
  }
}
