export default function Shop({ shop }) {
  console.log(shop);
  return (
    <div className="flex flex-col items-center min-h-screen font-serif p-4 text-lg">
      <div className="max-w-4xl w-full flex flex-col">
        <div className="flex flex-col min-h-screen justify-center items-center">
          <h1 className="text-4xl font-bold text-center">{shop.title}</h1>
          <p className="text-center my-1">{shop.description}</p>

          {shop.items.map((product, idx) => {
            return (
              <div key={idx} className="flex flex-col">
                <img
                  width={200}
                  height={200}
                  src={"https://unsplash.it/200/200"}
                />
                <h2 className="my-1">{product.title}</h2>

                <p className="my-1">{product.price}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
