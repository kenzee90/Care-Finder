import db from "@/utils/firestore";
import {
  collection,
  addDoc,
  getDocs,
  limit,
  DocumentData,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  orderBy,
  Timestamp,
  startAfter,
} from "firebase/firestore";
import { toast } from "react-toastify";

export interface Item {
  name: string;
  description: string;
  state: string;
}

export const successMessage = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
export const errorMessage = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const addHospital = async (
  name: string,
  description: string,
  state: string,
) => {
  try {
    await addDoc(collection(db, "hospitals"), {
      name,
      description,
      state,
    });
    successMessage(`${name} Hospitals Added 🎉`);
  } catch (err) {
    errorMessage("Error! ❌");
    console.error(err);
  }
};

export async function getHospitals(
  { page = 1, pageSize = 12, searchTerm = "" }
) {
  try {
    const productsRef = collection(db, "hospitals");
    let q = query(productsRef);

    if (searchTerm) {
      q = query(
        q,
        where("name", ">=", searchTerm),
        where("name", "<=", searchTerm + "\uf8ff"),
      );
    }


    q = query(q, orderBy("name"), limit(pageSize));

    if (page > 1) {
      const previousPageLastDoc = await getDocs(
        query(productsRef, orderBy("name"), limit(pageSize * (page - 1))),
      );
      const lastVisible =
        previousPageLastDoc.docs[previousPageLastDoc.docs.length - 1];
      q = query(q, startAfter(lastVisible));
    }

    const querySnapshot = await getDocs(q);
    const docs:any = [];
    // querySnapshot.forEach((d: any) => {
    //   docs.unshift({ ...d.data(), id: d.id });
    // });
    const hospitals = querySnapshot.docs.map((doc:any) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return {
      hospitals,
      nextPage: querySnapshot.size === pageSize ? page + 1 : null,
    };
  } catch (error) {
    console.error("Error fetching Hospitals:", error);
    throw error;
  }
}