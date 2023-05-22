<template>
  <article-detail :is-edit="true" />
</template>

<script lang="ts">
import ArticleDetail from './components/ArticleDetail'

export default {
  name: 'EditForm',
  components: { ArticleDetail }
}
</script>

