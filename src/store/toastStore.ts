import { create } from 'zustand'

export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  type: ToastType
  message: string
  timestamp: number
  timeout?: number
}

interface ToastState {
  toasts: Toast[]
  addToast: (type: ToastType, message: string, timeout?: number) => void
  removeToast: (id: string) => void
  clearAll: () => void
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  addToast: (type, message, timeout = 5000) => {
    const id = `${Date.now()}-${Math.random()}`
    const toast: Toast = {
      id,
      type,
      message,
      timestamp: Date.now(),
      timeout,
    }

    set((state) => ({ toasts: [...state.toasts, toast] }))

    // Auto-remove after timeout
    if (timeout > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }))
      }, timeout)
    }
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),

  clearAll: () => set({ toasts: [] }),
}))
