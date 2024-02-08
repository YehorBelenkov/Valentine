import { useEffect, useState } from 'react';
import './index.css';
import '../../app/globals.css'

export default function FallingHearts() {
    const [showLetter, setShowLetter] = useState(false);

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
        <div className='container'>
            <div className="envelope" id="toggleButton" onClick={toggleEnvelope}>
                <div className="frontfront">
                    <div className="frontfrontLeft"></div>
                    <div className="frontfrontRight"></div>
                </div>
                <div className="front"></div>
                <div className="card">
                    <div>
                        <h1>Hello!</h1>
                    </div>
                </div>
                <div className="flapOverflow">
                    <div className="flap"></div>
                </div>
                <div className="back"></div>
            </div>
            <br />
        </div>
    );
}