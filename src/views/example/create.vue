<template>
  <article-detail :is-edit="false" />
</template>

<script lang="ts">
import ArticleDetail from './components/ArticleDetail'

export default {
  name: 'CreateArticle',
  components: { ArticleDetail }
}
</script>

