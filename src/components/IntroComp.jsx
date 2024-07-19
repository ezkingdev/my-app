import React from "react";

function Intro() {
    const weight = 104;
    const height = 1.83;
    const bmi = weight / (height * height); // 72/(1.83*1.83) = 21.5

 
    return (
        <div>
            <p style={{color: 'yellow'}}>{bmi}</p>
        </div>
    )
}

export default Intro;