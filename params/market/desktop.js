module.exports = {
    sniffer: {
        root: '/home/nybble/dev/market/platform.desktop',
        extensions: [
            '.js'
        ],
        exclude: {
            files: [
                'helpers.',
                '.response.',
                '.result.',
                'testData.',
                'mock.',
                'dataSamples',
                'deps.'
            ],
            folders: [
                'mock',
                'fixtures',
                'node_modules',
                '.enb',
                'deprecated',
                'testing',
                'production',
                'development',
                'testData',
                'page-objects',
                'helpers',
                'client-scripts',
                'configs',
                'commands',
                'scenarios'
            ]
        },
        validPaths: [
            // '.',
            'spec(_|/)',
            'test',
            'gemini'
        ]
    },
    analyzer: {
        checkers: {
            Component: {
                path: [
                    /components\//,
                    /containers\//,
                    /selectors\//,
                    /\/blocks\//
                ],
                content: [
                    /компонент/i,
                    /виджет/i,
                    /widget/i,
                    /отобража/i,
                    /рендерит/i
                ]
            },
            E2E: {
                path: [
                    /gemini/,
                    /\/tops\//
                ],
                content: [
                    /страница/i,
                    /переход/i,
                    /вне окна/i,
                    /на взаимодейств/i,
                    /createPageObject/
                ]
            },
            Unit: {
                path: [
                    /unit\//i,
                    /\/app\//,
                    /resolvers\//,
                    /epics\//,
                    /entities\//
                ],
                content: []
            }
        }
    },
    reporter: {
        root: '/home/nybble/dev/market/platform.desktop/',
        filepath: 'market/desktop.csv'
    }
}
