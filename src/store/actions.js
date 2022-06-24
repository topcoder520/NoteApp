import {getNowDateString,getNowTimestamp,getPreMonths,getNextMonths} from '@/util/date'

export function getNoteById(context, id) {
    return new Promise((resolve, reject) => {
        context.state.database.transaction(tx => {
            tx.executeSql('select Id,Title,Category,Content,CreateTime,State,Year,Month,Day,Sort from note where Id = ' + id, [], (tx, res) => {
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

export function hasNoteOnYearMonthDate(context,{Year,Month,Date}) {
    return new Promise((resolve, reject) => {
        context.state.database.transaction(tx => {
            tx.executeSql('select count(1) as cnt from note where Year =? and Month=? and Day=?', [Year,Month,Date], (tx, res) => {
                var rowData = 0;
                for (var x = 0; x < res.rows.length; x++) {
                    rowData = res.rows.item(x).cnt;
                    break;
                }
                resolve(rowData)
            })
        }, function () {
            reject(0);
        }, function () {
            //console.log('transaction ok');
        })
    });
}

export function getNoteListByPage(context,{pageIndex=1,pageSize=20}){
    return new Promise((resolve,reject)=>{
        context.state.database.transaction(tx => {
            if(pageIndex<1){
                pageIndex = 1;
            }
            pageIndex = (pageIndex - 1)*pageSize;
            tx.executeSql(`select Id,Title,Category,Content,CreateTime,State,Year,Month,Day,Sort from note where State = 1 order by Sort desc,Timestamp desc limit ?,?`, [pageIndex,pageSize], (tx, res) => {
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

export function getNoteListNearMonth(context,{Year,Month}){
    return new Promise((resolve,reject)=>{
        context.state.database.transaction(tx => {
            const preData = getPreMonths(Year,Month);
            const nextData = getNextMonths(Year,Month);
            tx.executeSql(`select Id,Title,Category,Content,CreateTime,State,Year,Month,Day,Sort from note where State = 1 and (Year = ${preData.Year} and Month=${preData.Month} or Year = ${Year} and Month=${Month} or Year = ${nextData.Year} and Month=${nextData.Month}) order by Year desc,Month desc`, [], (tx, res) => {
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


export function addNote(context,{
    Title,Category,Content,CreateTime,Year,Month,Day,timestamp
}){
    return new Promise((resolve, reject) => {
        context.state.database.transaction(function (tx) {
            var query = "INSERT INTO note (Title,Category,Content,CreateTime,Year,Month,Day,State,Sort,Timestamp) VALUES (?,?,?,?,?,?,?,?,?,?)";
            tx.executeSql(query, [Title,Category,Content,CreateTime,Year,Month,Day,1,1,timestamp], function (tx, res) {
                    //console.log("insertId: " + res.insertId + " -- probably 1");
                    //console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
                    resolve({Id:res.insertId,rowsAffected:res.rowsAffected});
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

export function updateNote(context,{
    Id,Title,Category,Content
}){
    return new Promise((resolve, reject) => {
        context.state.database.transaction(function (tx) {
            var query = "update note set Title=?,Category=?,Content=?,CreateTime=?,Year=?,Month=?,Day=?,Timestamp=? where Id = ?";
            const CreateTime = getNowDateString();
            const now = new Date();
            const Year = now.getFullYear();
            const Month = now.getMonth()+1;
            const Day = now.getDate();
            const timestamp = getNowTimestamp();
            tx.executeSql(query, [Title,Category,Content,CreateTime,Year,Month,Day,timestamp,Id], function (tx, res) {
                    //console.log("insertId: " + res.insertId + " -- probably 1");
                    //console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
                    resolve({rowsAffected:res.rowsAffected});
                },
                function (tx, error) {
                    console.log('UPDATE  error: ' + error.message);
                    reject('UPDATE  error: ' + error.message);
                });
        }, function (error) {
            console.log('transaction error: ' + error.message);
        }, function () {
            console.log('transaction ok');
        });
    });
}

export function updateNoteSort(context,{
    Id,Sort
}){
    return new Promise((resolve, reject) => {
        context.state.database.transaction(function (tx) {
            var query = "update note set Sort=? where Id = ?";
            tx.executeSql(query, [Sort,Id], function (tx, res) {
                    //console.log("insertId: " + res.insertId + " -- probably 1");
                    //console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
                    resolve({rowsAffected:res.rowsAffected});
                },
                function (tx, error) {
                    console.log('UPDATE  error: ' + error.message);
                    reject('UPDATE  error: ' + error.message);
                });
        }, function (error) {
            console.log('transaction error: ' + error.message);
        }, function () {
            console.log('transaction ok');
        });
    });
}

export function delNote(context,id){
    return new Promise((resolve, reject) =>{
        context.state.database.transaction(function (tx) {
            var query = "update note set State = 0 WHERE id = ?";
            tx.executeSql(query, [id], function (tx, res) {
                    //console.log("removeId: " + res.insertId);
                    //console.log("rowsAffected: " + res.rowsAffected);
                    resolve({rowsAffected:res.rowsAffected});
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

export function startupDatabase(context) {
    return new Promise((resolve, reject) => {
        document.addEventListener('deviceready', () => {
            const db = (window.cordova.platformId === 'browser') ?
                window.openDatabase('MyDatabase', '1.0', 'Data', 2 * 1024 * 1024) :
                window.sqlitePlugin.openDatabase({ name: 'MyDatabase.db', location: 'default', androidDatabaseImplementation: 2 });
            // window.sqlitePlugin.echoTest(function () {
            //     console.log('ECHO test OK');
            // });
            // window.sqlitePlugin.selfTest(function () {
            //     console.log('SELF test OK');
            // });
            context.commit('setDatabase', db);
            //创建数据表
            db.transaction(function (tx) {
                tx.executeSql(`CREATE TABLE IF NOT EXISTS "note" (
                                    "Id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                                    "Title" TEXT,
                                    "Category" TEXT,
                                    "Content" text,
                                    "CreateTime" text,
                                    "State" integer,
                                    "Year" integer,
                                    "Month" integer,
                                    "Day" integer,
                                    "Sort" integer,
                                    "Timestamp" integer
                                )`, [], (tx, res) => {
                                    resolve(res);
                            if(res.rowsAffected>0){
                                tx.executeSql(`INSERT INTO note ("Title", "Category", "Content", "CreateTime", "State", "Year", "Month", "Day","Sort","Timestamp")
                                    VALUES
                                        ('测试数据', '测试分类', '测试内容', '2022年6月17日 14:08', 1,2022, 6, 17,1,1)`);
                            }
                });
            }, function (error) {
                console.log('transaction error: ' + error.message);
                reject('transaction error: ' + error.message);
            }, function () {
                console.log('resolve transaction ok');
            });
            //创建版本表
            db.transaction(function (tx) {
                tx.executeSql(`CREATE TABLE IF NOT EXISTS "note_version" (
                                    "Id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                                    "Version" TEXT,
                                    "Timestamp" integer,
                                    "Des" text,
                                    "CreateTime" text,
                                    "Info1" TEXT,
                                    "Info2" TEXT,
                                    "Info3" TEXT,
                                    "State" integer
                                )`, [], (tx, res) => {
                                    resolve(res);
                            if(res.rowsAffected>0){
                                tx.executeSql(`INSERT INTO note ("Version", "Timestamp", "Des", "CreateTime", "Info1", "Info2", "Info3","State")
                                    VALUES
                                        ('0.0.1', ${Date.now()}, '测试版本','${getNowDateString()}','','', '', '',1)`);
                            }
                            ////////////////////////////////////////////////
                            tx.executeSql(`select count(*) as cnt from sqlite_master where name='note' and sql like '%Sort%'`, [], (tx, res) => {
                                var rowData = res.rows.item(0).cnt;
                                if(rowData == 0){
                                    tx.executeSql(`alter table note add column Sort INTEGER default 1`, [], () => {
                                        
                                    });
                                }
                            });
                            tx.executeSql(`select count(*) as cnt from sqlite_master where name='note' and sql like '%Timestamp%'`, [], (tx, res) => {
                                var rowData = res.rows.item(0).cnt;
                                if(rowData == 0){
                                    tx.executeSql(`alter table note add column Timestamp INTEGER default 1`, [], () => {
                                        
                                    });
                                }
                            });
                });
            }, function (error) {
                console.log('transaction error: ' + error.message);
                reject('transaction error: ' + error.message);
            }, function () {
                console.log('resolve transaction ok');
            });
        });
    });
}