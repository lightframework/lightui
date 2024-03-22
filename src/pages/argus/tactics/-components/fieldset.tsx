import clsx from "clsx"

export interface FieldSetProps {
  index: number
  title: string
  className?: string
  children?: React.ReactNode
}

export default function FieldSet({
  index,
  title,
  className,
  children,
}: FieldSetProps) {
  return (
    <div>
      <div className="flex items-center gap-2 py-6 text-sm">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3f56e2] text-white">
          {index}
        </span>
        <span className="font-semibold">{title}</span>
      </div>
      <div
        className={clsx("p-3", className)}
        style={{
          boxShadow: "rgba(0, 0, 0, .09) 0px 3px 12px",
        }}
      >
        {children}
      </div>
    </div>
  )
}
