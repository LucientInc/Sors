"use client"
import { useEffect, useState } from "react";
import MobileLoginPage from '../../../components/views/mobile/loginForm';
import DesktopComponent from '../../../components/views/desktop/loginForm';

export default function LoginPage(){
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    return(
        <div>
            <div> {isMobile ? <MobileLoginPage /> : <DesktopComponent />} </div>
        </div>
    )
}
