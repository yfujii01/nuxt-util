<template>
  <v-row justify="space-around">
    <v-menu
      v-for="(menu, m) in menus"
      :key="m"
      transition="slide-y-transition"
      bottom
      offset-y
    >
      <template v-slot:activator="{ on }">
        <v-btn class="purple" color="primary" dark v-on="on">{{
          menu.title
        }}</v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, i) in menu.items" :key="i" :to="item.link">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    menus: [
      {
        title: 'めにゅー１',
        items: [
          { title: 'home', link: '/' },
          { title: 'test', link: '/test' },
          { title: '1 Click 3', link: '' },
          { title: '1 Click 4', link: '' }
        ]
      },
      {
        title: 'めにゅー２',
        items: [
          { title: '2 Click 1' },
          { title: '2 Click 2' },
          { title: '2 Click 3' },
          { title: '2 Click 4' }
        ]
      },
      {
        title: 'めにゅー３',
        items: [
          { title: '3 Click 1' },
          { title: '3 Click 2' },
          { title: '3 Click 3' },
          { title: '3 Click 4' }
        ]
      }
    ]
  })
}
</script>
