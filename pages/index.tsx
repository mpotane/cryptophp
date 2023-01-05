import Seo from "../components/Seo";

export default function Home() {
  return (
    <>
      <Seo />
      <body className="bg-gradient-to-br from-slate-500 to-slate-600">
        <main className="min-h-screen grid place-items-center">
          <div>
            <h1 className="text-2xl py-5">Convert crypto to Philippine peso</h1>
            <input
              className="rounded-md py-2 px-2 w-full"
              type="number"
              placeholder="Enter Amount to Convert"
            />
            <br />
            <select id="crypto" className="my-2 py-2 px-1 rounded-md w-full">
              <optgroup label="Crypto">
                <option value="bitcoin" selected>
                  Bitcoin (BTC)
                </option>
                <option value="ethereum">Ethereum (ETH)</option>
                <option value="ripple">Ripple (XRP)</option>
                <option value="solana">Solana (SOL)</option>
              </optgroup>
            </select>
            <input
              type="text"
              value={"yeyeye"}
              readOnly
              className="text-gray-500 rounded-md py-2 px-2 w-full"
            />
          </div>
        </main>
      </body>
    </>
  );
}
