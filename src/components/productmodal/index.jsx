import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebasy/firebasyConfig";
import { collection, addDoc } from "firebase/firestore";

export default function Productmodal({ setfresh }) {
  const [ispending, setispending] = useState(false);
  const [productdata, setproductdata] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    rating: "",
  });
  const handlesubmit = async (e) => {
    e.preventDefault();
    setispending(true);
    const docRef = await addDoc(collection(db, "product"), {
      ...productdata,
    });
    console.log(docRef);
    setproductdata({
      name: "",
      description: "",
      image: "",
      price: "",
      rating: "",
    });
    document.getElementById("my_modal_3").closest("dialog").close();
    setispending(false);
    setfresh((prev) => !prev);
  };
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-3 text-center">Creat a product!</h3>
        <form
          onSubmit={handlesubmit}
          className="flex flex-col items-center"
          action=""
        >
          <p className="py-[8px] w-full text-left max-w-xs">Product name</p>
          <input
            value={productdata.name}
            onChange={(e) =>
              setproductdata({ ...productdata, name: e.target.value })
            }
            type="text"
            placeholder="Enter product name..."
            className="input input-bordered input-primary w-full max-w-xs"
            required
          />
          <p className="py-[8px] w-full text-left max-w-xs">
            Product description
          </p>

          <input
            value={productdata.description}
            onChange={(e) =>
              setproductdata({ ...productdata, description: e.target.value })
            }
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary w-full max-w-xs"
            required
          />
          <p className="py-[8px] w-full text-left max-w-xs">
            Product image link
          </p>

          <input
            value={productdata.image}
            onChange={(e) =>
              setproductdata({ ...productdata, image: e.target.value })
            }
            type="url"
            placeholder="Type here"
            className="input input-bordered input-primary w-full max-w-xs"
            required
          />
          <p className="py-[8px] w-full text-left max-w-xs">Product price</p>

          <input
            value={productdata.price}
            onChange={(e) =>
              setproductdata({ ...productdata, price: Number(e.target.value) })
            }
            type="number"
            placeholder="Type here"
            className="input input-bordered input-primary w-full max-w-xs"
            required
          />
          <p className="py-[8px] w-full text-left max-w-xs">Product rating</p>

          <div className="rating rating-lg rating-half">
            <input type="radio" name="rating-10" className="rating-hidden " />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-1"
              onChange={() => setproductdata({ ...productdata, rating: 0.5 })}
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-2"
              onChange={() => setproductdata({ ...productdata, rating: 1.5 })}
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-1"
              onChange={() => setproductdata({ ...productdata, rating: 1.5 })}
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-2"
              onChange={() => setproductdata({ ...productdata, rating: 2 })}
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-1"
              onChange={() => setproductdata({ ...productdata, rating: 2.5 })}
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-2"
              onChange={() => setproductdata({ ...productdata, rating: 3 })}
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-1"
              onChange={() => setproductdata({ ...productdata, rating: 3.5 })}
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-2"
              onChange={() => setproductdata({ ...productdata, rating: 4 })}
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-1"
              onChange={() => setproductdata({ ...productdata, rating: 4.5 })}
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-2 "
              onChange={() => setproductdata({ ...productdata, rating: 5 })}
            />
          </div>
          {ispending && (
            <div className=" flex items-center justify-center">
              <p className="text-3xl">Loading</p>
              <span
                style={{ zoom: "2" }}
                className="loading loading-dots loading-lg"
              >
                a
              </span>
            </div>
          )}
          <button
            type="submit"
            className="w-full max-w-xs btn btn-outline btn-primary mt-2"
          >
            Creat
          </button>
        </form>
      </div>
    </dialog>
  );
}
