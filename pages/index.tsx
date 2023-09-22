import Seo from "../components/Seo";
import { useForm } from "react-hook-form";
import useSWR, { type Key, type Fetcher } from "swr";
import Loading from "../components/Loading";
import DataError from "../components/DataError";
import { type Props } from "../interface/interface";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

//fetcher function to fetch data from coingecko api
const url: Key =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cripple%2Cmatic-network%2Csolana&vs_currencies=php";
const fetcher: Fetcher<Props, string> = (url) =>
  axios.get(url).then((res) => res.data);

const formSchema = z
  .object({
    amount: z.number({ invalid_type_error: "Enter a number" }).positive(),
    crypto: z.string().default("bitcoin"),
  })
  .required();

type ValidSchema = z.infer<typeof formSchema>;

export default function Home() {
  //react-hook-form
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<ValidSchema>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
  });

  const { amount, crypto } = watch();

  //useSWR hook to fetch data from coingecko api
  const { data, error, isLoading } = useSWR<Props, Error>(url, fetcher);

  if (isLoading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Seo />
      {data ? (
        <main className="min-h-screen w-full grid place-items-center">
          <section>
            <Image
              src="/images/launch.png"
              width={60}
              height={60}
              alt="Blockchain Logo"
              className="translate-y-7 translate-x-4"
            />
            <div className="bg-slate-600/50 p-8 rounded-xl mx-2">
              <p className="pb-5 text-2xl font-bold">
                Convert crypto to &#8369;eso
              </p>
              <form>
                <input
                  {...register("amount", { valueAsNumber: true })}
                  className="rounded-md py-2 px-2 w-full border border-blue-400 bg-base-100"
                  type="number"
                  inputMode="numeric"
                  placeholder="Enter Amount to Convert"
                />
                {errors.amount ? (
                  <p className="text-red-500 text-xs p-1">
                    {errors.amount.message}
                  </p>
                ) : (
                  <br />
                )}
                <select
                  {...register("crypto")}
                  className="my-2 py-2 px-1 rounded-md w-full border border-blue-400 bg-base-100"
                >
                  <optgroup className="mt-2 rounded" label="Crypto">
                    <option value="bitcoin">Bitcoin (BTC)</option>
                    <option value="ethereum">Ethereum (ETH)</option>
                    <option value="ripple">Ripple (XRP)</option>
                    <option value="matic-network">Polygon (MATIC)</option>
                    <option value="solana">Solana (SOL)</option>
                  </optgroup>
                </select>
              </form>
              {amount > 0 && crypto ? (
                <p className="text-center pt-3 font-bold">
                  PHP {(data[crypto].php * amount).toLocaleString("en-US")}
                </p>
              ) : (
                <p className="text-sky-500 text-xs">Loading...</p>
              )}
            </div>
            <p className="grid place-items-center py-3">
              Made with 💚 by @mpotane
            </p>
          </section>
        </main>
      ) : (
        <DataError />
      )}
    </>
  );
}
