const path = require('path');

const files = {
    XacroParser: 'XacroParser.js',
    XacroLoader: 'XacroLoader.js',
};

const isExternal = p => {

    return !!(/^three/.test(p) || Object.values(files).filter(f => p.indexOf(f) !== -1).length);

};

export default
Object.entries(files).map(([name, file]) => {

    const inputPath = path.join(__dirname, `./src/${ file }`);
    const outputPath = path.join(__dirname, `./umd/${ file }`);

    return {

        input: inputPath,
        treeshake: false,
        external: p => isExternal(p),

        output: {

            name,
            extend: true,
            format: 'umd',
            file: outputPath,
            sourcemap: true,

            globals: path => /^three/.test(path) ? 'THREE' : null,

        },

    };
});
