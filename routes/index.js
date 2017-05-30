"use strict"

global.taskStarted = false;

module.exports.init = function(router) {

    /**
     * 示例 Code
     */
    router.get('/', async function(ctx, next) {
        ctx.state = {
            title: 'NXT Push Server'
        };
        await ctx.render('index', {});
    });

    router.get('/test', async function(ctx, next) {
            ctx.status = 200;
            ctx.body = {
                success: true,
                started: false
            };
    });
}
