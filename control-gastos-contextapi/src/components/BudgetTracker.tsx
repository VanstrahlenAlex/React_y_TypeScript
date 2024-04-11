
import AmountDisplay from './AmountDisplay'

export default function BudgetTracker() {
  return (
	<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
		<div className='flex justify-center items-center'>
			<img src="/grafico.jpg" alt="Grafica de gatos" />
		</div>

		<div className='flex flex-col justify-center items-center gap-8'>
			<button
				type='button'
				className='bg-pink-600 hover:bg-pink-700 cursor-pointer w-full text-white font-bold p-2 uppercase rounded-lg'
			>
				Resetear App
			</button>
			<AmountDisplay 
				label="Presupuesto"
				amount={300}
			/>

			<AmountDisplay 
				label="Disponible"
				amount={200}
			/>

			<AmountDisplay 
				label="Gastado"
				amount={100}
			/>
		</div>
	</div>
  )
}
