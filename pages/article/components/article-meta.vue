<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: { username: article.author.username },
      }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        :to="{
          name: 'profile',
          params: { username: article.author.username },
        }"
        class="author"
        >{{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createdAt | date("MMMM DD, YYYY") }}</span>
    </div>


    <button
      v-if="isMyself"
      class="btn btn-sm btn-outline-secondary"
      @click="editOperate(article)"
    >
      <i class="ion-edit"></i>
      &nbsp;Edit Article
    </button>

    <button
      v-else
      class="btn btn-sm btn-outline-secondary"
      :class="{ active: article.author.following }"
      @click="followOperate(article)"
      :disabled="followDisable"
    >
      <i class="ion-plus-round"></i>
      &nbsp; {{ article.author.following ? 'Unfollow '+ article.author.username : 'Follow '+ article.author.username  }}
    </button>

    &nbsp;&nbsp;
    <button 
      v-if="isMyself" 
      class="btn btn-sm btn-outline-danger"
      @click="deleteArticle(article.slug)"
      :disabled="deleteDisable"
    >
      <i class="ion-trash-a"></i> Delete Article
    </button>

    <button 
      v-else 
      class="btn btn-sm btn-outline-primary" 
      :class="{ active: article.favorited }"
      @click="favoriteOperate(article)"
      :disabled="favoritedDisable"
    >
      <i class="ion-heart"></i>
      &nbsp; Favorite Post 
      <span class="counter">({{article.favoritesCount}})</span>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { followUser, unfollowUser } from '@/api/user'
import { deleteArticle, addFavorite, deleteFavorite } from '@/api/article'

export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data(){
    return {
      favoritedDisable: false,
      deleteDisable: false,
      followDisable: false,
    }
  },
  computed: {
    ...mapState(['user']),
    isMyself(){
      return this.user.username === this.article.author.username
    }
  },
  methods: {
    async deleteArticle(slug){
      this.deleteDisable = true
      const { data } = await deleteArticle(slug)
      this.deleteDisable = false
      this.$router.push('/')
    },
    async favoriteOperate (article) {  
      this.favoritedDisable = true
      if(article.favorited){
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount--
      }else{
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount++
      }
      this.favoritedDisable = false
    },
    async followOperate (article) {
      this.followDisable = true

      if(article.author.following){
        const { data } = unfollowUser(article.author.username)
        article.author.following = false
      }else {
        const { data } =  followUser(article.author.username)
        article.author.following = true
      }

      this.followDisable = false
    },
    editOperate(article){
      this.$router.push(`/editor/${article.slug}`)
    }
  }
};
</script>

<style>
</style>