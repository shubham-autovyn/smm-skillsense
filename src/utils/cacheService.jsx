// CacheContext.tsx
import React, { createContext, useContext, useState } from 'react'


const CacheContext = createContext


export const CacheProvider = ({ children }) => {
  const [cache, setCache] = useState(new Map())

  const getAll = () => cache 

  const get = (key) => cache.get(key)

  const set = (key, value) => {
    setCache(prevCache => new Map(prevCache).set(key, value))
  }

  const clear = () => {
    setCache(new Map())
  }

  const remove = (key) => {
    setCache(prevCache => {
      const newCache = new Map(prevCache)
      newCache.delete(key)
      return newCache
    })
  }

  const removeEntriesByRegex = (pattern) => {
    setCache(prevCache => {
      const newCache = new Map(prevCache)
      const keysToRemove = Array.from(newCache.keys()).filter(key => pattern.test(key))
      for (const key of keysToRemove) {
        newCache.delete(key)
      }
      return newCache
    })
  }

  return (
    <CacheContext.Provider value={{ get, getAll, set, clear, remove, removeEntriesByRegex }}>
      {children}
    </CacheContext.Provider>
  )
}

export const useCache = () => {
  const context = useContext(CacheContext)
  if (!context) {
    throw new Error('useCache must be used within a CacheProvider')
  }
  return context
}
