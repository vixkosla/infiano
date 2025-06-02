import { AvatarImage, Avatar } from '../ui/avatar';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

import { useState, useEffect, useRef } from 'react';

import { useGlobalStore } from '~/store/useGlobalStore';

import { Forward } from 'lucide-react';

import ReactMarkdown from 'react-markdown';

import { cn } from '~/lib/utils';

const dialoge = [
    {
        "type": "human",
        "content": "my phone is not working"
    },
    {
        "type": "ai",
        "content": "\"I'm sorry to have further assistance.\""
    },
    {
        "type": "human",
        "content": "asdfasdfasdfasdfsdfasdfasdfasdfsdfasdfasdfasdfsdfasdfasdfasdfsdfasdfasdfasdfsdfasdfasdfasdfsdfasdfasdfasdfsdfasdfasdfasdfsdfasdfasdfasdfsdfasdfasdfasdf"
    },
    {
        "type": "ai",
        "content": "asdfasdfasdfasdf"
    }, {
        "type": "human",
        "content": "my phone is not working"
    },
    {
        "type": "ai",
        "content": "\"I'm sorry to have further assistance.\""
    },
    {
        "type": "human",
        "content": "asdfasdfasdfasdf"
    },
    {
        "type": "ai",
        "content": "asdfasdfasdfasdf"
    }
]

export function Chat() {
    const { initialPrompt, selectedPrompt } = useGlobalStore();

    return (
        <>
            <div className="mt-40 mb-40 max-w-[1050px] mx-auto">
                <h1 className="title text-center text-gray-500">CHAT</h1>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-10 p-10">
                    {/* <p>Hello Chat</p> */}
                    <ChatComponent prompt={initialPrompt} side='left' title='BEFORE' />
                    <ChatComponent prompt={selectedPrompt} side='right' title='AFTER' />

                </div>
            </div>
        </>
    )
}

type Message = {
    type: 'human' | 'ai';
    content: string;
};

const ChatComponent = ({ title = 'BEFORE', dialog = [], prompt = '', side = 'left' }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');

    const contentRef = useRef<HTMLDivElement>(null);

    const { selectedPromptIndex, isOptimized } = useGlobalStore();

    const scrollToBottom = () => {

    }

    // Вот добавляем onKeyDown на Textarea:
    const onTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // если нажали Enter без Shift – отправляем; иначе (Shift+Enter) даём вводить новую строку
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()      // чтоб не добавлять '\n' в саму текстовую область
            handleSendMessage()
        }
    }

    const decodeNewlines = (text: string) => {
        return text.replace(/\\n/g, '\n');
    };

    useEffect(() => {
        // Initialize chat with some messages
        // setMessages(dialoge);
        contentRef.current?.scrollTo({
            top: contentRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim()) return; // Prevent sending empty messages

        const newMessage = {
            type: 'human',
            content: input
        }

        const updatedMessages = [...messages, newMessage]; // <- правильно собрать новые сообщения

        // setMessages(updatedMessages);

        console.log('Sending message:', updatedMessages);
        console.log('PROMPT:', prompt);

        try {
            const response = await fetch('https://auto-llm-api.infiano.app/auto-tune/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: prompt,
                    dialog: updatedMessages
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const data = await response.json();
            console.log('Received response:', data);

            const reply = {
                type: 'ai',
                content: data.reply || 'No response from AI'
            }

            const replyMessages = [...messages, newMessage, reply]; // <- правильно собрать новые сообщения с ответом AI

            setMessages(replyMessages)
            scrollToBottom();

            setInput('');


        } catch (error) {
            console.log('Error sending message:', error);
        }
    }

    return (
        <>
            <Card
                className={cn(
                    "h-128 w-96 rounded-none py-0 gap-0",
                    side === 'right'
                        ? "bg-blue-50 border-blue-200"
                        : "bg-orange-50 border-orange-200",
                    // добавляем side === 'right' в условие
                    side === 'right' && !isOptimized && "opacity-20 pointer-events-none cursor-not-allowed bg-muted/50"
                )}
                // тоже только для правой карточки ставим aria-disabled
                aria-disabled={side === 'right' && !isOptimized}
            >
                <CardHeader className='bg-none opacity-30'>
                    <CardTitle className=''>
                        <div className='flex items-center  justify-between p-2'>
                            <div className="italic ">{title}</div>
                            {side === 'right' && <div className="font-mono">{selectedPromptIndex}</div>}
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent ref={contentRef} className='overflow-y-scroll scrollbar-thin scrollbar-thumb-yellow-400 h-96 flex flex-col gap-4 overflow-y-scroll py-5'>
                    {messages.map((message, index) => (
                        <div key={index}
                            className={
                                `${(side === 'right' && message.type === 'ai') ? 'left-ai ' : ''}`
                                +
                                `${(side === 'left' && message.type === 'ai') ? 'right-ai ' : ''}`
                                +
                                `${message.type === 'human' ? 'human-style ' : ''}`
                                +
                                ` flex 
                                ${message.type === 'human' ?
                                    'ml-auto ' :
                                    'mr-auto '
                                } 
                                break-words w-max max-w-[75%] flex-col p-2 px-3 text-xs
                                animate-fade-in rounded-lg
                                `
                            }
                        // ref={index === messages.length - 1 ? contentRef : null}
                        >
                            {message.type === 'ai'
                                ? <ReactMarkdown>{decodeNewlines(message.content)}</ReactMarkdown>
                                : message.content}</div>
                    ))}
                    {/* <div ref={bottomRef} className="scroll-end"></div> */}

                    {/* <p>This is a simple chat component.</p> */}
                    {/* Add your chat UI here */}
                </CardContent>
                <div className='p4 border-t-4'>
                    <div className='flex items-center justify-stretch gap-2 '>
                        <Textarea
                            onKeyDown={onTextareaKeyDown}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className='flex-1 pr-12 border-0 shadow-none focus:ring-0 focus:border-0 rounded-none resize-none text-xs'
                            placeholder='Type a message . . .' />
                        <Button className={`h-10 w-10 rounded-none
                         ${side === 'right' ? 'bg-blue-200 hover:bg-blue-300' : 'bg-orange-200 hover:bg-orange-300'}`}
                            onClick={handleSendMessage}>
                            <Forward size={90} strokeWidth={2.5} />
                        </Button>
                    </div>
                </div>

            </Card >
        </>
    )
}
