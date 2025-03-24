// This file contains utilities for performance optimization and load handling

// Function to determine if a page should be statically generated or server-rendered
// based on traffic patterns
export function getGenerationStrategy(path: string) {
  // Pages that should always be statically generated
  const staticPages = ["/about", "/privacy", "/terms", "/contact"]

  // Pages that should be server-rendered
  const dynamicPages = ["/search", "/api/"]

  // Check if the path is in the static pages list
  if (staticPages.some((page) => path === page)) {
    return {
      revalidate: 60 * 60 * 24, // 24 hours
      preferStatic: true,
    }
  }

  // Check if the path is in the dynamic pages list
  if (dynamicPages.some((page) => path.startsWith(page))) {
    return {
      revalidate: false,
      preferStatic: false,
    }
  }

  // Default strategy for other pages
  return {
    revalidate: 60 * 60, // 1 hour
    preferStatic: true,
  }
}

// Function to implement circuit breaker pattern for API calls
export class CircuitBreaker {
  private failureCount = 0
  private lastFailureTime = 0
  private isOpen = false

  constructor(
    private readonly failureThreshold: number = 5,
    private readonly resetTimeout: number = 30000, // 30 seconds
  ) {}

  async execute<T>(fn: () => Promise<T>, fallback: () => Promise<T>): Promise<T> {
    if (this.isOpen) {
      // Check if the circuit should be reset
      const now = Date.now()
      if (now - this.lastFailureTime > this.resetTimeout) {
        this.isOpen = false
        this.failureCount = 0
      } else {
        // Circuit is open, use fallback
        return fallback()
      }
    }

    try {
      // Execute the function
      const result = await fn()
      // Reset failure count on success
      this.failureCount = 0
      return result
    } catch (error) {
      // Increment failure count
      this.failureCount++
      this.lastFailureTime = Date.now()

      // Open the circuit if threshold is reached
      if (this.failureCount >= this.failureThreshold) {
        this.isOpen = true
      }

      // Use fallback
      return fallback()
    }
  }
}

// Create circuit breakers for different API endpoints
export const tmdbCircuitBreaker = new CircuitBreaker()

// Function to implement backoff strategy for retries
export async function withRetry<T>(fn: () => Promise<T>, maxRetries = 3, initialDelay = 1000): Promise<T> {
  let retries = 0
  let delay = initialDelay

  while (true) {
    try {
      return await fn()
    } catch (error) {
      retries++

      if (retries >= maxRetries) {
        throw error
      }

      // Exponential backoff
      await new Promise((resolve) => setTimeout(resolve, delay))
      delay *= 2
    }
  }
}

