<script setup lang="ts">
import { ref } from 'vue';
import { InboxOutlined } from '@ant-design/icons-vue';
import { message, Modal } from 'ant-design-vue';
import { useStorage } from '@vueuse/core'

const fileList = ref([])
const isLoading = ref(false)

const userInfo = useStorage('userInfo', {
  author: ''
})


const handleRemove = (file: any) => {
  const index = fileList.value.findIndex(item => item.uid === file.uid)
  fileList.value.splice(index, 1)
}

const beforeUpload = async (file: any) => {
  isLoading.value = true;

  const result = await (window as any).ipc.receiveFile(file.path, file.name, userInfo.value.author)
  isLoading.value = false

  if (result) {
    Modal.success({
      title: '上传成功',
      content: result,
    });
  } else {
    message.error('上传失败')
    setTimeout(() => {
      handleRemove(file)
    }, 500)
  }

  return false
}



</script>

<template>
  <a-spin :spinning="isLoading">
    <a-upload-dragger v-model:fileList="fileList" name="file" :multiple="true" :before-upload="beforeUpload"
      @remove="handleRemove">
      <p class="ant-upload-drag-icon">
        <inbox-outlined></inbox-outlined>
      </p>
      <p class="ant-upload-text">Click or drag file to this area to upload</p>
    </a-upload-dragger>
  </a-spin>
</template>

