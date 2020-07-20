#!/usr/bin/env node

const tools = require("./lib/tools");
const init = require("./lib/init");
const command = require("./command/command");
const services = require("./lib/services");
const storeg = require("./lib/storeg");
const spinner = require("./lib/spinner");
// const node = require("./lib/node");
const env = require("./lib/config");
// const { get, has } = require("lodash");
let data = {};
//init command
// init.run();
command.app({ ilog: init.show, data, env, services, storeg, spinner });
