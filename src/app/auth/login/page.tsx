'use client';

import { useForm } from 'react-hook-form';
import { Roboto_Slab } from "next/font/google";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const robotoSlab = Roboto_Slab({ weight: ['400'], subsets: ['latin'] });

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required')
});

const LoginForm = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    });

    if (signInData?.error) {
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className={`${robotoSlab.className} inline-flex flex-col justify-self-center`}>
      <h1 className="text-3xl text-white truncate">Login</h1>
      <div className="inline-flex flex-col text-xl">
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input 
              type="email"
              {...register('email')}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input
              type="password"
              {...register('password')}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:focus:ring-green-800">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
