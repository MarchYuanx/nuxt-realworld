<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img
          src="https://user-gold-cdn.xitu.io/2019/5/28/16afe0a2e8276190?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1"
          class="comment-author-img"
        />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
        {{comment.body}}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link :to="{
            name: 'profile',
            params: {
                username: comment.author.username
            }
        }" class="comment-author">
          <img
            :src="comment.author.image"
            class="comment-author-img"
          />
        </nuxt-link>
        &nbsp;
        <nuxt-link :to="{
            name: 'profile',
            params: {
                username: comment.author.username
            }
        }" class="comment-author">{{comment.author.username}}</nuxt-link>
        <span class="date-posted">{{comment.createdAt | date('MMMM MM, YYYY')}}</span>
        <span class="mod-options">
            <i class="ion-edit"></i>
            <i class="ion-trash-a"></i>
        </span>
        
      </div>
    </div>

  
  </div>
</template>

<script>
import { getComments } from '@/api/article'

export default {
    name: 'ArticleComments',
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            comments: []
        }
    },
    async mounted () {
        const { data } = await getComments(this.article.slug)
       
        this.comments = data.comments
    }
};
</script>

<style>
</style>