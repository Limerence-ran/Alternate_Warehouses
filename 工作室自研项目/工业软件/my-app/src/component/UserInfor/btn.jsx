import React, { useState } from 'react';
import './main.css'
function SwitchButton(props) {
    const { onChange } = props
    const [isOn, setIsOn] = useState(false);

    const handleToggleSwitch = () => {
        setIsOn(!isOn);
    };

    return (
        <label className={`switch ${isOn ? 'on' : 'off'}`} onClick={onChange}>
            <input type="checkbox" checked={isOn} onChange={handleToggleSwitch} />
            <span className="slider"></span>
        </label>
    );
}

export default SwitchButton;