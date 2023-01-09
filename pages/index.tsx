import Seo from "../components/Seo";
import { useForm } from "react-hook-form";
import useSWR, { Fetcher } from "swr";
import Loading from "../components/Loading";
import DataError from "../components/DataError";
import { Props, IFormInput } from "../interfaces/interface";
import Nav from "../components/Nav";

export default function Home() {
  //react-hook-form
  const {
    register,
    watch,
  } = useForm<IFormInput>();

  const { amount, crypto } = watch();
  //fetcher function to fetch data from coingecko api
  const fetcher: Fetcher<Props, string> = async (url) => {
    const res = await fetch(url);
    return res.json();
  };

  //useSWR hook to fetch data from coingecko api
  const { data, error, isLoading } = useSWR<Props, Error>(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cripple%2Cmatic-network%2Csolana&vs_currencies=php",
    fetcher
  );

  if (isLoading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Seo />
      <Nav />
      {data ? (
        <main className="min-h-screen w-full grid place-items-center">
          <section>
            <p className="py-5 text-2xl font-bold">
              Convert crypto to Philippine peso
            </p>
            <input
              {...register("amount")}
              className="rounded-md py-2 px-2 w-full border border-blue-400"
              type="number"
              placeholder="Enter Amount to Convert"
              maxLength={10}
            />
            <br />
            <select
              {...register("crypto")}
              className="my-2 py-2 px-1 rounded-md w-full border border-blue-400"
            >
              <optgroup label="Crypto">
                <option value="bitcoin">Bitcoin (BTC)</option>
                <option value="ethereum">Ethereum (ETH)</option>
                <option value="ripple">Ripple (XRP)</option>
                <option value="matic-network">Polygon (MATIC)</option>
                <option value="solana">Solana (SOL)</option>
              </optgroup>
            </select>
            {amount && crypto && (
              <input
                type="text"
                value={`${data[crypto].php * amount} PHP`}
                readOnly
                className="text-gray-500 rounded-md py-2 px-2 w-full border border-blue-400"
              />
            )}
          </section>
        </main>
      ) : (
        <DataError />
      )}
    </>
  );
}
