<template>
  <div>
    <form class="card comment-form" v-if="user">
        <div class="card-block" >
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="commentText"
        ></textarea>
        </div>
        <div class="card-footer">
          <img
            :src="user.image"
            class="comment-author-img"
          />
          <button class="btn btn-sm btn-primary" @click="addComment()" :disabled="commentDisable">Post Comment</button>
        </div>
    </form>

    <p v-else style="display: inherit;">
      <nuxt-link to="/login">Sign in</nuxt-link> or <nuxt-link to="register">sign up</nuxt-link> to add comments on this article.
    </p>
      

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
import { getComments, addComment } from '@/api/article'

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
            comments: [],
            commentText: '',
            commentDisable: false,
            user: {},
        }
    },
    async mounted () {
        this.user = this.$store.state.user
        const { data } = await getComments(this.article.slug)
       
        this.comments = data.comments
    },
    methods: {
      async addComment(){
        this.commentDisable = true
        const { slug } = this.article
        const commentData = {
          comment: {
            body: this.commentText
          }
        } 
        const { data } = await addComment(slug, commentData)

        this.comments.unshift(data.comment)
        this.commentText = ''
        this.commentDisable = false
      }
    }
};
</script>

<style>
</style>