import Dexie from 'dexie';

const db = new Dexie('Note');

db.version(1).stores({
  drafts: 'note,title,content,bgColor',
  notes: '++id,title,content,bgColor',
});

export default db;
