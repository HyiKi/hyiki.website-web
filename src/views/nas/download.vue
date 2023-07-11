<template>
  <div>
    <iframe
      ref="embeddedPage"
      :src="externalLink"
      frameborder="0"
      allowfullscreen
      style="width: 100%; height: 100vh;"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      externalLink: 'http://www.hyiki.website:17080/' // 外部链接的URL
    }
  }
}
</script>
