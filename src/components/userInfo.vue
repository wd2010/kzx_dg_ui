<template>
  <a-card :title="userInfo.author" style="width: 600px">
    <template #extra>
      <div>

        <a-button size="small" @click="visible = true" style="margin: 0 10px;">更改用户</a-button>
        <a-button size="small" @click="tokenVisible = true" type="primary">更改AuthToken</a-button>
      </div>
    </template>
    <upload />
  </a-card>

  <a-modal v-model:visible="visible" title="修改用户名" @ok="handleOk">
    <a-input v-model:value="userId" placeholder="请输入用户名，便于后续查找包，类似 zhangsan_kzx" />
  </a-modal>

  <a-modal v-model:visible="tokenVisible" title="npm authToken" @ok="handleAuthToken">
    <a-input v-model:value="tokenId" placeholder="请输入npm authToken" />
  </a-modal>
</template>



<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { message } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import upload from './upload.vue';

const visible = ref(false)
const tokenVisible =  ref(false)
const userInfo = useStorage('userInfo', { author: '', authToken: '' })
const userId = ref(userInfo.value.author)
const tokenId = ref(userInfo.value.authToken)

onMounted(() => {
  if (!userInfo.value.author) {
    visible.value = true
  }

  if (!userInfo.value.authToken) {
    tokenVisible.value = true
  }
})

const handleOk = () => {
  if (!userId.value.trim()) {
    message.error('请输入你的用户名，例如 xxx_kzx')
    return
  }

  userInfo.value.author = userId.value
  visible.value = false
}

const handleAuthToken = () => {
  if (!tokenId.value.trim()) {
    message.error('npm AuthToken 非法，请输入正确的AuthToken')
    return
  }

  userInfo.value.authToken = tokenId.value
  tokenVisible.value = false
}




</script>

<style scoped>
:deep(.ant-upload-drag) {
  height: 250px !important;
}

:deep(.ant-upload-btn) {
  display: flex !important;
  justify-content: center;
  align-items: center;
}
</style>