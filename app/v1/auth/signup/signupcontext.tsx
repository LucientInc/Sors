"use client"
import { createContext, useContext, useState } from "react";

type newUser = {
    firstName: string,
    lastName: string,
    city: string,
    state: string,
    country: string,
    birthDate: string,
    provider: string,
    profilePicture: string
    onBoardingMotivations?: string[]
}

const defaultUser: newUser = {
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    country: "Brazil",
    birthDate: "",
    provider: "",
    profilePicture: "",
    onBoardingMotivations: []
}

type SignUpContextType = {
    newUser: newUser;
    setNewUser: React.Dispatch<React.SetStateAction<newUser>>;
}

export const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

// This is useful for ensuring that the context is always available when you need it.
// The SignUpProvider component wraps your app and provides the context to all its children.
export function SignUpProvider({ children }: { children: React.ReactNode})  {
    const [user, setUser] = useState<newUser>(defaultUser);

    return (
        <SignUpContext.Provider value={{ newUser: user, setNewUser: setUser }}>
            {children}
        </SignUpContext.Provider>
    )
}

// This is a custom hook that allows you to access the SignUpContext
// from any component in your app. It throws an error if used outside of the SignUpProvider.
export function useSignUp(){
    const context = useContext(SignUpContext);
    if (!context) {
        throw new Error("useSignUp must be used within a SignUpProvider");
    }
    return context;
}