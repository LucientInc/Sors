"use client"
import React from "react";
import Link from "next/link";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { profile } from "console";
import { useEffect, useState } from "react";
import Stepper from "@/components/block/v1/stepper";

export const newUser = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    country: "",
    birthDate: "",
    provider: "",
    profilePicture: "",
}



export default function RegisterPage() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isEmailValid, setIsEmailValid] = React.useState<boolean>(false)
    const [email, setEmail] = React.useState<string>("");
    const [email2, setEmail2] = React.useState<string>("");
    const [newUserState, setNewUser] = React.useState<typeof newUser>({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        city: "",
        state: "",
        country: "",
        birthDate: "",
        provider: "",
        profilePicture: "",
    })

    useEffect(() => {
        isEmailEqual()
    }, []);


    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log('Form submitted');
        event.preventDefault()
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }
            , 10000)

    }

    const isEmailEqual = () => {
        if (email === email2) {
            setIsEmailValid(true)
            setNewUser({ ...newUserState, email: email })
            console.log(newUserState)
        } else {
            setIsEmailValid(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-dvh h-full bg-white">
            <div className="flex flex-col md:flex-row lg:flex-row gap-4  justify-between w-full p-4 pl-16 pr-16 bg-white">
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
            <div className="flex flex-col items-center justify-start h-dvh p-6 bg-white pl-16 pr-16">

                {/* Header */}
                <div className="flex flex-col space-y-2 md:text-left lg:text-left text-center w-full">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Crie sua conta
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Insira seu e-mail e senha para criar uma nova conta
                    </p>
                </div>
                {/* Stepper */}

                {/* Body */}
                <div className="p-8 flex flex-col items-center justify-center w-full">
                    {isLoading ? (
                        <Icons.spinner data-testid="spinner" className="h-4 w-4 animate-spin" />
                    ) : (

                        <form action="onSubmit">
                            <div className="grid gap-2">
                                <div className="grid gap-2">
                                    <Label className="sr-only" htmlFor="email">
                                        Email
                                    </Label>
                                    <p className="text-sm text-accent-foreground">Email</p>
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
                                        Confirme seu email
                                    </Label>
                                    <p className="text-sm text-accent-foreground">Confirme seu email</p>
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
                                        <p className="text-sm text-red-500 opacity-80">Email não confere</p>
                                    )}
                                </div>
                            </div>
                        </form>
                    )}

                </div>
                {/* Footer */}
                <div className="h-full w-full mb-4 flex md:flex-row lg:flex-row gap-4 md:gap-8 lg:gap-8 items-end justify-end flex-col">
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
                    >
                        Criar conta
                    </Button>
                </div>
            </div>
        </div>
    )
}
