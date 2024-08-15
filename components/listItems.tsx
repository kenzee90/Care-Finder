"use client"

import { useEffect, useState } from "react"
import db from "../utils/firestore"
import { collection, getDocs, DocumentData  } from "firebase/firestore"

interface Item extends DocumentData {
    id: string;
    name: string;
  }
  
  const ListItems: React.FC = () => {
    const [items, setItems] = useState<Item[]>([])
  
    useEffect(() => {
      const fetchItems = async () => {
        const querySnapshot = await getDocs(collection(db, "items"))
        setItems(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Item)))
      }
  
      fetchItems()
    }, [])
  
    return (
      <div className="border w-96 text-center p-4">
        <h2>List of Items</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id} className="border-t-2 p-2">
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  
  export default ListItems