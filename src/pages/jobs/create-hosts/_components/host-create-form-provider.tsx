import { FormInstance } from "antd"
import { useForm } from "antd/es/form/Form"
import { createContext, useContext } from "react"
import { HostCreateFormData } from "./host-create-form"

type FormContextType = {
  form: FormInstance<HostCreateFormData>
  readonly?: boolean
  fromSubTask?: boolean
}

const FormContext = createContext<FormContextType | null>(null)

export default function HostCreateFormProvider({
  readonly,
  fromSubTask,
  children,
}: {
  readonly?: boolean
  fromSubTask?: boolean
  children: React.ReactNode
}) {
  const [form] = useForm<HostCreateFormData>()

  return (
    <FormContext.Provider value={{ form, readonly, fromSubTask }}>
      {children}
    </FormContext.Provider>
  )
}

export function useHostCreateForm() {
  const formContext = useContext(FormContext)

  if (!formContext) {
    throw new Error(
      "useHostCreateForm has to be used within <HostCreateFormProvider>",
    )
  }

  return formContext
}
