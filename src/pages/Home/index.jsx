import React, { useState } from "react";
import usegetdata from "../../hooks/usegetdata";
import Productmodal from "../../components/productmodal";

export default function Home() {
  const [fresh, setfresh] = useState([]);
  const { data, ispending, error } = usegetdata("product", fresh);
  console.log(ispending);
  return (
    <>
      <div className="container">
        <div className="flex items-center justify-between pb-4 border-b-2 mb-10">
          <h2 className="text-2xl">Products</h2>
          <button
            onClick={() => document.getElementById("my_modal_3").showModal()}
            className="btn btn-outline btn-sm"
          >
            Add
          </button>
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
          {!!data.length && (
            <div className="hammasi">
              {data.map(
                ({ id, name, description, price, image, stock, rating }) => {
                  console.log(image);
                  return (
                    <div
                      key={id}
                      className="card card-compact w-96 bg-base-300 shadow-[0_2px_15px_0_rgba(255,0,255)]"
                    >
                      <figure>
                        <img src={image} alt="page not fount" />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title">{name}</h2>
                        <p className="overflow-hidden">{description}</p>
                        <div className="card-actions justify-end">
                          <button className="btn btn-primary">Buy Now</button>
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
    </>
  );
}
