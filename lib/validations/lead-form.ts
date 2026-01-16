import { z } from "zod";

export const leadFormSchema = z.object({
  eventType: z.enum(["boda", "corporativo", "cumpleanos", "otro"], {
    required_error: "Por favor selecciona el tipo de evento",
  }),
  guestCount: z.number().min(10, "Mínimo 10 invitados").max(1000, "Máximo 1000 invitados"),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Por favor ingresa un email válido"),
  phone: z.string().min(9, "Por favor ingresa un teléfono válido"),
  eventDate: z.string().optional(),
  budget: z.enum(["basico", "premium", "luxury"], {
    required_error: "Por favor selecciona un rango de presupuesto",
  }).optional(),
  message: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
