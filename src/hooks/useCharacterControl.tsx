import { useMemo } from 'react'

import { usePlayerStore } from '../stores/player'
import { useControls } from './useControls'

export const useCharacterControl = (animations = ['idle', 'run']) => {
  const canControl = usePlayerStore((state) => state.canControl)
  const { forward, backward, left, right } = useControls(canControl)

  const anim = useMemo(() => {
    let a = ''
    if (forward || backward || left || right) a = animations[1]
    else a = animations[0]

    return a
  }, [forward, backward, left, right, animations])

  return anim
}
