const { App, Tags } = require("aws-cdk-lib");
const { BackendStack } = require("./backend-stack");

const app = new App();
const stack = new BackendStack(app, "backend-stack");
Tags.of(stack).add("Project", "99x_ufrrj_seccim_2024_02_workshop");
