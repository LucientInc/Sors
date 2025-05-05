"use client";
import { useState } from 'react';
import React from 'react';
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUp } from '../../signupcontext';
import { useRouter } from 'next/navigation'


export default function Form() {
    const [isLoading, setIsLoading] = useState(false);
    const { newUser, setNewUser } = useSignUp();
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [isBirthDateValid, setIsBirthDateValid] = useState(true);
    const router = useRouter()


    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Submitting form...");
        console.log(newUser)
        setIsLoading(true);
        if(!isBirthDateValid) {
            setIsLoading(false);
            return;
        }
        router.push('/v1/auth/signup/steps/2');
    }
    return (
        <div className='flex flex-col p-8 items-center justify-start h-dvh text-left'>
            <div className='flex flex-col items-start justify-start mb-8 gap-2'>
                <h1 className='text-2xl font-semibold tracking-tight'>Que bom ter você aqui! 🎉</h1>
                <p className='text-xl text-muted-foreground'>Antes da gente começar, como você gostaria de ser chamado?</p>
            </div>
            <div className='flex flex-col items-start justify-start mb-8 gap-2'>
                <form onSubmit={onSubmit} className='flex flex-col w-full space-y-6 gap-4'>
                    <div className='grid gap-2 md:w-full'>
                        <Label htmlFor="firstName">
                            <p>Qual é o seu nome?</p>
                        </Label>
                        <Input
                            className='p-6'
                            type="text"
                            name="firstName"
                            required
                            aria-required
                            autoComplete="given-name"
                            id="firstName"
                            placeholder='Digite aqui…'
                            onChange={(e) => {
                                setNewUser({ ...newUser, firstName: e.target.value })
                            }}
                        />
                    </div>
                    <div className='grid gap-2 md:w-full'>
                        <Label htmlFor="lastName">
                            <p>E o sobrenome?</p>
                        </Label>
                        <Input
                            className='p-6'
                            type="text"
                            autoCapitalize='true'
                            required
                            aria-required
                            autoComplete='family-name'
                            name="lastName"
                            id="lastName"
                            placeholder='Digite aqui também…'
                            onChange={(e) => {
                                setNewUser({ ...newUser, lastName: e.target.value })
                            }}
                        />
                    </div>
                    <div className="grid gap-2 md:w-full">
                        <Label htmlFor="birthDate">
                            <p>Qual sua data de nascimento?</p>
                        </Label>
                        <input
                            className="p-6 h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm outline-none placeholder:text-muted-foreground transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring dark:bg-input/30 disabled:cursor-not-allowed disabled:opacity-50"
                            type="date"
                            name="birthDate"
                            id="birthDate"
                            required
                            aria-required="true"
                            autoComplete="bday"
                            placeholder="Selecione sua data…"
                            onChange={(e) => {
                                const selectedDate = new Date(e.target.value);
                                setDate(selectedDate);

                                const today = new Date();
                                let age = today.getFullYear() - selectedDate.getFullYear();
                                const monthDiff = today.getMonth() - selectedDate.getMonth();
                                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < selectedDate.getDate())) {
                                    age--;
                                }

                                if (age >= 16) {
                                    setIsBirthDateValid(true);
                                    setNewUser({ ...newUser, birthDate: e.target.value });
                                } else {
                                    setIsBirthDateValid(false);
                                }
                            }}
                        />
                        {!isBirthDateValid && (
                            <p className="text-xs text-red-400 whitespace-normal break-words max-w-sm">
                                Parece que você ainda não tem a idade mínima para usar o app. Que tal voltar daqui a alguns anos? 😉
                            </p>
                        )}

                    </div>
                    <div>
                        <p className='text-sm text-muted-foreground text-center'>
                            Não se preocupe — você poderá mudar isso depois, se quiser.
                        </p>
                        <p className='text-sm text-muted-foreground text-center'>
                            Usaremos seu nome apenas para personalizar sua experiência!
                        </p>
                    </div>
                    <Button
                        className="mt-4 p-6 bg-indigo-700 hover:bg-indigo-800 text-white w-full"
                        disabled={isLoading}
                        type="submit"
                        data-testid="register-button"
                    >
                        {isLoading && (
                            <Icons.spinner data-testid="spinner" className="h-4 w-4 animate-spin" />
                        )}
                        {!isLoading && (
                            <p className='font-bold'>Continuar</p>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );

}