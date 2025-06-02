import Left from './left-circle.png'
import Right from './right-circle.png'

import * as React from "react";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '../ui/carousel';

import useEmblaCarousel from 'embla-carousel-react';

import { useGlobalStore } from '~/store/useGlobalStore';
import { useEffect, useState } from 'react';

// const Prompts = [
//     'Prompt 1',
//     'Prompt 2',
//     'Prompt 3',
//     'Prompt 4',
//     'Prompt 5',
// ];

export function Config() {

    const { initialPrompt, Prompts, isOptimized, selectedPrompt, selectedPromptIndex, setSelectedPrompt, setSelectedPromptIndex } = useGlobalStore();

    // Локальный стейт для Embla-API
    const emblaRef = useEmblaCarousel

    const [emblaApi, setEmblaApi] = useState<CarouselApi | undefined>(
        undefined
    );

    // Как только emblaApi инициализируется, подписываемся на событие select
    useEffect(() => {
        if (!emblaApi) {
            console.log('Embla API not initialized yet');
            return;
        }

        console.log('Embla API initialized:', emblaApi);

        const onSelect = () => {
            console.log(Prompts)
            const index = emblaApi.selectedScrollSnap();
            // const prompt = ;
            // console.log(index, prompt);
            console.log(Prompts[index])
            setSelectedPrompt(Prompts[index]);
            console.log(selectedPrompt)
            console.log(index)
            setSelectedPromptIndex(index + 1);
            console.log(selectedPromptIndex)
            console.log('Hello World')
        };

        // При инициализации — сразу вызовем, чтобы установить prompt, соответствующий стартовому слайду
        onSelect();

        emblaApi.on("select", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi?.selectedScrollSnap()]);

    // useEffect(() => {
    //     setSelectedPrompt(Prompts[selectedIndex] || '');
    // }, [selectedIndex])

    return (
        <>
            <div className='flex mt-20 flex-col items-center max-w-[1050px] mx-auto'>
                <div className='flex justify-end'>
                    <h1 className='title text-gray-500'>CONFIG</h1>
                </div>
                <div className='flex flex-col sm:flex-row justify-center gap-24 items-start mt-10'>
                    <Card title="Initial Prompt" text={initialPrompt || 'No initial prompt.'}/>

                    <div className="mx-auto max-w-xs">
                        <Carousel setApi={setEmblaApi} className='w-full max-w-xs w-full' opts={{
                            align: "start",
                            loop: true,
                        }}>
                            <CarouselContent>
                                {Prompts.length > 0 ? (
                                    Prompts.map((card, index) => (
                                        <CarouselItem key={index} className=''>
                                            <div className='flex items-center justify-center'>
                                                <AfterCard title={`Prompt #${index + 1}`} text={card} />
                                            </div>
                                        </CarouselItem>
                                    ))
                                ) : (
                                    <CarouselItem className='flex-[0_0_AUTO] w-[335px]'>
                                        <div className='flex items-center justify-center'>

                                            <AfterCard title="Optimization in progress..." text="New prompts will appear here after optimization." />
                                        </div>

                                    </CarouselItem>
                                )}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                    {/* <div className="mt-4 text-xs text-gray-500">
                        <div>🟢 <b>Selected Prompt Index:</b> {selectedPromptIndex}</div>
                        <div>📝 <b>Selected Prompt:</b> {selectedPrompt}</div>
                    </div> */}
                </div>
            </div>
        </>
    )
}

function Card({ title, text }: { title: string; text: string }) {
    return (
        <div className='flex flex-col items-center w-[320px] h-[320px] h-min-[320px] justify-start border-2 border-orange-200 pb-5'>
            <h4 className='text-center font-normal font-mono font-thin py-5'>{title}</h4>
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
        <div className='flex flex-col items-center justify-start  h-max aspect-square border-2 border-blue-200 pb-5'>
            <h4 className='text-center py-5 font-mono font-thin'>{title}</h4>
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