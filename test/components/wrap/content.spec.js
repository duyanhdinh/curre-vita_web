import { beforeEach, describe, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { flushAll, hover } from '../../../jest/helpers/action'
import { canSee, exist } from '../../../jest/helpers/expect'
import WrapContent from '@/components/Wrap/Content'

describe('WrapContent', () => {
  let wrapper

  beforeEach(async () => {
    wrapper = mount(WrapContent, {
      propsData: {
        parent: true,
        first: false,
        last: false,
        canRemove: false,
        type: '',
        listType: []
      }
    })

    jest.useFakeTimers()
    await flushAll()
    await flushAll()
  })

  it('should show only list parent button actions when hover parent', async function () {
    wrapper.setProps({ parent: true })

    await hover(wrapper.find('.wrap-content'))

    canSee(wrapper.find('.wrap-content--parent-action'), true)
    exist(wrapper.find('.wrap-content--child-action'), false)
  })

  it('should show only list child button actions when hover child', async function () {
    wrapper.setProps({ parent: false })

    await hover(wrapper.find('.wrap-content'))

    canSee(wrapper.find('.wrap-content--child-action'), true)
    exist(wrapper.find('.wrap-content--parent-action'), false)
  })
})
