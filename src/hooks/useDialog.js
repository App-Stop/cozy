import { useEffect, useRef } from 'react'

// Shared dialog behaviour: focuses the dialog on mount, closes on Escape and
// locks page scroll while open. Returns a ref for the dialog element.
export const useDialog = (onClose) => {
  const dialogRef = useRef(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog.contains(document.activeElement)) dialog.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onCloseRef.current()
    }
    const { overflow } = document.body.style

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = overflow
    }
  }, [])

  return dialogRef
}
