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
          const lhs = line.text.substring(0, line.text.indexOf("=")).trim();
          const rhs = line.text
            .substring(line.text.indexOf("=") + 1)
            .trim()
            .replace(/;/g, "");
          const r = `${lhs} = ${rhs};`;
          edit.push(
            vscode.TextEdit.replace(
              line.range.with(
                line.range.start.translate(
                  0,
                  line.firstNonWhitespaceCharacterIndex
                )
              ),
              r
            )
          );
        }
      }

      return edit;
    },
  });
}
