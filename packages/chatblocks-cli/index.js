#!/usr/bin/env node

const program = require("commander");
const colors = require("colors");
const {exec} = require('child_process');
const fs = require('fs');

const samplePackageJSON = {
    "version": "1.0.0",
    "description": "My chatbot created with chatblocks!",
    "scripts": {
        "blocks": "babel --watch blocks --out-dir build",
        "start-server": "nodemon app.js"
    },
    "author": "chatblocks",
    "dependencies": {
        "body-parser": "*",
        "chatblocks": "*",
        "chatblocks-router": "*",
        "dotenv": "^6.0.0",
        "express": "*",
        "request": "^2.87.0",
        "request-promise": "^4.2.2"
    },
    "devDependencies": {
        "babel-core": "^6.26.3",
        "babel-plugin-transform-react-jsx": "^6.24.1",
        "babel-plugin-transform-object-rest-spread": "^6.26.0",
        "babel-preset-env": "^1.7.0"
    }
};

let name;

program
    .arguments('<projectName>')
    .action(function (projectName) {
        name = projectName;
    })
    .option("-t, --token <PageAccessToken>", "Page access token. Generate it for your page. It allows to send messages as your page.")
    .option("-v, --verify <VerifyToken>", "Verify token used to validate webhook. Make sure it is safe and unique.")
    .parse(process.argv);

if (!name) {
    console.log("Project name is required.");
    console.log("Run " + "chatblocks --help".cyan + " to see help.")
    process.exit();
}

const params = {
    "verify": program.verify,
    "token": program.token
};

const isValid = Object.values(params).filter(x => x).length === Object.keys(params).length;

if (!isValid) {
    let missingArguments = getMissingArguments();
    console.log(`Missing arguments (${missingArguments}).`);
    console.log("Run " + "chatblocks --help".cyan + " to see help.");
    process.exit();
}

console.log(`Creating ${name}...`.green);

// make directory and copy files
exec(`mkdir ${name}`, (err) => {
    console.log("- Creating directory...".green);
    if (err) {
        console.log(`Directory "${name}" already exists!`);
        console.log("Details".underline);
        console.log(err.toString().red);
        process.exit();
    }
    copyFiles();
});

function copyFiles() {
    console.log("- Copying files...".green);
    exec(`cp -R -v ${__dirname + '/sample-project/*'} ./${name}`, (err) => {
        if (err) {
            console.log(`Error when copying files to directory "${name}".`);
            console.log("Details".underline);
            console.log(err.toString().red);
            process.exit();
        }
        createEnv();
    });
}

// create env file and populate it
function createEnv() {
    console.log("- Creating .env file...".green);
    fs.writeFile(`./${name}/.env`, `PAGE_ACCESS_TOKEN=${params.token}\nVERIFY_TOKEN=${params.verify}`, (err) => {
        if (err) {
            console.log(`Error writing .env file.`);
            console.log("Details".underline);
            console.log(err.toString().red);
            process.exit();
        }
        createBabelrc();
    });
}

// create babelrc file and populate it
function createBabelrc() {
    console.log("- Creating .babelrc file...".green);
    fs.writeFile(`./${name}/.babelrc`,
`{
    "plugins": [
        ["transform-object-rest-spread"],
        ["transform-react-jsx", { "pragma": "await Chatblocks.createElement" }]
    ]
}`, (err) => {
        if (err) {
            console.log(`Error writing .babelrc file.`);
            console.log("Details".underline);
            console.log(err.toString().red);
            process.exit();
        }
        createPackageJSON();
    });
}

// create package.json
function createPackageJSON() {
    console.log("- Creating package.json...".green);
    fs.writeFile(`./${name}/package.json`, createPackageJSONString(name), (err) => {
        if (err) {
            console.log(`Error creating package.json.`);
            console.log("Details".underline);
            console.log(err.toString().red);
            process.exit();
        }
        installDeps();
    });
}

// install dependencies
function installDeps() {
    console.log("- Installing dependencies...".green);
    exec(`cd ./${name} && npm i`, (err) => {
        if (err) {
            console.log(`Error installing dependencies.`);
            console.log("Details".underline);
            console.log(err.toString().red);
            process.exit();
        }
        console.log("Happy hacking with chatblocks!".rainbow);
        console.log(`I just created project scaffold for you. Create your first Block in ${name}/blocks directory.`);
        console.log(`Run "cd ${name}", "npm run blocks" and "npm run start-server".`);
        console.log("You will probably need some software to receive webhooks on localhost. We recommend ngrok or localtunnel.");
        console.log(`Command to run ngrok is also included: "npm run ngrok".`);
    })
}

function getMissingArguments() {
    return Object
        .keys(params)
        .map(param => {
            if (params[param]) {
                return false;
            }
            return "--" + param;
        })
        .filter(Boolean)
        .join(", ")
        .red;
}

function createPackageJSONString(name) {
    return JSON.stringify({
        name,
        ...samplePackageJSON,
        scripts: {
            ...samplePackageJSON.scripts,
            ngrok: "ngrok http 3000 --subdomain=" + name
        }
    }, null, 2);
}