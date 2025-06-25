interface ProgressIndicatorProps {
  currentStep: number
  steps: string[]
}

export default function ProgressIndicator({ currentStep, steps }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-6">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`
            w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
            ${index + 1 <= currentStep ? "bg-[#0a0a0a] text-white" : "bg-[#d9d9d9] text-[#999999]"}
          `}
          >
            {index + 1}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`
              w-16 h-0.5 mx-2
              ${index + 1 < currentStep ? "bg-[#0a0a0a]" : "bg-[#d9d9d9]"}
            `}
            />
          )}
        </div>
      ))}
    </div>
  )
}
