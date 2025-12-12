interface FieldFormat {
    label: string
    type: string
    validate?: (value: string) => string
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    required: boolean,
    customValidationMessage?: string
}

interface FormFormat {
  [key: string]: FieldFormat
}

interface FormDataType {
  [key: string]: string
}

interface ErrorMessageType {
  [key: string]: string
}