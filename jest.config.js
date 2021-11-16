module.exports = {
  setupFilesAfterEnv: ['./jest/setup.js', './jest/composition-api.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^~js/(.*)$': '<rootDir>/assets/js/pages/$1',
    '^~css/(.*)$': '<rootDir>/assets/css/pages/$1',
    '^~svg/(.*)(\\?inline|[])$': '<rootDir>/assets/svg/$1',
    '^@js/(.*)$': '<rootDir>/assets/js/layouts/$1',
    '^@css/(.*)$': '<rootDir>/assets/css/layouts/$1'
  },
  transform: {
    '.+\\.(js|jsx)$': 'babel-jest',
    '.*\\.(vue)$': '@vue/vue2-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)(\\?inline)?$': 'jest-transform-stub',
    'vee-validate/dist/rules': 'babel-jest'
  },
  transformIgnorePatterns: ['/node_modules/(?!vee-validate/dist/rules)'],
  moduleFileExtensions: ['ts', 'js', 'vue', 'json', 'svg'],
  collectCoverage: true,
  verbose: true
}
