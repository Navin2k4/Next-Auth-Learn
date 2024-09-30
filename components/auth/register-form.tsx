"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import { CardWrapper } from "@/components/auth/card-wrapper";

import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useState } from "react";
import axios from "axios";
import { useTransition } from "react";
import { register } from "@/actions/register";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();

  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name:""
    },
  });


/*  
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(()=>{
      register(values)
        .then((data)=>{
          setError(data.error);
          setSuccess(data.success);
        })
    })
  };
*/

const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Perform the Axios request outside `startTransition`
      const response = await axios.post('/api/auth/register', values);
      console.log('API Response:', response.data);

      // Wrap non-urgent state updates inside `startTransition`
      startTransition(() => {
        if (response.data.success) {
          setSuccessMessage("Login successful!");
        } else {
          setErrorMessage(response.data.message || "Login failed. Please try again.");
        }
      });
    } catch (error) {
      console.error('Error during login:', error);
      startTransition(() => {
        setErrorMessage("An error occurred. Please try again.");
      });
    }
  };
  
  
  return (
    <CardWrapper
      headerLabel="Create an Account!"
      backButtonLabel="Already have an Account ?"
      backbuttonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Navin@example.com"
                      disabled={isPending}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field}
                      disabled={isPending}
                      placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field}
                      disabled={isPending}
                      placeholder="Navin Kumaran" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={errorMessage} />
          <FormSuccess message={successMessage} />

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
