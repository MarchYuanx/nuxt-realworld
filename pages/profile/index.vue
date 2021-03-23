<template>
  <div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="profile.image" class="user-img" />
          <h4>{{profile.username}}</h4>
          <p>{{profile.bio}}</p>
          <button class="btn btn-sm btn-outline-secondary action-btn" @click="operate" :disabled="this.profile.followDisable">
            <i :class="isMyself ? 'ion-gear-a' : 'ion-plus-round'"></i>
            &nbsp;
            {{ isMyself ? 'Edit Profile Settings' : ((profile.following ? 'Unfollow ' : 'Follow ') + profile.username)}}
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <nuxt-link 
                :to="{
                  name: 'profile',
                  params: {
                    username: profile.username
                  },
                  query: {
                    tab: 'my_articles'
                  }
                }"
                class="nav-link"
                :class="{
                  active: tab === 'my_articles',
                }"
                exact>My Articles</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link 
                :to="{
                    name: 'profile',
                    params: {
                      username: profile.username
                    },
                    query: {
                      tab: 'favorited_articles'
                    }
                  }"
                class="nav-link"
                :class="{
                  active: tab === 'favorited_articles',
                }"
                exact>Favorited Articles</nuxt-link>
            </li>
          </ul>
        </div>

        <article-preview :articles="articles"/>

        <!-- 分页列表 -->
        <nav>
          <ul class="pagination" v-for="item in totalPage" :key="item">
            <li
              class="page-item ng-scope"
              :class="{
                active: item === page,
              }"
            >
              <!-- <a class="page-link ng-binding" :href="'/?page='+item">{{item}}</a> -->
              <nuxt-link
                class="page-link ng-binding"
                :to="{
                  name: 'profile',
                  query: {
                    tab,
                    page: item,
                  },
                }"
                >{{ item }}</nuxt-link
              >
            </li>
          </ul>
        </nav>
        <!-- /分页列表 -->

      </div>

    </div>
  </div>

</div>
</template>

<script>
import { mapState } from 'vuex' 
import { getArticles } from '@/api/article'
import { getProfile, followUser, unfollowUser } from '@/api/user'
import ArticlePreview from '../home/components/article-preview'

export default {
    name: 'ProfileIndex',
    components: {
      ArticlePreview
    },
    watchQuery: ['page','tab'],
    async asyncData (context) {
      const { query, params } = context 
      const { username } = params
      const limit = 5;
      const page = Number.parseInt(query.page || 1);
      const tab = (query.tab || 'my_articles')

      const articlesParams = {
        limit,
        offset: (page - 1) * limit,
      }

      if(tab === 'favorited_articles'){
        articlesParams.favorited = username
      }else {
        articlesParams.author = username
      }

      const [ profileRes, articleRes ] = await Promise.all([
        getProfile(username),
        getArticles(articlesParams)
      ])

      const { profile } = profileRes.data
      const { articles, articlesCount } = articleRes.data

      profile.followDisable = false

      return {
        profile,
        articles,
        articlesCount,
        limit,
        page,
        tab,
      }
    },

    computed: {
      ...mapState(['user']),
      isMyself () {
        return this.profile.username === this.user.username
      },
      totalPage() {
        return Math.ceil(this.articlesCount / this.limit);
      },
    },
    methods: {
      async operate(){
        if(this.isMyself){
          this.$router.push('/settings')
        }else {
          this.profile.followDisable = true
          if(this.profile.following){
            const { data } = await unfollowUser(this.profile.username)
            this.profile.following = false
          }else{
            const { data } = await followUser(this.profile.username)
            this.profile.following = true
          }
          this.profile.followDisable = false
        } 
      }
    },
    head() {
      return {
        title: this.tab === 'favorited_articles' ? `favorited by ${this.profile.username} — Conduit` : `@${this.profile.username} — Conduit`,
        meta: [
          {
            hid: 'profile',
            name: 'profile',
            content: this.profile.bio
          }
        ]
      }
    }

}
</script>

<style>

</style>