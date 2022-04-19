import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jatedb = await openDB('jate', 1);
  const trs = jatedb.transaction('jate', 'readwrite');
  const store = trs.objectStore('jate');
  const request = store.put({ jate: content });
  const result = await request;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jatedb = await openDB('jate', 1);
  const trs = jatedb.transaction('jate', 'readwrite');
  const store = trs.objectStore('jate');
  const request = store.getAll();
  const result = await request;
};

initdb();
