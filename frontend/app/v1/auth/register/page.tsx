"use client"
import React from "react";
import Link from "next/link";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { profile } from "console";
import { useEffect, useState } from "react";

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
        <div className="flex flex-col items-center justify-center h-dvh bg-gray-100">
            <div className="flex flex-row items-end justify-end w-full p-4 bg-white">
                <p className="text-sm text-muted-foreground">Já tem conta? <Link href="/v1/auth"><b className="text-gray-900">Entre agora!</b></Link></p>
            </div>
            <div className="flex flex-col items-center justify-start w-6/12 h-dvh p-6 bg-white">
                {/* Header */}
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Crie sua conta
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Insira seu e-mail e senha para criar uma nova conta
                    </p>
                </div>
                {/* Stepper */}
                <div className="flex flex-row items-center justify-between w-full p-4 mt-4 bg-gray-100">
                    <div className="flex flex-col items-center justify-center w-full">
                        <div className="flex flex-row items-start justify-evenly gap-24 w-full flex-start">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500">
                                    <Icons.check className="w-6 h-6" />
                                </div>
                                <p className="text-sm text-muted-foreground">Email</p>
                            </div>

                        </div>
                    </div>
                </div>
                {/* Body */}
                <div className="">
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
                <div className="">

                </div>
            </div>
        </div>
    )
}
