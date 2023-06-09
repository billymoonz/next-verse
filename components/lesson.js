'use client';

import React from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

export function Lesson({ data }) {
    const video = React.useRef(null);
    
    const [isLoading, setLoading] = React.useState(true);
    const [playing, setPlaying] = React.useState(false);

    const toggleVideo = () => {
        setPlaying((prev) => {
            if (prev) {
                video.current.pause();
            } else {
                video.current.play();
            }
            return !prev;
        })
    }

    return (<div className="mt-[24px]">
        <video onCanPlayThrough={() => setLoading(false)} style={{ display: isLoading ? 'none' : 'initial' }}onEnded={() => setPlaying(false)} ref={video}>
            <source src={`http://localhost:3000/api/lesson-video/${data.lesson.id}`} type="video/mp4" />
        </video>
        {isLoading && <img alt='thumbnail' src={data.lesson.thumbnail} className='w-full object-cover'/>}
        <div className='mt-[8px]'>
            <Button onClick={toggleVideo} variant="outline">{playing ? <Icons.pause /> : <Icons.play />}</Button>
        </div>
    </div>)
}