"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useRouter } from "next/navigation";

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
import { startTransition, useState } from "react";
import axios from "axios";
import { useTransition } from "react";
import { register } from "@/actions/register";
import { ScaleLoader } from "react-spinners";

export const RegisterForm = () => {
  const [isPending, setIsPending] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: ""
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsPending(true); // Start pending state here
  
    startTransition(() => {
      register(values)
        .then((data) => {
          if (data.error) {
            setErrorMessage(data.error);
          } else if (data.success) {
            setSuccessMessage(data.success);
          }
        })
        .catch((error) => {
          setErrorMessage("An unexpected error occurred.");
        })
        .finally(() => {
          setIsPending(false); 
        });
    });
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
          {/* Your form fields go here */}
          <Button type="submit" className="w-full">
            {isPending ? 
            <ScaleLoader  height={10}  color='white' loading={true} />
            : 
            "Register"
            }
            
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
