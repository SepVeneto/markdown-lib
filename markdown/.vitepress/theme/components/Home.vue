<template>
  <button @click="handleUpload">上传</button>
  <input
    style="display: none;"
    type="file"
    ref="fileRef"
    accept=".md"
    @change="onChange"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import request from '../util/request'
const fileRef = ref()
function handleUpload() {
  fileRef.value.click()
}
function onChange(e: any) {
  const file = e.target.files[0]
  const form = new FormData()
  form.append('file', file)
  request.put('/markdown/docs', form)
  // form.appen
}
</script>
