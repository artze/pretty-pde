import * as vscode from "vscode";
import { config } from "../config";

function prependSpaces({
  indentLevel,
  content,
}: {
  indentLevel: number;
  content: string;
}): string {
  let spaces = "";
  for (let i = 0; i < indentLevel * config.tabWidth; i++) {
    spaces += " ";
  }
  return spaces.concat(content);
}

export function handleLine({
  line,
  indentLevel,
}: {
  line: vscode.TextLine;
  indentLevel: number;
}): vscode.TextEdit[] {
  const edits: vscode.TextEdit[] = [];

  // Handle assignments
  if (line.text.match(/\s*=\s*/)) {
    const lhs = line.text.substring(0, line.text.indexOf("=")).trim();
    const rhs = line.text
      .substring(line.text.indexOf("=") + 1)
      .trim()
      .replace(/;/g, "");
    const r = prependSpaces({ indentLevel, content: `${lhs} = ${rhs};` });

    edits.push(vscode.TextEdit.delete(line.range));
    edits.push(vscode.TextEdit.insert(line.range.start, r));

    return edits;
  }

  // Handle empty line
  if (/^\s*$/.test(line.text)) {
    edits.push(vscode.TextEdit.delete(line.range));
    edits.push(vscode.TextEdit.insert(line.range.start, ""));

    return edits;
  }

  // Handle general statements
  if (
    !line.text.includes("{") &&
    !line.text.includes("}") &&
    !/\s*/.test(line.text)
  ) {
    const r = prependSpaces({ indentLevel, content: line.text.trim() });

    edits.push(vscode.TextEdit.delete(line.range));
    edits.push(vscode.TextEdit.insert(line.range.start, r));

    return edits;
  }

  return edits;
}
