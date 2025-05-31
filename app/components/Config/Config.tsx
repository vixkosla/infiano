import Left from './left-circle.png'
import Right from './right-circle.png'

import * as React from "react";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '../ui/carousel';

import useEmblaCarousel from 'embla-carousel-react';

import { useGlobalStore } from '~/store/useGlobalStore';
import { useEffect } from 'react';

export function Config() {

    const { Prompts, initialPrompt, isOptimized, setSelectedPrompt, setSelectedPromptIndex } = useGlobalStore();

    // Локальный стейт для Embla-API
    const [emblaApi, setEmblaApi] = React.useState<CarouselApi | undefined>(
        undefined
    );

    // Как только emblaApi инициализируется, подписываемся на событие select
    React.useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            const index = emblaApi.selectedScrollSnap();
            const prompt = Prompts[index] || "";
            setSelectedPrompt(prompt);
            setSelectedPromptIndex(index.toString());
            console.log(index, prompt);
        };

        // При инициализации — сразу вызовем, чтобы установить prompt, соответствующий стартовому слайду
        onSelect();

        emblaApi.on("select", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi]);

    // useEffect(() => {
    //     setSelectedPrompt(Prompts[selectedIndex] || '');
    // }, [selectedIndex])

    return (
        <>
            <div className='flex mt-20 flex-col items-center max-w-[1050px] mx-auto'>
                <div className='flex justify-end'>
                    <h1 className='title'>CONFIG</h1>
                </div>
                <div className='flex flex-col sm:flex-row justify-center gap-24 items-start mt-10'>
                    <Card title="Initial Prompt" text={initialPrompt} />

                    <Carousel setApi={setEmblaApi} className='w-full max-w-[355px] '>
                        <CarouselContent>
                            {Prompts.length > 0 ? (
                                Prompts.map((card, index) => (
                                    <CarouselItem key={index}>
                                        <div className='p-1'>
                                            <AfterCard title={`Prompt #${index + 1}`} text={card} />
                                        </div>
                                    </CarouselItem>
                                ))
                            ) : (
                                <AfterCard title="No Prompts" text="Please add prompts to see them here." />
                            )}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </>
    )
}

function Card({ title, text }: { title: string; text: string }) {
    return (
        <div className='flex flex-col items-center justify-start w-[350px] h-max border-2 border-orange-200 pb-5'>
            <h4 className='text-center font-thin py-5'>{title}</h4>
            <div className='px-5 opacity-50'>
                <img src={Right} alt="" />
            </div>
            <div className='flex justify-center items-center'>
                <p className='text-center py-5 max-w-[260px] text-xs font-light'>{text}</p>
            </div>
        </div>
    )
}

function AfterCard({ title, text }: { title: string; text: string }) {
    return (
        <div className='flex flex-col items-center justify-start w-[350px] h-max aspect-square border-2 border-blue-200 pb-5'>
            <h4 className='text-center font-thin py-5'>{title}</h4>
            <div className='px-5 opacity-50'>
                <img src={Left} alt="" />
            </div>
            <div className='flex justify-center items-center'>
                <p className='text-center py-5 max-w-[260px] text-xs font-light'>{text}</p>
            </div>
        </div>
    )
}


const cards = [
    { title: 'Card 1', text: 'This is card 1d sdfsdf asdf asdf asdfasdfsdfa s' },
    { title: 'Card 2', text: 'This is card 2 asdf asd fasdf asdfasdf ' },
    { title: 'Card 3', text: 'This is card 3 asdf asdfasd asd' },
    { title: 'Card 4', text: 'This is card 4 asdf asdf asdf asdf asdf ' },
]