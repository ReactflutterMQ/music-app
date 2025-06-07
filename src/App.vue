<template>
  <Header></Header>
  <Tab></Tab>
  <router-view :style="viewStyle" v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"/>
    </keep-alive>
  </router-view>
  <router-view 
    :style="viewStyle" 
    name="user" 
    v-slot="{ Component }"
  >
    <transition appear name="slide">
      <keep-alive>
        <component :is="Component"/>
      </keep-alive>
    </transition>
  </router-view>
  <Player></Player>
</template>

<script>
import Header from '@/components/Header/Header.vue'
import Tab from '@/components/Tab/Tab.vue'
import Player from './components/player/player.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Header,
    Tab,
    Player
  },
  computed: {
    viewStyle() {
      const bottom = this.playlist.length ? '60px' : '0'
      return {
        bottom
      }
    },
    ...mapState([
      'playlist'
    ])
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  Header, Tab {
    position: fixed;
    background-color: #1e1e1e;
  }
  Header {
    top: 0;
  }
  Tab {
    top: 40px;
  }
}
</style>
