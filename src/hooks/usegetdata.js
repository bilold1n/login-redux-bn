import { useState, useEffect, useMemo } from "react";
import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebasy/firebasyConfig";

export default function usegetdata(collectionName, fresh, filter = "rating") {
  const [data, setdata] = useState([]);
  const [ispending, setispending] = useState(true);
  const [error, seterror] = useState({ status: false, massege: "" });
  useEffect(() => {
    const getdata = async () => {
      try {
        const documen = [];
        const querySnapshot = await getDocs(collection(db, collectionName));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          documen.push({ id: doc.id, ...doc.data() });
        });
        setdata(documen);
      } catch (error) {
        seterror({ status: true, massage: error.massage });
      } finally {
        setispending(false);
      }
    };
    getdata();
  }, [fresh]);
  const refreshData = useMemo(() => {
    if (filter === null) {
      return data;
    }
    if (filter == "name") {
      data.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    }
    if (filter == "!name") {
      data.sort(function (a, b) {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });
    }

    return data.sort((a, b) => b[`${filter}`] - a[`${filter}`]);
  }, [filter, data]);
  return { data: refreshData, ispending, error };
}
