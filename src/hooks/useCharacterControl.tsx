import { useMemo } from 'react'

import { useControls } from './useControls'

export const useCharacterControl = (animations = ['idle', 'run']) => {
  const { forward, backward, left, right } = useControls()

  const anim = useMemo(() => {
    let a = ''
    if (forward || backward || left || right) a = animations[1]
    else a = animations[0]

    return a
  }, [forward, backward, left, right])

  return anim
}
