import { create } from 'zustand'

interface PlayerState {
  currentAnimation: string
  setCurrentAnimation: (anim: string) => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentAnimation: 'idle',
  setCurrentAnimation: (currentAnimation: string) =>
    set(() => ({ currentAnimation })),
}))
