import { createRequire as topLevelCreateRequire } from 'module'
const require = topLevelCreateRequire(import.meta.url)
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// stacks/MyStack.js
import { Api } from "@serverless-stack/resources";
function MyStack({ stack }) {
  new Api(stack, "api", {
    routes: {
      "GET /": "functions/lambda.handler"
    }
  });
}
__name(MyStack, "MyStack");

// stacks/index.js
import { App } from "@serverless-stack/resources";
function stacks_default(app) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "backend",
    bundle: {
      format: "esm"
    }
  });
  app.stack(MyStack);
}
__name(stacks_default, "default");
export {
  stacks_default as default
};
//# sourceMappingURL=index.js.map
