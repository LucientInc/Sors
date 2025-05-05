"use client"
import { useSignUp } from "../../signupcontext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React from "react";
import { Icons } from "@/components/ui/icons";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function Page() {
    const { newUser, setNewUser } = useSignUp();
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasCitiesLoaded, setHasCitiesLoaded] = React.useState(false);
    const [UF, setUF] = React.useState("");
    const [cidades, setCidades] = React.useState<Cidade[]>([]);
    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("Submitting form...");
        console.log(newUser)
    }
    interface Cidade {
        nome: string;
    }

    const cidadesTSX = cidades.map(cidade => <SelectItem className="p-3" value={cidade.nome}>{cidade.nome}</SelectItem>);

    React.useEffect(() => {
        if (UF) {
            fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + UF + '/municipios').then((response) => {
                if (response.ok) {
                    setHasCitiesLoaded(true);
                    response.json().then((data) => {
                        const cidadesFormatadas = data.map((cidade: any) => ({
                            nome: cidade.nome
                        }));
                        setCidades(cidadesFormatadas);
                    });
                } else {
                    setHasCitiesLoaded(false);
                }
            });
        }
    }, [UF]);

    React.useEffect(() => {
        console.log("New User atualizado:", newUser);
    }, [newUser]);


    return (
        <div className='flex flex-col p-8 items-center justify-start h-dvh text-left'>
            <div className='flex flex-col items-start justify-start mb-8 gap-2'>
                <h1 className='text-2xl font-semibold tracking-tight'>De onde você está falando? 🌍</h1>
                <p className='text-xl text-muted-foreground'>Essas informações ajudam a adaptar o app para sua região e realidade.</p>
            </div>
            <div className='flex flex-col items-start justify-start mb-8 gap-2'>
                <form onSubmit={onSubmit} className='flex flex-col w-full space-y-6 gap-4'>
                    <div className='grid gap-2 md:w-full'>
                        <Label htmlFor="firstName">
                            <p>Qual é o seu estado?</p>
                        </Label>
                        <Select onValueChange={(e) => {
                            setUF(e);
                            console.log("Selected UF:", e);
                            setNewUser({ ...newUser, state: e })
                            console.log("New User State:", newUser);
                        }} >
                            <SelectTrigger className="w-full p-6">
                                <SelectValue placeholder="Digite seu estado…" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Estado</SelectLabel>
                                    <SelectItem className="p-3" value="AC">Acre</SelectItem>
                                    <SelectItem className="p-3" value="AL">Alagoas</SelectItem>
                                    <SelectItem className="p-3" value="AP">Amapá</SelectItem>
                                    <SelectItem className="p-3" value="AM">Amazonas</SelectItem>
                                    <SelectItem className="p-3" value="BA">Bahia</SelectItem>
                                    <SelectItem className="p-3" value="CE">Ceará</SelectItem>
                                    <SelectItem className="p-3" value="DF">Distrito Federal</SelectItem>
                                    <SelectItem className="p-3" value="ES">Espírito Santo</SelectItem>
                                    <SelectItem className="p-3" value="GO">Goiás</SelectItem>
                                    <SelectItem className="p-3" value="MA">Maranhão</SelectItem>
                                    <SelectItem className="p-3" value="MT">Mato Grosso</SelectItem>
                                    <SelectItem className="p-3" value="MS">Mato Grosso do Sul</SelectItem>
                                    <SelectItem className="p-3" value="MG">Minas Gerais</SelectItem>
                                    <SelectItem className="p-3" value="PA">Pará</SelectItem>
                                    <SelectItem className="p-3" value="PB">Paraíba</SelectItem>
                                    <SelectItem className="p-3" value="PR">Paraná</SelectItem>
                                    <SelectItem className="p-3" value="PE">Pernambuco</SelectItem>
                                    <SelectItem className="p-3" value="PI">Piauí</SelectItem>
                                    <SelectItem className="p-3" value="RJ">Rio de Janeiro</SelectItem>
                                    <SelectItem className="p-3" value="RN">Rio Grande do Norte</SelectItem>
                                    <SelectItem className="p-3" value="RS">Rio Grande do Sul</SelectItem>
                                    <SelectItem className="p-3" value="RO">Rondônia</SelectItem>
                                    <SelectItem className="p-3" value="RR">Roraima</SelectItem>
                                    <SelectItem className="p-3" value="SC">Santa Catarina</SelectItem>
                                    <SelectItem className="p-3" value="SP">São Paulo</SelectItem>
                                    <SelectItem className="p-3" value="SE">Sergipe</SelectItem>
                                    <SelectItem className="p-3" value="TO">Tocantins</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='grid gap-2 md:w-full'>
                        <Label htmlFor="lastName">
                            <p>Qual é a sua Cidade?</p>
                        </Label>
                        <Select disabled={!hasCitiesLoaded} onValueChange={(e) => {
                            setNewUser({ ...newUser, city: e })
                        }}>
                            <SelectTrigger className="w-full p-6">
                                <SelectValue placeholder="Digite sua cidade..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Cidades no {UF}</SelectLabel>
                                    {cidades.map((cidade) => (
                                        <SelectItem className="p-3" key={cidade.nome} value={cidade.nome}>
                                            {cidade.nome}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="h-full">

                    </div>
                    <div>
                        <p className='text-sm text-muted-foreground text-center'>
                            Prometemos não usar esses dados para nada além de personalizar sua experiência com o app. 🔐
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
    )
}