import React from "react";
import "./Presets.css";
import Preset from "./Preset/Preset";

import beaconImg from "../img/beacon.gif";
import gliderImg from "../img/glider.gif";
import pulsarImg from "../img/pulsar.gif";
import toadImg from "../img/toad.gif";

const Presets = ({ setGridPreset, setSpeed }) => {
    return (
        <div className="presets-container">
            <h2>Presets:</h2>
            <Preset
                name="Beacon"
                setGridPreset={setGridPreset}
                img={beaconImg}
            />
            <Preset
                name="Glider"
                setGridPreset={setGridPreset}
                img={gliderImg}
            />
            <Preset
                name="Pulsar"
                setGridPreset={setGridPreset}
                img={pulsarImg}
            />
            <Preset name="Toad" setGridPreset={setGridPreset} img={toadImg} />
        </div>
    );
};

export default Presets;
