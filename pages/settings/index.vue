<template>
  <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="field + index">
                {{ field }} {{ message }}
              </li>
            </template>
          </ul>

        <form @submit.prevent="updateSetting">
          <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="URL of profile picture" v-model="userInfo.image">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="userInfo.username">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="userInfo.bio"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="userInfo.email">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="New Password" v-model="password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" >
                Update Settings
              </button>
          </fieldset>
        </form>
        <hr>
        <button class="btn btn-outline-danger" @click="logout">
          Or click here to logout.
        </button>
      </div>

    </div>
  </div>
</div>

</template>

<script>
import { mapState } from "vuex";
import { updateUser } from "@/api/user"
const Cookie = process.client ? require('js-cookie') : undefined

export default {
    name: 'SettingsIndex',
    middleware: 'authenticated',
    data () {
      return {
        userInfo: {
          image: '',
          username: '',
          bio: '',
          email: ''
        },
        password: '',
        errors: {},
      }
    },
    computed: {
      ...mapState(['user'])
    },
    mounted () {
      this.userInfo.image = this.user.image
      this.userInfo.username = this.user.username
      this.userInfo.bio = this.user.bio
      this.userInfo.email = this.user.email
    },
    methods: {
      async updateSetting () {
        try {
          if(this.password){
            this.userInfo.password = this.password
          }
          const { data } = await updateUser({user: this.userInfo})

          // 持久化数据 防止刷新丢失
          Cookie.set('user', data.user)
          this.$store.commit('setUser', data.user)
          this.$router.push(`/profile/${data.user.username}`)
        } catch (error) {
          this.errors = error.response.data.errors
        }
      },
      logout () {
        Cookie.set('user', null)
        this.$store.commit('setUser', null)
        this.$router.push(`/login`)
      }
    },
    head() {
      return {
        title: `Settings — Conduit`,
      }
    }
}
</script>

<style>

</style>