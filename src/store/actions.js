import {getNowDateString,getNowTimestamp,getPreMonths,getNextMonths} from '@/util/date'
import {
    openDatabase,
    createTable,
    addColumn,
    delRecord,
    updateRecord,
    addRecord,
    getRecord,
    getRecordList
 } from '@/plugin/sqllite'

 const note = {
    tableName: "note",
    fields: {
        Id: "integer",
        ParentId:'integer',//跟SType = 1时用
        SType:'integer', //文件类型 0 文件  1目录
        Title: "text",
        Category: "text",
        note_category_Id:'integer', //关联 note_category 表
        Content: "text",
        CreateTime: "text",
        State: "integer",
        Year: "integer",
        Month: "integer",
        Day: "integer",
        Sort: "integer",
        Timestamp: "integer"
    }
};
const version = {
    tableName: "note_version",
    fields: {
        Version: "text",
        Timestamp: "integer",
        Des: "text",
        CreateTime: "text",
        Info1: "text",
        Info2: "text",
        Info3: "text",
        State: "integer",
        Sort: "integer",
    }
};

const noteCategory = {
    tableName: "note_category",
    fields: {
        CName: "text",
        Timestamp: "integer",
        note_Id:"integer",  //note.SType = 1时的note的数据Id
        Des: "text",
        CreateTime: "text",
        State: "integer",
    }
};

export function getNoteById(context, id) {
    return new Promise((resolve, reject) => {
        getRecord(context.state.database,note, {Id:id},"").then((res) => {
            resolve(res)
        }).catch((reject1) => {
            reject(reject1);
        });
    });
}

export function hasNoteOnYearMonthDate(context,{Year,Month,Date}) {
    return new Promise((resolve, reject) => {
        var fieldSql = "count(1) as cnt";
        getRecord(context.state.database,{tableName:note.tableName,fields:[]}, `note.SType = 0 and note.Year =${Year} and note.Month=${Month} and note.Day=${Date}`, fieldSql).then((res) => {
            var rowData = 0;
            for (var x = 0; x < res.rows.length; x++) {
                rowData = res.rows.item(x).cnt;
                break;
            }
            resolve(rowData)
        }).catch((reject1) => {
            reject(reject1);
        });
    });
}

export function getNoteListByPage(context,{pageIndex=1,pageSize=20,Year=0,Month=0,Day=0,State = 0,Sort=0,kw=''}){
    return new Promise((resolve,reject)=>{
        var page = {pageIndex:pageIndex,pageSize:pageSize};

        var whereObject = {};
        if(State>0){
            whereObject.State = State;
        }
        if(Year>0){
            whereObject.Year = Year;
        }
        if(Month>0){
            whereObject.Month = Month;
        }
        if(Day>0){
            whereObject.Day = Day;
        }
        var whereStr = ' note.SType = 0 and ';
        for (let key in whereObject) {
            if (!checkNumber(note.fields[key])) {
                whereStr += "note." + key + " = '" + whereObject[key] + "' and ";
            } else {
                whereStr += "note." + key + " = " + whereObject[key] + " and ";
            }
        }
        console.log('kw:',kw,typeof kw,kw !== undefined && kw.trim().length>0);
        if(kw !== undefined && kw.trim().length>0){
            whereStr += " ( note.Title like '%"+kw+"%' " + " OR note.Content like '%"+kw+"%' " + " ) and ";
        }
        whereStr = whereStr.substring(0, whereStr.lastIndexOf('and'));
        let sortBy = "note.Sort desc,note.Timestamp desc";
        if(Sort != undefined && Sort>0){
            sortBy = "note.Timestamp desc";
        }
        
        getRecordList(context.state.database, note  , whereStr,"",sortBy,page,['Content']).then((res) => {
            resolve(res);
        }).catch((reject1) => {
            reject(reject1);
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

export function getNoteListNearMonth(context,{Year,Month}){
    return new Promise((resolve,reject)=>{
        const preData = getPreMonths(Year,Month);
        const nextData = getNextMonths(Year,Month);
        getRecordList(context.state.database, note  , `note.SType = 0 and (note.Year = ${preData.Year} and note.Month=${preData.Month} or note.Year = ${Year} and note.Month=${Month} or note.Year = ${nextData.Year} and note.Month=${nextData.Month})`,"","note.Year desc,note.Month desc",null,["Content"]).then((res) => {
            resolve(res);
        }).catch((reject1) => {
            reject(reject1);
        });
    });
}


export function addNote(context,{
    Title,Category,Content,CreateTime,Year,Month,Day,timestamp
}){
    return new Promise((resolve, reject) => {
        addRecord(context.state.database, note, {
            Id: 0,
            Title: Title,
            Category:Category,
            Content:Content,
            CreateTime:CreateTime,
            Year:Year,
            Month:Month,
            Day:Day,
            State:1,
            Sort:1,
            Timestamp:timestamp
        }).then((res) => {
            resolve(res);
        }).catch((reject1) => {
            reject(reject1);
        });
    });
}

export function updateNote(context,{
    Id,Title,Category,Content
}){
    return new Promise((resolve, reject)=>{
        const timestamp = getNowTimestamp();
        updateRecord(context.state.database, note, { Id: Id }, {
            Title:Title,
            Category:Category,
            Content:Content,
            Timestamp:timestamp,
            State:1
        }).then((res) =>{
            resolve(res);
        }).catch((reject1) => {
            reject(reject1);
        });
    });
}

export function updateNoteSort(context,{
    Id,Sort
}){
    return new Promise((resolve, reject)=>{
        updateRecord(context.state.database, note, { Id: Id }, {
            Sort: Sort,
            State:1,
        }).then((res) =>{
            resolve(res);
        }).catch((reject1) => {
            reject(reject1);
        });
    });
}

export function delNote(context,{Id,real}){
    return new Promise((resolve, reject) => {
        if(real == 0){
            //逻辑删除
            delRecord(context.state.database, note, { Id: Id }, {
                State: 0
            }).then((res) => {
                resolve(res);
            }).catch((reject1) => {
                reject(reject1);
            });
        }else{
            //物理删除
            delRecord(context.state.database, note, { Id: Id },"").then((res) => {
                resolve(res);
            }).catch((reject1) => {
                reject(reject1);
            });
        }
    });
}


export function startupDatabase(context) {
    return new Promise((resolve) => {
        document.addEventListener('deviceready', () => {
            openDatabase('MyDatabase').then((res) => {
                const db = res;
                context.commit('setDatabase', db);
                //创建文件信息表
                createTable(db, note).then((res1) => {
                    if (res1.rowsAffected > 0) {
                        console.log('fileinfo 创建成功');
                    }


                    addColumn(db,note,'ParentId','integer',0);
                    addColumn(db,note,'SType','integer',0);
                    //note_category_Id
                    addColumn(db,note,'note_category_Id','integer',0);


                }).catch((reject1) => {
                    console.log(reject1);
                });
                //创建分类表
                createTable(db, noteCategory).then((res1) => {
                    if (res1.rowsAffected > 0) {
                        console.log('noteCategory 创建成功');
                    }
                    addColumn(db,noteCategory,'note_Id','integer',0);
                }).catch((reject1) => {
                    console.log(reject1);
                });
                //创建版本表
                createTable(db, version).then((res1) => {
                    if (res1.rowsAffected > 0) {
                        console.log('version 创建成功');
                    }
                }).catch((reject1) => {
                    console.log(reject1);
                });
                resolve(db);
            });
        });
    });
}