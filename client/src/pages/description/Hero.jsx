import React from "react";
import LeftInnerHero from "./LeftInnerHero";
import RightInnerHero from "./RightInnerHero";

const Hero = () => {
    return (
        <div className="about-row">
            <div className="about-col">
                <LeftInnerHero />
            </div>
            <div className="about-col">
                <RightInnerHero />
            </div>
        </div>
    );
};

export default Hero;