module.exports = {
    sniffer: {
        root: '/home/nybble/dev/market/platform.desktop',
        extensions: [
            '.js',
        ],
        exclude: {
            files: [
                /helpers\./i,
                /\.response\./i,
                /\.result\./i,
                /testData\./i,
                /mock./i,
                /dataSamples/i,
                /deps\./i,
            ],
            folders: [
                /mock/i,
                /fixtures/i,
                /node_modules/i,
                /\.enb/i,
                /deprecated/i,
                /testing/i,
                /production/i,
                /development/i,
                /testData/i,
                /page-objects/i,
                /helpers/i,
                /client-scripts/i,
                /configs/i,
                /commands/i,
                /scenarios/i,
            ],
        },
        validPaths: [
            // '.',
            /spec(_|\/)/i,
            /test/i,
            /gemini/i,
        ],
    },
    analyzer: {
        checkers: {
            Component: {
                path: [
                    /components\//,
                    /containers\//,
                    /selectors\//,
                    /\/blocks\//,
                ],
                content: [
                    /компонент/i,
                    /виджет/i,
                    /widget/i,
                    /отобража/i,
                    /рендерит/i,
                ],
            },
            E2E: {
                path: [
                    /gemini/,
                    /\/tops\//,
                ],
                content: [
                    /страница/i,
                    /переход/i,
                    /вне окна/i,
                    /на взаимодейств/i,
                    /createPageObject/,
                ],
            },
            Unit: {
                path: [
                    /unit\//i,
                    /\/app\//,
                    /resolvers\//,
                    /epics\//,
                    /entities\//,
                ],
                content: [],
            },
        },
    },
    reporter: {
        root: '/home/nybble/dev/market/platform.desktop/',
        filepath: 'market/desktop.csv',
    },
}
