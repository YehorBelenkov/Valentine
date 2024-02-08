import { useState } from 'react';
import Link from 'next/link';
import CryptoJS from 'crypto-js';
import "../app/globals.css";
import "./index.css"

export default function Home() {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [text, setText] = useState('');
    const [generatedUrl, setGeneratedUrl] = useState('');
    const [copied, setCopied] = useState(false);

    const generateUrl = () => {
        // Encrypt the message
        const encryptedMessage = encryptMessage({ from, to, text });
        const url = `${window.location.origin}/valentine?val=${encodeURIComponent(encryptedMessage)}`;
        setGeneratedUrl(url);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedUrl);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1500); // Reset copied state after 1.5 seconds
    };

    // Encrypt message using AES algorithm
    const encryptMessage = ({ from, to, text }) => {
        const messageObj = { from, to, text };
        const jsonString = JSON.stringify(messageObj);
        const encryptedMessage = CryptoJS.AES.encrypt(jsonString, 'secretkey').toString();
        return encryptedMessage;
    };

    return (
        <>
        <div className='input_container'>
            <h1 className='h1_c'>Create your Valentine!</h1>
    <div className='input_el_con'>
        <h1>From:</h1>
        <input type="text" id="from" value={from} onChange={(e) => setFrom(e.target.value)} />
    </div>
    <div className='input_el_con'>
        <h1>To:</h1>
        <input type="text" id="to" value={to} onChange={(e) => setTo(e.target.value)} />
    </div>
    <div className='input_el_con'>
        <h1>Message:</h1>
        <textarea
    id="text"
    value={text}
    onChange={(e) => setText(e.target.value)}
    maxLength={218} // Set maximum character limit to 250
></textarea>
    </div>
    <button onClick={generateUrl}>Create Valentine</button>
    {generatedUrl && (
        <div className="url-container"> {/* Add this container */}
            <p className={`url ${copied ? 'copied' : ''}`} onClick={copyToClipboard}>{generatedUrl}</p> {/* Add a class to the p tag */}
        </div>
    )}
</div>
        </>
    );
}