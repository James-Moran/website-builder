import { useState } from "react";

const InputBlock = ({ block, idx, state, setState }) => {
  const [showDelete, setShowDelete] = useState(false);
  return (
    <div
      className="flex flex-col items-center my-2 max-w-md w-full relative"
      onFocus={() => setShowDelete(true)}
      onBlur={() => setShowDelete(false)}
    >
      {showDelete && (
        <button
          className="justify-center font-bold px-4 py-2 text-sm text-white bg-black rounded-md w-fit absolute -top-10 right-0 block hover:bg-gray-600"
          onMouseDown={() => {
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
      )}
      <input
        className="pl-1 font-bold w-full focus:z-10 bg-inherit leading-none"
        value={block.title}
        placeholder="Title"
        maxLength={20}
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
      <textarea
        className="border-2 border-black rounded w-full p-1"
        placeholder="Customers can write here"
        disabled={true}
      />
    </div>
  );
};

export default InputBlock;
