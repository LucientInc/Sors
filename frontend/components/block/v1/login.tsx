"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    desktop: boolean;
}

export function UserAuthForm({ className, desktop, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isEmailValid, setIsEmailValid] = React.useState<boolean>(false)
    const [email, setEmail] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")

    const validateEmail = (email: string) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const nextStep = () => {
        if (!validateEmail(email)) {
            setIsEmailValid(false)
        } else {
            setIsEmailValid(true)
        }
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log('Form submitted');
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 10000)
    }
    

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-2">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
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
                        />

                        <Label className="sr-only" htmlFor="password">
                            Senha
                        </Label>
                        <Input
                            id="password"
                            placeholder="********"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            required
                            disabled={isLoading}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button className="w-full" variant="outline" type="submit" disabled={isLoading} >
                            {isLoading && (
                                <Icons.spinner data-testid="spinner" className="h-4 w-4 animate-spin" />
                            )}
                            Entrar com e-mail
                        </Button>
                    </div>
                </div>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Ou continue usando
                    </span>
                </div>
            </div>
            <Button className="w-full" variant="outline" type="button" disabled={isLoading}>
                {isLoading ? (
                    <Icons.spinner className="h-4 w-4 animate-spin" />
                ) : (
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                )}
                GitHub
            </Button>
            {desktop && (
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Ou
                        </span>
                    </div>
                </div>

            )}
            {desktop && (
                <Button className="w-full" disabled={isLoading} onClick={nextStep}>
                    <Link href="/v1/auth/register">Cadastre-se</Link>
                </Button>
            )}
        </div>
    )
}