(function(){"use strict";var e={8962:function(e,t,n){var a={};n.r(a),n.d(a,{IsShowTabBar:function(){return Me},getLocalItem:function(){return Ye}});var o={};n.r(o),n.d(o,{SelectTabBar:function(){return Pe},setDatabase:function(){return Oe},setLocalItem:function(){return Le},setRefreshListState:function(){return ke}});var c={};n.r(c),n.d(c,{addNote:function(){return Be},delNote:function(){return Ke},getNoteById:function(){return Ve},getNoteListByPage:function(){return ze},getNoteListNearMonth:function(){return qe},hasNoteOnYearMonthDate:function(){return $e},startupDatabase:function(){return Qe},updateNote:function(){return Ge},updateNoteSort:function(){return Je}});n(1557);var b=n(6035),f=(n(5708),n(6305)),r=(n(6349),n(9305)),l=(n(51),n(9545)),s=(n(9307),n(257)),i=(n(3249),n(8985)),u=(n(8829),n(3812)),d=(n(4165),n(3649)),h=(n(7603),n(1471)),g=(n(2097),n(9420)),p=(n(7461),n(4250)),m=(n(9041),n(5331)),v=(n(563),n(4821)),w=(n(4035),n(1441)),y=(n(9247),n(6056)),I=(n(3081),n(3805)),D=(n(5086),n(4521)),S=(n(8386),n(5258)),T=n(9242),C=n(3396);const N=(0,C.Uk)("笔记"),x=(0,C.Uk)("添加"),M=(0,C.Uk)("日历"),Y=(0,C.Uk)("设置");function P(e,t,n,a,o,c){const b=(0,C.up)("router-view"),f=(0,C.up)("van-tabbar-item"),r=(0,C.up)("van-tabbar");return(0,C.wg)(),(0,C.iD)(C.HY,null,[(0,C.Wm)(b,null,{default:(0,C.w5)((({Component:e})=>[((0,C.wg)(),(0,C.j4)(C.Ob,null,[((0,C.wg)(),(0,C.j4)((0,C.LL)(e)))],1024))])),_:1}),(0,C.Wm)(b,{name:"NewNote"}),(0,C.wy)((0,C.Wm)(r,{route:""},{default:(0,C.w5)((()=>[(0,C.Wm)(f,{icon:"notes-o",to:"/"},{default:(0,C.w5)((()=>[N])),_:1}),(0,C.Wm)(f,{icon:"plus",to:"/AddNote"},{default:(0,C.w5)((()=>[x])),_:1}),(0,C.Wm)(f,{icon:"calendar-o",to:"/Calendar"},{default:(0,C.w5)((()=>[M])),_:1}),(0,C.Wm)(f,{icon:"setting-o",to:"/Setting"},{default:(0,C.w5)((()=>[Y])),_:1})])),_:1},512),[[T.F8,e.IsShowTabBar]])],64)}var O=n(4870),k=n(678),L=n(65);function Z(){return new Promise(((e,t)=>{FingerprintAuth.isAvailable((n=>{if(n.isAvailable){var a={clientId:"com.github.topcoder520_debug",usename:"myUsername",password:"myPassword",disableBackup:!1,maxAttempts:"5",locale:"zh_CN",userAuthRequired:"false",dialogTitle:"指纹验证",dialogMessage:"请触摸指纹传感器",dialogHint:"本次验证不会保存您的指纹信息"};FingerprintAuth.encrypt(a,(t=>{e(t)}),(e=>{t(e)}))}else t("指纹解锁不可用")}),(e=>{t(e)}))}))}var A={setup(){const e=(0,k.tv)(),t=(0,O.iH)(0),n=(0,L.oR)();(0,C.bv)((()=>{n.dispatch("startupDatabase").then((()=>{a().then((t=>{console.log("flag",t),"true"==t?(console.log("开启指纹解锁"),Z().then((t=>{console.log("FingerprintVerification"+JSON.stringify(t)),e.push({path:"/"})})).catch((e=>{navigator.app.exitApp()}))):(console.log("不不不开启指纹解锁"),e.push({path:"/"}))}))})).catch((e=>{console.log("startupDatabase-err=>"+e)}))}));const a=async()=>await n.getters.getLocalItem(n.state.localFingerKey);return{active:t}},computed:{...(0,L.Se)(["IsShowTabBar"])}},F=n(89);const R=(0,F.Z)(A,[["render",P]]);var j=R,W=n(7139);const _={class:"van-multi-ellipsis--l3"},H={class:"top-tag"};function E(e,t,n,a,o,c){const b=(0,C.up)("van-nav-bar"),f=(0,C.up)("van-button"),r=(0,C.up)("van-col"),l=(0,C.up)("van-row"),s=(0,C.up)("van-swipe-cell"),i=(0,C.up)("van-list"),u=(0,C.up)("van-pull-refresh");return(0,C.wg)(),(0,C.iD)(C.HY,null,[(0,C.Wm)(b,{title:"笔记"}),(0,C.Wm)(u,{modelValue:a.Refresh,"onUpdate:modelValue":t[1]||(t[1]=e=>a.Refresh=e),onRefresh:a.onRefresh},{default:(0,C.w5)((()=>[(0,C.Wm)(i,{loading:a.loading,"onUpdate:loading":t[0]||(t[0]=e=>a.loading=e),finished:a.finished,"finished-text":"没有更多了",onLoad:a.onLoad},{default:(0,C.w5)((()=>[((0,C.wg)(!0),(0,C.iD)(C.HY,null,(0,C.Ko)(a.list,((e,t)=>((0,C.wg)(),(0,C.j4)(s,{key:t,"before-close":a.beforeClose},{left:(0,C.w5)((()=>[(0,C.Wm)(f,{square:"",type:"primary",style:{height:"100% !important"},text:e.Sort>1?"取消置顶":"置顶",onClick:t=>a.nextTop(e.Id)},null,8,["text","onClick"])])),right:(0,C.w5)((()=>[(0,C.Wm)(f,{square:"",style:{height:"100% !important"},text:"删除",onClick:t=>a.preDelItem(e.Id),type:"danger",class:"delete-button"},null,8,["onClick"])])),default:(0,C.w5)((()=>[(0,C.Wm)(l,{onClick:t=>a.onNoteDetail(e.Id)},{default:(0,C.w5)((()=>[(0,C.Wm)(r,{span:"24"},{default:(0,C.w5)((()=>[(0,C._)("p",_,(0,W.zw)(e.Title),1),(0,C._)("p",null,[(0,C.Uk)((0,W.zw)(e.CreateTime),1),(0,C.wy)((0,C._)("span",H,"置顶",512),[[T.F8,e.Sort>1]])])])),_:2},1024)])),_:2},1032,["onClick"])])),_:2},1032,["before-close"])))),128))])),_:1},8,["loading","finished","onLoad"])])),_:1},8,["modelValue","onRefresh"])],64)}n(1643);var U=n(1514),V=(n(767),n(7619)),$=n(253);const z={name:"NotesView",props:{Date:{type:Object,default:()=>({Year:0,Month:0,Day:0})},IsAll:Boolean},emits:{openNotedetail:null},setup(e,t){const n=(0,k.tv)(),a=(0,L.oR)(),o=(0,O.iH)(!1),c=(0,O.iH)([]),b=(0,O.iH)(!1),f=(0,O.iH)(!1);var l=0;const s=()=>{setTimeout((()=>{(0,V.Z)("刷新成功"),l=1,c.value=[],v(l,20),o.value=!1}),1e3)},i=()=>{l+=1,v(l,20)};let u=0;const d=e=>{u=e,console.log(u)};let h=0;const g=e=>{h=e,console.log(h)},p=e=>{e.Sort>1?a.dispatch("updateNoteSort",{Id:e.Id,Sort:1}).then((e=>{e.rowsAffected>0&&(l=1,c.value=[],v(l,20),setTimeout((function(){(0,V.Z)("已取消置顶")}),300))})).catch((e=>{V.Z.fail("取消置顶失败："+e)})):a.dispatch("updateNoteSort",{Id:e.Id,Sort:Date.now()}).then((e=>{e.rowsAffected>0&&(l=1,c.value=[],v(l,20),setTimeout((function(){(0,V.Z)("已置顶")}),300))})).catch((e=>{V.Z.fail("置顶失败："+e)}))},m=({position:e})=>{switch(e){case"left":return new Promise((()=>{for(let e=0;e<c.value.length;e++){const t=c.value[e];if(t.Id==h){p(t);break}}}));case"cell":case"outside":return!0;case"right":return new Promise((()=>{U.Z.confirm({title:"确定删除吗？"}).then((()=>{a.dispatch("delNote",u).then(((e,t)=>{if(e.rowsAffected>0){for(let e=0;e<c.value.length;e++){const t=c.value[e];if(t.Id==u){c.value.splice(e,1);break}}(0,r.Z)({type:"success",message:"已删除",position:"bottom"})}else V.Z.fail("删除失败："+t)}))})).catch((()=>{}))}))}};(0,C.dl)((()=>{const e=a.state.RefreshListState;console.log("store.state.RefreshListState:"+a.state.RefreshListState),e&&(c.value=[],l=1,v(l,20))})),(0,C.YP)((()=>e.Date),((e,t)=>{console.log(JSON.stringify(e),JSON.stringify(t)),c.value=[],l=1,v(l,20)}),{deep:!0});const v=(t,n)=>{a.dispatch("getNoteListByPage",{pageIndex:t,pageSize:n,Year:e.Date.Year,Month:e.Date.Month,Day:e.Date.Day,State:e.IsAll?0:1}).then((a=>{var o=a;console.log(t+", "+n+", "+e.Date.Year+", "+e.Date.Month+", "+e.Date.Day),console.log("getNoteListByPage=>"+JSON.stringify(o));for(let e=0;e<o.length;e++)c.value.push(o[e]);b.value=!1,0==o.length&&(f.value=!0)}))},w=e=>{console.log(e),t.emit("openNotedetail",{Id:e}),n.push({path:"/AddNote",query:{Id:e}})},{height:y}=(0,$.iP)(),I=(0,O.iH)(y.value+"px");return{Refresh:o,onRefresh:s,list:c,onLoad:i,loading:b,finished:f,onNoteDetail:w,preDelItem:d,beforeClose:m,vheight:I,nextTop:g}}},q=()=>{(0,T.sj)((e=>({"1a6fa24c":e.vheight})))},B=z.setup;z.setup=B?(e,t)=>(q(),B(e,t)):q;var G=z;const J=(0,F.Z)(G,[["render",E]]);var K=J;const Q={class:"content",ref:"root"},X={class:"category-name"};function ee(e,t,n,a,o,c){const b=(0,C.up)("van-nav-bar"),f=(0,C.up)("van-icon"),r=(0,C.up)("van-popover"),l=(0,C.up)("van-cell");return(0,C.wg)(),(0,C.iD)(C.HY,null,[(0,C.Wm)(b,{title:a.PageTitle,"left-text":"返回","right-text":"保存","left-arrow":"",onClickLeft:a.onClickLeft,onClickRight:a.onClickRight},null,8,["title","onClickLeft","onClickRight"]),(0,C._)("div",Q,[(0,C.wy)((0,C._)("input",{type:"text",class:"title",placeholder:"标题","onUpdate:modelValue":t[0]||(t[0]=e=>a.title=e)},null,512),[[T.nr,a.title]]),(0,C.Wm)(l,{class:"date-info",title:a.createTime,"onUpdate:title":t[2]||(t[2]=e=>a.createTime=e),icon:"calendar-o"},{"right-icon":(0,C.w5)((()=>[(0,C.Wm)(r,{placement:"left-start",show:a.showPopover,"onUpdate:show":t[1]||(t[1]=e=>a.showPopover=e),actions:a.actions,onSelect:a.onSelect},{reference:(0,C.w5)((()=>[(0,C.Wm)(f,{size:"22px",name:"label-o"}),(0,C._)("label",X,(0,W.zw)(a.categoryName),1),(0,C.Wm)(f,{class:"arrow-down",size:"20px",name:"arrow-down"})])),_:1},8,["show","actions","onSelect"])])),_:1},8,["title"]),(0,C.wy)((0,C._)("textarea",{class:"note-content","onUpdate:modelValue":t[3]||(t[3]=e=>a.content=e)},null,512),[[T.nr,a.content]])],512)],64)}function te(){const e=new Date,t=e.getFullYear(),n=e.getMonth()+1,a=e.getDate(),o=e.getHours(),c=e.getMinutes();return[t,"年",n,"月",a,"日 ",o,":",c].join("")}function ne(){return Date.now()}function ae(e,t){return t>12&&(t=12),t<0&&(t=1),1==t?(e-=1,t=12):t-=1,{Year:e,Month:t}}function oe(e,t){return t>12&&(t=12),t<0&&(t=1),12==t?(e+=1,t=1):t+=1,{Year:e,Month:t}}const ce={name:"AddNoteView",setup(){const e=(0,L.oR)(),t=(0,k.yj)();(0,C.bv)((()=>{e.commit("SelectTabBar",1),console.log("加载")})),(0,C.Ah)((()=>{e.commit("SelectTabBar",-1),console.log("卸载")}));const n=e=>(e=e??"",e.length>0&&e.length>50&&(e=e.substring(0,50)),e),a=()=>{e.commit("setRefreshListState",!1),history.back()},o=()=>{if(0==u.value.length){if(0==h.value.length)return void V.Z.fail("请输入内容");u.value=n(h.value)}if(i.value>0)e.dispatch("updateNote",{Id:i.value,Title:u.value,Category:d.value,Content:h.value}).then((t=>{t.rowsAffected>0&&((0,V.Z)("保存成功"),e.commit("setRefreshListState",!0))})).catch((e=>{V.Z.fail("保存失败："+e)}));else{const t=new Date,n=t.getFullYear(),a=t.getMonth()+1,o=t.getDate();e.dispatch("addNote",{Id:i.value,Title:u.value,Category:d.value,Content:h.value,CreateTime:g.value,Year:n,Month:a,Day:o,timestamp:Date.now()}).then((t=>{console.log(JSON.stringify(t)),t.rowsAffected>0&&((0,V.Z)("添加成功"),i.value=t.insertId,e.commit("setRefreshListState",!0))})).catch((e=>{V.Z.fail("添加失败："+e)}))}},c=(0,O.iH)(!1),b=[{text:"生活",icon:"add-o"},{text:"工作",icon:"music-o"},{text:"旅游",icon:"more-o"}],f=e=>{d.value=e.text},{height:r}=(0,$.iP)(),l=(0,O.iH)(),s=(0,O.iH)(r+"px");(0,C.bv)((()=>{const e=(0,$.EL)(l);s.value=r.value-e.height+"px"}));const i=(0,O.iH)(t.query.Id??0),u=(0,O.iH)(""),d=(0,O.iH)("未分类"),h=(0,O.iH)(""),g=(0,O.iH)(te()),p=(0,O.iH)("添加笔记");return i.value&&(p.value="编辑笔记",e.dispatch("getNoteById",i.value).then((e=>{const t=e;u.value=t.Title,d.value=t.Category,h.value=t.Content,g.value=t.CreateTime})).catch((e=>{console.log("查询笔记失败："+e),V.Z.fail("查询笔记失败："+e)}))),{onClickLeft:a,onClickRight:o,PageTitle:p,title:u,categoryName:d,content:h,createTime:g,actions:b,showPopover:c,onSelect:f,root:l,vheight:s,Id:i}}},be=()=>{(0,T.sj)((e=>({"13889bcb":e.vheight})))},fe=ce.setup;ce.setup=fe?(e,t)=>(be(),fe(e,t)):be;var re=ce;const le=(0,F.Z)(re,[["render",ee]]);var se=le;function ie(e,t,n,a,o,c){const b=(0,C.up)("van-icon"),f=(0,C.up)("van-calendar"),r=(0,C.up)("notes-view"),l=(0,C.up)("van-popup");return(0,C.wg)(),(0,C.iD)(C.HY,null,[(0,C.Wm)(f,{title:"日历",color:"#1989fa","min-date":a.minDate,"max-date":a.maxDate,poppable:!1,"show-confirm":!1,formatter:a.formatter,onSelect:a.SelectDate,onMonthShow:a.monthShow},{"top-info":(0,C.w5)((e=>[(0,C.wy)((0,C.Wm)(b,{class:"tips",color:"red",name:"bell"},null,512),[[T.F8,e.topInfo>0]])])),_:1},8,["min-date","max-date","formatter","onSelect","onMonthShow"]),(0,C.Wm)(l,{show:a.showPopup,"onUpdate:show":t[0]||(t[0]=e=>a.showPopup=e),onClickOverlay:a.cancelPop,onClickCloseIcon:a.cancelPop,closeable:"",position:"bottom",style:{height:"80%"}},{default:(0,C.w5)((()=>[(0,C.Wm)(r,{Date:a.DateObj,IsAll:!0,onOpenNotedetail:a.openNotedetail},null,8,["Date","onOpenNotedetail"])])),_:1},8,["show","onClickOverlay","onClickCloseIcon"])],64)}const ue={lunarInfo:[19416,19168,42352,21717,53856,55632,91476,22176,39632,21970,19168,42422,42192,53840,119381,46400,54944,44450,38320,84343,18800,42160,46261,27216,27968,109396,11104,38256,21234,18800,25958,54432,59984,92821,23248,11104,100067,37600,116951,51536,54432,120998,46416,22176,107956,9680,37584,53938,43344,46423,27808,46416,86869,19872,42416,83315,21168,43432,59728,27296,44710,43856,19296,43748,42352,21088,62051,55632,23383,22176,38608,19925,19152,42192,54484,53840,54616,46400,46752,103846,38320,18864,43380,42160,45690,27216,27968,44870,43872,38256,19189,18800,25776,29859,59984,27480,23232,43872,38613,37600,51552,55636,54432,55888,30034,22176,43959,9680,37584,51893,43344,46240,47780,44368,21977,19360,42416,86390,21168,43312,31060,27296,44368,23378,19296,42726,42208,53856,60005,54576,23200,30371,38608,19195,19152,42192,118966,53840,54560,56645,46496,22224,21938,18864,42359,42160,43600,111189,27936,44448,84835,37744,18936,18800,25776,92326,59984,27424,108228,43744,37600,53987,51552,54615,54432,55888,23893,22176,42704,21972,21200,43448,43344,46240,46758,44368,21920,43940,42416,21168,45683,26928,29495,27296,44368,84821,19296,42352,21732,53600,59752,54560,55968,92838,22224,19168,43476,41680,53584,62034,54560],solarMonth:[31,28,31,30,31,30,31,31,30,31,30,31],Gan:["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],Zhi:["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],Animals:["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"],festival:{"1-1":{title:"元旦节"},"2-14":{title:"情人节"},"5-1":{title:"劳动节"},"5-4":{title:"青年节"},"6-1":{title:"儿童节"},"9-10":{title:"教师节"},"10-1":{title:"国庆节"},"12-25":{title:"圣诞节"},"3-8":{title:"妇女节"},"3-12":{title:"植树节"},"4-1":{title:"愚人节"},"5-12":{title:"护士节"},"7-1":{title:"建党节"},"8-1":{title:"建军节"},"12-24":{title:"平安夜"}},lFestival:{"12-30":{title:"除夕"},"1-1":{title:"春节"},"1-15":{title:"元宵节"},"2-2":{title:"龙抬头"},"5-5":{title:"端午节"},"7-7":{title:"七夕节"},"7-15":{title:"中元节"},"8-15":{title:"中秋节"},"9-9":{title:"重阳节"},"10-1":{title:"寒衣节"},"10-15":{title:"下元节"},"12-8":{title:"腊八节"},"12-23":{title:"北方小年"},"12-24":{title:"南方小年"}},getFestival(){return this.festival},getLunarFestival(){return this.lFestival},setFestival(e={}){this.festival=e},setLunarFestival(e={}){this.lFestival=e},solarTerm:["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"],sTermInfo:["9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c3598082c95f8c965cc920f","97bd0b06bdb0722c965ce1cfcc920f","b027097bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c359801ec95f8c965cc920f","97bd0b06bdb0722c965ce1cfcc920f","b027097bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c359801ec95f8c965cc920f","97bd0b06bdb0722c965ce1cfcc920f","b027097bd097c36b0b6fc9274c91aa","9778397bd19801ec9210c965cc920e","97b6b97bd19801ec95f8c965cc920f","97bd09801d98082c95f8e1cfcc920f","97bd097bd097c36b0b6fc9210c8dc2","9778397bd197c36c9210c9274c91aa","97b6b97bd19801ec95f8c965cc920e","97bd09801d98082c95f8e1cfcc920f","97bd097bd097c36b0b6fc9210c8dc2","9778397bd097c36c9210c9274c91aa","97b6b97bd19801ec95f8c965cc920e","97bcf97c3598082c95f8e1cfcc920f","97bd097bd097c36b0b6fc9210c8dc2","9778397bd097c36c9210c9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c3598082c95f8c965cc920f","97bd097bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c3598082c95f8c965cc920f","97bd097bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c359801ec95f8c965cc920f","97bd097bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c359801ec95f8c965cc920f","97bd097bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c359801ec95f8c965cc920f","97bd097bd07f595b0b6fc920fb0722","9778397bd097c36b0b6fc9210c8dc2","9778397bd19801ec9210c9274c920e","97b6b97bd19801ec95f8c965cc920f","97bd07f5307f595b0b0bc920fb0722","7f0e397bd097c36b0b6fc9210c8dc2","9778397bd097c36c9210c9274c920e","97b6b97bd19801ec95f8c965cc920f","97bd07f5307f595b0b0bc920fb0722","7f0e397bd097c36b0b6fc9210c8dc2","9778397bd097c36c9210c9274c91aa","97b6b97bd19801ec9210c965cc920e","97bd07f1487f595b0b0bc920fb0722","7f0e397bd097c36b0b6fc9210c8dc2","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf7f1487f595b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf7f1487f595b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf7f1487f531b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf7f1487f531b0b0bb0b6fb0722","7f0e397bd07f595b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c9274c920e","97bcf7f0e47f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","9778397bd097c36b0b6fc9210c91aa","97b6b97bd197c36c9210c9274c920e","97bcf7f0e47f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","9778397bd097c36b0b6fc9210c8dc2","9778397bd097c36c9210c9274c920e","97b6b7f0e47f531b0723b0b6fb0722","7f0e37f5307f595b0b0bc920fb0722","7f0e397bd097c36b0b6fc9210c8dc2","9778397bd097c36b0b70c9274c91aa","97b6b7f0e47f531b0723b0b6fb0721","7f0e37f1487f595b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc9210c8dc2","9778397bd097c36b0b6fc9274c91aa","97b6b7f0e47f531b0723b0b6fb0721","7f0e27f1487f595b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b7f0e47f531b0723b0787b0721","7f0e27f0e47f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","9778397bd097c36b0b6fc9210c91aa","97b6b7f0e47f149b0723b0787b0721","7f0e27f0e47f531b0723b0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","9778397bd097c36b0b6fc9210c8dc2","977837f0e37f149b0723b0787b0721","7f07e7f0e47f531b0723b0b6fb0722","7f0e37f5307f595b0b0bc920fb0722","7f0e397bd097c35b0b6fc9210c8dc2","977837f0e37f14998082b0787b0721","7f07e7f0e47f531b0723b0b6fb0721","7f0e37f1487f595b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc9210c8dc2","977837f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","977837f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","977837f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","977837f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","977837f0e37f14998082b0787b06bd","7f07e7f0e47f149b0723b0787b0721","7f0e27f0e47f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","977837f0e37f14998082b0723b06bd","7f07e7f0e37f149b0723b0787b0721","7f0e27f0e47f531b0723b0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","977837f0e37f14898082b0723b02d5","7ec967f0e37f14998082b0787b0721","7f07e7f0e47f531b0723b0b6fb0722","7f0e37f1487f595b0b0bb0b6fb0722","7f0e37f0e37f14898082b0723b02d5","7ec967f0e37f14998082b0787b0721","7f07e7f0e47f531b0723b0b6fb0722","7f0e37f1487f531b0b0bb0b6fb0722","7f0e37f0e37f14898082b0723b02d5","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e37f1487f531b0b0bb0b6fb0722","7f0e37f0e37f14898082b072297c35","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e37f0e37f14898082b072297c35","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e37f0e366aa89801eb072297c35","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f149b0723b0787b0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e37f0e366aa89801eb072297c35","7ec967f0e37f14998082b0723b06bd","7f07e7f0e47f149b0723b0787b0721","7f0e27f0e47f531b0723b0b6fb0722","7f0e37f0e366aa89801eb072297c35","7ec967f0e37f14998082b0723b06bd","7f07e7f0e37f14998083b0787b0721","7f0e27f0e47f531b0723b0b6fb0722","7f0e37f0e366aa89801eb072297c35","7ec967f0e37f14898082b0723b02d5","7f07e7f0e37f14998082b0787b0721","7f07e7f0e47f531b0723b0b6fb0722","7f0e36665b66aa89801e9808297c35","665f67f0e37f14898082b0723b02d5","7ec967f0e37f14998082b0787b0721","7f07e7f0e47f531b0723b0b6fb0722","7f0e36665b66a449801e9808297c35","665f67f0e37f14898082b0723b02d5","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e36665b66a449801e9808297c35","665f67f0e37f14898082b072297c35","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e26665b66a449801e9808297c35","665f67f0e37f1489801eb072297c35","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722"],nStr1:["日","一","二","三","四","五","六","七","八","九","十"],nStr2:["初","十","廿","卅"],nStr3:["正","二","三","四","五","六","七","八","九","十","冬","腊"],lYearDays:function(e){let t,n=348;for(t=32768;t>8;t>>=1)n+=this.lunarInfo[e-1900]&t?1:0;return n+this.leapDays(e)},leapMonth:function(e){return 15&this.lunarInfo[e-1900]},leapDays:function(e){return this.leapMonth(e)?65536&this.lunarInfo[e-1900]?30:29:0},monthDays:function(e,t){return t>12||t<1?-1:this.lunarInfo[e-1900]&65536>>t?30:29},solarDays:function(e,t){if(t>12||t<1)return-1;const n=t-1;return 1===n?e%4===0&&e%100!==0||e%400===0?29:28:this.solarMonth[n]},toGanZhiYear:function(e){var t=(e-3)%10,n=(e-3)%12;return 0===t&&(t=10),0===n&&(n=12),this.Gan[t-1]+this.Zhi[n-1]},toAstro:function(e,t){const n="魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯",a=[20,19,21,21,21,22,23,23,23,23,22,22];return n.substr(2*e-(t<a[e-1]?2:0),2)+"座"},toGanZhi:function(e){return this.Gan[e%10]+this.Zhi[e%12]},getTerm:function(e,t){if(e<1900||e>2100||t<1||t>24)return-1;const n=this.sTermInfo[e-1900],a=[];for(let o=0;o<n.length;o+=5){const e=parseInt("0x"+n.substr(o,5)).toString();a.push(e[0],e.substr(1,2),e[3],e.substr(4,2))}return parseInt(a[t-1])},toChinaMonth:function(e){if(e>12||e<1)return-1;let t=this.nStr3[e-1];return t+="月",t},toChinaDay:function(e){let t;switch(e){case 10:t="初十";break;case 20:t="二十";break;case 30:t="三十";break;default:t=this.nStr2[Math.floor(e/10)],t+=this.nStr1[e%10]}return t},getAnimal:function(e){return this.Animals[(e-4)%12]},solar2lunar:function(e,t,n){let a,o=parseInt(e),c=parseInt(t),b=parseInt(n);if(o<1900||o>2100)return-1;if(1900===o&&1===c&&b<31)return-1;a=o?new Date(o,parseInt(c)-1,b):new Date;let f,r=0,l=0;o=a.getFullYear(),c=a.getMonth()+1,b=a.getDate();let s=(Date.UTC(a.getFullYear(),a.getMonth(),a.getDate())-Date.UTC(1900,0,31))/864e5;for(f=1900;f<2101&&s>0;f++)l=this.lYearDays(f),s-=l;s<0&&(s+=l,f--);let i=new Date,u=!1;i.getFullYear()===o&&i.getMonth()+1===c&&i.getDate()===b&&(u=!0);let d=a.getDay(),h=this.nStr1[d];0===d&&(d=7);const g=f;r=this.leapMonth(f);let p=!1;for(f=1;f<13&&s>0;f++)r>0&&f===r+1&&!1===p?(--f,p=!0,l=this.leapDays(g)):l=this.monthDays(g,f),!0===p&&f===r+1&&(p=!1),s-=l;0===s&&r>0&&f===r+1&&(p?p=!1:(p=!0,--f)),s<0&&(s+=l,--f);const m=f,v=s+1,w=c-1,y=this.toGanZhiYear(g),I=this.getTerm(o,2*c-1),D=this.getTerm(o,2*c);let S=this.toGanZhi(12*(o-1900)+c+11);b>=I&&(S=this.toGanZhi(12*(o-1900)+c+12));let T=!1,C=null;I===b&&(T=!0,C=this.solarTerm[2*c-2]),D===b&&(T=!0,C=this.solarTerm[2*c-1]);const N=Date.UTC(o,w,1,0,0,0,0)/864e5+25567+10,x=this.toGanZhi(N+b-1),M=this.toAstro(c,b),Y=o+"-"+c+"-"+b,P=g+"-"+m+"-"+v,O=this.festival,k=this.lFestival,L=c+"-"+b;let Z=m+"-"+v;return 12===m&&29===v&&29===this.monthDays(g,m)&&(Z="12-30"),{date:Y,lunarDate:P,festival:O[L]?O[L].title:null,lunarFestival:k[Z]?k[Z].title:null,lYear:g,lMonth:m,lDay:v,Animal:this.getAnimal(g),IMonthCn:(p?"闰":"")+this.toChinaMonth(m),IDayCn:this.toChinaDay(v),cYear:o,cMonth:c,cDay:b,gzYear:y,gzMonth:S,gzDay:x,isToday:u,isLeap:p,nWeek:d,ncWeek:"星期"+h,isTerm:T,Term:C,astro:M}},lunar2solar:function(e,t,n,a){e=parseInt(e),t=parseInt(t),n=parseInt(n),a=!!a;const o=this.leapMonth(e);if(a&&o!==t)return-1;if(2100===e&&12===t&&n>1||1900===e&&1===t&&n<31)return-1;const c=this.monthDays(e,t);let b=c;if(a&&(b=this.leapDays(e,t)),e<1900||e>2100||n>b)return-1;let f,r=0;for(f=1900;f<e;f++)r+=this.lYearDays(f);let l=0,s=!1;for(f=1;f<t;f++)l=this.leapMonth(e),s||l<=f&&l>0&&(r+=this.leapDays(e),s=!0),r+=this.monthDays(e,f);a&&(r+=c);const i=Date.UTC(1900,1,30,0,0,0),u=new Date(864e5*(r+n-31)+i),d=u.getUTCFullYear(),h=u.getUTCMonth()+1,g=u.getUTCDate();return this.solar2lunar(d,h,g)}},de={name:"CalendarView",components:{NotesView:K},setup(){const e=(0,k.tv)(),t=(0,L.oR)(),n=(0,O.iH)("100%"),{height:a}=(0,$.iP)(),o=(0,O.qj)({}),c=async(e,n)=>{const a=await t.dispatch("getNoteListNearMonth",{Year:e,Month:n});console.log("getNoteListNearMonth=>"+JSON.stringify(a));var c=[],b=[],f=[];const r=ae(e,n),l=oe(e,n);for(let t=0;t<a.length;t++){const o=a[t];o.Year==e&&o.Month==n?c.push(o):o.Year==r.Year&&o.Month==r.Month?b.push(o):o.Year==l.Year&&o.Month==l.Month&&f.push(o)}o[`${e}-${n}`]=c,o[`${r.Year}-${r.Month}`]=b,o[`${l.Year}-${l.Month}`]=f};c((new Date).getFullYear(),(new Date).getMonth()+1),(0,C.bv)((()=>{n.value=a.value-80+"px"}));const b=(0,C.Fl)((()=>e=>{const t=new Date(e.date),n=t.getFullYear(),a=t.getMonth()+1,o=t.getDate(),c=t.getDay();0!==c&&6!==c||(e.className="weekendRed");const b=ue.solar2lunar(n,a,o),f=new Date,r=f.getFullYear(),l=f.getMonth()+1,s=f.getDate();return n==r&&a==l&&o==s&&(e.className+=" today"),null!=b.festival&&""!=b.festival?e.bottomInfo=b.festival:null!=b.Term&&""!=b.Term?e.bottomInfo=b.Term:null!=b.IDayCn&&""!=b.IDayCn&&(e.bottomInfo=b.IDayCn),p(e,n,a,o),e})),f=(0,O.iH)(!1),r=(0,O.qj)({Year:0,Month:0,Day:0}),l=e=>{const t=new Date(e),n=t.getFullYear(),a=t.getMonth()+1,o=t.getDate();console.log([n,a,o].join("-")),r.Year=n,r.Month=a,r.Day=o,console.log(JSON.stringify(r)),f.value=!0,s()},s=()=>{const e={title:"title",url:"/Calendar"};window.history.pushState(e,e.title,e.url)};window.addEventListener("popstate",(()=>{console.log("popstate"),u.value&&f.value&&(f.value=!1)}),!1);const i=()=>{console.log("cancelPop"),f.value&&e.back()},u=(0,O.iH)(!1);(0,C.dl)((()=>{console.log("actived"),u.value=!0,console.log("historyNote",d.value.length),d.value.length>0&&(console.log("showPop",f.value),d.value=[],setTimeout((()=>{f.value=!0}),100))})),(0,C.se)((()=>{console.log("deactived"),u.value=!1}));const d=(0,O.iH)([]),h=e=>{console.log("openNotedetail",JSON.stringify(e)),d.value.push(e.Id)},g=e=>{console.log("monthShow"),console.log(JSON.stringify(e)),c(e.date.getFullYear(),e.date.getMonth()+1)},p=(e,t,n,a)=>{var c=o[`${t}-${n}`];if(c&&c.length>0)for(let o=0;o<c.length;o++){const t=c[o];if(t.Day==a){e.topInfo=1;break}}else e.topInfo=0},m=new Date;return{vheight:n,minDate:new Date(m.getFullYear()-3,0,1),maxDate:new Date(m.getFullYear()+3,11,31),formatter:b,SelectDate:l,monthShow:g,showPopup:f,DateObj:r,cancelPop:i,openNotedetail:h}}},he=()=>{(0,T.sj)((e=>({"3095b6f6":e.vheight})))},ge=de.setup;de.setup=ge?(e,t)=>(he(),ge(e,t)):he;var pe=de;const me=(0,F.Z)(pe,[["render",ie]]);var ve=me;const we={class:"setting"};function ye(e,t,n,a,o,c){const b=(0,C.up)("van-nav-bar"),f=(0,C.up)("van-switch"),r=(0,C.up)("van-cell"),l=(0,C.up)("van-cell-group");return(0,C.wg)(),(0,C.iD)(C.HY,null,[(0,C.Wm)(b,{title:"设置"}),(0,C._)("div",we,[(0,C.Wm)(l,{inset:""},{default:(0,C.w5)((()=>[(0,C.Wm)(r,{title:"开启指纹验证",size:"large"},{"right-icon":(0,C.w5)((()=>[(0,C.Wm)(f,{modelValue:a.switchChecked,"onUpdate:modelValue":[t[0]||(t[0]=e=>a.switchChecked=e),a.onUpdateValue]},null,8,["modelValue","onUpdate:modelValue"])])),_:1})])),_:1})])],64)}var Ie={name:"SettingView",setup(){const e=(0,L.oR)(),t=(0,O.iH)(!1),n=n=>{console.log("newValue",n),U.Z.confirm({title:"提醒",message:n?"是否开启指纹验证？":"是否关闭指纹验证？"}).then((()=>{t.value=n,e.commit("setLocalItem",{key:e.state.localFingerKey,val:n})})).catch((()=>{t.value=!n}))};(0,C.dl)((()=>{a()}));const a=async()=>{var n=await e.getters.getLocalItem(e.state.localFingerKey);console.log("getLocalItem",n,typeof n),t.value="true"===n};return{switchChecked:t,onUpdateValue:n}}};const De=(0,F.Z)(Ie,[["render",ye]]);var Se=De;const Te=[{path:"/",name:"NotesView",component:K},{path:"/AddNote",name:"AddNoteView",components:{NewNote:se}},{path:"/Calendar",name:"CalendarView",component:ve},{path:"/Setting",name:"SettingView",component:Se}],Ce=(0,k.p7)({history:(0,k.PO)(""),routes:Te});var Ne=Ce,xe={PreTabbarIndex:0,CurTabbarIndex:0,database:{},RefreshListState:!1,localFingerKey:"openFingerprint"};function Me(e){return!(1==e.CurTabbarIndex)}function Ye(){return e=>localStorage.getItem(e)}function Pe(e,t){t<0?(e.CurTabbarIndex=e.PreTabbarIndex,e.PreTabbarIndex=0):(e.PreTabbarIndex=e.CurTabbarIndex,e.CurTabbarIndex=t)}function Oe(e,t){e.database=t}function ke(e,t){e.RefreshListState=t}function Le(e,t){localStorage.setItem(t.key,t.val)}function Ze(e){return new Promise((t=>{e=e||"default_database_db";const n="browser"===window.cordova.platformId?window.openDatabase(e,"1.0","Data",2097152):window.sqlitePlugin.openDatabase({name:e+".db",location:"default",androidDatabaseImplementation:2});t(n)}))}function Ae(e,t){if(null==e||null==t)return"";var n=t.tableName,a=t.fields;if(""==n||null==n||void 0==n)return"";Object.prototype.hasOwnProperty.call(a,"Id")||(a["Id"]="integer");var o=[];for(let f in a)"Id"!=f?o.push('"'+f+'" '+a[f]+","):o.push('"Id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,');let c=o.length,b=o[c-1];return o[c-1]=b.substring(0,b.lastIndexOf(",")),new Promise(((t,a)=>{e.transaction((function(e){const a='CREATE TABLE IF NOT EXISTS "'+n+'" ( \n                '+o.join(" ")+" \n            )";console.log("SQL===> "+a),e.executeSql(a,[],((e,n)=>{t(n),n.rowsAffected>0&&console.log("fileinfo 创建成功")}))}),(function(e){console.log("transaction error: "+e.message),a("transaction error: "+e.message)}),(function(){console.log("resolve transaction ok")}))}))}function Fe(e){return!!e&&("text"!=e.toLowerCase()&&"blob"!=e.toLowerCase())}function Re(e,t,n,a){var o=t.tableName,c=t.fields,b="";if("object"==typeof n){for(let e in n)Fe(c[e])?b+=e+" = "+n[e]+" and ":b+=e+" = '"+n[e]+"' and ";b=b.substring(0,b.lastIndexOf("and"))}else"string"==typeof n&&(b=n);var f="";if("object"==typeof a){for(let e in a)Fe(c[e])?f+=e+" = "+a[e]+" , ":f+=e+" = '"+a[e]+"' , ";f=f.substring(0,f.lastIndexOf(","))}else"string"==typeof a&&(f=a);return new Promise(((t,n)=>{e.transaction((function(e){var a="";a=""==f?"delete from "+o+" WHERE "+b:"update "+o+" set "+f+" WHERE "+b,console.log("SQL===> "+a),e.executeSql(a,[],(function(e,n){t({rowsAffected:n.rowsAffected})}),(function(e,t){console.log("DELETE error: "+t.message),n("DELETE  error: "+t.message)}))}),(function(e){console.log("transaction error: "+e.message)}),(function(){console.log("transaction ok")}))}))}function je(e,t,n,a){var o=t.tableName,c=t.fields,b="";if("object"==typeof n){delete n.State;for(let e in n)Fe(c[e])?b+=e+" = "+n[e]+" and ":b+=e+" = '"+n[e]+"' and ";b=b.substring(0,b.lastIndexOf("and"))}else"string"==typeof n&&(b=n);var f="";if("object"==typeof a){delete a.State;for(let e in a)Fe(c[e])?f+=e+" = "+a[e]+" , ":f+=e+" = '"+a[e]+"' , ";f=f.substring(0,f.lastIndexOf(","))}else"string"==typeof a&&(f=a);return new Promise(((t,n)=>{e.transaction((function(e){var a="update "+o+" set "+f+" WHERE "+b;console.log("SQL===> "+a),e.executeSql(a,[],(function(e,n){t({rowsAffected:n.rowsAffected})}),(function(e,t){console.log("update error: "+t.message),n("update  error: "+t.message)}))}),(function(e){console.log("transaction error: "+e.message)}),(function(){console.log("transaction ok")}))}))}function We(e,t,n){var a=t.tableName,o="",c="",b=[];if("object"==typeof n){delete n.Id;for(let e in n)o+=e+" , ",c+="?,",b.push(n[e]);o=o.substring(0,o.lastIndexOf(",")),c=c.substring(0,c.lastIndexOf(","))}return new Promise(((t,n)=>{e.transaction((function(e){var f="INSERT INTO "+a+" ("+o+") VALUES ("+c+")";console.log("SQL===> "+f),e.executeSql(f,b,(function(e,n){t(n)}),(function(e,t){console.log("INSERT error: "+t.message),n("INSERT error: "+t.message)}))}),(function(e){console.log("transaction error: "+e.message)}),(function(){console.log("transaction ok")}))}))}function _e(e,t,n,a,o){var c=t.tableName,b=t.fields,f="";for(let l in b)f+=l+",";a&&(a.endsWith(",")?f+=a:f+=a+","),f=f.substring(0,f.lastIndexOf(","));var r="";if("object"==typeof n){for(let e in n)Fe(b[e])?r+=e+" = "+n[e]+" and ":r+=e+" = '"+n[e]+"' and ";r=r.substring(0,r.lastIndexOf("and"))}else"string"==typeof n&&(r=n);return o=o?" order by "+o:"",new Promise(((t,n)=>{e.transaction((e=>{const n="select "+f+" from "+c+" where "+r+" "+o;console.log("SQL===> "+n),e.executeSql(n,[],((e,n)=>{for(var a={},o=0;o<n.rows.length;o++){a=n.rows.item(o);break}t(a)}))}),(function(e){n(e.message)}),(function(){}))}))}function He(e,t,n,a,o,c){var b=t.tableName,f=t.fields,r="";for(let d in f)r+=d+",";a&&(a.endsWith(",")?r+=a:r+=a+","),r=r.substring(0,r.lastIndexOf(","));var l="";if("object"==typeof n){for(let e in n)Fe(f[e])?l+=e+" = "+n[e]+" and ":l+=e+" = '"+n[e]+"' and ";l=l.substring(0,l.lastIndexOf("and"))}else"string"==typeof n&&(l=n);o=o?" order by "+o:" order by Id asc ";var s="";if(c&&"object"==typeof c&&Object.prototype.hasOwnProperty.call(c,"pageIndex")&&Object.prototype.hasOwnProperty.call(c,"pageSize")){var i=c.pageIndex,u=c.pageSize;i<1&&(i=1),i=(i-1)*u,s=" limit "+i+","+u}return new Promise(((t,n)=>{e.transaction((e=>{const n="select "+r+" from "+b+" where "+l+" "+o+" "+s;console.log("SQL===> "+n),e.executeSql(n,[],((e,n)=>{for(var a=[],o=0;o<n.rows.length;o++)a.push(n.rows.item(o));t(a)}))}),(function(e){n(e.message)}),(function(){}))}))}const Ee={tableName:"note",fields:{Id:"integer",Title:"text",Category:"text",Content:"text",CreateTime:"text",State:"integer",Year:"integer",Month:"integer",Day:"integer",Sort:"integer",Timestamp:"integer"}},Ue={tableName:"note_version",fields:{Version:"text",Timestamp:"integer",Des:"text",CreateTime:"text",Info1:"text",Info2:"text",Info3:"text",State:"integer",Sort:"integer"}};function Ve(e,t){return new Promise(((n,a)=>{_e(e.state.database,Ee,{Id:t},"").then((e=>{n(e)})).catch((e=>{a(e)}))}))}function $e(e,{Year:t,Month:n,Date:a}){return new Promise(((o,c)=>{var b="count(1) as cnt";_e(e.state.database,{tableName:Ee.tableName,fields:[]},`Year =${t} and Month=${n} and Day=${a}`,b).then((e=>{for(var t=0,n=0;n<e.rows.length;n++){t=e.rows.item(n).cnt;break}o(t)})).catch((e=>{c(e)}))}))}function ze(e,{pageIndex:t=1,pageSize:n=20,Year:a=0,Month:o=0,Day:c=0,State:b=0}){return new Promise(((f,r)=>{t<1&&(t=1),t=(t-1)*n;var l={pageIndex:t,pageSize:n},s={};b>0&&(s.State=b),a>0&&(s.Year=a),o>0&&(s.Month=o),c>0&&(s.Day=c),He(e.state.database,Ee,s,"","Sort desc,Timestamp desc",l).then((e=>{f(e)})).catch((e=>{r(e)}))}))}function qe(e,{Year:t,Month:n}){return new Promise(((a,o)=>{const c=ae(t,n),b=oe(t,n);He(e.state.database,Ee,`(Year = ${c.Year} and Month=${c.Month} or Year = ${t} and Month=${n} or Year = ${b.Year} and Month=${b.Month})`,"","Year desc,Month desc").then((e=>{a(e)})).catch((e=>{o(e)}))}))}function Be(e,{Title:t,Category:n,Content:a,CreateTime:o,Year:c,Month:b,Day:f,timestamp:r}){return new Promise(((l,s)=>{We(e.state.database,Ee,{Id:0,Title:t,Category:n,Content:a,CreateTime:o,Year:c,Month:b,Day:f,State:1,Sort:1,Timestamp:r}).then((e=>{l(e)})).catch((e=>{s(e)}))}))}function Ge(e,{Id:t,Title:n,Category:a,Content:o}){return new Promise(((c,b)=>{const f=te(),r=new Date,l=r.getFullYear(),s=r.getMonth()+1,i=r.getDate(),u=ne();je(e.state.database,Ee,{Id:t},{Title:n,Category:a,Content:o,CreateTime:f,Year:l,Month:s,Day:i,Timestamp:u}).then((e=>{c(e)})).catch((e=>{b(e)}))}))}function Je(e,{Id:t,Sort:n}){return new Promise(((a,o)=>{je(e.state.database,Ee,{Id:t},{Sort:n}).then((e=>{a(e)})).catch((e=>{o(e)}))}))}function Ke(e,t){return new Promise(((n,a)=>{Re(e.state.database,Ee,{Id:t},{State:0}).then((e=>{n(e)})).catch((e=>{a(e)}))}))}function Qe(e){return new Promise((t=>{document.addEventListener("deviceready",(()=>{Ze("MyDatabase").then((n=>{const a=n;e.commit("setDatabase",a),Ae(a,Ee).then((e=>{e.rowsAffected>0&&console.log("fileinfo 创建成功")})).catch((e=>{console.log(e)})),Ae(a,Ue).then((e=>{e.rowsAffected>0&&console.log("version 创建成功")})).catch((e=>{console.log(e)})),t(a)}))}))}))}var Xe=(0,L.MT)({state:xe,getters:a,mutations:o,actions:c,modules:{}});n(5110);const et=(0,T.ri)(j);et.use(Xe),et.use(Ne),et.use(S.Z),et.use(D.Z),et.use(I.Z),et.use(y.Z),et.use(w.Z),et.use(v.Z),et.use(m.Z),et.use(p.Z),et.use(g.Z),et.use(h.Z),et.use(m.Z),et.use(d.Z),et.use(u.Z),et.use(i.Z),et.use(s.Z),et.use(l.Z),et.use(r.Z),et.use(f.Z),et.use(b.Z),et.mount("#app")}},t={};function n(a){var o=t[a];if(void 0!==o)return o.exports;var c=t[a]={exports:{}};return e[a](c,c.exports,n),c.exports}n.m=e,function(){var e=[];n.O=function(t,a,o,c){if(!a){var b=1/0;for(s=0;s<e.length;s++){a=e[s][0],o=e[s][1],c=e[s][2];for(var f=!0,r=0;r<a.length;r++)(!1&c||b>=c)&&Object.keys(n.O).every((function(e){return n.O[e](a[r])}))?a.splice(r--,1):(f=!1,c<b&&(b=c));if(f){e.splice(s--,1);var l=o();void 0!==l&&(t=l)}}return t}c=c||0;for(var s=e.length;s>0&&e[s-1][2]>c;s--)e[s]=e[s-1];e[s]=[a,o,c]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,a){var o,c,b=a[0],f=a[1],r=a[2],l=0;if(b.some((function(t){return 0!==e[t]}))){for(o in f)n.o(f,o)&&(n.m[o]=f[o]);if(r)var s=r(n)}for(t&&t(a);l<b.length;l++)c=b[l],n.o(e,c)&&e[c]&&e[c][0](),e[c]=0;return n.O(s)},a=self["webpackChunkvue"]=self["webpackChunkvue"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=n.O(void 0,[998],(function(){return n(8962)}));a=n.O(a)})();
//# sourceMappingURL=app.24b7b808.js.map