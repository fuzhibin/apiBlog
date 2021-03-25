const fs = require('fs');
const files = fs.readdirSync(__dirname);

const useRoutes = (app) => {
    files.forEach(file => {
        if (file === 'index.js') {
            return
        }
        const fileRouter = require(`./${file}`);
        app.use(fileRouter.routes());
        app.use(fileRouter.allowedMethods());
    })
}

module.exports = useRoutes