import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  getDocs,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      if (cancelled) {
        return;
      }

      setLoading(true);

      const collectionRef = await collection(db, docCollection);

      try {
        let q;

        // busca
        // Dashboard
        if (search) {
          q = await query(
            collectionRef,
            where("tagsArray", "array-contains", search),
            orderBy("createdAt", "desc")
          );
        } else {
          q = await getDocs(collectionRef, orderBy("createdAt", "desc"));
        }

        setDocuments(
          q.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
        // console.log(documents);

        // await onSnapshot(q, (querySnapshot) => {
        //   setDocuments(
        //     querySnapshot.docs.map((doc) => ({
        //       id: doc.id,
        //       ...doc.data(),
        //     }))
        //   );
        // });

        // setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getPosts();
    getDocs();
  }, [docCollection, search, uid, cancelled]);

  // console.log(documents);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
};
