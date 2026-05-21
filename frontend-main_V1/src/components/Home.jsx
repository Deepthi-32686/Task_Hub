import React, { useState, useEffect } from 'react';
import './Home.css';
import ProgressBar from './ProgressBar';
import { apibaseurl, callApi } from '../lib';

const Home = () => {

    const [fullname, setFullname] = useState("");
    const [isProgress, setIsProgress] = useState("");
    const [token, setToken] = useState("");
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token)
            logout();
        else{
            setToken(token);
            setIsProgress(true);
            callApi("GET", apibaseurl + "/authservice/uinfo", null, null, loadUinfo, token);
        }
    }, []);
    function loadUinfo(res){
        setIsProgress(false);
        if(res.code != 200)
            return;
        setFullname(res.fullname)
    }
    function logout(){
        localStorage.clear();
        window.location.replace("/");
    }

    return (
        <div className='home'>

            
            <div className='home-header'>
                <img src="/logo.png" alt="logo" />

                <div className='info'>
                    <span>{fullname}</span>
                    <img src="/shutdown.png" alt="logout" onClick={logout()}
                    />
                </div>
            </div>

           
            <div className='home-workspace'>
                <div className='home-menus'>Menu</div>
                <div className='home-content'>Content</div>
            </div>

            
            <div className='home-footer'>
                Copyright @ 2026. All rights reserved.
            </div>

            <ProgressBar isProgress={isProgress} />
        </div>
    );
};

export default Home;