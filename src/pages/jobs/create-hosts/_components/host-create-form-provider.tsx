import { FormInstance } from "antd"
import { useForm } from "antd/es/form/Form"
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react"
import { HostCreateFormData } from "./host-create-form"

type FormContextType = {
  form: FormInstance<HostCreateFormData>
  isInitial: boolean
  setIsInitial: Dispatch<SetStateAction<boolean>>
}

const FormContext = createContext<FormContextType | null>(null)

export default function HostCreateFormProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [form] = useForm<HostCreateFormData>()
  const [isInitial, setIsInitial] = useState(false)

  return (
    <FormContext.Provider value={{ form, isInitial, setIsInitial }}>
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
