import { createRequire as topLevelCreateRequire } from 'module'
const require = topLevelCreateRequire(import.meta.url)
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// stacks/ApiStack.js
import { Api, use } from "@serverless-stack/resources";

// stacks/StorageStack.js
import { Bucket, Table } from "@serverless-stack/resources";
function StorageStack({ stack, app }) {
  const bucket = new Bucket(stack, "Uploads");
  const table = new Table(stack, "Notes", {
    fields: {
      userId: "string",
      noteId: "string"
    },
    primaryIndex: { partitionKey: "userId", sortKey: "noteId" }
  });
  return {
    table,
    bucket
  };
}
__name(StorageStack, "StorageStack");

// stacks/ApiStack.js
function ApiStack({ stack, app }) {
  const { table } = use(StorageStack);
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        permissions: [table],
        environment: {
          TABLE_NAME: table.tableName
        }
      }
    },
    routes: {
      "GET /notes": "functions/list.main",
      "POST /notes": "functions/create.main",
      "GET /notes/{id}": "functions/get.main",
      "PUT /notes/{id}": "functions/update.main",
      "DELETE /notes/{id}": "functions/delete.main"
    }
  });
  stack.addOutputs({
    ApiEndpoint: api.url
  });
  return {
    api
  };
}
__name(ApiStack, "ApiStack");

// stacks/index.js
function main(app) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "backend",
    bundle: {
      format: "esm"
    }
  });
  app.stack(StorageStack).stack(ApiStack);
}
__name(main, "main");
export {
  main as default
};
//# sourceMappingURL=index.js.map
