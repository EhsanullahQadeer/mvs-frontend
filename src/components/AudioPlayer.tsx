/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import wavesurfer from "wavesurfer.js";




const AudioPlayer = (props: any) => {


    const audioRef = useRef();
    


    useEffect(() => {
        const searchModule = document.querySelector(`#id-${props.id} > div`);

        if(searchModule) return;

        if (audioRef.current) {


            let audioTrack = wavesurfer.create({
                container: audioRef.current,
                waveColor: "grey",
                progressColor: "#c4ff48",
                height: 30,
                cursorWidth: 0,
                cursorColor: "lightgray",
                barWidth: 2,
                normalize: true,
                fillParent: true,
                backend: "MediaElement",
                mediaControls: false,
            });

            audioTrack.load(props.link);

            audioTrack.on("play", () => {
                console.log(" === Start Play ===");
                const searchModule = document.querySelector(`#id-${props.id} > div`);
                searchModule.shadowRoot.querySelector("audio").currentTime = 0;
            });

            audioTrack.on("finish", () => {
                console.log(" === Finished ===");
                props.setPlaying(false);
                const searchModule = document.querySelector(`#id-${props.id} > div`);
                searchModule.shadowRoot.querySelector("audio").currentTime = 0;
                searchModule.shadowRoot.querySelector("audio").pause();

            });

        }
    })

    return (
        <div
            style={{ minWidth: "100px" }}
            id={`id-${props.id}`}
            className="audio"
            ref={audioRef}
        ></div>
    );

}

export default AudioPlayer;