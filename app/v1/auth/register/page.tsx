"use client"
import React, { useCallback } from "react";
import Link from "next/link";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from 'next/image'
const LazyFlipWords = React.lazy(() =>
    import('@/components/block/v1/banner-text').then(module => ({ default: module.BannerText }))
);
import { Suspense } from "react";

export default function RegisterPage() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isEmailValid, setIsEmailValid] = React.useState<boolean>(true);
    const [isPasswordEqual, setIsPasswordEqual] = React.useState<boolean>(true);
    const [password, setPassword] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [email2, setEmail2] = React.useState<string>("");
    type newUser = {
        email: string,
        password: string,
        confirmPassword: string,
    }
    const [newUserState, setNewUser] = React.useState<newUser>({
        email: "",
        password: "",
        confirmPassword: "",
    })

    const isEmailEqual = useCallback(() => {
        if (email === email2) {
            setIsEmailValid(true);
            setNewUser((prevState) => ({ ...prevState, email }));
        } else {
            setIsEmailValid(false);
        }
    }, [email, email2]);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log('Form submitted');
        event.preventDefault()
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }
            , 10000)

    }

    const PasswordChecker = () => {
        if (password === confirmPassword) {
            setIsPasswordEqual(true);
            setNewUser({ ...newUserState, password: password, confirmPassword: confirmPassword });
        } else {
            setIsPasswordEqual(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center bg-white w-dvw h-dvh max-h-dvh lg:overflow-hidden">
            <div className="banner w-1/2 h-full relative p-6 hidden lg:block transition-all duration-300 border-r border-gray-900">
                <div className="object-cover h-full w-full absolute inset-0 bg-zinc-900">
                    <Image
                        src="https://cdn.statically.io/gh/BrunoV7/images/main/Nova-04-1-_1_.webp"
                        alt="Arte abstrata fluida em azul e prata, simbolizando controle e organização financeira."
                        priority={false}
                        quality={80}
                        fill={true}
                    />
                </div>
                <div className="relative h-full flex flex-col justify-end">
                    {/* Slogan */}
                    <Suspense fallback={<div className="flex justify-center items-center h-full w-full"><Icons.spinner className="h-8 w-8 animate-spin" /></div>}>
                        <LazyFlipWords />
                    </Suspense>
                </div>
            </div>

            <div className="md:w-1/2 lg:w-1/2 w-full h-dvh md:flex md:flex-col md:justify-evenly">
                <div className="flex flex-col md:flex-row lg:flex-row gap-4 justify-between w-full p-4 pl-8 pr-8  md:pl-16 md:pr-16 bg-white">
                    {/* Logo */}
                    <div className='flex justify-between items-center'>
                        <div className="flex items-center text-lg font-medium gap-1">
                            <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M36 12H24L12 24H24L36 12Z" fill="#1D06EE" />
                                <path d="M36 0H24L12 12H24L36 0Z" fill="#1D06EE" />
                                <path d="M36 0H24L12 12H24L36 0Z" fill="black" fillOpacity="0.3" />
                                <path d="M24 0H36L48 12H36L24 0Z" fill="#1D06EE" />
                                <path d="M0 12H12L24 24H12L0 12Z" fill="#1D06EE" />
                                <path d="M0 12H12L24 24H12L0 12Z" fill="black" fillOpacity="0.3" />
                            </svg>

                            <span className="text-black text-md">Sors</span>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Já tem conta? <Link href="/v1/auth"><b className="text-gray-900">Entre agora!</b></Link></p>
                </div>
                <div className="flex flex-col items-center justify-start p-6 bg-white  pl-8 pr-8  md:pl-16 md:pr-16">

                    {/* Header */}
                    <div className="flex flex-col space-y-2 md:text-left lg:text-left text-center w-full">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Crie sua conta
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Comece sua jornada para um controle financeiro mais eficiente. Preencha os campos abaixo para criar sua conta com segurança.
                        </p>
                    </div>
                    {/* Stepper */}

                    {/* Body */}
                    <div className="p-8 flex flex-col items-center justify-center w-full">
                        <form action="onSubmit" className="w-full max-w-md space-y-6" onSubmit={onSubmit}>
                            <div className="grid gap-2">
                                <div className="grid gap-2">
                                    <Label className="sr-only" htmlFor="email">
                                        E-mail
                                    </Label>
                                    <p className="text-sm text-accent-foreground">E-mail</p>
                                    <Input
                                        id="email"
                                        placeholder="name@example.com"
                                        type="email"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        required
                                        autoCorrect="off"
                                        disabled={isLoading}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onBlur={isEmailEqual}
                                        className={`${isEmailValid ? " " : "text-red-800 border-red-800"}`}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label className="sr-only" htmlFor="email">
                                        Confirmar e-mail
                                    </Label>
                                    <p className="text-sm text-accent-foreground">Confirmar e-mail</p>
                                    <Input
                                        id="email"
                                        placeholder="name@example.com"
                                        type="email"
                                        className={`${isEmailValid ? " " : "text-red-800 border-red-800"}`}
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        required
                                        autoCorrect="off"
                                        disabled={isLoading}
                                        onChange={(e) => setEmail2(e.target.value)}
                                        onBlur={isEmailEqual}
                                    />
                                    {!isEmailValid && (
                                        <p className="text-sm text-red-500 opacity-80">Os e-mails informados não são iguais. Verifique e tente novamente.</p>
                                    )}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <div className="grid gap-2">
                                    <Label className="sr-only" htmlFor="email">
                                        Senha
                                    </Label>
                                    <p className="text-sm text-accent-foreground">Senha</p>
                                    <Input
                                        id="password"
                                        placeholder="********" // Placeholder for password input
                                        type="password"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        required
                                        autoCorrect="off"
                                        disabled={isLoading}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onBlur={PasswordChecker}
                                        className={`${isPasswordEqual ? " " : "text-red-800 border-red-800"}`}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label className="sr-only" htmlFor="email">
                                        Confirmar senha
                                    </Label>
                                    <p className="text-sm text-accent-foreground">Confirmar senha</p>
                                    <Input
                                        id="password"
                                        placeholder="********"
                                        type="password"
                                        className={`${isPasswordEqual ? " " : "text-red-800 border-red-800"}`}
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        required
                                        autoCorrect="off"
                                        disabled={isLoading}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        onBlur={PasswordChecker}
                                    />
                                    {!isPasswordEqual && (
                                        <p className="text-sm text-red-500 opacity-80">As senhas informadas não conferem. Certifique-se de digitá-las corretamente.</p>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* Footer */}
                    <div className="w-full h-full mb-4 flex md:flex-row lg:flex-row gap-4 md:gap-8 lg:gap-8 items-end justify-end flex-col md:flex-start lg:flex-start">
                        <p className="text-sm text-muted-foreground md:text-left lg:text-left text-center">
                            Ao continuar, você concorda com nossos <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                                Termos de Serviço
                            </Link>{" "}
                            e{" "}
                            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary relative">
                                Política de Privacidade
                            </Link> Seus dados estarão protegidos e armazenados com segurança.
                        </p>
                        <Button
                            className="mt-4 bg-indigo-700 hover:bg-indigo-800 text-white md:w-fit lg:w-fit w-full"
                            disabled={isLoading}
                            onClick={(e) => {
                                e.preventDefault();
                                onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
                            }}
                            type="submit"
                            data-testid="register-button"
                        >
                            {isLoading && (
                                <Icons.spinner data-testid="spinner" className="h-4 w-4 animate-spin" />
                            )}
                            Criar conta
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
