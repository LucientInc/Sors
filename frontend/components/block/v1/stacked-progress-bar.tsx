import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

type SequentialProgressBarsProps = {
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

const SequentialProgressBars = ({ className }: SequentialProgressBarsProps) => {
    // Estados para os três valores de progresso
    const [step, setStep] = useState(0);
    const [step2, setStep2] = useState(0);
    const [step3, setStep3] = useState(0);

    // Referência com tipo correto
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Estado para controlar qual barra está atualmente sendo animada (1, 2 ou 3)
    const [activeBar, setActiveBar] = useState(1);

    // Efeito para limpar intervalos quando o componente é desmontado
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    // Efeito para gerenciar a animação com base na barra ativa
    useEffect(() => {
        // Limpar qualquer intervalo existente
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // Determinar qual função usar com base na barra ativa
        if (activeBar === 1) {
            // Resetar a barra antes de começar
            setStep(0);
            animateBar1();
        } else if (activeBar === 2) {
            // Resetar a barra antes de começar
            setStep2(0);
            animateBar2();
        } else if (activeBar === 3) {
            // Resetar a barra antes de começar
            setStep3(0);
            animateBar3();
        }
    }, [activeBar]);

    // Função para animar a primeira barra
    const animateBar1 = () => {
        intervalRef.current = setInterval(() => {
            setStep(prev => {
                const newValue = prev + 1;
                if (newValue >= 100) {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }
                    // Mover para a próxima barra
                    setActiveBar(2);
                    return 100;
                }
                return newValue;
            });
        }, 50);
    };

    // Função para animar a segunda barra
    const animateBar2 = () => {
        intervalRef.current = setInterval(() => {
            setStep2(prev => {
                const newValue = prev + 1;
                if (newValue >= 100) {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }
                    // Mover para a próxima barra
                    setActiveBar(3);
                    return 100;
                }
                return newValue;
            });
        }, 50);
    };

    // Função para animar a terceira barra
    const animateBar3 = () => {
        intervalRef.current = setInterval(() => {
            setStep3(prev => {
                const newValue = prev + 1;
                if (newValue >= 100) {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }
                    // Voltar para a primeira barra e iniciar tudo novamente
                    setActiveBar(1);
                    // Opcional: zerar todas as barras antes de recomeçar
                    setStep(0);
                    setStep2(0);
                    setStep3(0);
                    return 0;
                }
                return newValue;
            });
        }, 50);
    };

    // Iniciar a animação ao montar o componente
    useEffect(() => {
        setActiveBar(1); // Isso acionará o efeito que inicia a animação
    }, []);

    return (

        <div className={cn(
            "flex gap-4 p-6",
            className
        )} >
            <Progress value={step} />
            <Progress value={step2} />
            <Progress value={step3} />
        </div>
    );
};

export default SequentialProgressBars;