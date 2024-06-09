import React, { useState } from "react";
import usegetdata from "../../hooks/usegetdata";
import Productmodal from "../../components/productmodal";
import { DeleteDocitem, db } from "../../firebasy/firebasyConfig";
import { update } from "firebase/database";
import { arrayUnion, count, doc, updateDoc } from "firebase/firestore";
export default function Home() {
  const [filter, setfilter] = useState("rating");
  const [fresh, setfresh] = useState([]);
  const { data, ispending, error } = usegetdata("product", fresh, filter);
  console.log(data);
  // document.getElementById("my_modal_2").showModal();
  const hendledelete = async (id) => {
    document.getElementById("my_modal_2").showModal();
    const status = await DeleteDocitem("product", id);
    setfresh((prev) => !prev);
    console.log(status);
    document.getElementById("my_modal_2").closest("dialog").close();
  };
  const handlesubmitaddcartr = async (id) => {
    document.getElementById("my_modal_2").showModal();
    const ref = doc(db, "cart", "tLhj5oUrXf66OxEKWQSu");
    await updateDoc(ref, {
      product: arrayUnion({
        productId: id,
        count: 1,
      }),
    });
    document.getElementById("my_modal_2").closest("dialog").close();
  };
  return (
    <>
      <div className="container">
        <div className="flex items-center justify-between pb-4 border-b-2 mb-10">
          <h2 className="text-2xl">Products</h2>
          <div className="flex items-center gap-5">
            <select
              value={filter}
              onChange={(e) => setfilter(e.target.value)}
              className="select select-sm select-secondary w-full max-w-xs"
            >
              <option value="rating">Rating ⭐</option>
              <option value="price">Price $</option>
              <option value="name">A-Z</option>
              <option value="!name">Z-A</option>
            </select>
            <button
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className="btn btn-secondary btn-sm "
            >
              Add
            </button>
          </div>
        </div>
        <div>
          {ispending && (
            <div className=" mt-10 flex items-center justify-center">
              <span
                style={{ zoom: "2" }}
                className="loading loading-dots loading-lg"
              ></span>
            </div>
          )}
          {!!data?.length && (
            <div className="hammasi">
              {data.map(
                ({ id, name, description, price, image, stock, rating }) => {
                  console.log(image);
                  return (
                    <div
                      key={id}
                      className="card card-compact w-[350px] bg-base-300 shadow-[0_2px_15px_0_rgba(255,0,255)]"
                    >
                      <figure>
                        <img
                          width={250}
                          height={250}
                          src={image}
                          alt="page not fount"
                        />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title">{name}</h2>
                        <p>{price}$</p>
                        <p>{rating}⭐</p>

                        <p className="overflow-hidden">{description}</p>
                        <div className="card-actions justify-end">
                          <button
                            onClick={() => handlesubmitaddcartr(id)}
                            className="btn-sm btn btn-primary"
                          >
                            Buy Now
                          </button>
                          <button
                            onClick={() => {
                              const isConfirmed = window.confirm(
                                "Haqiqatdan ham productni o'chirishni xohlaysizmi?"
                              );
                              if (isConfirmed) {
                                hendledelete(id);
                                console.log("Element o'chirildi");
                              } else {
                                alert("o'chirish bekor qilindi");
                              }
                            }}
                            className="btn-sm btn btn-error"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      </div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <Productmodal setfresh={setfresh} />
      {/* delete modal*/}

      <dialog id="my_modal_2" className="modal ">
        <div className="modal-box w-fit">
          <span
            style={{ zoom: "2" }}
            className="loading loading-infinity loading-lg"
          ></span>
        </div>
      </dialog>
    </>
  );
}
