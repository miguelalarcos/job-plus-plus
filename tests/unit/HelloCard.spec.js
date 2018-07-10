import { mount } from '@vue/test-utils'
import MainCard from '@/components/MainCard.vue'
import store from '@/store'

describe('MainCard.vue', () => {  
  it('renders main card with 3 notifications', () => {
    const wrapper = mount(MainCard, {
      store
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders main card with 1 notification', () => {
    store.state.totalNotifications = 1
    const wrapper = mount(MainCard, {
      store
    })

    expect(wrapper.element).toMatchSnapshot()
  })

})
