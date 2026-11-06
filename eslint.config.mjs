import bpmnIoPlugin from 'eslint-plugin-bpmn-io';

const files = {
  ignored: [
    'coverage',
    'node_modules'
  ],
  build: [
    '*.mjs'
  ],
  test: [
    'test.js'
  ]
};

export default [
  {
    ignores: files.ignored
  },
  ...bpmnIoPlugin.configs.recommended,
  ...bpmnIoPlugin.configs.esm,
  ...bpmnIoPlugin.configs.node.map(config => ({
    ...config,
    files: files.build
  })),
  ...bpmnIoPlugin.configs.mocha.map(config => ({
    ...config,
    files: files.test
  }))
];
