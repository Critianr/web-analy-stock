import { useEffect } from 'react'
import { auth, onAuthStateChanged, signInWithGoogle, signOut } from '@/services/firebase'
import { useAuthStore } from '@/store/authStore'
import type { User } from '@/types'

export function useAuth() {
  const { user, isLoading, setUser, setLoading, logout } = useAuthStore()

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const user: User = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
        }
        setUser(user)
      } else {
        setUser(null)
      }
    })

    return unsubscribe
  }, [setUser, setLoading])

  const loginWithGoogle = async () => {
    try {
      setLoading(true)
      const firebaseUser = await signInWithGoogle()
      setUser({
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
      })
    } catch (err) {
      console.error('Google sign-in failed:', err)
      setLoading(false)
      throw err
    }
  }

  const loginAsDemo = () => {
    setUser({
      uid: 'demo-user',
      displayName: 'Usuario Demo',
      email: 'demo@stockiq.app',
      photoURL: null,
    })
  }

  const handleLogout = async () => {
    await signOut()
    logout()
  }

  return { user, isLoading, loginWithGoogle, loginAsDemo, logout: handleLogout }
}
