import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import Books from '@/components/Books.vue'
import Fragment from 'vue-fragment';

Vue.use(Vuetify);
Vue.use(Fragment.Plugin);

global.requestAnimationFrame = window.requestAnimationFrame;

describe('Books.vue', () => {
  it('checks that all books have an id', () => {
    const localVue = createLocalVue();
    localVue.use(Fragment.Plugin);
    const wrapper = mount(Books, {
      localVue,
      vuetify: new Vuetify()
    });
    wrapper.vm.indexedBooks.forEach((item, index) => {
      expect(item.id).to.equal(index);
    });
  })
})
