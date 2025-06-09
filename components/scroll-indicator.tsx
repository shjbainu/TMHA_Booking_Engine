"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface Section {
  id: string
  ref: React.RefObject<HTMLElement>
}

interface ScrollIndicatorProps {
  sections: Section[]
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-20% 0% -30% 0%", // Adjust as needed
      },
    )

    sections.forEach((section) => {
      if (section.ref.current) {
        observer.observe(section.ref.current)
      }
    })

    return () => {
      sections.forEach((section) => {
        if (section.ref.current) {
          observer.unobserve(section.ref.current)
        }
      })
    }
  }, [sections])

  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2 py-3 px-1 rounded-full bg-white/80 backdrop-blur-sm shadow-sm">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => {
            section.ref.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }}
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-300 ease-in-out hover:bg-gray-400",
            activeSection === section.id ? "bg-black w-3 h-3" : "bg-gray-300",
          )}
          aria-label={`Scroll to ${section.id}`}
        />
      ))}
    </div>
  )
}

export default ScrollIndicator
