import { create } from 'zustand'

interface PlayerState {
  currentAnimation: string
  setCurrentAnimation: (anim: string) => void

  targetListener: string
  setTargetListener: (targetListener: string) => void

  canControl: boolean
  setCanControl: (canControl: boolean) => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentAnimation: 'idle',
  setCurrentAnimation: (currentAnimation: string) =>
    set(() => ({ currentAnimation })),

  targetListener: 'canvas',
  setTargetListener: (targetListener: string) =>
    set(() => ({ targetListener })),

  canControl: true,
  setCanControl: (canControl: boolean) => set(() => ({ canControl })),
}))
