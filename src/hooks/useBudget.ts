import { useContext } from "react"

import { BudgetContext } from "../context/BudgetContext"

export const useBudget = () => {
    const context = useContext(BudgetContext)
    if(!context){
        throw new Error('usebudget must be use within a budgetprovider')
    }
    return context
}