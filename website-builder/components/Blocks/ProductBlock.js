const ProductBlock = ({ block, idx, state, setState, handleUploadImage }) => {
  return (
    <div className="group flex flex-col items-center my-2 max-w-md w-full">
      <div className="flex flex-col w-full">
        <div className="flex flex-col relative">
          <img
            className="border-2 border-black rounded self-center z-0"
            width={384}
            height={280}
            src={block.imageSrc}
          />
          <button
            className="justify-center font-bold px-4 py-2 text-sm text-white bg-black rounded-md max-w-fit absolute top-1 right-0 hidden group-hover:block hover:bg-gray-600"
            onClick={() => {
              setState({
                ...state,
                items: [
                  ...state.items.slice(0, idx),
                  ...state.items.slice(idx + 1),
                ],
              });
            }}
          >
            Delete Block
          </button>
          <form>
            <label className="cursor-pointer justify-center font-bold px-4 py-2 text-sm text-white bg-black  rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 disabled:bg-gray-600 max-w-fit absolute bottom-1 right-0 hidden group-hover:block">
              <span className="">Change Image</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (ev) => {
                  if (ev.target.files && ev.target.files[0]) {
                    handleUploadImage(ev.target.files[0], idx);
                  }
                }}
              />
            </label>
          </form>
        </div>

        <input
          className="mt-2 pl-1 font-bold w-full focus:z-10 bg-inherit leading-none"
          value={block.title}
          placeholder="Item name"
          maxLength={40}
          onChange={(e) => {
            setState({
              ...state,
              items: state.items.map((item, id) => {
                if (id !== idx) {
                  return item;
                } else {
                  return { ...item, title: e.target.value };
                }
              }),
            });
          }}
        />

        <input
          className="mb-4 pl-1 w-full bg-inherit font leading-none font-semibold"
          value={block.price}
          placeholder="Price"
          maxLength={20}
          onChange={(e) => {
            setState({
              ...state,
              items: state.items.map((item, id) => {
                if (id !== idx) {
                  return item;
                } else {
                  return { ...item, price: e.target.value };
                }
              }),
            });
          }}
        />
      </div>
    </div>
  );
};

export default ProductBlock;
