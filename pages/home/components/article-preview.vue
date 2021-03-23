<template>
  <div>
    <template v-if="articles && articles.length > 0">
      <div
        class="article-preview"
        v-for="article in articles"
        :key="article.slug"
      >
        <div class="article-meta">
          <nuxt-link
            :to="{
              name: 'profile',
              params: { username: article.author.username },
            }"
            ><img :src="article.author.image" />
          </nuxt-link>

          <div class="info">
            <nuxt-link
              class="author"
              :to="{
                name: 'profile',
                params: { username: article.author.username },
              }"
              >{{ article.author.username }}
            </nuxt-link>

            <span class="date">{{
              article.createdAt | date("MMMM DD, YYYY")
            }}</span>
          </div>
          <button
            class="btn btn-outline-primary btn-sm pull-xs-right"
            :class="{ active: article.favorited }"
            :disabled="article.favoriteDisabled"
            @click="onFavorite(article)"
          >
            <i class="ion-heart"></i> {{ article.favoritesCount }}
          </button>
        </div>
        <nuxt-link
          class="preview-link"
          :to="{
            name: 'article',
            params: {
              slug: article.slug,
            },
          }"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <ul class="tag-list">
            <li
              class="tag-default tag-pill tag-outline"
              v-for="tag in article.tagList"
              :key="tag"
            >
              {{ tag }}
            </li>
          </ul>
        </nuxt-link>
      </div>
    </template>

    <template v-else> 
        <div class="article-preview">
            No articles are here... yet.
        </div>
    </template>
  </div>
</template>

<script>
import { addFavorite, deleteFavorite } from "@/api/article";

export default {
  name: "ArticlePreview",
  props: {
    articles: {
      type: Array,
      require: true,
    },
  },
  mounted() {
    this.articles.forEach((article) => {
      article.favoriteDisabled = false;
    });
  },
  methods: {
    async onFavorite(article) {
      article.favoriteDisabled = true;
      if (article.favorited) {
        await deleteFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount += -1;
      } else {
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      article.favoriteDisabled = false;
    },
  },
};
</script>

<style>
</style>