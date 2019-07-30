'use strict';
const path = require('path');
const Generator = require('yeoman-generator');
const yosay = require('yosay');
const fs = require('fs');

module.exports = class extends Generator {
    async prompting() {
        this.log(yosay('Welcome to the generator-zk-component!'));

        this.props = await this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Your component name',
                default: 'Mycomponent',
                validate: s => /^[A-Z]/.test(s) || 'Must be capitalized'
            },
            {
                type: 'input',
                name: 'package',
                message: 'The package',
                default: 'org.mygroup'
            }
        ]);
    }

    default() {
        let componentName = this.props.name;
        if (path.basename(this.destinationPath()) !== componentName) {
            this.log(yosay(`Your project must be inside a folder named ${componentName}.
                I'll automatically create this folder.`));
            fs.mkdirSync(componentName);
            this.destinationRoot(this.destinationPath(componentName));
        }
    }

    writing() {
        this.copyCommons();
        this.copyPackages();
        this.copyTemplatings();
    }

    copyCommons() {
        [
            'src',
            'zkdoc',
            '.babelrc',
            '.browserslistrc',
            '.eslintignore',
            '.eslintrc.json',
            '.gitignore',
            'gulpfile.js',
            'package.json',
            'tsconfig.json'
        ].forEach(file => this.fs.copy(
            this.templatePath(file),
            this.destinationPath(file)
        ));
    }

    copyPackages() {
        let packageFolder = this.props.package.replace(/\./g, '/'),
            componentName = this.props.name,
            jsPackage = componentName.toLowerCase(),
            props = this.props,
            fs = this.fs;

        fs.delete(this.destinationPath('src/main/java/**'));
        fs.delete(this.destinationPath('src/main/resources/web/js/**'));
        fs.copyTpl(
            this.templatePath('src/main/java/org/mygroup/MyComponent.java'),
            this.destinationPath('src/main/java', packageFolder, `${componentName}.java`),
            props
        );
        fs.copyTpl(
            this.templatePath('src/main/java/org/mygroup/Version.java'),
            this.destinationPath('src/main/java', packageFolder, 'Version.java'),
            props
        );
        fs.copyTpl(
            this.templatePath('src/main/resources/web/js/mycomponent/less/MyComponent.less'),
            this.destinationPath('src/main/resources/web/js', jsPackage, `less/${componentName}.less`),
            props
        );
        fs.copyTpl(
            this.templatePath('src/main/resources/web/js/mycomponent/mold/mycomponent.js'),
            this.destinationPath('src/main/resources/web/js', jsPackage, `mold/${jsPackage}.js`),
            props
        );
        fs.copyTpl(
            this.templatePath('src/main/resources/web/js/mycomponent/index.d.ts'),
            this.destinationPath('src/main/resources/web/js', jsPackage, 'index.d.ts'),
            props
        );
        fs.copyTpl(
            this.templatePath('src/main/resources/web/js/mycomponent/MyComponent.ts'),
            this.destinationPath('src/main/resources/web/js', jsPackage, `${componentName}.ts`),
            props
        );
        fs.copyTpl(
            this.templatePath('src/main/resources/web/js/mycomponent/zk.wpd'),
            this.destinationPath('src/main/resources/web/js', jsPackage, 'zk.wpd'),
            props
        );
    }

    copyTemplatings() {
        [
            'pom.xml',
            'README.md',
            'src/main/resources/metainfo/zk/lang-addon.xml',
            'src/test/java/test/ctrl/DemoWindowComposer.java',
            'src/test/webapp/WEB-INF/web.xml',
            'src/test/webapp/index.zul',
            'zkdoc/release-note'
        ].forEach(file => this.fs.copyTpl(
            this.templatePath(file),
            this.destinationPath(file),
            this.props
        ));
    }

    install() {
        this.npmInstall();
    }
};
