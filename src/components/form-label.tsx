export interface FormLabelProps {
  label: React.ReactNode
  help?: React.ReactNode
}

export default function FormLabel({ label, help }: FormLabelProps) {
  return (
    <div>
      <span className="font-semibold">
        {label}
        {help && "："}
      </span>
      {help && <span className="text-gray-400">{help}</span>}
    </div>
  )
}
