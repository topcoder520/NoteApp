//cordova plugin
//step1: npm install cordova-sqlite-storage
//step2: npm install @ionic-native/sqlite

//表的定义结构
// const tableObject = {
//     tableName: "fileinfo",
//     fields: {
//         Id: "integer",
//         PId: "integer",
//         Name: "text",
//         Uri: "text",
//         Type: "text",
//         Suffix: "text",
//         Ctime: "integer",
//         Mtime: "integer",
//         Shortcut: "integer",
//         Size: "integer",
//         Sync: "integer",
//         State: "integer",
//     }
// };

// openDatabase 创建或打开数据库
//      databaseName: 数据库名称
function openDatabase(databaseName) {
    return new Promise((resolve) => {
        databaseName = databaseName || "default_database_db";
        const db = (window.cordova.platformId === 'browser') ?
            window.openDatabase(databaseName, '1.0', 'Data', 2 * 1024 * 1024) :
            window.sqlitePlugin.openDatabase({ name: databaseName + '.db', location: 'default', androidDatabaseImplementation: 2 });
        resolve(db);
    });
}
// createTable 创建表
//      db: openDatabase方法创建的数据库实例
//      tableObject: 数据表对象
function createTable(db, tableObject) {
    if (db == null || tableObject == null) {
        return ""
    }
    var tableName = tableObject.tableName;
    var fields = tableObject.fields;
    if (tableName == "" || tableName == null || tableName == undefined) {
        return "";
    }
    if (!Object.prototype.hasOwnProperty.call(fields, "Id")) {
        fields['Id'] = 'integer';
    }
    var fieldList = [];
    for (let key in fields) {
        if (key == "Id") {
            fieldList.push('"Id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,');
            continue;
        }
        fieldList.push('"' + key + '" ' + fields[key] + ',');
    }
    let fieldLen = fieldList.length;
    let field = fieldList[fieldLen - 1];
    fieldList[fieldLen - 1] = field.substring(0, field.lastIndexOf(','));
    return new Promise((resolve, reject) => {
        //创建数据表
        db.transaction(function (tx) {
            const sql = `CREATE TABLE IF NOT EXISTS "` + tableName + `" ( 
                `+ fieldList.join(' ') + ` 
            )`;
            console.log('SQL===> '+sql);
            tx.executeSql(sql, [], (tx, res) => {
                resolve(res);
                if (res.rowsAffected > 0) {
                    console.log('fileinfo 创建成功');
                }
            });
        }, function (error) {
            console.log('transaction error: ' + error.message);
            reject('transaction error: ' + error.message);
        }, function () {
            console.log('resolve transaction ok');
        });
    });
}

function checkNumber(type) {
    if (!type) {
        return false;
    }
    if (type.toLowerCase() == "text" || type.toLowerCase() == "blob") {
        return false;
    }
    return true;
}

// delRecord 删除记录
//      db: openDatabase方法创建的数据库实例
//      tableObject: 数据表对象
//      whereObject: 条件，字符串和对象都可以，例如： "a = 1 and b = 2" 或者 {a:1,b:2}
//      setObject: 设置值,字符串和对象都可以, 例如： "State = 0" 或者 {State:0}，也可以传{}空对象,{}代表物理删除
function delRecord(db, tableObject, whereObject, setObject) {
    var tableName = tableObject.tableName;
    var fields = tableObject.fields;

    var whereStr = "";
    if (typeof whereObject == "object") {
        for (let key in whereObject) {
            if (!checkNumber(fields[key])) {
                whereStr += key + " = '" + whereObject[key] + "' and "
            } else {
                whereStr += key + " = " + whereObject[key] + " and "
            }
        }
        whereStr = whereStr.substring(0, whereStr.lastIndexOf('and'));
    } else if (typeof whereObject == "string") {
        whereStr = whereObject;
    }
    var setStr = "";
    if (typeof setObject == "object") {
        for (let key in setObject) {
            if (!checkNumber(fields[key])) {
                setStr += key + " = '" + setObject[key] + "' , "
            } else {
                setStr += key + " = " + setObject[key] + " , "
            }
        }
        setStr = setStr.substring(0, setStr.lastIndexOf(','));
    } else if (typeof setObject == "string") {
        setStr = setObject;
    }
    return new Promise((resolve, reject) => {
        db.transaction(function (tx) {
            var query = "";
            if (setStr == "") {
                query = "delete from " + tableName + " WHERE " + whereStr;
            } else {
                query = "update " + tableName + " set " + setStr + " WHERE " + whereStr;
            }
            console.log('SQL===> '+query);
            tx.executeSql(query, [], function (tx, res) {
                //console.log("removeId: " + res.insertId);
                //console.log("rowsAffected: " + res.rowsAffected);
                resolve({ rowsAffected: res.rowsAffected });
            },
                function (tx, error) {
                    console.log('DELETE error: ' + error.message);
                    reject('DELETE  error: ' + error.message);
                });
        }, function (error) {
            console.log('transaction error: ' + error.message);
        }, function () {
            console.log('transaction ok');
        });
    });
}

// updateRecord 修改记录
//      db: openDatabase方法创建的数据库实例
//      tableObject: 数据库表对象
//      whereObject: 条件，字符串和对象都可以，例如： "a = 1 and b = 2" 或者 {a:1,b:2}
//      setObject: 设置值,字符串和对象都可以, 例如： "State = 0" 或者 {State:0}
function updateRecord(db, tableObject, whereObject, setObject) {
    var tableName = tableObject.tableName;
    var fields = tableObject.fields;

    var whereStr = "";
    if (typeof whereObject == "object") {
        delete whereObject.State;
        for (let key in whereObject) {
            if (!checkNumber(fields[key])) {
                whereStr += key + " = '" + whereObject[key] + "' and "
            } else {
                whereStr += key + " = " + whereObject[key] + " and "
            }
        }
        whereStr = whereStr.substring(0, whereStr.lastIndexOf('and'));
    } else if (typeof whereObject == "string") {
        whereStr = whereObject;
    }
    var setStr = "";
    if (typeof setObject == "object") {
        delete setObject.State;
        for (let key in setObject) {
            if (!checkNumber(fields[key])) {
                setStr += key + " = '" + setObject[key] + "' , "
            } else {
                setStr += key + " = " + setObject[key] + " , "
            }
        }
        setStr = setStr.substring(0, setStr.lastIndexOf(','));
    } else if (typeof setObject == "string") {
        setStr = setObject;
    }
    return new Promise((resolve, reject) => {
        db.transaction(function (tx) {
            var query = "update " + tableName + " set " + setStr + " WHERE " + whereStr;
            console.log('SQL===> '+query);
            tx.executeSql(query, [], function (tx, res) {
                //console.log("removeId: " + res.insertId);
                //console.log("rowsAffected: " + res.rowsAffected);
                resolve({ rowsAffected: res.rowsAffected });
            },
                function (tx, error) {
                    console.log('update error: ' + error.message);
                    reject('update  error: ' + error.message);
                });
        }, function (error) {
            console.log('transaction error: ' + error.message);
        }, function () {
            console.log('transaction ok');
        });
    });
}
// addRecord 添加记录
//      db: openDatabase方法创建的数据库实例
//      tableObject: 数据库表对象
//      dataObject: 添加的数据对象,例如：{Id:0,Name:'sushan',Age:22,State:1}
function addRecord(db, tableObject, dataObject) {
    var tableName = tableObject.tableName;
    //var fields = tableObject.fields;
    var keyStr = "", valStr = "";
    var valArr = [];
    if (typeof dataObject == "object") {
        delete dataObject.Id;
        for (let key in dataObject) {
            keyStr += key + " , ";
            valStr += "?,";
            valArr.push(dataObject[key]);
        }
        keyStr = keyStr.substring(0, keyStr.lastIndexOf(','));
        valStr = valStr.substring(0, valStr.lastIndexOf(','));
    }
    return new Promise((resolve, reject) => {
        db.transaction(function (tx) {
            var query = "INSERT INTO " + tableName + " (" + keyStr + ") VALUES (" + valStr + ")";
            console.log('SQL===> '+query);
            tx.executeSql(query, valArr, function (tx, res) {
                //console.log("insertId: " + res.insertId + " -- probably 1");
                //console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
                resolve(res);
            },
                function (tx, error) {
                    console.log('INSERT error: ' + error.message);
                    reject('INSERT error: ' + error.message);
                });
        }, function (error) {
            console.log('transaction error: ' + error.message);
        }, function () {
            console.log('transaction ok');
        });
    });
}
// getRecord 查询一条记录
//      db: openDatabase方法创建的数据库实例
//      tableObject: 数据库表对象
//      whereObject:查询条件,可以是 {Name:"sushan",Age:22} 或者 "Name='sushan' and Age = 22"
//      childField: 其他的字段
//      orderby: 排序
function getRecord(db, tableObject, whereObject, childField,orderby) {
    var tableName = tableObject.tableName;
    var fields = tableObject.fields;
    var fieldStr = "";
    for (let key in fields) {
        fieldStr += key + ",";
    }
    if (childField) {
        if (childField.endsWith(',')) {
            fieldStr += childField;
        } else {
            fieldStr += childField + ",";
        }
    }
    fieldStr = fieldStr.substring(0, fieldStr.lastIndexOf(','));
    var whereStr = "";
    if (typeof whereObject == "object") {
        for (let key in whereObject) {
            if (!checkNumber(fields[key])) {
                whereStr += key + " = '" + whereObject[key] + "' and ";
            } else {
                whereStr += key + " = " + whereObject[key] + " and ";
            }
        }
        whereStr = whereStr.substring(0, whereStr.lastIndexOf('and'));
    } else if (typeof whereObject == "string") {
        whereStr = whereObject;
    }
    if (orderby){
        orderby = " order by " + orderby
    }else{
        orderby = "";
    }
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            const sql = "select " + fieldStr + " from " + tableName + " where " + whereStr+' '+orderby;
            console.log('SQL===> '+sql);
            tx.executeSql(sql, [], (tx, res) => {
                var rowData = {};
                for (var x = 0; x < res.rows.length; x++) {
                    rowData = res.rows.item(x);
                    break;
                }
                resolve(rowData)
            })
        }, function (error) {
            reject(error.message);
        }, function () {
            //console.log('transaction ok');
        })
    });
}
// getRecordList 查询多条记录
//      db: openDatabase方法创建的数据库实例
//      tableObject: 数据库表对象
//      whereObject:查询条件,可以是 {Name:"sushan",Age:22} 或者 "Name='sushan' and Age = 22"
//      childField:其他的字段
//      orderby: 排序，例如: "Id DESC,Name ASC"
//      page: 分页，{pageIndex:1,pageSize:20}
function getRecordList(db, tableObject, whereObject, childField, orderby, page) {
    var tableName = tableObject.tableName;
    var fields = tableObject.fields;
    var fieldStr = "";
    for (let key in fields) {
        fieldStr += key + ",";
    }
    if (childField) {
        if (childField.endsWith(',')) {
            fieldStr += childField;
        } else {
            fieldStr += childField + ",";
        }
    }
    fieldStr = fieldStr.substring(0, fieldStr.lastIndexOf(','));
    var whereStr = "";
    if (typeof whereObject == "object") {
        for (let key in whereObject) {
            if (!checkNumber(fields[key])) {
                whereStr += key + " = '" + whereObject[key] + "' and ";
            } else {
                whereStr += key + " = " + whereObject[key] + " and ";
            }
        }
        whereStr = whereStr.substring(0, whereStr.lastIndexOf('and'));
    } else if (typeof whereObject == "string") {
        whereStr = whereObject;
    }
    if (!orderby) {
        orderby = " order by Id asc "
    } else {
        orderby = " order by " + orderby
    }
    var pageStr = "";
    if (page && typeof page == "object" && Object.prototype.hasOwnProperty.call(page, "pageIndex") && Object.prototype.hasOwnProperty.call(page, "pageSize")) {
        var pageIndex = page.pageIndex;
        var pageSize = page.pageSize;
        if (pageIndex < 1) {
            pageIndex = 1;
        }
        pageIndex = (pageIndex - 1) * pageSize;
        pageStr = " limit " + pageIndex + "," + pageSize;
    }
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            const sql = "select " + fieldStr + " from " + tableName + " where " + whereStr + " " + orderby + " " + pageStr;
            console.log('SQL===> '+sql);
            tx.executeSql(sql, [], (tx, res) => {
                var rowData = [];
                for (var x = 0; x < res.rows.length; x++) {
                    rowData.push(res.rows.item(x));
                }
                resolve(rowData)
            })
        }, function (error) {
            reject(error.message);
        }, function () {
            //console.log('transaction ok');
        })
    });
}
export {
    openDatabase,
    createTable,
    delRecord,
    updateRecord,
    addRecord,
    getRecord,
    getRecordList,
}