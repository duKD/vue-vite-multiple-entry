# vite 多入口打包项目

## 目录介绍

```
├── dist       打包后的静态资源目录
└── src             项目资源目录
    └── assets          项目静态资源
    └── hooks          全局hooks
    ├── utils          全局方法公共库
        └── utils1.ts            全局公共方法
        └── constants.ts        全局公共常量
    ├── components      公共组件
    ├── styles           公共样式模块
    ├── pages           页面模块
        ├── xxx         页面模块A
            ├── apis            接口定义
            ├── components      页面组件
            └── router          路由配置
            └── store           store配置
            └── common           模块公共库
                └── utils.ts           模块公共工具方法
                └── constants.ts        模块常量
                └── eventMap.ts         模块埋点枚举
            └── views           模块页面
            └── App.vue         入口根节点
            └── index.html      入口页面
            └── main.ts         入口页面文件
        ├── xxx         页面模块B
            ├── apis            接口定义
            ├── components      页面组件
            └── router          路由配置
            └── store           store配置
            └── common           模块公共库
                └── utils.ts           模块公共工具方法
                └── constants.ts        模块常量
                └── eventMap.ts         模块埋点枚举
            └── views           模块页面
            └── App.vue         入口根节点
            └── index.html      入口页面
            └── main.ts         入口页面文件
        ├── xxx         初始化入口文件

    ├── public                  该文件下的 模块 会直接移到 dist 根目录下 不会被打包处理
    ├── types                   依赖库类型定义
    └── .eslintignore           eslint忽略文件配置
    └── .eslintrc.cjs           eslint规则配置
    └── .gitignore              gitignore配置
    └── .prettierignore         prettier忽略文件配置
    └── .prettierrc.cjs         prettier文件配置
    └── .vue.config.ts          项目打包配置文件


```

## eslint prettier 相关

```
 修改 eslint 配置后 可以 执行 npm run lint 全局检查代码 再根据提示 解决报错

 修改 prettier.cjs 配置 后 可以 执行 npm run format 全局格式化文件
```

## 访问规则

```
npm i
npm run dev

http://[ip]:[port]/[entry]/index.html#/


```
