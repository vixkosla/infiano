import { create } from 'zustand';

type State = {
    initialPrompt: string;
    selectedPrompt: string;
    Prompts: string[];
    isOptimized: boolean;
}

type Actions = {
    setInitialPrompt: (prompt: string) => void;
    setSelectedPrompt: (prompt: string) => void;
    setPrompts: (prompts: string[]) => void;
    setIsOptimized: (isOptimized: boolean) => void;
};

type StoreType = State & Actions;

export const useGlobalStore = create<StoreType>((set) => ({
    initialPrompt: '',
    selectedPrompt: '',
    Prompts: [],
    isOptimized: false,

    setInitialPrompt: (prompt: string) => set({ initialPrompt: prompt }),
    setSelectedPrompt: (prompt: string) => set({ selectedPrompt: prompt }),
    setPrompts: (prompts: string[]) => set({ Prompts: prompts }),
    setIsOptimized: (isOptimized: boolean) => set({ isOptimized }),
}));