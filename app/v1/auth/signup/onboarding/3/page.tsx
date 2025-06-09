"use client";
import Card from '@/components/card/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Console } from 'console';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useSignUp } from "../../signupcontext";
import React from 'react';
import Link from "next/link";
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';

export default function Form() {
    const [selected, setSelected] = useState<string | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const isOtherSelected = selected === 'Outro motivo';
    const [isLoading, setIsLoading] = useState(false);
    const [otherReason, setOtherReason] = useState<string>('');
    const { newUser, setNewUser } = useSignUp();

    const handleCardSelection = (title: string) => {
        if (selectedOptions.includes(title)) {
            setSelected(null);
            setSelectedOptions((prev) => prev.filter((option) => option !== title));
            console.log(`Deselected option: ${selectedOptions}`);
            return;
        }
        if (title === 'Outro motivo') {
            setSelected(title);
            setSelectedOptions((prev) => [...prev, title]);
        } else {
            setSelected(title);
            setSelectedOptions((prev) => [...prev, title]);
        }
        console.log(`Selected option: ${selectedOptions}`);
    };
    //setNewUser({...newUser, onBoardingMotivations: selectedOptions})
    const cards = [
        {
            title: 'Organizar meu dinheiro',
            description: 'Quero controlar meu orçamento',
            icon: 'https://cdn.statically.io/gh/BrunoV7/images/main/moedas.webp'
        },
        {
            title: 'Entender meus gastos',
            description: 'Saber pra onde ele vai',
            icon: 'https://cdn.statically.io/gh/BrunoV7/images/main/pizza_chart.webp'
        },
        {
            title: 'Alcançar minha meta',
            description: 'Juntar com um propósito',
            icon: 'https://cdn.statically.io/gh/BrunoV7/images/main/dart.webp'
        },
        {
            title: 'Evitar minhas dívidas',
            description: 'Quero sair do aperto',
            icon: 'https://cdn.statically.io/gh/BrunoV7/images/main/blocked_card.webp'
        },
        {
            title: 'Mudar meus hábitos',
            description: 'Gastar com mais consciência',
            icon: 'https://cdn.statically.io/gh/BrunoV7/images/main/good_chart.webp'
        },
        {
            title: 'Outro motivo',
            description: 'Minha situação é diferente',
            icon: 'https://cdn.statically.io/gh/BrunoV7/images/main/cog.webp'
        }
    ];

    React.useEffect(() => {
        console.log("New User atualizado:", newUser);
    }, [newUser]);

    React.useEffect(() => {
        console.log("Selected Options:", selectedOptions);
    }, [selectedOptions]);

    return (
        <div className="flex flex-col p-4 pl-5 pr-5 items-center justify-start h-dvh text-left">
            <div className="flex flex-col items-center justify-start mb-8 gap-2">
                <h1 className="text-xl md:text-2xl font-semibold text-center">O que você quer melhorar? 🎯</h1>
                <p className="text-muted-foreground text-center">
                    Escolha os que mais representam seu momento atual. Isso vai nos ajudar a te guiar melhor.
                </p>
            </div>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 lg:grid-rows-2 sm:grid-rows-3 gap-8 sm:gap-4 w-full md:pl-30 md:pr-30">
                {cards.map((card) => (
                    <div key={card.title} onClick={() => handleCardSelection(card.title)} className="cursor-pointer">
                        <Card
                            icon={card.icon}
                            title={card.title}
                            description={card.description}
                            theme="finance"
                            size="lg"
                            selected={selectedOptions.includes(card.title)}
                        />
                    </div>
                ))}
            </div>
            <div className='md:pl-30 md:pr-30 w-3/4'>
                <AnimatePresence>
                    {isOtherSelected && (
                        <motion.div
                            className="flex flex-col items-start justify-start mt-8 gap-2 w-full"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Label htmlFor="otherReason" className="text-sm">
                                O que você gostaria de melhorar hoje?
                            </Label>
                            <Input
                                id="otherReason"
                                name="otherReason"
                                type="text"
                                placeholder="Descreva seu motivo"
                                className="w-full p-4"
                                onBlur={(e) => { setOtherReason(e.target.value); }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className='h-full'></div>
            <p className="px-8 text-center text-sm text-muted-foreground p-8">
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
        </div>
    );
}
