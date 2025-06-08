"use client";
import Card from '@/components/card/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Form() {
    const [selected, setSelected] = useState<string | null>(null);

    const isOtherSelected = selected === 'Outro motivo';

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
                    <div key={card.title} onClick={() => setSelected(card.title)} className="cursor-pointer">
                        <Card
                            icon={card.icon}
                            title={card.title}
                            description={card.description}
                            theme="finance"
                            size="lg"
                            selected={selected === card.title}
                        />
                    </div>
                ))}
            </div>
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
                            Se escolheu "Outro motivo", conte mais:
                        </Label>
                        <Input
                            id="otherReason"
                            name="otherReason"
                            type="text"
                            placeholder="Descreva seu motivo"
                            className="w-full p-4"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
