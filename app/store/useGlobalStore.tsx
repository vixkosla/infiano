import { create } from 'zustand';

type State = {
    initialPrompt: string;
    selectedPrompt: string;
    selectedPromptIndex: number;
    Prompts: string[];
    isOptimized: boolean;
}

type Actions = {
    setInitialPrompt: (prompt: string) => void;
    setSelectedPrompt: (prompt: string) => void;
    setSelectedPromptIndex: (prompt: number) => void;
    setPrompts: (prompts: string[]) => void;
    setIsOptimized: (isOptimized: boolean) => void;
};

type StoreType = State & Actions;

export const useGlobalStore = create<StoreType>((set) => ({
    initialPrompt: '',
    selectedPrompt: '',
    selectedPromptIndex: 0,
    Prompts: [],
    isOptimized: false,

    setInitialPrompt: (prompt: string) => set({ initialPrompt: prompt }),
    setSelectedPrompt: (prompt: string) => set({ selectedPrompt: prompt }),
    setSelectedPromptIndex: (prompt: number) => set({ selectedPromptIndex: prompt }),
    setPrompts: (prompts: string[]) => set({ Prompts: prompts }),
    setIsOptimized: (isOptimized: boolean) => set({ isOptimized }),
}));