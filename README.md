# AWS better-sqlite3 layer
This AWS lambda layer contains a pre-built [better-sqlite3](https://www.npmjs.com/package/better-sqlite3) npm library.
It is optimized for the smallest space usage possible.

|better-sqlite3 version| Layer size|
|---|---|
|[7.1.0](https://github.com/JoshuaWise/better-sqlite3/releases/tag/v7.1.0)|0.87MB|

# Getting
A pre-built layer zip file is available at [`dist/better-sqlite3-layer.zip`](./dist/better-sqlite3-layer.zip).

# Building

## Dependencies
* Docker

## Steps
1. Clone the repo:
    ```shell script
    git clone git@github.com:Umkus/lambda-layer-better-sqlite3.git
    cd lambda-layer-better-sqlite3/
    ```
1. Install dependencies:
    ```shell script
    docker run -v "$PWD":/var/task lambci/lambda:build-nodejs12.x npm --no-optional --no-audit --progress=false install
    ```
1. Build the layer:
    ```shell script
    docker run -v "$PWD":/var/task lambci/lambda:build-nodejs12.x node ./node_modules/webpack/bin/webpack.js
    ```
1. Perform a smoke-test:
    ```shell script
    docker run -w /var/task/dist/nodejs -v "$PWD":/var/task lambci/lambda:build-nodejs12.x node -e "console.log(require('better-sqlite3'))"
    ```
1. Import created layer into your AWS account:
    ```shell script
    aws lambda publish-layer-version --layer-name better-sqlite3 --description "better-sqlite3 layer" --license-info "Apache License 2.0" --zip-file fileb://dist/better-sqlite3-layer.zip --compatible-runtimes nodejs12.x
    ```
