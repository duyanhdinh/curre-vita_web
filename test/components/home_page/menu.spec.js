import { beforeEach, describe, expect, it } from '@jest/globals'
import * as rules from 'vee-validate/dist/rules.umd'
import { extend } from 'vee-validate'
import { shallowMount } from '@vue/test-utils'
import { flushAll } from '@/jest/helpers/action'
import { see } from '@/jest/helpers/expect'
import Menu from '@/components/HomePage/Menu'
import SearchCv from '@/components/Checkbox/SearchCv'

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

describe('Menu', () => {
  let wrapper
  let spyA
  let spyR
  let spyU

  beforeEach(async () => {
    wrapper = shallowMount(Menu, {
      stubs: {
        CheckboxSearchCv: SearchCv
      },
      mocks: {
        $nuxt: {
          context: {
            $searchResume: {
              getList: () => {},
              add: jest.fn(),
              remove: jest.fn(),
              updateSearch: jest.fn()
            }
          }
        },
        checkBox: {}
        // checkBox: {"nature":{"0":{"title":"elegant","key":"elegant"},"1":{"title":"softy","key":"softy"}}}
      }
    })

    spyA = jest.spyOn(wrapper.vm.$nuxt.context.$searchResume, 'add')
    spyR = jest.spyOn(wrapper.vm.$nuxt.context.$searchResume, 'remove')
    spyU = jest.spyOn(wrapper.vm.$nuxt.context.$searchResume, 'updateSearch')

    jest.useFakeTimers()
    await flushAll()
    await flushAll()
  })

  it('should call function update when input search fields', async function () {
    const search = wrapper.find('#hpm-search')
    search.setValue('123')
    await flushAll()

    expect(spyU).toHaveBeenCalled()
  })

  it('should call add key function when checked checkbox', async function () {
    await wrapper.setData({
      checkBox: { nature: { 0: { title: 'elegant', key: 'elegant' }, 1: { title: 'softy', key: 'softy' } } }
    })
    await wrapper.vm.$forceUpdate()
    const t = wrapper.findComponent(SearchCv)

    t.vm.$emit('choose', true)

    expect(spyA).toHaveBeenCalled()
  })

  it('should call remove key function when uncheck checkbox', async function () {
    await wrapper.setData({
      checkBox: { nature: { 0: { title: 'elegant', key: 'elegant' }, 1: { title: 'softy', key: 'softy' } } }
    })
    await wrapper.vm.$forceUpdate()
    const t = wrapper.findComponent(SearchCv)

    t.vm.$emit('choose', false)

    expect(spyR).toHaveBeenCalled()
  })

  it('should see title of type checkbox', async function () {
    await wrapper.setData({
      checkBox: { nature: { 0: { title: 'elegant', key: 'elegant' }, 1: { title: 'softy', key: 'softy' } } }
    })
    await wrapper.vm.$forceUpdate()

    see(wrapper, 'nature')
  })
})
