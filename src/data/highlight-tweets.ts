import { app } from '../firebase/firebase-config';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { cache } from 'react';

const db = getFirestore(app);

export const getHighlightTwitterPosts = cache(async () => {
  // const tweetsRef = db.collection('highlight_tweets_archive');
  // const snapshot = await tweetsRef.get();
  // return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const ref = collection(db, 'highlight_tweets_archive', 'VXNlcjoxNjk4NzU5OTQ1MTI5NTQxNjMy', 'highlight_tweets');
  const querySnap = await getDocs(ref);

  return querySnap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
});