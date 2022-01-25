export default function Shop({ shop }) {
  console.log(shop);
  return (
    <div
      className={`flex flex-col items-center min-h-screen font-serif p-4 text-lg ${shop.color}`}
    >
      <div className="max-w-4xl w-full flex flex-col">
        <div className="flex flex-col min-h-screen justify-center items-center">
          <h1 className="text-5xl font-bold text-center focus:z-10 w-full bg-inherit py-1">
            {shop.title}
          </h1>
          <p className="text-center mb-8 bg-inherit font-bold w-full py-1">
            {shop.description}
          </p>

          {shop.items.map((product, idx) => {
            return (
              <div key={idx} className="flex flex-col">
                <img
                  width={280}
                  height={200}
                  src={product.imageSrc}
                  className="border-2 border-black rounded"
                />
                <h2 className="mt-2 pl-1 font-bold w-full focus:z-10 bg-inherit leading-none py-1">
                  {product.title}
                </h2>

                <p className="mb-4 pl-1 w-full bg-inherit font leading-none font-semibold py-1">
                  {product.price}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
