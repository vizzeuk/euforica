"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Heart,
  Briefcase,
  Cake,
  Sparkles,
  Users,
  ChevronRight,
  ChevronLeft,
  Check,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { leadFormSchema, type LeadFormData } from "@/lib/validations/lead-form";
import { submitLead } from "@/app/actions/submit-lead";

const eventTypes = [
  {
    value: "boda" as const,
    label: "Boda",
    icon: Heart,
    description: "Una celebración de amor inolvidable",
  },
  {
    value: "corporativo" as const,
    label: "Corporativo",
    icon: Briefcase,
    description: "Eventos empresariales de impacto",
  },
  {
    value: "cumpleanos" as const,
    label: "Cumpleaños",
    icon: Cake,
    description: "Celebraciones personalizadas",
  },
  {
    value: "otro" as const,
    label: "Otro Evento",
    icon: Sparkles,
    description: "Cualquier ocasión especial",
  },
];

export function LeadWizard() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      guestCount: 50,
    },
  });

  const selectedEventType = watch("eventType");
  const guestCount = watch("guestCount");

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const result = await submitLead(data);
      if (result.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(result.message || "Error al enviar el formulario");
      }
    } catch (error) {
      console.error("Error al enviar:", error);
      setErrorMessage("Error de conexión. Por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const canProceedToStep2 = selectedEventType !== undefined;
  const canProceedToStep3 = guestCount >= 10;

  return (
    <section id="contacto" className="bg-black px-6 pb-32 pt-24 md:pb-40 md:pt-32">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center text-white"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-400">
            Cotización Personalizada
          </p>
          <h2 className="font-serif text-5xl font-light tracking-tight md:text-6xl">
            Diseña tu
            <span className="block font-medium italic">Experiencia</span>
          </h2>
        </motion.div>

        {/* Progress Indicator */}
        <div className="mb-12 flex items-center justify-center gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                  step >= i
                    ? "border-white bg-white text-black"
                    : "border-neutral-700 text-neutral-700"
                }`}
              >
                {step > i ? <Check className="h-5 w-5" /> : i}
              </div>
              {i < 3 && (
                <div
                  className={`h-[2px] w-16 transition-all ${
                    step > i ? "bg-white" : "bg-neutral-800"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Steps */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            {/* Step 1: Event Type */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <h3 className="text-center text-2xl font-light text-white">
                  ¿Qué celebras?
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {eventTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = selectedEventType === type.value;

                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setValue("eventType", type.value)}
                        className={`group relative overflow-hidden rounded-lg border-2 p-8 text-left transition-all ${
                          isSelected
                            ? "border-white bg-white text-black"
                            : "border-neutral-800 text-white hover:border-neutral-600"
                        }`}
                      >
                        <Icon
                          className={`mb-4 h-8 w-8 transition-colors ${
                            isSelected ? "text-black" : "text-neutral-400"
                          }`}
                        />
                        <h4 className="mb-2 text-xl font-medium">
                          {type.label}
                        </h4>
                        <p
                          className={`text-sm ${
                            isSelected ? "text-neutral-600" : "text-neutral-400"
                          }`}
                        >
                          {type.description}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {errors.eventType && (
                  <p className="text-center text-sm text-red-400">
                    {errors.eventType.message}
                  </p>
                )}

                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!canProceedToStep2}
                    size="lg"
                    className="bg-white text-black hover:bg-neutral-100"
                  >
                    Continuar
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Guest Count */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center text-white">
                  <h3 className="mb-4 text-2xl font-light">
                    ¿Cuántos invitados?
                  </h3>
                  <div className="flex items-center justify-center gap-3">
                    <Users className="h-6 w-6 text-neutral-400" />
                    <span className="font-serif text-5xl font-light">
                      {guestCount === 250 ? "250+" : guestCount}
                    </span>
                    <span className="text-neutral-400">personas</span>
                  </div>
                </div>

                <div className="px-8">
                  <Slider
                    value={[guestCount]}
                    onValueChange={([value]) => setValue("guestCount", value)}
                    min={10}
                    max={250}
                    step={10}
                    className="w-full"
                  />
                  <div className="mt-4 flex justify-between text-xs text-neutral-500">
                    <span>10</span>
                    <span>250+</span>
                  </div>
                </div>

                {errors.guestCount && (
                  <p className="text-center text-sm text-red-400">
                    {errors.guestCount.message}
                  </p>
                )}

                <div className="flex justify-between">
                  <Button
                    type="button"
                    onClick={prevStep}
                    variant="outline"
                    size="lg"
                    className="border-neutral-700 bg-transparent text-white hover:bg-neutral-900"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Atrás
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!canProceedToStep3}
                    size="lg"
                    className="bg-white text-black hover:bg-neutral-100"
                  >
                    Continuar
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Contact Info */}
            {step === 3 && !isSuccess && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-center text-2xl font-light text-white">
                  Tus datos de contacto
                </h3>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-white">
                      Nombre completo
                    </Label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="Juan Pérez"
                      className="mt-2 bg-neutral-900 text-white border-neutral-800"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="juan@ejemplo.com"
                      className="mt-2 bg-neutral-900 text-white border-neutral-800"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-white">
                      Teléfono
                    </Label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      placeholder="+56 9 1234 5678"
                      className="mt-2 bg-neutral-900 text-white border-neutral-800"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white">
                      Cuéntanos tu visión <span className="text-neutral-500 text-xs">(opcional)</span>
                    </Label>
                    <textarea
                      id="message"
                      {...register("message")}
                      placeholder="Comparte cualquier detalle que nos ayude a entender mejor tu celebración ideal..."
                      rows={4}
                      className="mt-2 w-full rounded-md border border-neutral-800 bg-neutral-900 px-4 py-3 text-white placeholder:text-neutral-500 focus:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-700"
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                </div>

                {errorMessage && (
                  <div className="rounded-lg border border-red-900 bg-red-950/20 p-4 text-center">
                    <p className="text-sm text-red-400">{errorMessage}</p>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    onClick={prevStep}
                    variant="outline"
                    size="lg"
                    className="border-neutral-700 bg-transparent text-white hover:bg-neutral-900"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Atrás
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="bg-white text-black hover:bg-neutral-100"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Cotización
                        <Check className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Success State */}
            {isSuccess && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="py-16 text-center text-white"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white"
                >
                  <Check className="h-10 w-10 text-black" />
                </motion.div>

                <h3 className="mb-4 font-serif text-3xl font-light">
                  ¡Gracias por confiar en nosotros!
                </h3>
                <p className="text-neutral-400">
                  Nuestro equipo se pondrá en contacto contigo en las próximas 24
                  horas para diseñar juntos tu experiencia perfecta.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  );
}
