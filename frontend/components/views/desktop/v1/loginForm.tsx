"use client"
import Link from "next/link";
import React, { Suspense } from 'react';
import Image from 'next/image'
const LazyAuthForm = React.lazy(() => import('@/components/block/v1/login').then(module => ({ default: module.UserAuthForm })));
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
export default function DesktopLoginPage() {
    return (
        <div className="w-dvw h-dvh max-h-dvh flex flex-row">
            <div className="banner w-1/2 h-full relative p-6 hidden lg:block transition-all duration-300 border-r border-gray-900">
                <div className="object-cover h-full w-full absolute inset-0 bg-zinc-900"></div>
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
                    </div>

                    {/* Slogan */}
                    <h1 className="text-4xl font-bold text-white">
                        Seu dinheiro, seu controle. Organize, planeje e cresça!
                    </h1>
                </div>
            </div>
            {/* Form Section */}
            <div className="form lg:w-1/2 w-full h-full flex flex-col items-center justify-center p-4 pl-8 pr-8 gap-4 relative flex-start">
                <div className="h-full w-full absolute inset-0">
                    <Image
                        src="https://cdn.statically.io/gh/BrunoV7/images/main/Lavendery%2520-%252006.jpeg"
                        alt="Purple grandient background"
                        priority={false}
                        quality={80}
                        fill={true}
                    />
                </div>
                <div className="flex flex-col space-y-2 text-center p-10 items-center max-w-96 gap-4 rounded-2xl bg-white shadow-lg border border-gray-200 relative">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Faça login na sua conta</h1>
                        <p className="text-sm text-muted-foreground">Digite seu e-mail e senha para entrar</p>
                    </div>

                    {/* Login Form */}
                    <Suspense fallback={<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}>
                        <LazyAuthForm className="w-full" desktop={true} />
                    </Suspense>

                    <p className="px-8 text-center text-sm text-muted-foreground">
                        Ao continuar, você concorda com nossos{" "}
                        <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                            Termos de Serviço
                        </Link>{" "}
                        e{" "}
                        <Link href="/privacy" className="underline underline-offset-4 hover:text-primary relative">
                            Política de Privacidade
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    )
}