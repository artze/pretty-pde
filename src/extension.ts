import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  vscode.languages.registerDocumentFormattingEditProvider("pde", {
    provideDocumentFormattingEdits(
      document: vscode.TextDocument
    ): vscode.TextEdit[] {
      const edit: vscode.TextEdit[] = [];

      for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i);

        // Handle assignment statement
        if (line.text.match(/\s*=\s*/)) {
          edit.push(vscode.TextEdit.replace(line.range, `${line.text};`));
        }
      }

      return edit;
    },
  });
}
