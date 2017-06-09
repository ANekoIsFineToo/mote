import Dexie from 'dexie';

const db = new Dexie('Note');

db.version(1).stores({
  Drafts: 'note,title,content,color',
  Notes: '++id,title,content,color',
  Versions: '++id,note,title,content,color',
});

export default db;
