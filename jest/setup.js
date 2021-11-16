import Vue from 'vue'
import { config } from '@vue/test-utils'
import VModal from 'vue-js-modal'

import * as matchers from 'jest-extended'
expect.extend(matchers)

Vue.config.silent = true

Vue.use(VModal)

// Mock Nuxt components
config.stubs.nuxt = { template: '<div />' }
config.stubs['nuxt-link'] = { template: '<a><slot /></a>' }
config.stubs['no-ssr'] = { template: '<span><slot /></span>' }
