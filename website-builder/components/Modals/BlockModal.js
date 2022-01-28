import { Fragment, useState, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

const initalProductBlock = {
  type: "ProductBlock",
  title: "",
  price: "",
  imageSrc: "https://unsplash.it/280/200",
};

const initalInputBlock = {
  type: "InputBlock",
  title: "",
};

const initalTextBlock = {
  type: "TextBlock",
  title: "",
  text: "",
};

const BlockModal = ({ isOpen, setIsOpen, state, setState }) => {
  const initalFocusRef = useRef(null);

  const handleAddProduct = () => {
    setState({ ...state, items: [...state.items, initalProductBlock] });
    setIsOpen(false);
  };

  const handleAddInput = () => {
    setState({ ...state, items: [...state.items, initalInputBlock] });
    setIsOpen(false);
  };

  const handleAddText = () => {
    setState({ ...state, items: [...state.items, initalTextBlock] });
    setIsOpen(false);
  };

  const handleAddCheckout = () => {};

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-auto"
        onClose={() => setIsOpen(false)}
        initialFocus={initalFocusRef}
      >
        <div className="min-h-screen px-4 text-center" ref={initalFocusRef}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-60" />
          </Transition.Child>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl border-black border-2">
              <div className="flex flex-col mt-2">
                <h1 className="text-3xl font-bold self-center mb-4">
                  Choose Block
                </h1>
                <div className="flex flex-col items-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      className="flex flex-col items-center justify-center w-40 h-40 p-2 border-2 border-black rounded cursor-pointer"
                      onClick={handleAddProduct}
                    >
                      <h3 className="font-bold mb-1">Product</h3>
                      <div className="p-2 border-2 rounded">
                        <div className="w-16 h-12 bg-slate-500 rounded mb-1" />
                        <div className="w-8 h-2 bg-slate-500 rounded" />
                        <div className="w-8 h-2 bg-slate-500 rounded mt-0.5" />
                      </div>
                      <div className="h-2" />
                    </div>

                    <div
                      className="flex flex-col items-center justify-center w-40 h-40 p-2 border-2 border-black rounded cursor-pointer"
                      onClick={handleAddInput}
                    >
                      <h3 className="font-bold mb-1">Input</h3>
                      <div className="p-2 border-2 rounded">
                        <div className="w-8 h-2 bg-slate-500 rounded" />
                        <div className="w-16 h-12 bg-slate-500 rounded mt-1" />
                      </div>
                      <div className="h-2" />
                    </div>

                    <div
                      className="flex flex-col items-center justify-center w-40 h-40 p-2 border-2 border-black rounded cursor-pointer"
                      onClick={handleAddText}
                    >
                      <h3 className="font-bold mb-1">Text</h3>
                      <div className="p-2 border-2 rounded">
                        <div className="w-8 h-2 bg-slate-500 rounded" />
                        <div className="w-16 h-12 bg-slate-500 rounded mt-1" />
                      </div>
                      <div className="h-2" />
                    </div>

                    <div
                      className="flex flex-col items-center justify-center w-40 h-40 p-2 border-2 border-black rounded cursor-pointer"
                      onClick={handleAddCheckout}
                    >
                      <h3 className="font-bold mb-1">Checkout</h3>
                      <div className="p-2 border-2 rounded">
                        <div className="w-10 h-4 bg-slate-500 rounded" />
                      </div>
                      <div className="h-2" />
                    </div>
                  </div>
                </div>
                <div className="border-slate-300 border-b-2 rounded mt-4" />

                <div className="flex flex-row justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 my-4 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 disabled:bg-gray-600 max-w-fit"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BlockModal;
