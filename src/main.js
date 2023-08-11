import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
    Tabbar,
    TabbarItem,
    Col, Row, PullRefresh, List, Cell, CellGroup, NavBar, Field, 
    Icon, Popover, Calendar,SwipeCell,Button,Notify,Dialog,
    Popup,Switch,Search,DropdownMenu, DropdownItem,BackTop,Toast,
    ImagePreview,ActionSheet,Cascader,TextEllipsis,
} from 'vant';
import 'vant/lib/index.css';

import {Tree} from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App);
app.use(store);
app.use(router);
//vant组件
app.use(Tabbar);
app.use(TabbarItem);
app.use(Col);
app.use(Row);
app.use(PullRefresh);
app.use(List);
app.use(CellGroup);
app.use(Cell);
app.use(NavBar);
app.use(Field);
app.use(CellGroup);
app.use(Icon);
app.use(Popover);
app.use(Calendar);
app.use(SwipeCell);
app.use(Button);
app.use(Notify);
app.use(Popup);
app.use(Switch);
app.use(Search);
app.use(DropdownMenu);
app.use(DropdownItem);
app.use(Dialog);
app.use(BackTop);
app.use(Toast);
app.use(ImagePreview);
app.use(ActionSheet);
app.use(Cascader);
app.use(TextEllipsis);

//ant
app.use(Tree);

app.mount('#app');
// document.addEventListener('deviceready',function(){
//     app.mount('#app');
// },false)

