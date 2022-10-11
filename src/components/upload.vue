<script setup lang="ts">
import { ref } from 'vue';
import { InboxOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import { useStorage } from '@vueuse/core'

const fileList = ref([])
const isLoading = ref(false)

const userInfo = useStorage('userInfo', {
    author: '' 
  })

const beforeUpload = async (file: any) => {
  isLoading.value = true;

  const result = await (window as any).ipc.receiveFile(file.path, file.name, userInfo.value.author)
  isLoading.value = false

  
  console.log(result);
  Modal.success({
    title: '上传成功',
    content: result,
  });

  return false
}



</script>

<template>
  <a-spin :spinning="isLoading">
    <a-upload-dragger v-model:fileList="fileList" name="file" :multiple="true" :before-upload="beforeUpload">
      <p class="ant-upload-drag-icon">
        <inbox-outlined></inbox-outlined>
      </p>
      <p class="ant-upload-text">Click or drag file to this area to upload</p>
    </a-upload-dragger>
  </a-spin>
</template>

