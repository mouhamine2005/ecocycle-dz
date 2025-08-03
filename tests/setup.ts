import "@testing-library/jest-dom"
import { afterEach } from "vitest"
import { cleanup } from "@testing-library/react"
import { vi } from "vitest"
import React from "react"

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
}))

// Mock Next.js image
vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: any) => {
    return React.createElement("img", { src: src || "/placeholder.svg", alt, ...props })
  },
}))

// Cleanup after each test
afterEach(() => {
  cleanup()
})
