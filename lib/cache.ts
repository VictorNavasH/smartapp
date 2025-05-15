// Simple in-memory cache implementation

type CacheItem = {
  value: unknown
  expiry: number | null
}

class Cache {
  private cache: Map<string, CacheItem>
  private defaultTTL: number // Time to live in milliseconds

  constructor(defaultTTL = 5 * 60 * 1000) {
    // Default 5 minutes
    this.cache = new Map()
    this.defaultTTL = defaultTTL
  }

  set(key: string, value: unknown, ttl?: number): void {
    const expiry = ttl ? Date.now() + ttl : this.defaultTTL ? Date.now() + this.defaultTTL : null
    this.cache.set(key, { value, expiry })
  }

  get(key: string): unknown | null {
    const item = this.cache.get(key)

    // If item doesn't exist or has expired
    if (!item || (item.expiry && item.expiry < Date.now())) {
      if (item) {
        this.delete(key) // Clean up expired item
      }
      return null
    }

    return item.value
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  // Clean up expired items
  cleanup(): void {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (item.expiry && item.expiry < now) {
        this.delete(key)
      }
    }
  }
}

// Create a singleton instance
export const cache = new Cache()

// Set up periodic cleanup
if (typeof window !== "undefined") {
  setInterval(() => {
    cache.cleanup()
  }, 60 * 1000) // Run cleanup every minute
}
