import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AddTask from '@/components/AddTask'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld1',
      component: HelloWorld
    },
    {
      path: '/AddTask',
      name: 'AddTask',
      component: AddTask
    }
  ]
})

