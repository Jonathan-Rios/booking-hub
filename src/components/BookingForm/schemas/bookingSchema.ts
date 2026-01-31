import { z } from "zod";

export const bookingSchema = z
  .object({
    guestName: z.string().min(1, "Guest name is required"),
    email: z.email("Invalid email"),
    propertyName: z.string().min(1, "Property name is required"),
    startDate: z.date({ error: "Start date is required" }),
    endDate: z.date({ error: "End date is required" }),
    status: z.enum(["confirmed", "pending", "cancelled"]),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

export type TBookingSchema = z.infer<typeof bookingSchema>;
