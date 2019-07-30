'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-zk-component:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ name: 'Coolcomponent', package: 'org.zkoss.addon.cool' });
  });

  it('creates files', () => {
    assert.file(['README.md', 'pom.xml', 'src', 'zkdoc']);
    assert.file(['.babelrc', '.gitignore']);
    assert.file(['src/main/resources/web/js/coolcomponent', 'src/main/java/org/zkoss/addon/cool']);
    assert.file(['src/main/resources/web/js/coolcomponent/Coolcomponent.ts', 'src/main/java/org/zkoss/addon/cool/Coolcomponent.java']);
    assert.noFile(['src/main/resources/web/js/mycomponent', 'src/main/java/org/mygroup']);
  });

  it('apply user settings', () => {
    assert.fileContent([
      ['README.md', '# ZK component Coolcomponent'],
      ['pom.xml', '<groupId>org.zkoss.addon.cool</groupId>'],
      ['pom.xml', '<artifactId>coolcomponent</artifactId>'],
      ['zkdoc/release-note', 'Coolcomponent 0.8.0'],
      ['src/test/java/test/ctrl/DemoWindowComposer.java', 'import org.zkoss.addon.cool.Coolcomponent;']
    ]);
  });
});
