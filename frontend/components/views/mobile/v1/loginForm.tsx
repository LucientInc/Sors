"use client";
import React, { Suspense } from 'react';
import Link from "next/link";
const LazyAuthForm = React.lazy(() => import('@/components/block/v1/login').then(module => ({ default: module.UserAuthForm })));

import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button';


import { Icons } from '@/components/ui/icons';

export default function MobileLoginPage() {
    return (
        <div className="w-dvw h-dvh max-h-dvh flex flex-col">
            {/* Banner Section */}
            <div className="banner w-full h-full relative p-6">
                <div className="object-cover h-full w-full absolute inset-0 bg-gray-800"></div>
                <div className="relative h-full flex flex-col justify-between">
                    {/* Logo */}
                    <div className='flex justify-between items-center'>
                        <div className="flex items-center text-lg font-medium gap-2">
                            <svg width="64" height="30" viewBox="0 0 64 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M47.8701 0H31.9134L15.9568 14.7391H31.9134L47.8701 0Z" fill="white" />
                                <path d="M47.8701 14.7383H31.9134L15.9568 29.4773H31.9134L47.8701 14.7383Z" fill="white" />
                                <path d="M0 14.7383H15.9566L31.9133 29.4773H15.9566L0 14.7383Z" fill="white" />
                                <path d="M31.9126 0H47.8692L63.8259 14.7391H47.8692L31.9126 0Z" fill="white" />
                            </svg>
                            <span className="text-white text-2xl">Sors</span>
                    </div>


                    <Button size="lg" className="text-white" asChild>
                        <Link href="/register">Cadastre-se</Link>
                    </Button>
                    </div>

                    {/* Slogan */}
                    <h1 className="text-2xl font-bold text-white">
                        Seu dinheiro, seu controle. Organize, planeje e cresça!
                    </h1>
                </div>
            </div>

            {/* Form Section */}
            <div className="form w-full h-full flex flex-col items-center justify-center p-4 pl-8 pr-8 gap-4">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Faça login na sua conta</h1>
                    <p className="text-sm text-muted-foreground">Digite seu e-mail e senha para entrar</p>
                </div>

                {/* Login Form */}
                <Suspense fallback={<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}>
                    <LazyAuthForm className="w-full" />
                </Suspense>

                <p className="px-8 text-center text-sm text-muted-foreground">
                    Ao continuar, você concorda com nossos{" "}
                    <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                        Termos de Serviço
                    </Link>{" "}
                    e{" "}
                    <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                        Política de Privacidade
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
}