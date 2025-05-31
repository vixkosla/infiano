import { Button } from '../ui/button';
import { Spinner } from './Spinner'
import Protocols from './protocols.png'

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';

import { useState, useEffect } from 'react';

const evalutions = [
    'Evaluation 1',
    'Evaluation 2',
    'Evaluation 3',
    'Evaluation 4',
    'Evaluation 5',
];


export function Loader() {
    const [evaluations, setEvaluations] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchEvaluations = async () => {
            try {
                const resposnse = await fetch('https://auto-llm-api.infiano.app/auto-tune/datasets');
                if (!resposnse.ok) {
                    throw new Error('Failed to fetch evaluations');
                }
                const data = await resposnse.json();
                setEvaluations(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching evaluations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvaluations();
    }, [])

    return (
        <>
            <div className='flex flex-col items-center'>
                <div className='flex flex-col md:flex-row justify-center w-full gap-12 md:gap-48 mt-20'>
                    <div className='flex justify-center'>
                        <h2 className='mr-4 title'>BOT CONFIG</h2>

                        <Button className='bg-blue-500 
                        text-white 
                        hover:bg-blue-600
                        px-16
                        rounded-sm
                        '> Import </Button>
                    </div>

                    <div className='flex justify-center'>
                        <h2 className='mr-4 title'>EVALUTION</h2>

                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Evaluation" />
                            </SelectTrigger>
                            <SelectContent>
                                {evalutions.map((evalute) => (
                                    <SelectItem key={evalute} value={evalute}>
                                        {evalute}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Button className='bg-blue-500 
                        text-white 
                        hover:bg-blue-600
                        px-16
                        rounded-sm
                        '> Import </Button>
                    </div>
                </div>

                <div className='flex flex-col items-center justify-center gap-0 mt-40'>
                    <Button className='bg-orange-400
                    px-28
                    py-8
                    rounded-sm
                    text-xl
                    hover:bg-orange-600
                    '> OPTIMIZE </Button>
                    <div className='
                    w-[400px]
                    h-[250px]
                    sm:w-[500px]
                    sm:h-[350px]'>
                        <img src={Protocols} alt="" />
                    </div>
                </div>

                <Spinner value={20} />

            </div>
        </>
    )
}