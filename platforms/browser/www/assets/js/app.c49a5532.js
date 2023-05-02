(function(){"use strict";var e={6560:function(e,t,n){var a={};n.r(a),n.d(a,{IsShowTabBar:function(){return Pe}});var o={};n.r(o),n.d(o,{SelectTabBar:function(){return ke},setDatabase:function(){return Le},setRefreshListState:function(){return Re}});var c={};n.r(c),n.d(c,{addNote:function(){return Ge},delNote:function(){return Xe},getNoteById:function(){return ze},getNoteListByPage:function(){return qe},getNoteListNearMonth:function(){return Be},hasNoteOnYearMonthDate:function(){return $e},startupDatabase:function(){return Qe},updateNote:function(){return Je},updateNoteSort:function(){return Ke}});n(5708);var f=n(2961),b=(n(6349),n(9305)),r=(n(51),n(9545)),s=(n(9307),n(257)),i=(n(3249),n(8985)),l=(n(8829),n(3812)),u=(n(4165),n(3649)),d=(n(7603),n(1471)),h=(n(2097),n(9420)),g=(n(7461),n(4250)),p=(n(9041),n(5331)),m=(n(563),n(4821)),v=(n(4035),n(1441)),w=(n(9247),n(6056)),y=(n(3081),n(3805)),I=(n(5086),n(4521)),D=(n(8386),n(5258)),S=n(9242),T=n(3396);const C=(0,T.Uk)("笔记"),x=(0,T.Uk)("添加"),N=(0,T.Uk)("日历"),M=(0,T.Uk)("设置");function Z(e,t,n,a,o,c){const f=(0,T.up)("router-view"),b=(0,T.up)("van-tabbar-item"),r=(0,T.up)("van-tabbar");return(0,T.wg)(),(0,T.iD)(T.HY,null,[(0,T.Wm)(f,null,{default:(0,T.w5)((({Component:e})=>[((0,T.wg)(),(0,T.j4)(T.Ob,null,[((0,T.wg)(),(0,T.j4)((0,T.LL)(e)))],1024))])),_:1}),(0,T.Wm)(f,{name:"NewNote"}),(0,T.wy)((0,T.Wm)(r,{route:""},{default:(0,T.w5)((()=>[(0,T.Wm)(b,{icon:"notes-o",to:"/"},{default:(0,T.w5)((()=>[C])),_:1}),(0,T.Wm)(b,{icon:"plus",to:"/AddNote"},{default:(0,T.w5)((()=>[x])),_:1}),(0,T.Wm)(b,{icon:"calendar-o",to:"/Calendar"},{default:(0,T.w5)((()=>[N])),_:1}),(0,T.Wm)(b,{icon:"setting-o"},{default:(0,T.w5)((()=>[M])),_:1})])),_:1},512),[[S.F8,e.IsShowTabBar]])],64)}n(767);var Y=n(7619),P=n(4870),k=n(678),L=n(65);function R(){return new Promise(((e,t)=>{FingerprintAuth.isAvailable((n=>{if(n.isAvailable){var a={clientId:"com.github.topcoder520_debug",usename:"myUsername",password:"myPassword",disableBackup:!1,maxAttempts:"5",locale:"zh_CN",userAuthRequired:"false",dialogTitle:"指纹验证",dialogMessage:"请触摸指纹传感器",dialogHint:"本次验证不会保存您的指纹信息"};FingerprintAuth.encrypt(a,(t=>{e(t)}),(e=>{t(e)}))}else t("指纹解锁不可用")}),(e=>{t(e)}))}))}var O={setup(){const e=(0,k.tv)(),t=(0,P.iH)(0),n=(0,L.oR)();return(0,T.bv)((()=>{n.dispatch("startupDatabase").then((()=>{R().then((t=>{console.log("FingerprintVerification"+JSON.stringify(t)),e.push({path:"/"})})).catch((e=>{(0,Y.Z)("FingerprintVerification"+JSON.stringify(e)),navigator.app.exitApp()}))})).catch((e=>{console.log("startupDatabase-err=>"+e)}))})),{active:t}},computed:{...(0,L.Se)(["IsShowTabBar"])}},A=n(89);const _=(0,A.Z)(O,[["render",Z]]);var j=_,F=n(7139);const W={class:"van-multi-ellipsis--l3"},H={class:"top-tag"};function E(e,t,n,a,o,c){const f=(0,T.up)("van-button"),b=(0,T.up)("van-col"),r=(0,T.up)("van-row"),s=(0,T.up)("van-swipe-cell"),i=(0,T.up)("van-list"),l=(0,T.up)("van-pull-refresh");return(0,T.wg)(),(0,T.j4)(l,{modelValue:a.Refresh,"onUpdate:modelValue":t[1]||(t[1]=e=>a.Refresh=e),onRefresh:a.onRefresh},{default:(0,T.w5)((()=>[(0,T.Wm)(i,{loading:a.loading,"onUpdate:loading":t[0]||(t[0]=e=>a.loading=e),finished:a.finished,"finished-text":"没有更多了",onLoad:a.onLoad},{default:(0,T.w5)((()=>[((0,T.wg)(!0),(0,T.iD)(T.HY,null,(0,T.Ko)(a.list,((e,t)=>((0,T.wg)(),(0,T.j4)(s,{key:t,"before-close":a.beforeClose},{left:(0,T.w5)((()=>[(0,T.Wm)(f,{square:"",type:"primary",style:{height:"100% !important"},text:e.Sort>1?"取消置顶":"置顶",onClick:t=>a.nextTop(e.Id)},null,8,["text","onClick"])])),right:(0,T.w5)((()=>[(0,T.Wm)(f,{square:"",style:{height:"100% !important"},text:"删除",onClick:t=>a.preDelItem(e.Id),type:"danger",class:"delete-button"},null,8,["onClick"])])),default:(0,T.w5)((()=>[(0,T.Wm)(r,{onClick:t=>a.onNoteDetail(e.Id)},{default:(0,T.w5)((()=>[(0,T.Wm)(b,{span:"24"},{default:(0,T.w5)((()=>[(0,T._)("p",W,(0,F.zw)(e.Title),1),(0,T._)("p",null,[(0,T.Uk)((0,F.zw)(e.CreateTime),1),(0,T.wy)((0,T._)("span",H,"置顶",512),[[S.F8,e.Sort>1]])])])),_:2},1024)])),_:2},1032,["onClick"])])),_:2},1032,["before-close"])))),128))])),_:1},8,["loading","finished","onLoad"])])),_:1},8,["modelValue","onRefresh"])}n(1643);var U=n(1514),V=n(253);const z={name:"NotesView",setup(){const e=(0,k.tv)(),t=(0,L.oR)(),n=(0,P.iH)(!1),a=(0,P.iH)([]),o=(0,P.iH)(!1),c=(0,P.iH)(!1);var f=0;const r=()=>{setTimeout((()=>{(0,Y.Z)("刷新成功"),f=1,a.value=[],p(f,20),n.value=!1}),1e3)},s=()=>{f+=1,p(f,20)};let i=0;const l=e=>{i=e,console.log(i)};let u=0;const d=e=>{u=e,console.log(u)},h=e=>{e.Sort>1?t.dispatch("updateNoteSort",{Id:e.Id,Sort:1}).then((e=>{e.rowsAffected>0&&(f=1,a.value=[],p(f,20),setTimeout((function(){(0,Y.Z)("已取消置顶")}),300))})).catch((e=>{Y.Z.fail("取消置顶失败："+e)})):t.dispatch("updateNoteSort",{Id:e.Id,Sort:Date.now()}).then((e=>{e.rowsAffected>0&&(f=1,a.value=[],p(f,20),setTimeout((function(){(0,Y.Z)("已置顶")}),300))})).catch((e=>{Y.Z.fail("置顶失败："+e)}))},g=({position:e})=>{switch(e){case"left":return new Promise((()=>{for(let e=0;e<a.value.length;e++){const t=a.value[e];if(t.Id==u){h(t);break}}}));case"cell":case"outside":return!0;case"right":return new Promise((()=>{U.Z.confirm({title:"确定删除吗？"}).then((()=>{t.dispatch("delNote",i).then(((e,t)=>{if(e.rowsAffected>0){for(let e=0;e<a.value.length;e++){const t=a.value[e];if(t.Id==i){a.value.splice(e,1);break}}(0,b.Z)({type:"success",message:"已删除",position:"bottom"})}else Y.Z.fail("删除失败："+t)}))})).catch((()=>{}))}))}};(0,T.dl)((()=>{const e=t.state.RefreshListState;console.log("store.state.RefreshListState:"+t.state.RefreshListState),e&&(a.value=[],f=1,p(f,20))}));const p=(e,n)=>{t.dispatch("getNoteListByPage",{pageIndex:e,pageSize:n}).then((t=>{var f=t;console.log(e+", "+n),console.log("getNoteListByPage=>"+JSON.stringify(f));for(let e=0;e<f.length;e++)a.value.push(f[e]);o.value=!1,0==f.length&&(c.value=!0)}))},m=t=>{console.log(t),e.push({path:"/AddNote",query:{Id:t}})},{height:v}=(0,V.iP)(),w=(0,P.iH)(v.value+"px");return{Refresh:n,onRefresh:r,list:a,onLoad:s,loading:o,finished:c,onNoteDetail:m,preDelItem:l,beforeClose:g,vheight:w,nextTop:d}}},$=()=>{(0,S.sj)((e=>({bc6284a0:e.vheight})))},q=z.setup;z.setup=q?(e,t)=>($(),q(e,t)):$;var B=z;const G=(0,A.Z)(B,[["render",E]]);var J=G;const K={class:"content",ref:"root"},X={class:"category-name"};function Q(e,t,n,a,o,c){const f=(0,T.up)("van-nav-bar"),b=(0,T.up)("van-icon"),r=(0,T.up)("van-popover"),s=(0,T.up)("van-cell");return(0,T.wg)(),(0,T.iD)(T.HY,null,[(0,T.Wm)(f,{title:a.PageTitle,"left-text":"返回","right-text":"保存","left-arrow":"",onClickLeft:a.onClickLeft,onClickRight:a.onClickRight},null,8,["title","onClickLeft","onClickRight"]),(0,T._)("div",K,[(0,T.wy)((0,T._)("input",{type:"text",class:"title",placeholder:"标题","onUpdate:modelValue":t[0]||(t[0]=e=>a.title=e)},null,512),[[S.nr,a.title]]),(0,T.Wm)(s,{class:"date-info",title:a.createTime,"onUpdate:title":t[2]||(t[2]=e=>a.createTime=e),icon:"calendar-o"},{"right-icon":(0,T.w5)((()=>[(0,T.Wm)(r,{placement:"left-start",show:a.showPopover,"onUpdate:show":t[1]||(t[1]=e=>a.showPopover=e),actions:a.actions,onSelect:a.onSelect},{reference:(0,T.w5)((()=>[(0,T.Wm)(b,{size:"22px",name:"label-o"}),(0,T._)("label",X,(0,F.zw)(a.categoryName),1),(0,T.Wm)(b,{class:"arrow-down",size:"20px",name:"arrow-down"})])),_:1},8,["show","actions","onSelect"])])),_:1},8,["title"]),(0,T.wy)((0,T._)("textarea",{class:"note-content","onUpdate:modelValue":t[3]||(t[3]=e=>a.content=e)},null,512),[[S.nr,a.content]])],512)],64)}function ee(){const e=new Date,t=e.getFullYear(),n=e.getMonth()+1,a=e.getDate(),o=e.getHours(),c=e.getMinutes();return[t,"年",n,"月",a,"日 ",o,":",c].join("")}function te(){return Date.now()}function ne(e,t){return t>12&&(t=12),t<0&&(t=1),1==t?(e-=1,t=12):t-=1,{Year:e,Month:t}}function ae(e,t){return t>12&&(t=12),t<0&&(t=1),12==t?(e+=1,t=1):t+=1,{Year:e,Month:t}}const oe={name:"AddNoteView",setup(){const e=(0,L.oR)(),t=(0,k.yj)();(0,T.bv)((()=>{e.commit("SelectTabBar",1),console.log("加载")})),(0,T.Ah)((()=>{e.commit("SelectTabBar",-1),console.log("卸载")}));const n=e=>(e=e??"",e.length>0&&e.length>50&&(e=e.substring(0,50)),e),a=()=>{e.commit("setRefreshListState",!1),history.back()},o=()=>{if(0==u.value.length){if(0==h.value.length)return void Y.Z.fail("请输入内容");u.value=n(h.value)}if(l.value>0)e.dispatch("updateNote",{Id:l.value,Title:u.value,Category:d.value,Content:h.value}).then((t=>{t.rowsAffected>0&&((0,Y.Z)("保存成功"),e.commit("setRefreshListState",!0))})).catch((e=>{Y.Z.fail("保存失败："+e)}));else{const t=new Date,n=t.getFullYear(),a=t.getMonth()+1,o=t.getDate();e.dispatch("addNote",{Id:l.value,Title:u.value,Category:d.value,Content:h.value,CreateTime:g.value,Year:n,Month:a,Day:o,timestamp:Date.now()}).then((t=>{console.log(JSON.stringify(t)),t.rowsAffected>0&&((0,Y.Z)("添加成功"),l.value=t.insertId,e.commit("setRefreshListState",!0))})).catch((e=>{Y.Z.fail("添加失败："+e)}))}},c=(0,P.iH)(!1),f=[{text:"生活",icon:"add-o"},{text:"工作",icon:"music-o"},{text:"旅游",icon:"more-o"}],b=e=>{d.value=e.text},{height:r}=(0,V.iP)(),s=(0,P.iH)(),i=(0,P.iH)(r+"px");(0,T.bv)((()=>{const e=(0,V.EL)(s);i.value=r.value-e.height+"px"}));const l=(0,P.iH)(t.query.Id??0),u=(0,P.iH)(""),d=(0,P.iH)("未分类"),h=(0,P.iH)(""),g=(0,P.iH)(ee()),p=(0,P.iH)("添加笔记");return l.value&&(p.value="编辑笔记",e.dispatch("getNoteById",l.value).then((e=>{const t=e;u.value=t.Title,d.value=t.Category,h.value=t.Content,g.value=t.CreateTime})).catch((e=>{console.log("查询笔记失败："+e),Y.Z.fail("查询笔记失败："+e)}))),{onClickLeft:a,onClickRight:o,PageTitle:p,title:u,categoryName:d,content:h,createTime:g,actions:f,showPopover:c,onSelect:b,root:s,vheight:i,Id:l}}},ce=()=>{(0,S.sj)((e=>({"13889bcb":e.vheight})))},fe=oe.setup;oe.setup=fe?(e,t)=>(ce(),fe(e,t)):ce;var be=oe;const re=(0,A.Z)(be,[["render",Q]]);var se=re;function ie(e,t,n,a,o,c){const f=(0,T.up)("van-icon"),b=(0,T.up)("van-calendar"),r=(0,T.up)("notes"),s=(0,T.up)("van-popup");return(0,T.wg)(),(0,T.iD)(T.HY,null,[(0,T.Wm)(b,{title:"日历",color:"#1989fa","min-date":a.minDate,"max-date":a.maxDate,poppable:!1,"show-confirm":!1,formatter:a.formatter,onSelect:a.SelectDate,onMonthShow:a.monthShow},{"top-info":(0,T.w5)((e=>[(0,T.wy)((0,T.Wm)(f,{class:"tips",color:"red",name:"bell"},null,512),[[S.F8,e.topInfo>0]])])),_:1},8,["min-date","max-date","formatter","onSelect","onMonthShow"]),(0,T.Wm)(s,{show:a.showPopup,"onUpdate:show":t[0]||(t[0]=e=>a.showPopup=e),closeable:"",position:"bottom",style:{height:"30%"}},{default:(0,T.w5)((()=>[(0,T.Wm)(r)])),_:1},8,["show"])],64)}const le={lunarInfo:[19416,19168,42352,21717,53856,55632,91476,22176,39632,21970,19168,42422,42192,53840,119381,46400,54944,44450,38320,84343,18800,42160,46261,27216,27968,109396,11104,38256,21234,18800,25958,54432,59984,92821,23248,11104,100067,37600,116951,51536,54432,120998,46416,22176,107956,9680,37584,53938,43344,46423,27808,46416,86869,19872,42416,83315,21168,43432,59728,27296,44710,43856,19296,43748,42352,21088,62051,55632,23383,22176,38608,19925,19152,42192,54484,53840,54616,46400,46752,103846,38320,18864,43380,42160,45690,27216,27968,44870,43872,38256,19189,18800,25776,29859,59984,27480,23232,43872,38613,37600,51552,55636,54432,55888,30034,22176,43959,9680,37584,51893,43344,46240,47780,44368,21977,19360,42416,86390,21168,43312,31060,27296,44368,23378,19296,42726,42208,53856,60005,54576,23200,30371,38608,19195,19152,42192,118966,53840,54560,56645,46496,22224,21938,18864,42359,42160,43600,111189,27936,44448,84835,37744,18936,18800,25776,92326,59984,27424,108228,43744,37600,53987,51552,54615,54432,55888,23893,22176,42704,21972,21200,43448,43344,46240,46758,44368,21920,43940,42416,21168,45683,26928,29495,27296,44368,84821,19296,42352,21732,53600,59752,54560,55968,92838,22224,19168,43476,41680,53584,62034,54560],solarMonth:[31,28,31,30,31,30,31,31,30,31,30,31],Gan:["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],Zhi:["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],Animals:["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"],festival:{"1-1":{title:"元旦节"},"2-14":{title:"情人节"},"5-1":{title:"劳动节"},"5-4":{title:"青年节"},"6-1":{title:"儿童节"},"9-10":{title:"教师节"},"10-1":{title:"国庆节"},"12-25":{title:"圣诞节"},"3-8":{title:"妇女节"},"3-12":{title:"植树节"},"4-1":{title:"愚人节"},"5-12":{title:"护士节"},"7-1":{title:"建党节"},"8-1":{title:"建军节"},"12-24":{title:"平安夜"}},lFestival:{"12-30":{title:"除夕"},"1-1":{title:"春节"},"1-15":{title:"元宵节"},"2-2":{title:"龙抬头"},"5-5":{title:"端午节"},"7-7":{title:"七夕节"},"7-15":{title:"中元节"},"8-15":{title:"中秋节"},"9-9":{title:"重阳节"},"10-1":{title:"寒衣节"},"10-15":{title:"下元节"},"12-8":{title:"腊八节"},"12-23":{title:"北方小年"},"12-24":{title:"南方小年"}},getFestival(){return this.festival},getLunarFestival(){return this.lFestival},setFestival(e={}){this.festival=e},setLunarFestival(e={}){this.lFestival=e},solarTerm:["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"],sTermInfo:["9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c3598082c95f8c965cc920f","97bd0b06bdb0722c965ce1cfcc920f","b027097bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c359801ec95f8c965cc920f","97bd0b06bdb0722c965ce1cfcc920f","b027097bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c359801ec95f8c965cc920f","97bd0b06bdb0722c965ce1cfcc920f","b027097bd097c36b0b6fc9274c91aa","9778397bd19801ec9210c965cc920e","97b6b97bd19801ec95f8c965cc920f","97bd09801d98082c95f8e1cfcc920f","97bd097bd097c36b0b6fc9210c8dc2","9778397bd197c36c9210c9274c91aa","97b6b97bd19801ec95f8c965cc920e","97bd09801d98082c95f8e1cfcc920f","97bd097bd097c36b0b6fc9210c8dc2","9778397bd097c36c9210c9274c91aa","97b6b97bd19801ec95f8c965cc920e","97bcf97c3598082c95f8e1cfcc920f","97bd097bd097c36b0b6fc9210c8dc2","9778397bd097c36c9210c9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c3598082c95f8c965cc920f","97bd097bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c3598082c95f8c965cc920f","97bd097bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c359801ec95f8c965cc920f","97bd097bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c359801ec95f8c965cc920f","97bd097bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c359801ec95f8c965cc920f","97bd097bd07f595b0b6fc920fb0722","9778397bd097c36b0b6fc9210c8dc2","9778397bd19801ec9210c9274c920e","97b6b97bd19801ec95f8c965cc920f","97bd07f5307f595b0b0bc920fb0722","7f0e397bd097c36b0b6fc9210c8dc2","9778397bd097c36c9210c9274c920e","97b6b97bd19801ec95f8c965cc920f","97bd07f5307f595b0b0bc920fb0722","7f0e397bd097c36b0b6fc9210c8dc2","9778397bd097c36c9210c9274c91aa","97b6b97bd19801ec9210c965cc920e","97bd07f1487f595b0b0bc920fb0722","7f0e397bd097c36b0b6fc9210c8dc2","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf7f1487f595b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf7f1487f595b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf7f1487f531b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf7f1487f531b0b0bb0b6fb0722","7f0e397bd07f595b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c9274c920e","97bcf7f0e47f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","9778397bd097c36b0b6fc9210c91aa","97b6b97bd197c36c9210c9274c920e","97bcf7f0e47f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","9778397bd097c36b0b6fc9210c8dc2","9778397bd097c36c9210c9274c920e","97b6b7f0e47f531b0723b0b6fb0722","7f0e37f5307f595b0b0bc920fb0722","7f0e397bd097c36b0b6fc9210c8dc2","9778397bd097c36b0b70c9274c91aa","97b6b7f0e47f531b0723b0b6fb0721","7f0e37f1487f595b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc9210c8dc2","9778397bd097c36b0b6fc9274c91aa","97b6b7f0e47f531b0723b0b6fb0721","7f0e27f1487f595b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b7f0e47f531b0723b0787b0721","7f0e27f0e47f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","9778397bd097c36b0b6fc9210c91aa","97b6b7f0e47f149b0723b0787b0721","7f0e27f0e47f531b0723b0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","9778397bd097c36b0b6fc9210c8dc2","977837f0e37f149b0723b0787b0721","7f07e7f0e47f531b0723b0b6fb0722","7f0e37f5307f595b0b0bc920fb0722","7f0e397bd097c35b0b6fc9210c8dc2","977837f0e37f14998082b0787b0721","7f07e7f0e47f531b0723b0b6fb0721","7f0e37f1487f595b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc9210c8dc2","977837f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","977837f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","977837f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","977837f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","977837f0e37f14998082b0787b06bd","7f07e7f0e47f149b0723b0787b0721","7f0e27f0e47f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","977837f0e37f14998082b0723b06bd","7f07e7f0e37f149b0723b0787b0721","7f0e27f0e47f531b0723b0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","977837f0e37f14898082b0723b02d5","7ec967f0e37f14998082b0787b0721","7f07e7f0e47f531b0723b0b6fb0722","7f0e37f1487f595b0b0bb0b6fb0722","7f0e37f0e37f14898082b0723b02d5","7ec967f0e37f14998082b0787b0721","7f07e7f0e47f531b0723b0b6fb0722","7f0e37f1487f531b0b0bb0b6fb0722","7f0e37f0e37f14898082b0723b02d5","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e37f1487f531b0b0bb0b6fb0722","7f0e37f0e37f14898082b072297c35","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e37f0e37f14898082b072297c35","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e37f0e366aa89801eb072297c35","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f149b0723b0787b0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e37f0e366aa89801eb072297c35","7ec967f0e37f14998082b0723b06bd","7f07e7f0e47f149b0723b0787b0721","7f0e27f0e47f531b0723b0b6fb0722","7f0e37f0e366aa89801eb072297c35","7ec967f0e37f14998082b0723b06bd","7f07e7f0e37f14998083b0787b0721","7f0e27f0e47f531b0723b0b6fb0722","7f0e37f0e366aa89801eb072297c35","7ec967f0e37f14898082b0723b02d5","7f07e7f0e37f14998082b0787b0721","7f07e7f0e47f531b0723b0b6fb0722","7f0e36665b66aa89801e9808297c35","665f67f0e37f14898082b0723b02d5","7ec967f0e37f14998082b0787b0721","7f07e7f0e47f531b0723b0b6fb0722","7f0e36665b66a449801e9808297c35","665f67f0e37f14898082b0723b02d5","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e36665b66a449801e9808297c35","665f67f0e37f14898082b072297c35","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e26665b66a449801e9808297c35","665f67f0e37f1489801eb072297c35","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722"],nStr1:["日","一","二","三","四","五","六","七","八","九","十"],nStr2:["初","十","廿","卅"],nStr3:["正","二","三","四","五","六","七","八","九","十","冬","腊"],lYearDays:function(e){let t,n=348;for(t=32768;t>8;t>>=1)n+=this.lunarInfo[e-1900]&t?1:0;return n+this.leapDays(e)},leapMonth:function(e){return 15&this.lunarInfo[e-1900]},leapDays:function(e){return this.leapMonth(e)?65536&this.lunarInfo[e-1900]?30:29:0},monthDays:function(e,t){return t>12||t<1?-1:this.lunarInfo[e-1900]&65536>>t?30:29},solarDays:function(e,t){if(t>12||t<1)return-1;const n=t-1;return 1===n?e%4===0&&e%100!==0||e%400===0?29:28:this.solarMonth[n]},toGanZhiYear:function(e){var t=(e-3)%10,n=(e-3)%12;return 0===t&&(t=10),0===n&&(n=12),this.Gan[t-1]+this.Zhi[n-1]},toAstro:function(e,t){const n="魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯",a=[20,19,21,21,21,22,23,23,23,23,22,22];return n.substr(2*e-(t<a[e-1]?2:0),2)+"座"},toGanZhi:function(e){return this.Gan[e%10]+this.Zhi[e%12]},getTerm:function(e,t){if(e<1900||e>2100||t<1||t>24)return-1;const n=this.sTermInfo[e-1900],a=[];for(let o=0;o<n.length;o+=5){const e=parseInt("0x"+n.substr(o,5)).toString();a.push(e[0],e.substr(1,2),e[3],e.substr(4,2))}return parseInt(a[t-1])},toChinaMonth:function(e){if(e>12||e<1)return-1;let t=this.nStr3[e-1];return t+="月",t},toChinaDay:function(e){let t;switch(e){case 10:t="初十";break;case 20:t="二十";break;case 30:t="三十";break;default:t=this.nStr2[Math.floor(e/10)],t+=this.nStr1[e%10]}return t},getAnimal:function(e){return this.Animals[(e-4)%12]},solar2lunar:function(e,t,n){let a,o=parseInt(e),c=parseInt(t),f=parseInt(n);if(o<1900||o>2100)return-1;if(1900===o&&1===c&&f<31)return-1;a=o?new Date(o,parseInt(c)-1,f):new Date;let b,r=0,s=0;o=a.getFullYear(),c=a.getMonth()+1,f=a.getDate();let i=(Date.UTC(a.getFullYear(),a.getMonth(),a.getDate())-Date.UTC(1900,0,31))/864e5;for(b=1900;b<2101&&i>0;b++)s=this.lYearDays(b),i-=s;i<0&&(i+=s,b--);let l=new Date,u=!1;l.getFullYear()===o&&l.getMonth()+1===c&&l.getDate()===f&&(u=!0);let d=a.getDay(),h=this.nStr1[d];0===d&&(d=7);const g=b;r=this.leapMonth(b);let p=!1;for(b=1;b<13&&i>0;b++)r>0&&b===r+1&&!1===p?(--b,p=!0,s=this.leapDays(g)):s=this.monthDays(g,b),!0===p&&b===r+1&&(p=!1),i-=s;0===i&&r>0&&b===r+1&&(p?p=!1:(p=!0,--b)),i<0&&(i+=s,--b);const m=b,v=i+1,w=c-1,y=this.toGanZhiYear(g),I=this.getTerm(o,2*c-1),D=this.getTerm(o,2*c);let S=this.toGanZhi(12*(o-1900)+c+11);f>=I&&(S=this.toGanZhi(12*(o-1900)+c+12));let T=!1,C=null;I===f&&(T=!0,C=this.solarTerm[2*c-2]),D===f&&(T=!0,C=this.solarTerm[2*c-1]);const x=Date.UTC(o,w,1,0,0,0,0)/864e5+25567+10,N=this.toGanZhi(x+f-1),M=this.toAstro(c,f),Z=o+"-"+c+"-"+f,Y=g+"-"+m+"-"+v,P=this.festival,k=this.lFestival,L=c+"-"+f;let R=m+"-"+v;return 12===m&&29===v&&29===this.monthDays(g,m)&&(R="12-30"),{date:Z,lunarDate:Y,festival:P[L]?P[L].title:null,lunarFestival:k[R]?k[R].title:null,lYear:g,lMonth:m,lDay:v,Animal:this.getAnimal(g),IMonthCn:(p?"闰":"")+this.toChinaMonth(m),IDayCn:this.toChinaDay(v),cYear:o,cMonth:c,cDay:f,gzYear:y,gzMonth:S,gzDay:N,isToday:u,isLeap:p,nWeek:d,ncWeek:"星期"+h,isTerm:T,Term:C,astro:M}},lunar2solar:function(e,t,n,a){e=parseInt(e),t=parseInt(t),n=parseInt(n),a=!!a;const o=this.leapMonth(e);if(a&&o!==t)return-1;if(2100===e&&12===t&&n>1||1900===e&&1===t&&n<31)return-1;const c=this.monthDays(e,t);let f=c;if(a&&(f=this.leapDays(e,t)),e<1900||e>2100||n>f)return-1;let b,r=0;for(b=1900;b<e;b++)r+=this.lYearDays(b);let s=0,i=!1;for(b=1;b<t;b++)s=this.leapMonth(e),i||s<=b&&s>0&&(r+=this.leapDays(e),i=!0),r+=this.monthDays(e,b);a&&(r+=c);const l=Date.UTC(1900,1,30,0,0,0),u=new Date(864e5*(r+n-31)+l),d=u.getUTCFullYear(),h=u.getUTCMonth()+1,g=u.getUTCDate();return this.solar2lunar(d,h,g)}},ue={class:"van-multi-ellipsis--l3"},de={class:"top-tag"};function he(e,t,n,a,o,c){const f=(0,T.up)("van-button"),b=(0,T.up)("van-col"),r=(0,T.up)("van-row"),s=(0,T.up)("van-swipe-cell"),i=(0,T.up)("van-list"),l=(0,T.up)("van-pull-refresh");return(0,T.wg)(),(0,T.j4)(l,{modelValue:a.Refresh,"onUpdate:modelValue":t[1]||(t[1]=e=>a.Refresh=e),onRefresh:a.onRefresh},{default:(0,T.w5)((()=>[(0,T.Wm)(i,{loading:a.loading,"onUpdate:loading":t[0]||(t[0]=e=>a.loading=e),finished:a.finished,"finished-text":"没有更多了",onLoad:a.onLoad},{default:(0,T.w5)((()=>[((0,T.wg)(!0),(0,T.iD)(T.HY,null,(0,T.Ko)(a.list,((e,t)=>((0,T.wg)(),(0,T.j4)(s,{key:t,"before-close":a.beforeClose},{left:(0,T.w5)((()=>[(0,T.Wm)(f,{square:"",type:"primary",style:{height:"100% !important"},text:e.Sort>1?"取消置顶":"置顶",onClick:t=>a.nextTop(e.Id)},null,8,["text","onClick"])])),right:(0,T.w5)((()=>[(0,T.Wm)(f,{square:"",style:{height:"100% !important"},text:"删除",onClick:t=>a.preDelItem(e.Id),type:"danger",class:"delete-button"},null,8,["onClick"])])),default:(0,T.w5)((()=>[(0,T.Wm)(r,{onClick:t=>a.onNoteDetail(e.Id)},{default:(0,T.w5)((()=>[(0,T.Wm)(b,{span:"24"},{default:(0,T.w5)((()=>[(0,T._)("p",ue,(0,F.zw)(e.Title),1),(0,T._)("p",null,[(0,T.Uk)((0,F.zw)(e.CreateTime),1),(0,T.wy)((0,T._)("span",de,"置顶",512),[[S.F8,e.Sort>1]])])])),_:2},1024)])),_:2},1032,["onClick"])])),_:2},1032,["before-close"])))),128))])),_:1},8,["loading","finished","onLoad"])])),_:1},8,["modelValue","onRefresh"])}const ge={name:"Notes",setup(){const e=(0,k.tv)(),t=(0,L.oR)(),n=(0,P.iH)(!1),a=(0,P.iH)([]),o=(0,P.iH)(!1),c=(0,P.iH)(!1);var f=0;const r=()=>{setTimeout((()=>{(0,Y.Z)("刷新成功"),f=1,a.value=[],p(f,20),n.value=!1}),1e3)},s=()=>{f+=1,p(f,20)};let i=0;const l=e=>{i=e,console.log(i)};let u=0;const d=e=>{u=e,console.log(u)},h=e=>{e.Sort>1?t.dispatch("updateNoteSort",{Id:e.Id,Sort:1}).then((e=>{e.rowsAffected>0&&(f=1,a.value=[],p(f,20),setTimeout((function(){(0,Y.Z)("已取消置顶")}),300))})).catch((e=>{Y.Z.fail("取消置顶失败："+e)})):t.dispatch("updateNoteSort",{Id:e.Id,Sort:Date.now()}).then((e=>{e.rowsAffected>0&&(f=1,a.value=[],p(f,20),setTimeout((function(){(0,Y.Z)("已置顶")}),300))})).catch((e=>{Y.Z.fail("置顶失败："+e)}))},g=({position:e})=>{switch(e){case"left":return new Promise((()=>{for(let e=0;e<a.value.length;e++){const t=a.value[e];if(t.Id==u){h(t);break}}}));case"cell":case"outside":return!0;case"right":return new Promise((()=>{U.Z.confirm({title:"确定删除吗？"}).then((()=>{t.dispatch("delNote",i).then(((e,t)=>{if(e.rowsAffected>0){for(let e=0;e<a.value.length;e++){const t=a.value[e];if(t.Id==i){a.value.splice(e,1);break}}(0,b.Z)({type:"success",message:"已删除",position:"bottom"})}else Y.Z.fail("删除失败："+t)}))})).catch((()=>{}))}))}};(0,T.dl)((()=>{const e=t.state.RefreshListState;console.log("store.state.RefreshListState:"+t.state.RefreshListState),e&&(a.value=[],f=1,p(f,20))}));const p=(e,n)=>{t.dispatch("getNoteListByPage",{pageIndex:e,pageSize:n}).then((t=>{var f=t;console.log(e+", "+n),console.log("getNoteListByPage=>"+JSON.stringify(f));for(let e=0;e<f.length;e++)a.value.push(f[e]);o.value=!1,0==f.length&&(c.value=!0)}))},m=t=>{console.log(t),e.push({path:"/AddNote",query:{Id:t}})},{height:v}=(0,V.iP)(),w=(0,P.iH)(v.value+"px");return{Refresh:n,onRefresh:r,list:a,onLoad:s,loading:o,finished:c,onNoteDetail:m,preDelItem:l,beforeClose:g,vheight:w,nextTop:d}}},pe=()=>{(0,S.sj)((e=>({74573334:e.vheight})))},me=ge.setup;ge.setup=me?(e,t)=>(pe(),me(e,t)):pe;var ve=ge;const we=(0,A.Z)(ve,[["render",he]]);var ye=we;const Ie={name:"CalendarView",components:{Notes:ye},setup(){const e=(0,L.oR)(),t=(0,P.iH)("100%"),{height:n}=(0,V.iP)(),a=(0,P.qj)({}),o=async(t,n)=>{const o=await e.dispatch("getNoteListNearMonth",{Year:t,Month:n});console.log("getNoteListNearMonth=>"+JSON.stringify(o));var c=[],f=[],b=[];const r=ne(t,n),s=ae(t,n);for(let e=0;e<o.length;e++){const a=o[e];a.Year==t&&a.Month==n?c.push(a):a.Year==r.Year&&a.Month==r.Month?f.push(a):a.Year==s.Year&&a.Month==s.Month&&b.push(a)}a[`${t}-${n}`]=c,a[`${r.Year}-${r.Month}`]=f,a[`${s.Year}-${s.Month}`]=b};o((new Date).getFullYear(),(new Date).getMonth()+1),(0,T.bv)((()=>{t.value=n.value-80+"px"}));const c=(0,T.Fl)((()=>e=>{const t=new Date(e.date),n=t.getFullYear(),a=t.getMonth()+1,o=t.getDate(),c=t.getDay();0!==c&&6!==c||(e.className="weekendRed");const f=le.solar2lunar(n,a,o),b=new Date,r=b.getFullYear(),i=b.getMonth()+1,l=b.getDate();return n==r&&a==i&&o==l&&(e.className+=" today"),null!=f.festival&&""!=f.festival?e.bottomInfo=f.festival:null!=f.Term&&""!=f.Term?e.bottomInfo=f.Term:null!=f.IDayCn&&""!=f.IDayCn&&(e.bottomInfo=f.IDayCn),s(e,n,a,o),e})),f=(0,P.iH)(!1),b=e=>{const t=new Date(e),n=t.getFullYear(),a=t.getMonth()+1,o=t.getDate();console.log([n,a,o].join("-")),f.value=!0},r=e=>{console.log("monthShow"),console.log(JSON.stringify(e)),o(e.date.getFullYear(),e.date.getMonth()+1)},s=(e,t,n,o)=>{var c=a[`${t}-${n}`];if(c&&c.length>0)for(let a=0;a<c.length;a++){const t=c[a];if(t.Day==o){e.topInfo=1;break}}else e.topInfo=0},i=new Date;return{vheight:t,minDate:new Date(i.getFullYear()-3,0,1),maxDate:new Date(i.getFullYear()+3,11,31),formatter:c,SelectDate:b,monthShow:r,showPopup:f}}},De=()=>{(0,S.sj)((e=>({"3dff5d00":e.vheight})))},Se=Ie.setup;Ie.setup=Se?(e,t)=>(De(),Se(e,t)):De;var Te=Ie;const Ce=(0,A.Z)(Te,[["render",ie]]);var xe=Ce;const Ne=[{path:"/",name:"NotesView",component:J},{path:"/AddNote",name:"AddNoteView",components:{NewNote:se}},{path:"/Calendar",name:"CalendarView",component:xe}],Me=(0,k.p7)({history:(0,k.PO)(""),routes:Ne});var Ze=Me,Ye={PreTabbarIndex:0,CurTabbarIndex:0,database:{},RefreshListState:!1};function Pe(e){return!(1==e.CurTabbarIndex)}function ke(e,t){t<0?(e.CurTabbarIndex=e.PreTabbarIndex,e.PreTabbarIndex=0):(e.PreTabbarIndex=e.CurTabbarIndex,e.CurTabbarIndex=t)}function Le(e,t){e.database=t}function Re(e,t){e.RefreshListState=t}function Oe(e){return new Promise((t=>{e=e||"default_database_db";const n="browser"===window.cordova.platformId?window.openDatabase(e,"1.0","Data",2097152):window.sqlitePlugin.openDatabase({name:e+".db",location:"default",androidDatabaseImplementation:2});t(n)}))}function Ae(e,t){if(null==e||null==t)return"";var n=t.tableName,a=t.fields;if(""==n||null==n||void 0==n)return"";Object.prototype.hasOwnProperty.call(a,"Id")||(a["Id"]="integer");var o=[];for(let b in a)"Id"!=b?o.push('"'+b+'" '+a[b]+","):o.push('"Id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,');let c=o.length,f=o[c-1];return o[c-1]=f.substring(0,f.lastIndexOf(",")),new Promise(((t,a)=>{e.transaction((function(e){e.executeSql('CREATE TABLE IF NOT EXISTS "'+n+'" ( \n                        '+o.join(" ")+" \n                    )",[],((e,n)=>{t(n),n.rowsAffected>0&&console.log("fileinfo 创建成功")}))}),(function(e){console.log("transaction error: "+e.message),a("transaction error: "+e.message)}),(function(){console.log("resolve transaction ok")}))}))}function _e(e){return!!e&&("text"!=e.toLowerCase()&&"blob"!=e.toLowerCase())}function je(e,t,n,a){var o=t.tableName,c=t.fields,f="";if("object"==typeof n){for(let e in n)_e(c[e])?f+=e+" = "+n[e]+" and ":f+=e+" = '"+n[e]+"' and ";f=f.substring(0,f.lastIndexOf("and"))}else"string"==typeof n&&(f=n);var b="";if("object"==typeof a){for(let e in a)_e(c[e])?b+=e+" = "+a[e]+" , ":b+=e+" = '"+a[e]+"' , ";b=b.substring(0,b.lastIndexOf(","))}else"string"==typeof a&&(b=a);return new Promise(((t,n)=>{e.transaction((function(e){var a="";a=""==b?"delete from "+o+" WHERE "+f:"update "+o+" set "+b+" WHERE "+f,e.executeSql(a,[],(function(e,n){t({rowsAffected:n.rowsAffected})}),(function(e,t){console.log("DELETE error: "+t.message),n("DELETE  error: "+t.message)}))}),(function(e){console.log("transaction error: "+e.message)}),(function(){console.log("transaction ok")}))}))}function Fe(e,t,n,a){var o=t.tableName,c=t.fields,f="";if("object"==typeof n){delete n.State;for(let e in n)_e(c[e])?f+=e+" = "+n[e]+" and ":f+=e+" = '"+n[e]+"' and ";f=f.substring(0,f.lastIndexOf("and"))}else"string"==typeof n&&(f=n);var b="";if("object"==typeof a){delete a.State;for(let e in a)_e(c[e])?b+=e+" = "+a[e]+" , ":b+=e+" = '"+a[e]+"' , ";b=b.substring(0,b.lastIndexOf(","))}else"string"==typeof a&&(b=a);return new Promise(((t,n)=>{e.transaction((function(e){var a="update "+o+" set "+b+" WHERE "+f;e.executeSql(a,[],(function(e,n){t({rowsAffected:n.rowsAffected})}),(function(e,t){console.log("update error: "+t.message),n("update  error: "+t.message)}))}),(function(e){console.log("transaction error: "+e.message)}),(function(){console.log("transaction ok")}))}))}function We(e,t,n){var a=t.tableName,o="",c="",f=[];if("object"==typeof n){delete n.Id;for(let e in n)o+=e+" , ",c+="?,",f.push(n[e]);o=o.substring(0,o.lastIndexOf(",")),c=c.substring(0,c.lastIndexOf(","))}return new Promise(((t,n)=>{e.transaction((function(e){var b="INSERT INTO "+a+" ("+o+") VALUES ("+c+")";e.executeSql(b,f,(function(e,n){t(n)}),(function(e,t){console.log("INSERT error: "+t.message),n("INSERT error: "+t.message)}))}),(function(e){console.log("transaction error: "+e.message)}),(function(){console.log("transaction ok")}))}))}function He(e,t,n,a,o){var c=t.tableName,f=t.fields,b="";for(let s in f)b+=s+",";a&&(a.endsWith(",")?b+=a:b+=a+","),b=b.substring(0,b.lastIndexOf(","));var r="";if("object"==typeof n){for(let e in n)_e(f[e])?r+=e+" = "+n[e]+" and ":r+=e+" = '"+n[e]+"' and ";r=r.substring(0,r.lastIndexOf("and"))}else"string"==typeof n&&(r=n);return o=o?" order by "+o:"",new Promise(((t,n)=>{e.transaction((e=>{e.executeSql("select "+b+" from "+c+" where "+r+" "+o,[],((e,n)=>{for(var a={},o=0;o<n.rows.length;o++){a=n.rows.item(o);break}t(a)}))}),(function(e){n(e.message)}),(function(){}))}))}function Ee(e,t,n,a,o,c){var f=t.tableName,b=t.fields,r="";for(let d in b)r+=d+",";a&&(a.endsWith(",")?r+=a:r+=a+","),r=r.substring(0,r.lastIndexOf(","));var s="";if("object"==typeof n){for(let e in n)_e(b[e])?s+=e+" = "+n[e]+" and ":s+=e+" = '"+n[e]+"' and ";s=s.substring(0,s.lastIndexOf("and"))}else"string"==typeof n&&(s=n);o=o?" order by "+o:" order by Id asc ";var i="";if(c&&"object"==typeof c&&Object.prototype.hasOwnProperty.call(c,"pageIndex")&&Object.prototype.hasOwnProperty.call(c,"pageSize")){var l=c.pageIndex,u=c.pageSize;l<1&&(l=1),l=(l-1)*u,i=" limit "+l+","+u}return new Promise(((t,n)=>{e.transaction((e=>{e.executeSql("select "+r+" from "+f+" where "+s+" "+o+" "+i,[],((e,n)=>{for(var a=[],o=0;o<n.rows.length;o++)a.push(n.rows.item(o));t(a)}))}),(function(e){n(e.message)}),(function(){}))}))}const Ue={tableName:"note",fields:{Id:"integer",Title:"text",Category:"text",Content:"text",CreateTime:"text",State:"integer",Year:"integer",Month:"integer",Day:"integer",Sort:"integer",Timestamp:"integer"}},Ve={tableName:"note_version",fields:{Version:"text",Timestamp:"integer",Des:"text",CreateTime:"text",Info1:"text",Info2:"text",Info3:"text",State:"integer",Sort:"integer"}};function ze(e,t){return new Promise(((n,a)=>{He(e.state.database,Ue,{Id:t},"").then((e=>{n(e)})).catch((e=>{a(e)}))}))}function $e(e,{Year:t,Month:n,Date:a}){return new Promise(((o,c)=>{var f="count(1) as cnt";He(e.state.database,{tableName:Ue.tableName,fields:[]},`Year =${t} and Month=${n} and Day=${a}`,f).then((e=>{for(var t=0,n=0;n<e.rows.length;n++){t=e.rows.item(n).cnt;break}o(t)})).catch((e=>{c(e)}))}))}function qe(e,{pageIndex:t=1,pageSize:n=20}){return new Promise(((a,o)=>{t<1&&(t=1),t=(t-1)*n,Ee(e.state.database,Ue,{State:1},"","Sort desc,Timestamp desc",{pageIndex:t,pageSize:n}).then((e=>{a(e)})).catch((e=>{o(e)}))}))}function Be(e,{Year:t,Month:n}){return new Promise(((a,o)=>{const c=ne(t,n),f=ae(t,n);Ee(e.state.database,Ue,`(Year = ${c.Year} and Month=${c.Month} or Year = ${t} and Month=${n} or Year = ${f.Year} and Month=${f.Month})`,"","Year desc,Month desc").then((e=>{a(e)})).catch((e=>{o(e)}))}))}function Ge(e,{Title:t,Category:n,Content:a,CreateTime:o,Year:c,Month:f,Day:b,timestamp:r}){return new Promise(((s,i)=>{We(e.state.database,Ue,{Id:0,Title:t,Category:n,Content:a,CreateTime:o,Year:c,Month:f,Day:b,State:1,Sort:1,Timestamp:r}).then((e=>{s(e)})).catch((e=>{i(e)}))}))}function Je(e,{Id:t,Title:n,Category:a,Content:o}){return new Promise(((c,f)=>{const b=ee(),r=new Date,s=r.getFullYear(),i=r.getMonth()+1,l=r.getDate(),u=te();Fe(e.state.database,Ue,{Id:t},{Title:n,Category:a,Content:o,CreateTime:b,Year:s,Month:i,Day:l,Timestamp:u}).then((e=>{c(e)})).catch((e=>{f(e)}))}))}function Ke(e,{Id:t,Sort:n}){return new Promise(((a,o)=>{Fe(e.state.database,Ue,{Id:t},{Sort:n}).then((e=>{a(e)})).catch((e=>{o(e)}))}))}function Xe(e,t){return new Promise(((n,a)=>{je(e.state.database,Ue,{Id:t},{State:0}).then((e=>{n(e)})).catch((e=>{a(e)}))}))}function Qe(e){return new Promise((t=>{document.addEventListener("deviceready",(()=>{Oe("MyDatabase").then((n=>{const a=n;e.commit("setDatabase",a),Ae(a,Ue).then((e=>{e.rowsAffected>0&&console.log("fileinfo 创建成功")})).catch((e=>{console.log(e)})),Ae(a,Ve).then((e=>{e.rowsAffected>0&&console.log("version 创建成功")})).catch((e=>{console.log(e)})),t(a)}))}))}))}var et=(0,L.MT)({state:Ye,getters:a,mutations:o,actions:c,modules:{}});n(5110);const tt=(0,S.ri)(j);tt.use(et),tt.use(Ze),tt.use(D.Z),tt.use(I.Z),tt.use(y.Z),tt.use(w.Z),tt.use(v.Z),tt.use(m.Z),tt.use(p.Z),tt.use(g.Z),tt.use(h.Z),tt.use(d.Z),tt.use(p.Z),tt.use(u.Z),tt.use(l.Z),tt.use(i.Z),tt.use(s.Z),tt.use(r.Z),tt.use(b.Z),tt.use(f.Z),tt.mount("#app")}},t={};function n(a){var o=t[a];if(void 0!==o)return o.exports;var c=t[a]={exports:{}};return e[a](c,c.exports,n),c.exports}n.m=e,function(){var e=[];n.O=function(t,a,o,c){if(!a){var f=1/0;for(i=0;i<e.length;i++){a=e[i][0],o=e[i][1],c=e[i][2];for(var b=!0,r=0;r<a.length;r++)(!1&c||f>=c)&&Object.keys(n.O).every((function(e){return n.O[e](a[r])}))?a.splice(r--,1):(b=!1,c<f&&(f=c));if(b){e.splice(i--,1);var s=o();void 0!==s&&(t=s)}}return t}c=c||0;for(var i=e.length;i>0&&e[i-1][2]>c;i--)e[i]=e[i-1];e[i]=[a,o,c]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,a){var o,c,f=a[0],b=a[1],r=a[2],s=0;if(f.some((function(t){return 0!==e[t]}))){for(o in b)n.o(b,o)&&(n.m[o]=b[o]);if(r)var i=r(n)}for(t&&t(a);s<f.length;s++)c=f[s],n.o(e,c)&&e[c]&&e[c][0](),e[c]=0;return n.O(i)},a=self["webpackChunkvue"]=self["webpackChunkvue"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=n.O(void 0,[998],(function(){return n(6560)}));a=n.O(a)})();
//# sourceMappingURL=app.c49a5532.js.map