<template>
  <div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <form>
          <fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" placeholder="Article Title" v-model="title">
            </fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="What's this article about?" v-model="description">
            </fieldset>
            <fieldset class="form-group">
                <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" v-model="body"></textarea>
            </fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags" v-model="tag" @keyup.enter="addTag">
                <div class="tag-list" >
                  <span class="tag-default tag-pill ng-binding ng-scope" v-for="(tag, index) in tagList" :key="index">
                    <i class="ion-close-round" @click="delTag(tag)"></i>
                    {{tag}}
                  </span>
              </div>
            </fieldset>
            <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click="onSubmit">
                Publish Article
            </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { createArticle } from '@/api/article'

export default {
    name: 'EditorIndex',
    middleware: 'authenticated',
    data () {
      return {
        title: '',
        description: '',
        body: '',
        tag: '',
        tagList: []
      }
    },
    methods: {
      async onSubmit () {
        const { data } = await createArticle({
          title: this.title,
          description: this.description,
          body: this.body,
          tagList: this.tagList
        })
        this.$router.push(`/article/${data.article.slug}`);
      },
      addTag () {
        if(!this.tagList.includes(this.tag)){
          this.tagList.push(this.tag)
          this.tag = ''
        }
      },
      delTag (tag) {
        const index = this.tagList.indexOf(tag)
        this.tagList.splice(index, 1)
      }
    }
}
</script>

<style>

</style>