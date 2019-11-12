#!/usr/bin/env node
const program = require('commander')
const chalk = require('chalk')
program
  .command('create <app-name>')
  .description('create a new project powered by vue-cli-service')
  .action((name) => {
    console.log('name: ', name)
    require('../lib/create')(name)
  })

program
  .command('init <app-name>')
  .description('create a new project')
  .action((name) => {
    require('../lib/init')(name)
  })

program
  .command('add <template-name>')
  .description('create a new template')
  .action((name) => {
    require('../lib/add')(name)
  })

program.parse(process.argv)