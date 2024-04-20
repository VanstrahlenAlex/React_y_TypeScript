// import { useMemo } from "react";
import { useCryptoStore } from "../store"
import Spinner from "./Spinner";

export default function CryptoPriceDisplay() {

	const result = useCryptoStore((state) => state.result);
	const loading = useCryptoStore((state) => state.loading);

	// const hasResult = useMemo(() => !Object.values(result).includes(''), [result])

	return (
		<div className="result-wrapper">
			{loading ? <Spinner /> :  result && Object.keys(result).length > 0 && (
				<>
					<h2 className="title">Cotizacion</h2>
					<div className="result">
						<img src={`https://cryptocompare.com/${result.IMAGEURL}`} alt="Imagen Cryptomoneda" />
						<div>
							<p>El precio es de: <span>{result.PRICE}</span></p>
							<p>Precio mas Alto del dia : <span>{result.HIGHDAY}</span></p>
							<p>Precio mas Bajo del dia : <span>{result.LOWDAY}</span></p>
							<p>Variacion ultimas 24 horas <span>{result.CHANGEPCT24HOUR}</span></p>
							<p>Ultima actualizacion: <span>{result.LASTUPDATE}</span></p>
						</div>
					</div>
				</>
			)}	
		</div>
	)
}
