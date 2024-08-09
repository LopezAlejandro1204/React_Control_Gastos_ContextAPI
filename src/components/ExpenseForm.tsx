import { categories } from "../data/categories";
import type { DraftExpense, Value } from "../types";
import { useEffect, useState } from "react";

//-----Creando un calendario personalizado
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import DatePicker from 'react-date-picker';
import ErrorMessage from "./ErrorMessage";

import { useBudget } from "../hooks/useBudget"; //desde nuestro hook para usar el reduce

export default function ExpenseForm() {

    //state - como es local no pasa por el hook
    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    //state -- para los errores
    const [error, setError] = useState('') 

    //State para el presupuesto gastado
    const [previousAmount, setPreviousAmount] = useState(0)

    //----
    const {dispatch, state, remainingBudget} = useBudget()

    useEffect(()=>{
        if(state.editingId){
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]

            setExpense(editingExpense)
            setPreviousAmount(editingExpense.amount)
        }
    }, [state.editingId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> ) => {
        const {name, value} = e.target
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name] : isAmountField ? +value : value
        })

    }

    //--Primera funcion para la fecha
    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    //------Para hacer el submit del formulario
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //console.log(Object.values(expense))
        // validar
        if(Object.values(expense).includes('')){ //Si incluye al menos uno de ellos un string vacio
            setError('Todos los campos son obligatorios')
            return
        }

        //Validar que no me pase del limite
        if((expense.amount - previousAmount) > remainingBudget){
            setError('Presupuesto sobrepasado')
            return
        }


        //Agregar o actualizar el gasto
        if(state.editingId){
            dispatch({type: 'update-expense', payload: {expense: {id: state.editingId, ...expense}}})
        }else{
            dispatch({type: 'add-expense', payload: {expense}})
        }
        

        //Ya todo puesto - podemos reiniciar el State - formulario
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
        setPreviousAmount(0)
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend
                className="uppercase text-center text-2xl font-black border-b-4 py-2 border-blue-500"
            >
                {state.editingId ? 'Guardar Cmabios' : 'Nuevo Gasto'}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            {/* Para el nombre del gasto */}
            <div className="flex flex-col gap-2">
                <label 
                    htmlFor="expenseName"
                    className="text-xl"
                >
                    Nombre Gasto: 
                </label>

                <input 
                    type="text" 
                    id="expenseName"
                    placeholder="Añade el nombre del gasto"
                    className="bg-slate-100 p-2"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>
            {/* para la cantidad */}
            <div className="flex flex-col gap-2">
                <label 
                    htmlFor="amount"
                    className="text-xl"
                >
                    Cantidad: 
                </label>

                <input 
                    type="number" 
                    id="amount"
                    placeholder="Añade la cantidad del gasto. Ej. 300"
                    className="bg-slate-100 p-2"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>
            {/* Para la categoria */}
            <div className="flex flex-col gap-2">
                <label 
                    htmlFor="category"
                    className="text-xl"
                >
                    Categoria: 
                </label>

                <select 
                    id="category"
                    //placeholder="Añade el nombre del gasto"
                    className="bg-slate-100 p-2"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value=""> -- Seleccione -- </option>
                    {categories.map( category => (
                        <option 
                            key={category.id}
                            value={category.id}
                            
                        >{category.name}</option>
                    ))}
                </select>
            </div>
            
            <div className="flex flex-col gap-2">
                <label 
                    htmlFor="amount"
                    className="text-xl"
                >
                    Fecha Gastos: 
                </label>
                <DatePicker
                    className="bg-slate-100 p-2 border-0"
                    value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>

            <input 
                type="submit" 
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value={state.editingId ? 'Guardar cambios' : 'Registrar Gastos'}
            />

        </form>
    )
}
