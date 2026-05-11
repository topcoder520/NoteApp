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
import { showConfirmDialog } from 'vant';
import { useStore } from 'vuex';

export default {
    name: 'SettingView',
    setup() {

        const store = useStore();

        const switchChecked = ref(false)

        const onUpdateValue = (newValue) => {
            console.log('newValue',newValue);
            showConfirmDialog({
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
    min-height: 100vh;
    background-color: #f5f7fa;
    text-align: left;
    padding: 16px 0;
}

.van-cell-group--inset {
    margin: 0 16px;
    border-radius: 12px;
    overflow: hidden;
}

.van-cell--large {
    padding: 16px;
}

.van-switch {
    transition: all 0.2s ease;
}
</style>