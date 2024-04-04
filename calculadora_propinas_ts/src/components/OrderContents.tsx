import { formatCurrency } from "../helpers"
import { MenuItem, OrderItem } from "../types"

type OrderContentsProps = {
	order: OrderItem[],
	removeItem: (id: MenuItem['id']) => void;
}

export default function OrderContents({order, removeItem} : OrderContentsProps) {
	return (
		<div>
			<h2 className='font-black text-4xl'>Consumo</h2>
			<div className="space-y-3 mt-10">
				{
					order.map((item) => (
						<div key={item.id}
							className="flex justify-between border-t border-gray-200 hover:bg-gray-200 py-5 rounded last-of-type:border-b items-center"
						>
							<div>
								<p className="text-lg">
								{item.name} - {formatCurrency(item.price)}
								</p>
								<p className="font-black">
									Cantidad: {item.quantity} - {formatCurrency(item.price * item.quantity)}
								</p>
							</div>
							
							<button className="bg-red-600 hover:bg-red-800 cursor-pointer h-8 w-8 rounded-full text-white font-black mr-2"
								onClick={() => removeItem(item.id)}
							>X</button>
						</div>
					))
				}

			</div>
		</div>
	)
}
