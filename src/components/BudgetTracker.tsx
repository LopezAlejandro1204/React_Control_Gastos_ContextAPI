//------MOSTRARA LO QUE DEFINIMOS, LO QUE TENEMOS Y CUANTO NOS QUEDA EN EL PRESUPUESTO

import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";


//Para la grafica circular
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

export default function BudgetTracker() {

    const {state, totalExpenses, remainingBudget, dispatch} = useBudget()

    const percentage = +((totalExpenses / state.budget) * 100).toFixed(2) //para 2 decimales

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <CircularProgressbar
                    value={percentage}
                    styles={buildStyles({
                        pathColor: percentage > 80 ? '#DC2626' : '#3b82f6',
                        trailColor: '#F5F5F5',
                        textSize: 10,
                        textColor: '#3b82f6'
                    })}
                    text={`${percentage}% Gastado`}
                />
            </div>
        

            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
                    onClick={() => dispatch({type: 'reset-app'})}
                >
                    resetear App
                </button>

                <AmountDisplay
                    label="Presupuesto"
                    amount= {state.budget}
                />
                <AmountDisplay
                    label="Disponible"
                    amount= {remainingBudget}
                />
                <AmountDisplay
                    label="Gatado"
                    amount= {totalExpenses}
                />
            </div>
        </div>
    )
}
