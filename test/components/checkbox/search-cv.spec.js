import { beforeEach, describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { flushAll, click } from '@/jest/helpers/action'
import { canSee, see } from '@/jest/helpers/expect'
import SearchCv from '@/components/Checkbox/SearchCv'

describe('SearchCv', () => {
  let wrapper

  beforeEach(async () => {
    wrapper = mount(SearchCv, {
      propsData: {
        name: 'name',
        check: false
      }
    })

    jest.useFakeTimers()
    await flushAll()
    await flushAll()
  })

  it('should uncheck by default', function () {
    canSee(wrapper.find('.fa-circle'), true)
    canSee(wrapper.find('.fa-check-circle'), false)
  })

  it('should check when click icon', async function () {
    await click(wrapper.find('.fa-circle'))

    canSee(wrapper.find('.fa-circle'), false)
    canSee(wrapper.find('.fa-check-circle'), true)
    expect(wrapper.emitted().choose).toBeTruthy()
  })

  it('should checked when click name check', async function () {
    await click(wrapper.find('.checked-name'))

    canSee(wrapper.find('.fa-circle'), false)
    canSee(wrapper.find('.fa-check-circle'), true)
    expect(wrapper.emitted().choose).toBeTruthy()
  })

  it('should uncheck when click name of checkbox checked', async function () {
    wrapper.setData({ checked: true })
    await flushAll()

    await click(wrapper.find('.checked-name'))

    canSee(wrapper.find('.fa-circle'), true)
    canSee(wrapper.find('.fa-check-circle'), false)
    expect(wrapper.emitted().choose).toBeTruthy()
  })

  it('should uncheck when click icon of checkbox checked', async function () {
    wrapper.setData({ checked: true })
    await flushAll()

    await click(wrapper.find('.fa-check-circle'))

    canSee(wrapper.find('.fa-circle'), true)
    canSee(wrapper.find('.fa-check-circle'), false)
    expect(wrapper.emitted().choose).toBeTruthy()
  })

  it('should see name of checkbox', async function () {
    wrapper.setData({ name: 'title of st' })
    await flushAll()

    see(wrapper.find('.checked-name'), 'title of st')
  })
})
