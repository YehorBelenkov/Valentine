import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CryptoJS from 'crypto-js';
import "./index.css";

import '../../app/globals.css'

export default function Valentine() {
    const router = useRouter();
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [text, setText] = useState('');
    const [showLetter, setShowLetter] = useState(false);

    useEffect(() => {
        // Check if there's a 'val' parameter in the URL
        if (router.query.val) {
            const encryptedMessage = decodeURIComponent(router.query.val);
            const decryptedMessage = decryptMessage(encryptedMessage);
console.log('Decrypted Message:', decryptedMessage);
            setFrom(decryptedMessage.from);
            setTo(decryptedMessage.to);
            setText(decryptedMessage.text);
        }
    }, [router.query.val]);

    // Decrypt message using AES algorithm
    const decryptMessage = (encryptedMessage) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedMessage, 'secretkey');
        const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
        const messageObj = JSON.parse(decryptedJsonString);
        return messageObj;
    } catch (error) {
        console.error('Error decrypting message:', error);
        return null;
    }
};
    useEffect(() => {
        function hearts() {
            const container = document.querySelector('.container');

            const create = document.createElement('div');
            create.classList.add('hearts');
            create.innerHTML = '💖';

            create.style.left = Math.random() * 100 + 'vw';
            create.style.animationDuration = Math.random() * 3 + 2 + 's';

            container.appendChild(create);
            setTimeout(() => {
                create.remove();
            }, 3000);
        }

        const intervalId = setInterval(hearts, 100);

        // Clean up function to clear interval when component unmounts
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures this effect runs only once after the component mounts

    useEffect(() => {
        const toggleButton = document.getElementById("toggleButton");
        const envelope = document.querySelector(".envelope");

        const handleToggle = () => {
            envelope.classList.toggle("open");
        };

        toggleButton.addEventListener("click", handleToggle);

        // Clean up function to remove event listener when component unmounts
        return () => {
            toggleButton.removeEventListener("click", handleToggle);
        };
    }, []);

    const toggleEnvelope = () => {
        setShowLetter(!showLetter);
    };

    return (
        <>
        <div className='container'>
            <div className="envelope" id="toggleButton" onClick={toggleEnvelope}>
                <div className="frontfront">
                    <div className="frontfrontLeft"></div>
                    <div className="frontfrontRight"></div>
                </div>
                <div className="front"></div>
                <div className="card">
                    <div className='flex_f_t'>
                    <p>From: {from}</p>
                    <p>To: {to}</p>
                    </div>
                    
                    <p className='txt'>{text}</p>
                </div>
                <div className="flapOverflow">
                    <div className="flap"></div>
                </div>
                <div className="back"></div>
            </div>
            <br />
        </div>
            

        </>
        
    );
}