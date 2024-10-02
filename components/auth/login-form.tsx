"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";

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
import { login } from "@/actions/login";

export const LoginForm = () => {

  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in With Different Account " : "";
  

  const [isPending, startTransition] = useTransition();
  const [errorMessage, setError] = useState<string | undefined>("");
  const [successMessage, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values)
        .then((data:any) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          //TODO: Addsuccess message when we add the 2FA 
          // if (data?.success) {
          //   form.reset();
          //   setSuccess(data.success);
          // }

        })
        .catch(() => {
          setError("Something went wrong");
        });
    });
  };
  
  return (
    <CardWrapper
      headerLabel="Welcome Back!"
      backButtonLabel="Dont have an Account ?"
      backbuttonHref="/auth/register"
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
          </div>
          <FormError message={errorMessage || urlError} />
          <FormSuccess message={successMessage} />

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
