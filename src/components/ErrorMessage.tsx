import { ReactNode } from "react"

type ErrorMessageProps = {
    children: ReactNode
}

//REACT NODE permite reenderizar estrings y tmb componentes

//al usar children, pasar el dato que le estemos enviando - COMO HIJO
export default function ErrorMessage({children} : ErrorMessageProps) {
    return (
        <p className="bg-red-600 p-2 text-white font-bold text-sm text-center">
            {children} 
        </p>
    )
}
