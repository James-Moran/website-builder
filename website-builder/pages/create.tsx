import { useEffect, useState } from "react";
import { useUser } from "../components/UserContext";

import {
  getMyShop,
  postMyShop,
  uploadImageS3,
  uploadImageUrl,
} from "../api-lib/endpoints";

import SettingsModal from "../components/Modals/SettingsModal";
import toast, { Toaster } from "react-hot-toast";
import SignUpModal from "../components/Modals/SignUpModal";
import BlockModal from "../components/Modals/BlockModal";
import Block from "../components/Blocks/Block";

const initalProduct = {
  type: "product",
  title: "",
  price: "",
  imageSrc: "https://unsplash.it/280/200",
};

const inital = {
  url: "",
  title: "",
  description: "",
  items: [initalProduct],
  color: "bg-white",
};

export default function Create({ shop, loggedIn }: any) {
  const [user, setUser] = useUser();
  const [state, setState] = useState(shop ?? inital);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [blockModalOpen, setBlockModalOpen] = useState(false);

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

  async function handleUploadImage(image: any, idx: number) {
    toast.promise(
      uploadImageUrl().then(async (result) => {
        await uploadImageS3(result.url, image).then((res) => {
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
        });
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
    <>
      <BlockModal
        isOpen={blockModalOpen}
        setIsOpen={setBlockModalOpen}
        state={state}
        setState={setState}
      />
      <div
        className={`flex flex-col items-center min-h-screen font-serif p-4 text-lg ${state.color}`}
      >
        <Toaster position="bottom-center" />
        <div className="max-w-4xl w-full flex flex-col relative">
          <div className="fixed z-10 top-2 left-1 md:top-8 md:left-8">
            <div className="flex flex-row mb-4 mr-14">
              <button
                type="button"
                className="inline-flex mx-2 justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md  max-w-fit"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md max-w-fit"
                onClick={() => setSettingsOpen(true)}
              >
                Settings
              </button>
            </div>
          </div>

          <div className="flex flex-col min-h-screen justify-center items-center w-full">
            <input
              type="text"
              className="text-5xl font-bold text-center focus:z-10 bg-inherit px-2 w-full"
              value={state.title}
              placeholder="Title"
              onChange={(e) => setState({ ...state, title: e.target.value })}
              maxLength={15}
            />
            <input
              type="text"
              className="text-center mb-2 bg-inherit font-bold w-full px-2"
              value={state.description}
              placeholder="Description"
              onChange={(e) =>
                setState({ ...state, description: e.target.value })
              }
              maxLength={50}
            />

            {state.items.map((block: any, idx: number) => {
              return (
                <Block
                  block={block}
                  idx={idx}
                  key={idx}
                  state={state}
                  setState={setState}
                  handleUploadImage={handleUploadImage}
                />
              );
            })}
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 my-4 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-600 max-w-fit"
              onClick={() => setBlockModalOpen(true)}
            >
              Add Block +
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
    </>
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
