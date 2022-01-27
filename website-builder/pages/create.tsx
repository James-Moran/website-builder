import { useEffect, useState } from "react";
import { useUser } from "../components/UserContext";

import {
  getMyShop,
  postMyShop,
  uploadImage,
  uploadImageS3,
  uploadImageUrl,
} from "../api-lib/endpoints";

import SettingsModal from "../components/SettingsModal";
import toast, { Toaster } from "react-hot-toast";
import SignUpModal from "../components/SignUpModal";

const initalItem = {
  type: "basic",
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

export default function Create({ shop, loggedIn }: any) {
  const [user, setUser] = useUser();
  const [state, setState] = useState(shop ?? inital);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  console.log(user, loggedIn, shop);

  useEffect(() => {
    if (!user.loggedIn && loggedIn) {
      setUser({ loggedIn: true });
    }
  }, []);

  const loginToast = async () => {
    toast.promise(
      postMyShop(state).then((res) => {
        console.log(res);
        if (res.success) {
          return Promise.resolve();
        } else {
          if (res.msg) {
            return Promise.reject(res.msg);
          } else {
            return Promise.reject("Could not save");
          }
        }
      }),
      {
        loading: "Saving",
        error: (err) => err,
        success: "Saved!",
      },
      {
        success: {
          icon: "🔨",
        },
      }
    );
  };

  const handleSave = async () => {
    if (user.loggedIn) {
      await loginToast();
    } else {
      setLoginOpen(true);
    }
  };

  const handleAddItem = () => {
    setState({ ...state, items: [...state.items, initalItem] });
  };

  async function handleUploadImage(image: any, idx: number) {
    toast.promise(
      uploadImageUrl()
        .then((result) => {
          if (result.success) {
            uploadImageS3(result.url, image)
              .then((res) => {
                const imageUrl = result.url.split("?")[0];
                setState({
                  ...state,
                  items: state.items.map((item: any, id: number) => {
                    if (id !== idx) {
                      return item;
                    } else {
                      return {
                        ...item,
                        imageSrc: imageUrl,
                      };
                    }
                  }),
                });
                Promise.resolve();
              })
              .catch((err) => {
                Promise.reject();
              });
          } else {
            Promise.reject();
          }
        })
        .catch((err) => {
          Promise.reject();
        }),
      {
        loading: "Uploading Image",
        error: "Error Uploading Image",
        success: "Uploaded!",
      },
      {
        success: {
          icon: "🔨",
        },
      }
    );
  }

  return (
    <div
      className={`flex flex-col items-center min-h-screen font-serif p-4 text-lg ${state.color}`}
    >
      <Toaster position="bottom-center" />
      <div className="max-w-4xl w-full flex flex-col">
        <div className="fixed top-2 left-1 md:top-8 md:left-8">
          <div className="flex flex-row mb-4 mr-14 z-50">
            <button
              type="button"
              className="inline-flex mx-2 justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 disabled:bg-gray-600 max-w-fit"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 disabled:bg-gray-600 max-w-fit"
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
            return (
              <div key={idx} className="group flex flex-col items-center">
                <div className="relative">
                  <img
                    width={280}
                    height={200}
                    className="border-2 border-black rounded"
                    src={product.imageSrc}
                  />
                  <form>
                    <label className="cursor-pointer justify-center font-bold px-4 py-2 text-sm text-white bg-black  rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 disabled:bg-gray-600 max-w-fit absolute bottom-1 left-1 hidden group-hover:block">
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
        callback={async () => {
          console.log("here");
          await loginToast();
        }}
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

export const getServerSideProps = async (ctx: any) => {
  const wildcard = ctx.req.headers.host.split(".")[0];
  const whitelist = ["onepageshop", "localhost:3000", "192"];
  if (whitelist.indexOf(wildcard) === -1) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  const cookie = ctx.req.headers.cookie;
  const { success, shop, loggedIn } = await getMyShop(cookie, true);
  return { props: { shop, loggedIn } };
};
