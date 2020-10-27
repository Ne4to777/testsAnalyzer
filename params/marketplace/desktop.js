module.exports = {
    sniffer: {
        root: '/home/nybble/dev/marketplace/platform.desktop',
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
                'deps.',
                'utils.'
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
                'scenarios',
                'stubs'
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
                    /\.blocks\//
                ],
                content: [
                    /компонент/i,
                    /виджет/i,
                    /widget/i,
                    /отобража/i,
                    /рендерит/i,
                    /быть виде?н/i,
                    /показыв/i,
                ]
            },
            E2E: {
                path: [
                    /gemini/,
                    /\.pages\//
                ],
                content: [
                    /страниц/i,
                    /переход/i,
                    /вне окна/i,
                    /на взаимодейств/i,
                    /модал(ьн|к)/,
                    /совпадает/i,
                    /\.yaOpenPage/,
                    /\.createPageObject/,
                    /.yaScenario/
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
        root: '/home/nybble/dev/marketplace/platform.desktop/',
        filepath: 'marketplace/desktop.csv'
    }
}
