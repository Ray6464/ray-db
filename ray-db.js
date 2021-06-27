"use strict"
const path = require('path');
const fs = require('ray-fs');
const serve = require('ray-serve');
const taken = require('ray-taken');
const hash = require('ray-hash');

const ext = 'raytabs';

module.exports = {
  value: 0,
  escape: '%1320',
  clusterDir: 'ray-db-cluster',
  root: '.',
  database: function() {return path.join(this.root, this.clusterDir)},
  infoFile: function() {return path.join(this.database(), `${this.database()}-info.json`)},
  metaFile: function() {return path.join(this.database(), `${this.database()}-meta.json`)},
  mainRowFile: function() {return path.join(this.database(), `${this.database()}-row.${ext}`)},
  mainColFile: function() {return path.join(this.database(), `${this.database()}-col.${ext}`)},
  createDatabase: function() {
    if (!fs.exists(this.database()).value) fs.mkdir(this.database());
    if (!fs.exists(this.infoFile()).value) fs.writeJSON(this.infoFile(), {});
    if (!fs.exists(this.metaFile()).value) fs.writeJSON(this.metaFile(), {});
    if (!fs.exists(this.mainRowFile()).value) fs.writeJSON(this.mainRowFile(), {});
    if (!fs.exists(this.mainColFile()).value) fs.writeJSON(this.mainColFile(), {});
    return this;
  },
  buildEntry: function() {
    this.value = {};
    for (let prop of arguments) {
      this.value[prop] = "";
    }
    return this;
  },
  addProp: function(propName, propValue){
    if (this.value["propName"] === undefined) { console.log("Prop not in Entry!"); process.exit(); }
    this.value["propName"] = propValue;
    return this;
  },
  newRowEntry: function(content){
    fs.push(this.mainRowFile(), content, '\n');
    console.log("newRowEntry:", content);
    return this;
  },
  readRowEntry: function(){
    if (fs.exists(this.mainRowFile()).value) this.value = fs.readArray(this.mainRowFile()).value;
    return this;
  }
}

