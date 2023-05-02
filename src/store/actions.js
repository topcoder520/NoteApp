import {getNowDateString,getNowTimestamp,getPreMonths,getNextMonths} from '@/util/date'
import {
    openDatabase,
    createTable,
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
        Title: "text",
        Category: "text",
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
        getRecord(context.state.database,{tableName:note.tableName,fields:[]}, `Year =${Year} and Month=${Month} and Day=${Date}`, fieldSql).then((res) => {
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

export function getNoteListByPage(context,{pageIndex=1,pageSize=20,Year=0,Month=0,Day=0,State = 0}){
    return new Promise((resolve,reject)=>{
        if(pageIndex<1){
            pageIndex = 1;
        }
        pageIndex = (pageIndex - 1)*pageSize;
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
        getRecordList(context.state.database, note  , whereObject,"","Sort desc,Timestamp desc",page).then((res) => {
            resolve(res);
        }).catch((reject1) => {
            reject(reject1);
        });
    });
}

export function getNoteListNearMonth(context,{Year,Month}){
    return new Promise((resolve,reject)=>{
        const preData = getPreMonths(Year,Month);
        const nextData = getNextMonths(Year,Month);
        getRecordList(context.state.database, note  , `(Year = ${preData.Year} and Month=${preData.Month} or Year = ${Year} and Month=${Month} or Year = ${nextData.Year} and Month=${nextData.Month})`,"","Year desc,Month desc").then((res) => {
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
        const CreateTime = getNowDateString();
        const now = new Date();
        const Year = now.getFullYear();
        const Month = now.getMonth()+1;
        const Day = now.getDate();
        const timestamp = getNowTimestamp();
        updateRecord(context.state.database, note, { Id: Id }, {
            Title:Title,
            Category:Category,
            Content:Content,
            CreateTime:CreateTime,
            Year:Year,
            Month:Month,
            Day:Day,
            Timestamp:timestamp
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
        }).then((res) =>{
            resolve(res);
        }).catch((reject1) => {
            reject(reject1);
        });
    });
}

export function delNote(context,id){
    return new Promise((resolve, reject) => {
        delRecord(context.state.database, note, { Id: id }, {
            State: 0
        }).then((res) => {
            resolve(res);
        }).catch((reject1) => {
            reject(reject1);
        });
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