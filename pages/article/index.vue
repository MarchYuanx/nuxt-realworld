<template>
  <div class="article-page">

  <div class="banner">
    <div class="container">

      <h1>{{article.title}}</h1>

      <article-meta :article="article"/>

    </div>
  </div>

  <div class="container page">

    <div class="row article-content">
      <div class="col-md-12" v-html="article.body">
      
      </div>
    </div>

    <hr />

    <div class="article-actions">
      <article-meta :article="article"/>
    </div>

    <div class="row">

      <div class="col-xs-12 col-md-8 offset-md-2">

        <article-comments :article="article"/>
        
      </div>

    </div>

  </div>

</div>
</template>

<script>
import { getArticle } from '@/api/article'
import markdownIt from 'markdown-it'
import ArticleMeta from './components/article-meta'
import ArticleComments from './components/article-comments'

export default {
    name: 'Article',
    components: {
      ArticleMeta,
      ArticleComments,
    },
    async asyncData (context){
      
      const { data } = await getArticle(context.params.slug)
      const { article } = data
      const md = markdownIt()

      article.body = md.render(article.body)
      return {
        article
      }
    },
    head() {
      return {
        title: `${this.article.title} — Conduit`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.article.description
          }
        ]
      }
    }
}
</script>

<style>

</style>