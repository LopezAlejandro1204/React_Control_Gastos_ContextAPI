//------------Formulario simple de presupuesto(budget)

import { useMemo, useState } from "react"
//---------importamos el hook que tiene el Context
import { useBudget } from "../hooks/useBudget"

export default function BudgetForm() {

    const [budget, setBudget] = useState(0) //inicial en 0 del estado del prespuesto
    //----para el custom hook - los cuales siempre usan llaves
    const {dispatch} = useBudget()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }

    //---Funcion de validacion del formulario
    const isValid = useMemo(() =>{
        //verifica si es NaN o es 0 - osea si no es un presupuesto valido
        return isNaN(budget) || budget <= 0 
    }, [budget])

    //-------Para el submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch({type: 'add-budget', payload: {budget} })
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-blue-800 font-bold text-center">
                    Definir presupuesto
                </label>
                <input 
                    id="budget"
                    type="number"
                    className="w-full bg-white border border-gray-200 p-2"
                    placeholder="Define tu presupuesto"
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                />
            </div>
            <input 
                id="budget"
                type="submit"
                className="bg-blue-600 hover:bg-blue-800 cursor-pointer text-white w-full p-2 uppercase font-bold disabled:opacity-40"
                value='Definir presupuesto'
                disabled={isValid}
            />
        </form>
    )
}
