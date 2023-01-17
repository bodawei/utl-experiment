const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>build/jestSetupTestEnv.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "./temp",
        outputName: "junit.xml",
      },
    ],
  ],
};

module.exports = config;
