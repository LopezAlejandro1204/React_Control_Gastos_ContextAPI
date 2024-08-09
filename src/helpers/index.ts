//Para formato de monedas
export function formatCurrency(amount: number){
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(amount)
}

//Para formato de fechas
export function formatDate(dateStr: string):String{
    const dateObj = new Date(dateStr);
    const options : Intl.DateTimeFormatOptions = {
        weekday : 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return new Intl.DateTimeFormat('es-ES', options).format(dateObj)
}