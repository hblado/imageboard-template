"use client";

import { useForm } from "react-hook-form";
import { Roboto_Slab } from "next/font/google";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import style from "./login.module.css";

const robotoSlab = Roboto_Slab({ weight: ["400"], subsets: ["latin"] });

const FormSchema = z.object({
  name: z.string().min(1, "A name is required"),
  password: z.string().min(1, "Password is required"),
});

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn("credentials", {
      name: values.name,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div
      className={`${robotoSlab.className} inline-flex flex-col justify-self-center`}
    >
      <h1 className={style.title}>Login</h1>
      <form
        className={style.formSection}
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
      >
        <div className={style.formComponent}>
          <label className={style.formLabel}>Name</label>
          <input
            type="text"
            {...register("name")}
            className={style.formInput}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className={style.formComponent}>
          <label className={style.formLabel}>Password</label>
          <input
            type="password"
            {...register("password")}
            className={style.formInput}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className={style.confirmButton}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
