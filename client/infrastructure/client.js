const { App, Tags } = require("aws-cdk-lib");
const { ClientStack } = require('./client-stack');

const app = new App();
const stack = new ClientStack(app, "client-stack");
Tags.of(stack).add("Project", "99x_ufrrj_seccim_2024_02_workshop");
