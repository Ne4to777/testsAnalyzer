module.exports = {
    sniffer: {
        root: '/home/nybble/dev/marketplace/platform.touch',
        extensions: [
            '.js',
        ],
        exclude: {
            files: [
                /helpers\./i,
                /\.response\./i,
                /\.result\./i,
                /testData\./i,
                /mock\./i,
                /dataSamples/i,
                /deps\./i,
                /utils\./i,
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
                    /\.blocks\//,
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
                    /outletRadioCheckedByIndex/i,
                ],
            },
            E2E: {
                path: [
                    /gemini/,
                    /\/tops\/pages\//,
                    /\.pages\//,
                ],
                content: [
                    /страниц/i,
                    /переход/i,
                    /вне окна/i,
                    /на взаимодейств/i,
                    /модал(ьн|к)/,
                    /\.yaOpenPage/,
                    /\.createPageObject/,
                ],
            },
            Unit: {
                path: [
                    /unit\//i,
                    /\/app\//,
                    /resolvers\//,
                    /epics\//,
                    /entities\//,
                    /\/modules/,
                    /utils\//,
                ],
                content: [],
            },
        },
    },
    reporter: {
        root: '/home/nybble/dev/marketplace/platform.touch/',
        filepath: 'marketplace/touch.csv',
    },
}
