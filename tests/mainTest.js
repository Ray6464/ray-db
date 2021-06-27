const db = require('../ray-db.js');

let entry = db
  .createDatabase()
  .buildEntry:
  .newRowEntry("Ghalib | 13 | lvl1 | 000-000-000")
  .readRowEntry()
  .value;

console.log(entry);

