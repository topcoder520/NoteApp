<template>
    <van-nav-bar title="设置" />
    <div class="setting">
        <van-cell-group inset>
            <van-cell title="开启指纹验证" size="large">
                <template #right-icon>
                    <van-switch v-model="switchChecked" @update:model-value="onUpdateValue" />
                </template>
            </van-cell>
        </van-cell-group>
    </div>
</template>
<script>

import { onActivated, ref } from 'vue';
import { Dialog } from 'vant';
import { useStore } from 'vuex';

export default {
    name: 'SettingView',
    setup() {

        const store = useStore();

        const switchChecked = ref(false)

        const onUpdateValue = (newValue) => {
            console.log('newValue',newValue);
            Dialog.confirm({
                title: '提醒',
                message: newValue?'是否开启指纹验证？':'是否关闭指纹验证？',
            }).then(() => {
                switchChecked.value = newValue;
                store.commit('setLocalItem',{key:store.state.localFingerKey,val:newValue});
            }).catch(()=>{
                switchChecked.value = !newValue;
            });
        };

        onActivated(()=>{
            getLocalItemFn();
        });

        const getLocalItemFn = async ()=>{
            var val = await store.getters.getLocalItem(store.state.localFingerKey); 
            console.log('getLocalItem',val,typeof val);
            switchChecked.value = val==='true';
        }

        return {
            switchChecked,
            onUpdateValue,
        };
    }
}
</script>
<style lang="less">
.setting {
    height: 100%;
    background-color: #fff;
    text-align: left;
    padding: 10px 1px;
}
</style>