//--PARA LOS DETALLES DE LOS GASTOS

import { useMemo } from "react"
import { 
    LeadingActions, //las acciones que vienen de los costados
    SwipeableList, 
    SwipeableListItem, //las acciones y su configuracion
    SwipeAction,
    TrailingActions //Las acciones que vienen del otro lado
} from 'react-swipeable-list' //para crear un swipe en los gastos

import "react-swipeable-list/dist/styles.css" //la hoja de estilos

import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"

//Traemos la accion
import { useBudget } from "../hooks/useBudget"

type ExpenseDetailProps = {
    expense : Expense
}

export default function ExpenseDetail({expense} : ExpenseDetailProps) {

    const { dispatch } =useBudget()

    //Filtra sobre el arreglo y encuentra la categoria de ese gasto
    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0] ,[expense])

    //Funciones para el Swipe
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction 
                onClick={() => dispatch({type: 'get-expense-by-id', payload: {id: expense.id}})}
            >
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
                onClick={()=> dispatch({type: 'remove-expense', payload: {id: expense.id}})}
                destructive={true} //este prop lo elimina de la pagina pero no del state
            >
                eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={1} //Los pixeles que se recorren para que
                leadingActions={leadingActions()} //izquierda arrastramos
                trailingActions={trailingActions()} //derecha izquierda
            >
                <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center">
                    <div>   
                        <img 
                            src={`/icono_${categoryInfo.icon}.svg`} 
                            alt="icono gasto"
                            className="w-20"
                        />
                    </div>

                    <div className="flex-1 space-y-2">
                        <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                        <p> {expense.expenseName}</p>
                        <p className="text-slate-600 text-sm">{formatDate (expense.date!.toString())}</p>
                    </div>

                    <AmountDisplay
                        amount={expense.amount}
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
