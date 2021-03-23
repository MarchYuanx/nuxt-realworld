<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'your_feed',
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed'
                    }
                  }"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'global_feed',
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed'
                    }
                  }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'tag',
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag: tag
                    }
                  }"
                  >#{{ tag }}</nuxt-link
                >
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
                    name: 'home',
                    query: {
                      tab: tab,
                      tag: tag,
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

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link
                :to="{
                  name: 'home',
                  query: {
                    tab: 'tag',
                    tag: item
                  },
                }"
                class="tag-pill tag-default"
                v-for="item in tags"
                :key="item"
                >{{ item }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, getFeedArticles, } from "@/api/article";
import { getTags } from "@/api/tag";
import { mapState } from "vuex";
import articlePreview from './components/article-preview.vue';

export default {
  components: { articlePreview },
  name: "HomeIndex",
  watchQuery: ["page", "tag", "tab"],
  async asyncData(context) {
    const { query, store } = context;
    const limit = 10;
    const page = Number.parseInt(query.page || 1);
    const tag = query.tag;
    const tab = query.tab || 'global_feed';

    const loadArticles = store.state.user && tab === 'your_feed'
      ? getFeedArticles
      : getArticles

    // 使用 promise.all 将没有逻辑关系的串行任务该为并行 优化加载速度
    const [articleRes, tagsRes] = await Promise.all([
      loadArticles({
        limit,
        tag,
        offset: (page - 1) * limit,
      }),
      getTags(),
    ]);

    const { articles, articlesCount } = articleRes.data;
    const { tags } = tagsRes.data;
    
    articles.forEach(article => {
      article.favoriteDisabled = false
    })

    return {
      articles,
      articlesCount,
      limit,
      page,
      tags,
      tag,
      tab
    };
  },
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  head() {
    return {
      title: `Home — Conduit`,
    }
  }
};
</script>

<style>
</style>