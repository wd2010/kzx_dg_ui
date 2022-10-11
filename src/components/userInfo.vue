<template>
  <a-card :title="userInfo.author" style="width: 300px">
    <template #extra><a-button @click="visible = true">更改用户</a-button></template>
    <upload />
  </a-card>

  <a-modal v-model:visible="visible" title="修改用户名" @ok="handleOk">

    <a-input v-model:value="userId" />
  </a-modal>
</template>



<script setup lang="ts">
  import { useStorage } from '@vueuse/core'
  import { message} from 'ant-design-vue';
  import { onMounted, ref } from 'vue';
  import upload from './upload.vue';

  const visible = ref(false)
  const userInfo = useStorage('userInfo', {
    author: '' 
  })
  const userId = ref(userInfo.value.author)

  onMounted(() => {
    if (!userInfo.value.author) {
      visible.value = true
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

  


</script>