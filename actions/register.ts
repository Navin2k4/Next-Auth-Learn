// Using server actions we can also use the api routing

"use server";
import * as z from 'zod'
import { RegisterSchema } from '@/schemas';
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if(!validatedFields){
    return {error:"Invalid Fields"}
  }
  return {success :"Registered Success"}
};
