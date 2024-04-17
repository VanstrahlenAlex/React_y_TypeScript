

export default function Error({children}: {children : React.ReactNode}) {
  return (
	<p className="text-center bg-red-600 my-4 text-white font-bold p-3 uppercase text-sm">{children}</p>
  )
}
