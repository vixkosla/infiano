import { Button } from '../ui/button';
import { Spinner } from './Spinner'
import Protocols from './protocols.png'

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';

import { useState, useEffect } from 'react';
import { Textarea } from '../ui/textarea';

import { Loader2 } from 'lucide-react';

import { useGlobalStore } from '~/store/useGlobalStore';

const evalutions = [
    'Evaluation 1',
    'Evaluation 2',
    'Evaluation 3',
    'Evaluation 4',
    'Evaluation 5',
];


export function Loader() {
    const [evaluations, setEvaluations] = useState<string[]>([]);
    const [selectedEvaluation, setSelectedEvaluation] = useState<string>('');
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [optimizing, setOptimizing] = useState(false);

    const { setIsOptimized, setInitialPrompt, setPrompts } = useGlobalStore();

    const [timer, setTimer] = useState(0);

    const startTimer = () => {
        setTimer(0); // Сброс таймера

        // Общее время: 2 минуты = 120000 мс
        // Шаг обновления: 120000мс / 100 единиц = 1200мс
        const interval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prevTimer + 1;
            });
        }, 1200); // 1200мс = 1.2 секунды между обновлениями

        // Очистка при размонтировании (если используете React)
        return () => clearInterval(interval);
    };

    const handleOptimize = async () => {
        if (!input || !selectedEvaluation) {
            alert('Please enter a prompt and select an evaluation.');
            return;
        }

        setOptimizing(true);
        startTimer();

        const body = {
            "prompt": input,
            "dataset_name": selectedEvaluation
        }

        console.log(body)

        try {
            const response = await fetch('https://auto-llm-api.infiano.app/auto-tune/optimize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const data = await response.json();

            setInitialPrompt(body.prompt);
            setPrompts(data.prompts || []);
            setIsOptimized(true)
            setOptimizing(false);

            console.log(data);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    useEffect(() => {

        const fetchEvaluations = async () => {
            try {
                const resposnse = await fetch('https://auto-llm-api.infiano.app/auto-tune/datasets');
                if (!resposnse.ok) {
                    throw new Error('Failed to fetch evaluations');
                }
                const data = await resposnse.json();
                setEvaluations(data.datasets || []);
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

                    <div className='flex flex-col items-center gap-4'>
                        <h2 className=' title text-orange-200'>BOT CONFIG</h2>

                        <Textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter initial prompt"
                            className='shadow-lg rounded-none border-orange-100 w-[250px] h-[90px] sm:w-[250px] sm:h-[75px]' />

                    </div>

                    <div className='flex flex-col  items-center gap-4'>
                        <h2 className='title text-blue-400'>DATA SETS</h2>

                        <Select onValueChange={(value) => {
                            console.log('Selected evaluation:', value);
                            setSelectedEvaluation(value)
                        }}>
                            <SelectTrigger className=' shadow-md w-[200px] sm:w-[200px] rounded-none border-blue-200'>
                                <SelectValue placeholder="Select dataset" />
                            </SelectTrigger>
                            <SelectContent className='rounded-none border-blue-200 '>
                                {loading ? (
                                    <p>Loading...</p>
                                ) : (
                                    evaluations.map((evalute) => (
                                        <SelectItem key={evalute} value={evalute}>
                                            {evalute}
                                        </SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className='flex flex-col items-center justify-center gap-0 mt-40'>
                    <Button
                        disabled={optimizing}
                        onClick={handleOptimize}
                        className='
                    shadow-xl
                    rounded-none
                    text-orange-400
                    border-2
                    bg-white
                    border-orange-200
                    px-16
                    py-7
                    text-xl
                    hover:bg-orange-200
                    hover:text-blue-300
                    hover:border-white
                    tracking-widest
                    '>
                        {optimizing ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                LOADING...
                            </>
                        ) : (
                            "OPTIMIZE"
                        )}
                    </Button>
                    <div className='
                    w-[400px]
                    h-[250px]
                    sm:w-[500px]
                    sm:h-[350px]'>
                        <img src={Protocols} alt="" />
                    </div>
                </div>

                {optimizing && <Spinner value={timer} />}

            </div>
        </>
    )
}