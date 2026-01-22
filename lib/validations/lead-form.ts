import { z } from "zod";

export const leadFormSchema = z.object({
  eventType: z.enum(["boda", "corporativo", "cumpleanos", "otro"], {
    required_error: "Por favor selecciona el tipo de evento",
  }),
  guestCount: z.number().min(10, "Mínimo 10 invitados").max(250, "Máximo 250 invitados"),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string()
    .min(1, "El email es requerido")
    .refine((email) => {
      // Validar formato básico: debe contener @ y al menos un . después del @
      const atIndex = email.indexOf('@');
      const lastDotIndex = email.lastIndexOf('.');
      return atIndex > 0 && lastDotIndex > atIndex && lastDotIndex < email.length - 1;
    }, {
      message: "Por favor ingresa un email válido (ejemplo@dominio.com)",
    }),
  phone: z.string()
    .min(9, "Por favor ingresa un teléfono válido")
    .regex(/^\+?[0-9]{9,15}$/, "Formato de teléfono inválido. Ejemplo: +56912345678"),
  message: z.string().max(500, "El mensaje no puede exceder 500 caracteres").optional(),
  eventDate: z.string().optional(),
  budget: z.enum(["basico", "premium", "luxury"], {
    required_error: "Por favor selecciona un rango de presupuesto",
  }).optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
