var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import app from "./src/app";
import { config } from "./src/config/config";
import conncetDB from "./src/config/db";
const startServer = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield conncetDB();
    const port = config.port;
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  });
startServer();
