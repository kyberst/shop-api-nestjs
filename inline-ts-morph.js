const { Project, SyntaxKind } = require('ts-morph');
const path = require('path');
const fs = require('fs');

const project = new Project({
  tsConfigFilePath: 'tsconfig.json',
});

const logicFiles = [
  'src/application/use-cases/logic/ai/ai-chat.logic.ts',
  'src/application/use-cases/logic/categories/create-category.logic.ts',
  'src/application/use-cases/logic/categories/find-all-categories.logic.ts',
  'src/application/use-cases/logic/categories/remove-category.logic.ts',
  'src/application/use-cases/logic/categories/update-category.logic.ts',
  'src/application/use-cases/logic/identity/forgot-password.logic.ts',
  'src/application/use-cases/logic/identity/login.logic.ts',
  'src/application/use-cases/logic/identity/register.logic.ts',
  'src/application/use-cases/logic/orders/create-order.logic.ts',
  'src/application/use-cases/logic/orders/find-all-orders.logic.ts',
  'src/application/use-cases/logic/orders/update-order-status.logic.ts',
  'src/application/use-cases/logic/permissions/get-role-permissions.logic.ts',
  'src/application/use-cases/logic/permissions/update-role-permissions.logic.ts',
  'src/application/use-cases/logic/products/create-product.logic.ts',
  'src/application/use-cases/logic/products/find-all-products.logic.ts',
  'src/application/use-cases/logic/products/remove-product.logic.ts',
  'src/application/use-cases/logic/products/update-product.logic.ts'
];

async function run() {
  for (const logicFilePath of logicFiles) {
    const parts = logicFilePath.split('/');
    const name = parts[parts.length - 1].replace('.logic.ts', '');
    const moduleName = parts[parts.length - 2];
    const handlerFilePath = `src/application/use-cases/handlers/${moduleName}/${name}.handler.ts`;
    
    if (!fs.existsSync(logicFilePath) || !fs.existsSync(handlerFilePath)) {
      continue;
    }
    
    const logicFile = project.getSourceFileOrThrow(logicFilePath);
    const handlerFile = project.getSourceFileOrThrow(handlerFilePath);
    
    // Find the exported logic function
    let logicFunc = logicFile.getFunction(f => f.isExported());
    if (!logicFunc) {
      const vars = logicFile.getVariableDeclarations();
      for (const v of vars) {
        if (v.isExported() && (v.getInitializer().getKind() === SyntaxKind.ArrowFunction || v.getInitializer().getKind() === SyntaxKind.FunctionExpression)) {
          logicFunc = v.getInitializer();
          break;
        }
      }
    }
    
    if (!logicFunc) {
      console.log(`No logic function found in ${logicFilePath}`);
      continue;
    }
    
    // Get the handler class and handle method
    const classes = handlerFile.getClasses();
    const handlerClass = classes.find(c => c.getDecorator('RequestHandler'));
    if (!handlerClass) continue;
    
    const handleMethod = handlerClass.getMethod('handle');
    if (!handleMethod) continue;
    
    // Copy all imports from logic to handler
    const logicImports = logicFile.getImportDeclarations();
    for (const imp of logicImports) {
      const moduleSpecifier = imp.getModuleSpecifierValue();
      // Skip if module specifier is relative because it will be wrong when moved, but luckily they are mostly @/ aliases or we can fix them.
      // Actually they are in sibling folders or one level difference.
      // Logic is in logic/moduleName/ and Handler is in handlers/moduleName/
      // Both are depth 5. Relative paths to depth 4 or 3 will be exactly the same!
      
      const namedImports = imp.getNamedImports().map(n => n.getName());
      const defaultImport = imp.getDefaultImport() ? imp.getDefaultImport().getText() : undefined;
      
      // Add import to handler if it doesn't exist
      const existingImport = handlerFile.getImportDeclaration(moduleSpecifier);
      if (existingImport) {
        for (const named of namedImports) {
          if (!existingImport.getNamedImports().find(n => n.getName() === named)) {
            existingImport.addNamedImport(named);
          }
        }
      } else {
        handlerFile.addImportDeclaration({
          moduleSpecifier,
          namedImports,
          defaultImport
        });
      }
    }
    
    // Get logic function body
    const bodyText = logicFunc.getBodyText();
    
    // Let's replace the logic invocation in handle() with the bodyText
    // But we need to map the logic parameters to the actual variables in handler
    const handleBody = handleMethod.getBodyText();
    
    // We can just find the call to the logic function, look at the arguments passed, and create local variables
    const callExp = handleMethod.getDescendantsOfKind(SyntaxKind.CallExpression).find(c => c.getExpression().getText().includes('Logic'));
    if (callExp) {
      const args = callExp.getArguments().map(a => a.getText());
      
      let params = [];
      if (logicFunc.getKind() === SyntaxKind.FunctionDeclaration) {
        params = logicFunc.getParameters().map(p => p.getName());
      } else {
        params = logicFunc.getParameters().map(p => p.getName());
      }
      
      let varDecls = '';
      for (let i = 0; i < params.length; i++) {
        if (args[i] && args[i] !== params[i]) {
          varDecls += `const ${params[i]} = ${args[i]};\n`;
        }
      }
      
      handleMethod.setBodyText(`${varDecls}\n${bodyText}`);
    } else {
      console.log(`Could not find logic call in ${handlerFilePath}`);
    }
    
    // Remove the logic import
    const logicImport = handlerFile.getImportDeclarations().find(i => i.getModuleSpecifierValue().includes('logic/'));
    if (logicImport) {
      logicImport.remove();
    }
  }
  
  await project.save();
  console.log('Done mapping logic to handlers!');
}

run().catch(console.error);
