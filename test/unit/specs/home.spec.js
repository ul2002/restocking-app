import Vue from 'vue'

import home from '@/components/home/home-page'

describe('home-page.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(home)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.secondary--text h2').textContent)
    .toEqual('Dashboard')
  })
})
