"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ScrollIndicatorTooltipProps {
  sections: {
    id: string
    ref: React.RefObject<HTMLDivElement> // Sửa lại đúng kiểu ref cho div
    label: string
  }[]
}

export default function ScrollIndicatorTooltip({ sections }: ScrollIndicatorTooltipProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.ref.current) {
          const offsetTop = section.ref.current.offsetTop
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [sections])

  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2 py-3 px-1 rounded-full bg-white/80 backdrop-blur-sm shadow-sm">
      {sections.map((section) => (
        <div key={section.id} className="relative group">
          <button
            onClick={() => {
              section.ref.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }}
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300 ease-in-out hover:bg-gray-400",
              activeSection === section.id ? "bg-black w-3 h-3" : "bg-gray-300",
            )}
            aria-label={`Scroll to ${section.label}`}
          />
          {hoveredSection === section.id && (
            <div className="absolute right-6 top-0 whitespace-nowrap bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {section.label}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}