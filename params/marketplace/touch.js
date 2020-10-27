module.exports = {
    sniffer: {
        root: '/home/nybble/dev/marketplace/platform.touch',
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
                    /\.blocks\//
                ],
                content: [
                    /компонент/i,
                    /виджет/i,
                    /widget/i,
                    /отображ/i,
                    /рендерит/i,
                    /быть виде?н/i,
                    /показыв/i,
                    /\.modelImage\./,
                    /outletRadioCheckedByIndex/i
                ]
            },
            E2E: {
                path: [
                    /gemini/,
                    /\/tops\/pages\//,
                    /\.pages\//
                ],
                content: [
                    /страниц/i,
                    /переход/i,
                    /вне окна/i,
                    /на взаимодейств/i,
                    /модал(ьн|к)/,
                    /\.yaOpenPage/,
                    /\.createPageObject/,
                ]
            },
            Unit: {
                path: [
                    /unit\//i,
                    /\/app\//,
                    /resolvers\//,
                    /epics\//,
                    /entities\//,
                    /\/modules/,
                    /utils\//
                ],
                content: []
            }
        }
    },
    reporter: {
        root: '/home/nybble/dev/marketplace/platform.touch/',
        filepath: 'marketplace/touch.csv'
    }
}
