import Left from './left-circle.png'
import Right from './right-circle.png'

import { DotButton, useDotButton } from '../ui/Embla/EmblaCarouselDotButton'
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from '../ui/Embla/EmblaCarouselArrowButtons'

import useEmblaCarousel from 'embla-carousel-react';

export function Config() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
    })

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)
    return (
        <>
            <div className='flex mt-20 flex-col items-center'>
                <div className='flex justify-end'>
                    <h1 className='title'>CONFIG</h1>
                </div>
                <div className='flex justify-center gap-12 items-center'>
                    <Card title="Hello World" text="This is a card component sdafas dfasdf asdf as d fasdf" />



                    <div className='embla w-[300px] h-[300px]' >
                        <div className="embla__viewport" ref={emblaRef}>
                            <div className='embla__container'>
                                {cards.map((card, index) => (
                                    <div className='embla__slide' key={index}>
                                        <div className="embla__slide__number ">
                                            <Card title={card.title} text={card.text} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className="embla__controls">
                            <div className="embla__buttons">
                                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                            </div>

                            <div className="embla__dots">
                                {scrollSnaps.map((_, index) => (
                                    <DotButton
                                        key={index}
                                        onClick={() => onDotButtonClick(index)}
                                        className={'embla__dot'.concat(
                                            index === selectedIndex ? ' embla__dot--selected' : ''
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            Hello World!
        </>
    )
}

function Card({ title, text }: { title: string; text: string }) {
    return (
        <div className='w-[300px] h-[300px] bg-gray-100'>
            <h4 className='text-center text-'>{title}</h4>
            <div>
                <img src={Left} alt="" />
            </div>
            <div className='flex justify-center items-center'>
                <p className='text-center '>{text}</p>
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