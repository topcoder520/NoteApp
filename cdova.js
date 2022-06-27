const {cordova} = require('cordova-lib')

//清除
const clean = (api,options)=>{
    api.registerCommand('clean',args=>{
        return cordova.clean()
            .catch(console.error);
    });
}

//构建
const build = (api,options)=>{
    const {build} = api.service.commands;

    const originalBuild = build.fn;

    build.fn = (...args)=>{
        return originalBuild(...args)
            .then(()=>cordova.prepare())
            .then(()=>cordova.compile({options:args[0]}))
            .catch(console.error)
    }

}

//运行
const develop = (api,options)=>{
    api.registerCommand('develop',args=>{
        return cordova.run(args).catch(console.error)
    })
}

module.exports = (api,options)=>[clean,build,develop].map(fn=>fn(api,options))
