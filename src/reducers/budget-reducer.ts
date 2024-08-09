//---------El reducer de la App
import { v4 as uuidV4 } from 'uuid' //Para crear IDs
import { Category, DraftExpense, Expense } from "../types" //es lo sdatos del form pero sin el ID


//-Las Acciones
export type BudgetActions =
    { type: 'add-budget', payload: {budget: number}} |
    { type: 'show-modal'} | 
    { type: 'close-modal'} |
    { type: 'add-expense', payload: { expense: DraftExpense }}|  //Pra agregar un nuevo gasto
    { type: 'remove-expense', payload: {id: Expense['id']}} |
    { type: 'get-expense-by-id', payload: {id: Expense['id']}} | //A cion para capturar los datos
    { type: 'update-expense' , payload: { expense: Expense }}| //Accion para actualizar
    { type: 'reset-app'} |
    { type : 'app-filter-category', payload: {id: Category['id']}}

//--Los state
export type BudgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[] //los datos del gasto de typo arreglo vacio
    editingId: Expense['id']
    currentCategory: Category['id']
}

//Funciones para luego usar el LocalStorage
//para el presupuesto
const initialBudget = () : number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}
//para los gastos
const localStorageExpenses = () : Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}


//-InitialState - estado inicial - objeto
export const InitialState : BudgetState ={
    budget: initialBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editingId: '',
    currentCategory: ''
}

//Funcion para crear ID - y retornar el EXPENSE COMPLETO
const createExpense = (draftExpense: DraftExpense) : Expense =>{
    return {
        ...draftExpense,
        id: uuidV4()
    }
}

//--Los REDUCER - funcion
export const budgetReducer = (
        state: BudgetState = InitialState,
        action: BudgetActions 
    ) => {

    if (action.type === 'add-budget'){
        return{
            ...state,
            budget: action.payload.budget //se agrega lo que se reciba más su anterior
        }
    }
    if (action.type === 'show-modal'){
        return{
            ...state,
            modal: true
        }
    }
    if (action.type === 'close-modal'){
        return{
            ...state,
            modal: false,
            editingId: ''
        }
    }

    if (action.type === 'add-expense'){

        //Creamos id
        const expense = createExpense(action.payload.expense)

        return {
            ...state,
            expenses: [...state.expenses, expense], //copia más un expense con todo y id nuevo
            modal: false  //si deseamos cerrar todo el formulario una vez con el dato registrado
        }
    }

    if(action.type === 'remove-expense'){
        console.log('Que fue wilson')
        return {
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
        }
    }

    if(action.type === 'get-expense-by-id'){
        return{
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }

    if(action.type === 'update-expense'){
        return{
            ...state,
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? 
                action.payload.expense : expense),
            modal: false,
            editingId: ''
        }
    }

    if(action.type === 'reset-app'){
        return{
            ...state,
            budget: 0,
            expenses: [],
        }
    }

    if(action.type === 'app-filter-category'){
        return {
            ...state,
            currentCategory: action.payload.id
        }
    }
    
    return state
}