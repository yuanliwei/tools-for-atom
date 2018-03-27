'use babel';

const SQL = require('sql.js');

export default class UserDbParse {
  constructor(zip, user) {
    this.zip = zip
    this.user = user
  }

  parse(){
    const {zip,user} = this
    var userDbFile = zip.file(`app/databases/up366v3_${this.user.uid}.db`)
    return new Promise((resove)=>{
      userDbFile.async('uint8array').then((buffer)=>{
        var db = new SQL.Database(buffer);
        resove({user:user, db:db})
      })
    });
  }
}
