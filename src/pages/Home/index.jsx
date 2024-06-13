import React, { useEffect, useState } from "react";
import usegetdata from "../../hooks/usegetdata";
import Productmodal from "../../components/productmodal";
import { DeleteDocitem, db } from "../../firebasy/firebasyConfig";
import { update } from "firebase/database";
import { arrayUnion, count, doc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { filterdata, getproduct, searchData } from "../../apps/product";
export default function Home() {
  const dispatch = useDispatch();
  const { filtereddata } = useSelector((state) => state.product);
  const [filter, setfilter] = useState("rating");
  const [fresh, setfresh] = useState([]);
  const [search, setsearch] = useState("");

  const { data, ispending, error } = usegetdata("product", fresh);
  useEffect(() => {
    !!data?.length && dispatch(getproduct(data));
  }, [data]);
  useEffect(() => {
    dispatch(searchData(search));
  }, [search]);

  const hendledelete = async (id) => {
    document.getElementById("my_modal_2").showModal();
    const status = await DeleteDocitem("product", id);
    setfresh((prev) => !prev);
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
  useEffect(() => {
    dispatch(filterdata(filter));
  }, [filter]);
  console.log(filtereddata);

  return (
    <>
      <div className="container">
        <div className="flex items-center justify-between pb-4 border-b-2 mb-10">
          <h2 className="text-2xl">Products</h2>
          <div className="flex items-center gap-5">
            <label className="input input-sm input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
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
          {!!filtereddata?.length && (
            <div className="hammasi">
              {filtereddata.map(
                ({ id, name, description, price, image, stock, rating }) => {
                  return (
                    <div
                      key={id}
                      className="card card-compact w-[350px] bg-base-300 shadow-[0_2px_15px_0_rgba(255,0,255)]"
                    >
                      <figure>
                        <img
                          width={220}
                          height={200}
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
