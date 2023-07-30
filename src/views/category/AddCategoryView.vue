<template>
    <van-nav-bar :title="PageTitle" left-text="返回" right-text="保存" left-arrow @click-left="onClickLeft"
        @click-right="onClickRight" />
    <div class="addcycontent">
        <input type="text" class="title" placeholder="标题" v-model="title" />
        <van-cell class="date-info" v-model:title="createTime" icon="calendar-o">
        </van-cell>
        <textarea class="note-content " rows="6" placeholder="描述" v-model="content"></textarea>
        <div class="categorylist">
            <p>分类</p>
            <div class="listdata">
                <van-swipe-cell v-for="(item, index) in list" :key="index">
                    <van-row class="vrow">
                        <p style="text-align:center;">{{ item.name }}</p>
                    </van-row>
                    <template #right>
                        <van-button square type="primary" text="编辑" @click="addCategory(item.Id, item.name)" />
                        <van-button square type="danger" text="删除"
                            @click="delCategory(item.Id, item.name, item.TotalNoteNum)" />
                    </template>
                </van-swipe-cell>
            </div>
            <van-button @click="addCategory(0, '')" type="primary" block
                style="width: 80%;margin: 20px auto;">添加分类</van-button>
        </div>
    </div>
    <van-dialog class="showPicUrlDialog" v-model:show="showPicUrl" title="分类" show-cancel-button
        @confirm="showPicUrlconfirm">
        <input type="text" height="30px" v-model="categoryName" placeholder="分类名称" />
    </van-dialog>
</template>
<script>
import { Toast } from '@vant/compat';
import { onUnmounted, ref, onMounted, onActivated, } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { getNowDateString } from '@/util/date';
import { showConfirmDialog, showNotify } from 'vant';

import RichText from '../common/RichTextView.vue';

export default {
    name: 'AddCategoryView',
    components: {
        RichText,
    },
    setup() {
        const store = useStore()
        const route = useRoute();

        //keep-alive 缓存的组件激活时调用
        onMounted(() => {
            store.commit('SelectTabBar', 1);
            console.log('加载');
        });
        onUnmounted(() => {
            store.commit('SelectTabBar', -1);
            console.log('卸载');
        });
        onActivated(() => {
            console.log('addNote onActivated');
        });

        //
        const cutTitle = (content) => {
            content = content ?? '';
            if (content.length > 0) {
                if (content.length > 50) {
                    content = content.substring(0, 50);
                }
            }
            return content;
        };

        const onClickLeft = () => {
            history.back();
        };
        const onClickRight = () => {
            if (title.value.trim().length == 0) {
                if (content.value.trim().length == 0) {
                    Toast.fail('请输入内容');
                    return;
                } else {
                    title.value = cutTitle(temTitle.value);
                }
            }
            if (Id.value > 0) {
                store.dispatch('updateNote', {
                    Id: Id.value,
                    Title: title.value,
                    Category: '',
                    Content: content.value,
                    ParentId: ParentId.value,
                    note_category_Id: note_category_Id.value,
                }).then((resolve) => {
                    if (resolve.rowsAffected > 0) {
                        Toast('保存成功');
                        store.commit('setRefreshListState', true);
                        setTimeout(() => {
                            history.back();
                        }, 300);
                    }
                }).catch((reject) => {
                    Toast.fail('保存失败：' + reject);
                });
            } else {
                const nowdate = new Date();
                const y = nowdate.getFullYear();
                const m = nowdate.getMonth() + 1;
                const d = nowdate.getDate();

                store.dispatch('addCyNote', {
                    Id: Id.value,
                    Title: title.value,
                    SType: 1,
                    Content: content.value,
                    CreateTime: createTime.value,
                    Year: y,
                    Month: m,
                    Day: d,
                    timestamp: Date.now(),
                    ParentId: ParentId.value,
                    note_category_Id: note_category_Id.value,
                }).then((resolve) => {
                    console.log(JSON.stringify(resolve));
                    if (resolve.rowsAffected > 0) {
                        Id.value = resolve.insertId;
                        store.commit('setRefreshListState', true);
                        if (list.value.length > 0) {
                            for (let i = 0; i < list.value.length; i++) {
                                const item = list.value[i];
                                store.dispatch('addCategory', {
                                    CName: item.name,
                                    note_Id: Id.value,
                                    Des: "",
                                }).then((resolve) => {
                                    console.log(JSON.stringify(resolve));
                                    if (resolve.rowsAffected > 0) {
                                        console.log('分类添加成功');
                                    }
                                }).catch((reject) => {
                                    Toast.fail('添加失败：' + reject);
                                });
                            }
                        }
                        Toast('创建成功');
                        setTimeout(() => {
                            history.back();
                        }, 300);
                    }
                }).catch((reject) => {
                    Toast.fail('添加失败：' + reject);
                });
            }
        };

        //内容
        const Id = ref(route.query.Id ?? 0);
        const title = ref('');
        const content = ref('');
        const createTime = ref(getNowDateString());
        const PageTitle = ref('创建知识库');
        const ParentId = ref(0);
        const note_category_Id = ref(0);

        console.log('Id.value', Id.value);
        if (Id.value && Id.value > 0) {
            PageTitle.value = '编辑知识库';
            store.dispatch('getNoteById', Id.value).then((resolve) => {
                const data = resolve;
                title.value = data.Title;
                content.value = data.Content;
                createTime.value = data.CreateTime;
                ParentId.value = data.ParentId;
                note_category_Id.value = data.note_category_Id;
            }).catch((reject) => {
                console.log('查询笔记失败：' + reject);
                Toast.fail('查询笔记失败：' + reject);
            });
        }

        const list = ref([]);

        const onLoad = () => {
            store.dispatch('getCategoryList', { CyNoteId: Id.value }).then((resolve) => {
                var listData = resolve;
                console.log('getCategoryList=>' + JSON.stringify(listData));
                for (let i = 0; i < listData.length; i++) {
                    list.value.push({ Id: listData[i].Id, name: listData[i].CName+'('+listData[i].TotalNoteNum+')',TotalNoteNum:listData[i].TotalNoteNum });
                }
            });

        };
        onLoad();

        const showPicUrl = ref(false); //是否展示图片地址弹框
        const showPicUrlconfirm = () => {
            if (categoryName.value.trim().length == 0) {
                Toast('请输入分类名称');
            } else {
                if (Id.value > 0) {
                    if (categoryId.value > 0) {
                        store.dispatch('updateCategory', {
                            Id: categoryId.value,
                            CName: categoryName.value,
                            note_Id: Id.value,
                            Des: "",
                        }).then((resolve) => {
                            if (resolve.rowsAffected > 0) {
                                for (let i = 0; i < list.value.length; i++) {
                                    const item = list.value[i];
                                    if (item.Id == categoryId.value) {
                                        item.name = categoryName.value;
                                        break;
                                    }
                                }
                            }
                        }).catch((reject) => {
                            Toast.fail('保存失败：' + reject);
                        });
                    } else {
                        store.dispatch('addCategory', {
                            CName: categoryName.value,
                            note_Id: Id.value,
                            Des: "",
                        }).then((resolve) => {
                            console.log(JSON.stringify(resolve));
                            if (resolve.rowsAffected > 0) {
                                categoryId.value = resolve.insertId;
                                list.value.push({ name: categoryName.value, Id: resolve.insertId });
                            }
                        }).catch((reject) => {
                            Toast.fail('添加失败：' + reject);
                        });
                    }
                } else {
                    list.value.push({ name: categoryName.value, Id: 0 });
                }

            }

        }

        const categoryName = ref('');
        const categoryId = ref(0);
        const addCategory = (cyId, cname) => {
            showPicUrl.value = true;
            if (cyId == 0) {
                categoryName.value = '';
                categoryId.value = 0;
            } else {
                categoryName.value = cname;
                categoryId.value = cyId;
            }
        }
        const delCategory = (cyId, cname, TotalNoteNum) => {
            console.log(cyId, cname, TotalNoteNum)
            showConfirmDialog({
                title: '确定删除 \'' + cname + '\' 分类？',
            }).then(() => {
                if (TotalNoteNum > 0) {
                    Toast.fail('该分类有数据不能删除!');
                    return;
                }
                store.dispatch('delCategory', { Id: cyId, real: 0 }).then((resolve, reject) => {
                    if (resolve.rowsAffected > 0) {
                        for (let index = 0; index < list.value.length; index++) {
                            const item = list.value[index];
                            if (item.Id == cyId) {
                                list.value.splice(index, 1);
                                break;
                            }
                        }
                        showNotify({ type: 'success', message: '已删除', position: 'bottom' });
                    } else {
                        Toast.fail('移出失败：' + reject);
                    }
                });
            }).catch(() => {
                // on cancel
            });
        }

        return {
            onClickLeft,
            onClickRight,
            PageTitle,
            title,
            categoryName,
            content,
            createTime,
            Id,

            list,
            showPicUrl,
            showPicUrlconfirm,
            addCategory,
            delCategory,
        };
    }
}
</script>
<style lang="less">
.addcycontent {
    padding: 16px 20px;

    .title {
        width: 97%;
        height: 32px;
        border: 1px solid #cdc8c8;
    }

    .date-info {
        text-align: left;
        padding-left: 0px !important;
        padding-right: 0px !important;

        .category-name,
        .arrow-down {
            color: deepskyblue;
        }
    }

    .note-content {
        width: 98%;
        border: 1px solid #cdc8c8;
    }

    .categorylist {
        p {
            text-align: left;
        }

        .listdata {
            max-height: 250px;
            overflow: auto;

            .vrow {
                border-bottom: 1px solid #f0ecec;
            }
        }
    }
}
</style>