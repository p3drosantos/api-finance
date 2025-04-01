import type { Config } from "jest";

const config: Config = {
  coverageDirectory: "coverage",
  coverageProvider: "v8",
};

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
};

export default config;
