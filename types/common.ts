interface FieldFormat {
    label: string,
    type: string,
    required: boolean
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