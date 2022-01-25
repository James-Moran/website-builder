import { useState } from "react";
import { useUser } from "../components/UserContext";

import { getMyShop, postMyShop } from "../api-lib/endpoints";

import SettingsModal from "../components/SettingsModal";
import toast, { Toaster } from "react-hot-toast";
import SignUpModal from "../components/SignUpModal";

const initalItem = {
  title: "",
  price: "",
  imageSrc: "https://unsplash.it/280/200",
};

const inital = {
  url: "",
  title: "",
  description: "",
  items: [initalItem],
  color: "bg-white",
};

export default function Create({ shop }: { shop: any }) {
  const [user, setUser] = useUser();
  const [state, setState] = useState(shop ?? inital);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  console.log(state);

  const handleSave = async () => {
    if (user.loggedIn) {
      toast.promise(
        postMyShop(state),
        {
          loading: "Saving",
          error: "Could not save",
          success: "Saved!",
        },
        {
          success: {
            icon: "🔨",
          },
        }
      );
    } else {
      setLoginOpen(true);
    }
  };

  const handleAddItem = () => {
    setState({ ...state, items: [...state.items, initalItem] });
  };

  return (
    <div
      className={`flex flex-col items-center min-h-screen font-serif p-4 text-lg ${state.color}`}
    >
      <Toaster position="bottom-center" />
      <div className="max-w-4xl w-full flex flex-col">
        <div className="fixed bottom-0 right-8">
          <div className="flex flex-row">
            <button
              type="button"
              className="inline mx-2 justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 disabled:bg-gray-600 max-w-fit"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className="inline justify-center px-4 py-2 my-4 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 disabled:bg-gray-600 max-w-fit"
              onClick={() => setSettingsOpen(true)}
            >
              Settings
            </button>
          </div>
        </div>

        <div className="flex flex-col min-h-screen justify-center items-center">
          <input
            type="text"
            className="text-5xl font-bold text-center focus:z-10 w-full bg-inherit"
            value={state.title}
            placeholder="Title"
            onChange={(e) => setState({ ...state, title: e.target.value })}
            maxLength={20}
          />
          <input
            type="text"
            className="text-center mb-8 bg-inherit font-bold w-full"
            value={state.description}
            placeholder="Description"
            onChange={(e) =>
              setState({ ...state, description: e.target.value })
            }
            maxLength={50}
          />

          {state.items.map((product: any, idx: number) => {
            if (!product.imageSrc) {
              setState({
                ...state,
                items: state.items.map((item: any, id: number) => {
                  if (id !== idx) {
                    return item;
                  } else {
                    return { ...item, imageSrc: "https://unsplash.it/280/200" };
                  }
                }),
              });
            }
            return (
              <div key={idx} className="group flex flex-col items-center">
                <div className="relative">
                  <img
                    width={280}
                    height={200}
                    className="border-2 border-black rounded"
                    src={product.imageSrc}
                  />
                  <label className=" cursor-pointer justify-center font-bold px-4 py-2 text-sm text-white bg-black  rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 disabled:bg-gray-600 max-w-fit absolute bottom-1 left-1 hidden group-hover:block">
                    <span className="">Change Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(ev) => {
                        const upload = ev.target.files;
                        if (upload) {
                          setState({
                            ...state,
                            items: state.items.map((item: any, id: number) => {
                              if (id !== idx) {
                                return item;
                              } else {
                                return {
                                  ...item,
                                  imageSrc: URL.createObjectURL(upload[0]),
                                };
                              }
                            }),
                          });
                        }
                      }}
                    />
                  </label>

                  <button
                    className="justify-center font-bold px-4 py-2 text-sm text-white bg-black rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 disabled:bg-gray-600 max-w-fit absolute top-1 left-1 hidden group-hover:block"
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
                    Delete Item
                  </button>
                </div>

                <input
                  className="mt-2 pl-1 font-bold w-full focus:z-10 bg-inherit leading-none"
                  value={product.title}
                  placeholder="Item name"
                  maxLength={20}
                  onChange={(e) => {
                    setState({
                      ...state,
                      items: state.items.map((item: any, id: number) => {
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
                  value={product.price}
                  placeholder="Price"
                  maxLength={20}
                  onChange={(e) => {
                    setState({
                      ...state,
                      items: state.items.map((item: any, id: number) => {
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
            );
          })}
          <button
            type="button"
            className="inline-flex justify-center px-4 py-2 my-4 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 disabled:bg-gray-600 max-w-fit"
            onClick={handleAddItem}
          >
            Add item +
          </button>
        </div>
      </div>
      <SignUpModal
        isOpen={loginOpen}
        setIsOpen={setLoginOpen}
        callback={() => postMyShop(state)}
      />
      <SettingsModal
        isOpen={settingsOpen}
        setIsOpen={setSettingsOpen}
        state={state}
        setState={setState}
        setLoginOpen={setLoginOpen}
      />
    </div>
  );
}

export const getServerSideProps = async (ctx: {
  req: { headers: { cookie: any } };
}) => {
  const cookie = ctx.req.headers.cookie;
  return { props: await getMyShop(cookie, true) };
};
