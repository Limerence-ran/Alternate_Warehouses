import React, { useState } from 'react';
import './main.css'
function SwitchButton() {
    const [isOn, setIsOn] = useState(false);

    const handleToggleSwitch = () => {
        setIsOn(!isOn);
    };

    return (
        <label className={`switch ${isOn ? 'on' : 'off'}`}>
            <input type="checkbox" checked={isOn} onChange={handleToggleSwitch} />
            <span className="slider"></span>
        </label>
    );
}

export default SwitchButton;