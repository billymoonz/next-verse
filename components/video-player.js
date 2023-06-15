'use client';

import React from "react"

export function VideoPlayer({ url, thumbnail }) {
    return (<div id='video-play' className="relative overflow-hidden bg-slate-950 mt-[12px]">
        <video poster={thumbnail} className="w-full h-full bg-cover" autoPlay playsInline controls controlsList="nodownload">
            <source src={url}></source>
        </video>
    </div>)
}