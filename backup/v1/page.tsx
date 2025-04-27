/*
"use client"
import { useEffect, useState } from "react";

import MobileLoginPage from '../../../components/views/mobile/v1/loginForm';
import DesktopComponent from '../../../components/views/desktop/v1/loginForm';

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
*/