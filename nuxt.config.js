module.exports = {
    router: {
        linkActiveClass: 'active',
        // middleware: 'authenticated',
        extendRoutes(routes, resolve) {
            routes.splice(0)
            routes.push(...[
                {
                    path: '/',
                    component: resolve(__dirname, 'pages/layout') ,
                    children: [
                        {
                            path: '/',
                            name: 'home',
                            component: resolve(__dirname, 'pages/home')
                        },
                        {
                            path: '/login',
                            name: 'login',
                            component: resolve(__dirname, 'pages/login')
                        },
                        {
                            path: '/register',
                            name: 'register',
                            component: resolve(__dirname, 'pages/login')
                        },
                        {
                            path: '/profile/:username',
                            name: 'profile',
                            component: resolve(__dirname, 'pages/profile')
                        },
                        {
                            path: '/settings',
                            name: 'settings',
                            component: resolve(__dirname, 'pages/settings')
                        },
                        {
                            path: '/article/:slug',
                            name: 'article',
                            component: resolve(__dirname, 'pages/article')
                        },
                        {
                            path: '/editor/:slug?',
                            name: 'editor',
                            component: resolve(__dirname, 'pages/editor')
                        },
                    ]
                }
            ])
        }
    },
    plugins: [
        '~/plugins/request.js',
        '~/plugins/dayjs.js',
    ],
    server: {
        host: '0.0.0.0',
        port: 3000
    },
}
