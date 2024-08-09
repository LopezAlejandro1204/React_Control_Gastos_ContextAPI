import { useReducer, createContext, ReactNode, useMemo } from "react"
import { BudgetActions, budgetReducer, BudgetState, InitialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: React.Dispatch<BudgetActions>
    totalExpenses: number
    remainingBudget: number
}

type BudgetProviderProps = {
    children: ReactNode
}

//Creamos el CONTEXT - es la accion de tener el estado global - espera argumento, 2 opciones, objeto vacio o null!
export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps) 
//Es como decirle a TypeScipt, confia en mi yo se lo que te voy a pasar

//---PROVIDER --- De donde vienen los datos - del reducer
//siempre es un ArrowFunction
export const BudgetProvider = ({children} : BudgetProviderProps) =>{ //el children es el hijo/hijos de un componente
    //usamos el useReducer 

    const [state, dispatch] = useReducer(budgetReducer, InitialState)

    const totalExpenses = useMemo(()=> state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses])

    const remainingBudget = state.budget - totalExpenses


    return(
        //Esto debe rodear toda nuestra app de React
        <BudgetContext.Provider //ya se conecta el CONTEXT CON el PROVIDER
            value={{
                state,
                dispatch,
                totalExpenses,
                remainingBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}