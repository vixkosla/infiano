import { AvatarImage, Avatar } from '../ui/avatar';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

import { useState, useEffect } from 'react';

import { useGlobalStore } from '~/store/useGlobalStore';

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
                <h1 className="title">CHAT</h1>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-10 bg-gray-100 p-10">
                    {/* <p>Hello Chat</p> */}
                    <ChatComponent prompt={initialPrompt}/>
                    <ChatComponent prompt={selectedPrompt} bg-secondary text-secondary-foreground />

                </div>
            </div>
        </>
    )
}

type Message = {
    type: 'human' | 'ai';
    content: string;
};

const ChatComponent = ({ dialog = [], prompt = '' }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        // Initialize chat with some messages
        setMessages(dialoge);
    }, []);

    const handleSendMessage = async () => {
        if (!input.trim()) return; // Prevent sending empty messages

        const newMessage = {
            type: 'human',
            content: input
        }

        const updatedMessages = [...messages, newMessage]; // <- правильно собрать новые сообщения

        // setMessages(updatedMessages);

        console.log('Sending message:', updatedMessages);

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

            setInput('');


        } catch (error) {
            console.log('Error sending message:', error);
        }
    }

    return (
        <>
            <Card className='h-128 w-108 rounded-none py-0'>
                <CardContent className=' h-96 flex flex-col gap-4 overflow-y-auto '>
                    {messages.map((message, index) => (
                        <div key={index}
                            className={
                                `flex ${message.type === 'human' ? 'ml-auto' : 'mr-auto'
                                } break-words w-max max-w-[75%] flex-col p-2 px-3 text-sm
                                ${message.type === 'human'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted'
                                } animate-fade-in`
                            }
                        >
                            {message.content}</div>
                    ))}
                    {/* <p>This is a simple chat component.</p> */}
                    {/* Add your chat UI here */}
                </CardContent>
                <div className='p4 border-t-4'>
                    <div className='flex items-center gap-2'>
                        <Textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className='flex-1 pr-12'
                            placeholder='Type a message' />
                        <Button className='h-10 w-10'
                            onClick={handleSendMessage}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                stroke='currentColor'
                                strokeWidth="2"
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            >
                                <path d="m5 12 7-7 7 7" />
                                <path d="M12 19v5" />
                            </svg>
                            <span className='sr-only'>Send</span>
                        </Button>
                    </div>
                </div>

            </Card >
        </>
    )
}
