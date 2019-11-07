'use strict';

const debug = require('debug')('plugin:sitemap');
const Sitemapper = require('sitemapper');

module.exports.Plugin = SitemapPlugin;
module.exports.pluginInterfaceVersion = 2;

let urls = [];

function SitemapPlugin(script, events) {
    this.script = script;
    this.events = events;

    if (!script.config.processor) {
        script.config.processor = {};
    }

    const sitemap = new Sitemapper();
    sitemap.fetch(script.config.target).then(function(data) {
        urls = data.sites;
    });

    script.config.processor.sitemapPluginSetSitemapUrl = sitemapPluginSetSitemapUrl;

    script.scenarios.forEach(function(scenario) {
        if (!scenario.beforeRequest) {
            scenario.beforeRequest = [];
        }

        scenario.beforeRequest.push('sitemapPluginSetSitemapUrl');
    });

    debug('Plugin initialized');
    return this;
}

function sitemapPluginSetSitemapUrl(req, userContext, events, done) {
    const rand = Math.floor(Math.random() * Math.floor(urls.length));
    req.url = urls[rand];
    debug(`sitemapPluginSetSitemapUrl: ${req.url}`);
    return done();
}
